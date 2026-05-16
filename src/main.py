import os
import base64
from datetime import datetime
from pydantic import BaseModel, Field
import requests
from requests.auth import HTTPBasicAuth
from fastapi import FastAPI, HTTPException, status, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI(title="M-Pesa API Integration Hub")

# Enable CORS so your frontend (React/HTML) can safely communicate with this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your exact frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuration Constants
ENV = os.getenv("MPESA_ENVIRONMENT", "sandbox")
CONSUMER_KEY = os.getenv("MPESA_CONSUMER_KEY")
CONSUMER_SECRET = os.getenv("MPESA_CONSUMER_SECRET")
PASSKEY = os.getenv("MPESA_PASSKEY")
SHORTCODE = os.getenv("MPESA_SHORTCODE")
CALLBACK_URL = os.getenv("MPESA_CALLBACK_URL")

BASE_URL = (
    "https://sandbox.safaricom.co.ke" 
    if ENV == "sandbox" 
    else "https://api.safaricom.co.ke"
)

# Data Validation Models
class PaymentRequest(BaseModel):
    phone_number: str = Field(..., description="Phone number formatted as 2547XXXXXXXX or 2541XXXXXXXX")
    amount: int = Field(..., gt=0, description="The total transaction amount in KES")

# --- HELPER FUNCTIONS ---

def get_mpesa_access_token() -> str:
    """Generates an active OAuth2 Bearer token required for all Daraja requests."""
    url = f"{BASE_URL}/oauth/v1/generate?grant_type=client_credentials"
    try:
        response = requests.get(url, auth=HTTPBasicAuth(CONSUMER_KEY, CONSUMER_SECRET), timeout=10)
        response.raise_for_status()
        return response.json().get("access_token")
    except requests.RequestException as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to authenticate with Safaricom: {str(e)}"
        )

def process_db_update(callback_data: dict):
    """
    Asynchronous background worker to process transaction state changes.
    This protects your endpoint from hanging while running heavy database tasks.
    """
    stk_callback = callback_data.get("Body", {}).get("stkCallback", {})
    result_code = stk_callback.get("ResultCode")
    checkout_request_id = stk_callback.get("CheckoutRequestID")
    result_desc = stk_callback.get("ResultDesc")

    if result_code == 0:
        # Extract transaction parameters sent by Safaricom
        items = stk_callback.get("CallbackMetadata", {}).get("Item", [])
        meta_data = {item["Name"]: item.get("Value") for item in items}
        
        mpesa_receipt = meta_data.get("MpesaReceiptNumber")
        transaction_amount = meta_data.get("Amount")
        phone = meta_data.get("PhoneNumber")
        
        print(f"\n[SUCCESS] Payment verified for ID: {checkout_request_id}")
        print(f"Receipt: {mpesa_receipt} | Amount: KES {transaction_amount} | Payer: {phone}\n")
        # TODO: Inject your Database layer update script here (e.g., update order status to 'Paid')
    else:
        print(f"\n[FAILED/CANCELLED] Transaction {checkout_request_id} failed. Reason: {result_desc}\n")
        # TODO: Update database order entry to 'Failed' or 'Cancelled'

# --- API ROUTES ---

@app.post("/api/v1/mpesa/stkpush", status_code=status.HTTP_200_OK)
def initiate_stk_push(payload: PaymentRequest):
    """Triggers an M-Pesa Express PIN prompt layout on the customer's phone."""
    access_token = get_mpesa_access_token()
    url = f"{BASE_URL}/mpesa/stkpush/v1/processrequest"
    
    # Generate timestamp formatted as YYYYMMDDHHmmss
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    
    # Generate dynamic password hash
    data_to_encode = f"{SHORTCODE}{PASSKEY}{timestamp}"
    password = base64.b64encode(data_to_encode.encode("utf-8")).decode("utf-8")
    
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json"
    }
    
    request_body = {
        "BusinessShortCode": SHORTCODE,
        "Password": password,
        "Timestamp": timestamp,
        "TransactionType": "CustomerPayBillOnline",  # Use 'CustomerBuyGoodsOnline' if implementing a Till
        "Amount": payload.amount,
        "PartyA": payload.phone_number,
        "PartyB": SHORTCODE,
        "PhoneNumber": payload.phone_number,
        "CallBackURL": CALLBACK_URL,
        "AccountReference": "YMBasket_Store",
        "TransactionDesc": "Web Checkout Payment"
    }
    
    try:
        response = requests.post(url, json=request_body, headers=headers, timeout=15)
        response_data = response.json()
        
        if response.status_code == 200 and response_data.get("ResponseCode") == "0":
            return {
                "status": "success",
                "message": "STK Push prompted successfully.",
                "checkout_request_id": response_data.get("CheckoutRequestID"),
                "customer_message": response_data.get("CustomerMessage")
            }
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=response_data.get("errorMessage", "STK Push request initialization failed.")
            )
            
    except requests.RequestException as e:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"Gateway communication broken: {str(e)}"
        )

@app.post("/api/v1/mpesa/callback", status_code=status.HTTP_200_OK)
def mpesa_callback_webhook(data: dict, background_tasks: BackgroundTasks):
    """
    The secure listener webhook. Safaricom triggers this endpoint asynchronously 
    the instant a user fills in or rejects the PIN prompt.
    """
    # Hand off the parsing logic to a background worker so we can reply to Safaricom instantly
    background_tasks.add_task(process_db_update, data)
    
    # Safaricom expects a clear acknowledgement response header status code 200
    return {"ResultCode": 0, "ResultDesc": "Callback data acknowledged successfully"}