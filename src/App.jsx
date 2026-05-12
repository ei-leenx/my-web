import React, { useState } from 'react';

const PRODUCTS = [
  { id: 1, name: "Blue berries", price: "300 ksh /kg", img: "/images/blue.jpeg", category: "Fruits"},
  { id: 2, name: "Rasp berries", price: "350 ksh /kg", img: "/images/rasp.jpeg", category: "Fruits" },
  { id: 3, name: "Bananas", price: "10 ksh /each", img: "images/bananas.jpeg", category: "Fruits" },
  { id: 4, name: "Peach", price: "70 ksh /each", img: "/images/peach.jpeg", category: "Fruits" },
  { id: 5, name: "Mango", price: "20 ksh /each", img: "/images/mango.jpeg",category: "Fruits" },
  { id: 6, name: "Red grapes", price: "40 /bunch", img: "/images/red grapes.jpeg", category: "Fruits" },
  { id: 7, name: "Kales" , price: "20 ksh /bunch", img: "/images/kales.webp", category: "Vegetables"},
  { id: 8, name: "Mrenda" , price: "40 ksh /bunch", img: "/images/mrenda.jpeg", category: "Vegetables"},
  { id: 9, name: "Green grams" , price: "200 ksh /kg", img: "/images/grn.jpeg", category: "Cereal"},
  { id: 10, name: "Red bell pepper" , price: "250 ksh /pckt", img: "/images/red bell pepper.jpeg", category: "Vegetables"},
  { id: 11, name: "tomatoes" , price: "15 ksh /each", img: "/images/tomatoeswebp.webp", category: "Vegetables"},
  { id: 12, name: "strawberries" , price: "80 ksh /pckt", img: "/images/straw.jpeg", category: "Fruits"},
  { id: 13, name: "rosecoco beans" , price: "180 ksh /kg", img: "/images/rscc.jpeg", category: "Cereal"},
  { id: 14, name: "sorghum" , price: "200 ksh /kg", img: "/images/srghm.jpeg", category: "Cereal"},
  { id: 15, name: "yellow beans" , price: "250 ksh /kg", img: "/images/yellow.jpeg", category: "Cereal"},
  { id: 16, name: "Watermelon", price: "150 ksh /each", img: "/images/watermelon.jpeg", category: "Fruits" },
  { id: 17, name: "Pumpkin", price: "100 ksh /each", img: "/images/pumpkin.jpeg", category: "Vegetables" },
  { id: 18, name: "Green Apple", price: "30 ksh /each", img: "/images/green apple.jpeg", category: "Fruits" },
  { id: 19, name: "Irish Potato", price: "50 ksh /kg", img: "/images/irish potato.jpeg", category: "Vegetables" },
  { id: 20, name: "Spinach", price: "20 ksh /bunch", img: "/images/spinach.jpeg", category: "Vegetables" },
  { id: 21, name: "Red Onions", price: "120 ksh /kg", img: "/images/red onions.jpeg", category: "Vegetables" },
  { id: 22, name: "Garlic", price: "30 ksh /each", img: "/images/garlic.jpeg", category: "Vegetables" },
  { id: 23, name: "Ginger", price: "40 ksh /each", img: "/images/ginger.jpeg", category: "Vegetables" },
  { id: 24, name: "Dates", price: "500 ksh /kg", img: "/images/dates.jpeg", category: "Fruits" },
  { id: 25, name: "Cherries", price: "400 ksh /pckt", img: "/images/cherry.jpeg", category: "Fruits" },
  { id: 26, name: "Kiwi", price: "60 ksh /each", img: "/images/kiwi(1).jpeg", category: "Fruits" },
  { id: 27, name: "Pear", price: "45 ksh /each", img: "/images/pear.jpeg", category: "Fruits" },
  { id: 28, name: "Eggplant", price: "30 ksh /each", img: "/images/eggplant.jpeg", category: "Vegetables" },
  { id: 29, name: "Green Bell Pepper", price: "20 ksh /each", img: "/images/green bell pepper.jpeg", category: "Vegetables" },
  { id: 30, name: "Spring Onions", price: "15 ksh /bunch", img: "/images/spring onions.jpeg", category: "Vegetables" },
  { id: 31, name: "Popcorn Seeds", price: "150 ksh /kg", img: "/images/ppcrn.jpeg", category: "Cereal" },
  { id: 32, name: "Green Peas (Minji)", price: "180 ksh /kg", img: "/images/minji.jpeg", category: "Vegetables" },
  { id: 33, name: "Sweet Potato", price: "60 ksh /kg", img: "/images/sweet potato.jpeg", category: "Vegetables" },
  { id: 34, name: "Courgette", price: "25 ksh /each", img: "/images/courgette).jpeg", category: "Vegetables" },
  { id: 35, name: "Terere", price: "20 ksh /bunch", img: "/images/terere.jpeg", category: "Vegetables" },
  { id: 36, name: "Yellow Bell Pepper", price: "30 ksh /each", img: "/images/yellow bell pepper.jpeg", category: "Vegetables" },
  { id: 37, name: "Green Grapes", price: "150 ksh /bunch", img: "/images/green grapes.jpeg", category: "Fruits" },
  { id: 38, name: "Purple Grapes", price: "180 ksh /bunch", img: "/images/purple grapes.jpeg", category: "Fruits" },
  { id: 39, name: "Passion Fruit", price: "15 ksh /each", img: "/images/passion.jpeg", category: "Fruits" },
  { id: 40, name: "Pawpaw", price: "80 ksh /each", img: "/images/pawpaw.jpeg", category: "Fruits" },
  { id: 41, name: "Persimmon", price: "50 ksh /each", img: "/images/persimon.jpeg", category: "Fruits" },
  { id: 42, name: "Lemon", price: "10 ksh /each", img: "/images/lmn(1).jpeg", category: "Fruits" },
  { id: 43, name: "Orange", price: "20 ksh /each", img: "/images/orng.jpeg", category: "Fruits" },
  { id: 44, name: "Radish", price: "40 ksh /bunch", img: "/images/raddish.webp", category: "Vegetables" },
  { id: 45, name: "Managu", price: "25 ksh /bunch", img: "/images/managu.jpeg", category: "Vegetables" },
  { id: 46, name: "Kunde", price: "20 ksh /bunch", img: "/images/kunde.jpeg", category: "Vegetables" },
  { id: 47, name: "Dania", price: "10 ksh /bunch", img: "/images/dania.jpeg", category: "Vegetables" },
  { id: 48, name: "Pearl Millet", price: "160 ksh /kg", img: "/images/prl.jpeg", category: "Cereal" },
  { id: 49, name: "Minjiri", price: "140 ksh /kg", img: "/images/minjiri.jpeg", category: "Cereal" },
  { id: 50, name: "Chickpeas", price: "220 ksh /kg", img: "/images/chcpeas.jpeg", category: "Cereal" },
  { id: 51, name: "Pomegranate", price: "100 ksh /each", img: "/images/pomegrante.jpeg", category: "Fruits" },
  { id: 52, name: "Avocado", price: "30 ksh /each", img: "/images/avocado.jpeg", category: "Fruits" },
  { id: 53, name: "Cucumber", price: "25 ksh /each", img: "/images/cucuber.jpeg", category: "Vegetables" },
  { id: 54, name: "Broccoli", price: "150 ksh /kg", img: "/images/broccoli.webp", category: "Vegetables" },
  { id: 55, name: "Cauliflower", price: "120 ksh /kg", img: "/images/cauli.webp", category: "Vegetables" },
  { id: 56, name: "Cabbage", price: "60 ksh /each", img: "/images/cabbage.jpeg", category: "Vegetables" },
  { id: 57, name: "Red Cabbage", price: "80 ksh /each", img: "/images/red cabbage.jpeg", category: "Vegetables" },
  { id: 58, name: "Black Beans (Njahi)", price: "200 ksh /kg", img: "/images/blck.jpeg", category: "Cereal" },
  { id: 59, name: "Lentils (Kamande)", price: "180 ksh /kg", img: "/images/lnl.jpeg", category: "Cereal" },
  { id: 60, name: "White Maize", price: "90 ksh /kg", img: "/images/wht.jpeg", category: "Cereal" },
  { id: 61, name: "Groundnuts", price: "250 ksh /kg", img: "/images/grnd nut.jpeg", category: "Cereal" },
  { id: 62, name: "Dragon Fruit", price: "350 ksh /each", img: "/images/drgn.jpeg", category: "Fruits" },
  { id: 63, name: "Asparagus", price: "400 ksh /pckt", img: "/images/asparagus.webp", category: "Vegetables" },
  { id: 64, name: "Mushroom", price: "150 ksh /pckt", img: "/images/mushrooms.webp", category: "Vegetables" },
  { id: 65, name: "Custard Apple", price: "120 ksh /kg", img: "/images/c.jpeg", category: "Fruits" },
  { id: 66, name: "lychee", price: "70 ksh /pckt", img: "/images/lychee.webp", category: "Fruits" }
];

function App() {
  const [cartItems, setCartItems] = useState([]);
  const openCart = (product) => {
  setCartItems([...cartItems, product]);
  setShowCart(true);
  };
  const [showCart, setShowCart] = useState(false);
  
   const [searchTerm, setSearchTerm] = useState("");

  const [activeCategory, setActiveCategory] = useState("All");
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const openLogin = () => { setShowSignUp(false); setShowLogin(true); };
  const openSignUp = () => { setShowLogin(false); setShowSignUp(true); };
 
  return (
    <div style={styles.container}>
      {/* --- TOP NAVIGATION BAR --- */}
      <nav style={styles.topNav}>
        <div style={styles.logoSection}>
          <img 
    src="/favicon.ico" 
    alt="Yo Mama's Basket Logo" 
    style={{ height: '40px', marginRight: '10px' }} 
  />
          <h2 style={{ margin: 0, color: '#2d5a27' }}>Yo Mama's Basket</h2>
        </div>
        <div style={styles.searchBar}>
          <button 
    onClick={() => setShowCart(true)} 
    style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', marginRight: '10px' }}
  >
    🛒
  </button>
          <input type="text" placeholder="Search for fresh produce..." style={styles.searchInput} 
          value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}/>
          <button style={styles.searchBtn}>🔍</button>
        </div>
        <div style={styles.navIcons}>
          <span style={{cursor: 'pointer'}}>❤️</span>
           <button 
        style={styles.loginBtn} 
        onClick={() => setShowLogin(true)}
      >
        Login
      </button>

          <button style={styles.signupBtn}
          onClick={() => setShowSignUp(true)}>Sign Up</button>
        </div>
      </nav>

      <div style={styles.mainLayout}>
        {/* --- LEFT SIDEBAR --- */}
        <aside style={styles.sidebar}>
          <h3 style={styles.categoryTitle}>CATEGORIES</h3>
          <ul style={styles.catList}>
            <li style={styles.catItem} onClick={() => setActiveCategory("Vegetables")}>🥦 Vegetables</li>
            <li style={styles.catItem} onClick={() => setActiveCategory("Fruits")}>🍎 Fruits</li>
            <li style={styles.catItem} onClick={() => setActiveCategory("Cereal")}>🥣 Cereal</li>
          </ul>
          <div style={styles.sidebarImage}>
            <img 
    src="/images/vegetable.png"
    alt="Sidebar Promo" 
    style={{ width: '100%', borderRadius: '10px' }} 
  />
  </div>
        </aside>

        {/* --- MAIN CONTENT --- */}
        <main style={styles.content}>
          {/* Banner */}
          <div style={styles.banner}>
            <div style={styles.bannerText}>
              <h1 style={{ color: '#2d5a27', marginBottom: '5px' }}>Fresh. Healthy. Delivered to you.</h1>
              <p>Bringing nature's best to your basket.</p>
            </div>
            <div style={styles.bannerImg}><img src="/images/vegetable.png" alt="" style={{width:'100%', maxWidth:'300px', height:'auto'}}/></div>
          </div>

          {/* Popular Picks Grid */}
          <h3 style={{ margin: '30px 0 20px 0', color: '#333' }}>Popular Picks</h3>
          <div style={styles.productGrid}>
           {PRODUCTS

           
   .filter((product) => {
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  })
    .map((product) => (
      <div key={product.id} style={styles.card}>
        <div style={styles.imgPlaceholder}>
          <img 
            src={product.img} 
            alt={product.name} 
            style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
          />
        </div>
        <h4 style={{ margin: '10px 0 5px 0' }}>{product.name}</h4>
        <p style={styles.price}>{product.price}</p>
        <button 
                onClick={ () => openCart(product)} 
                className="btn btn-success"
                style={{ width: '100%', marginTop: '10px' }}
              >
                Add to Cart
              </button>
      </div>
    ))}
</div>

        </main>
      </div>

      {/* --- TRUST FEATURES SECTION --- */}
      <section style={styles.features}>
        <div style={styles.featureItem}>🌿 100% Fresh</div>
        <div style={styles.featureItem}>🚚 Fast Delivery</div>
        <div style={styles.featureItem}>🛡️ Secure Payment</div>
        <div style={styles.featureItem}>🍃 Healthy Choices</div>
      </section>

      {/* --- CUSTOMIZED FOOTER --- */}
      <footer style={styles.footer}>
        <div style={styles.footerContainer}>
          {/* Navigation Section */}
          <div style={styles.footerSection}>
           <div className="footer-column">
  <h3 style={{ color: '#FFD700', fontSize: '1.2rem', marginBottom: '15px' }}>follow us on</h3>
  
  {/* Social Media Icons Row */}
  <div style={{ display: 'flex', gap: '15px', marginTop: '15px' }}>
    <a href="https://facebook.com" target="_blank" rel="noreferrer">
      <img src="/images/facebook.png" alt="Facebook" style={{ width: '24px', height: '24px' }} />
    </a>
    <a href="https://instagram.com" target="_blank" rel="noreferrer">
      <img src="/images/instagram.png" alt="Instagram" style={{ width: '24px', height: '24px' }} />
    </a>
    <a href="https://tiktok.com" target="_blank" rel="noreferrer">
      <img src="/images/tiktok.png" alt="TikTok" style={{ width: '24px', height: '24px' }} />
    </a>
    <a href="https://twitter.com" target="_blank" rel="noreferrer">
      <img src="/images/twitter.png" alt="Twitter" style={{ width: '24px', height: '24px' }} />
    </a>
  </div>
</div>
          </div>

          {/* Contact Information Section */}
          <div style={styles.footerSection}>
            <h3 style={styles.footerTitle}>Get in Touch</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                <strong>Mobile</strong><br />
                07001234567
              </li>
              <li style={styles.listItem}>
                <strong>EMAIL</strong><br />
                hello@yomamasbasket.com
              </li>
            </ul>
          </div>
        </div>
        <div style={styles.bottomBar}>
          &copy; 2026 Yo Mama's Basket. All Rights Reserved.
        </div>
      </footer>
     {showSignUp && (
        <div style={styles.overlay} onClick={() => setShowSignUp(false)}>
          <div style={styles.loginCard} onClick={(e) => e.stopPropagation()}>
            <div style={{ textAlign: 'center' }}>
               <span style={{ fontSize: '40px' }}>🛒</span>
               <h2 style={{ color: '#2d5a27', margin: '5px 0' }}>Yo Mama's Basket</h2>
               <h3 style={{ color: '#2d5a27', margin: '0' }}>Create your account</h3>
               <p style={{ color: '#666', fontSize: '12px' }}>Join us and start shopping fresh</p>
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Full Name</label>
              <input type="text" placeholder="Enter your full name" style={styles.modalInput} />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email Address</label>
              <input type="email" placeholder="Enter your email address" style={styles.modalInput} />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>
              <input type="password" placeholder="Create a password" style={styles.modalInput} />
            </div>
            <button style={styles.modalLoginBtn}>Sign Up</button>
            <div style={styles.orDivider}><span>or</span></div>
            <button style={styles.googleBtn}>
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" width="18" alt="" />
              Continue with Google
            </button>
            <p style={styles.footerText}>
              Already have an account? <span style={styles.toggleLink} onClick={() => { 
      setShowSignUp(false); // Close Sign Up
      setShowLogin(true);   // Open Login
    }}>Login</span>
            </p>
          </div>
        </div>
      )}

      {/* --- CART SIDEBAR --- */}
{showCart && (
  
  <div style={styles.overlay} onClick={() => setShowCart(false)}>
    <div 
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '350px',
        height: '100%',
        backgroundColor: 'white',
        boxShadow: '-5px 0 15px rgba(0,0,0,0.1)',
        padding: '20px',
        zIndex: 2000,
        display: 'flex',
        flexDirection: 'column'
      }} 
      onClick={(e) => e.stopPropagation()}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
        <h2 style={{ color: '#2d5a27', margin: 0 }}>Your Basket</h2>
        <button onClick={() => setShowCart(false)} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}>×</button>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#888' }}>
        <span style={{ fontSize: '50px' }}></span>
        <div className="cart-content">
  {cartItems.map((item, index) => (
    <div key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span>{item.name}</span>
      <span>{item.price}</span>
    </div>
  ))}
  
  <hr />
  
  <div style={{ fontWeight: 'bold' }}>
    Total: {cartItems.reduce((total, item) => total + parseFloat(item.price), 0)} ksh
  </div>
</div>
        <button 
          style={styles.modalLoginBtn} 
          onClick={() => setShowCart(false)}
        >
          Start Shopping
        </button>
      </div>

      <div style={{ borderTop: '1px solid #eee', paddingTop: '15px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', marginBottom: '15px' }}>
          <span>Total</span>
          <span>0.00 ksh</span>
        </div>
        <button style={{ ...styles.modalLoginBtn, width: '100%', backgroundColor: '#ccc', cursor: 'not-allowed' }} disabled>
          Checkout
        </button>
      </div>
    </div>
  </div>
)}

      {showLogin && (
        <div style={styles.overlay} onClick={() => setShowLogin(false)}>
          <div style={styles.loginCard} onClick={(e) => e.stopPropagation()}>
            <div style={{ textAlign: 'center' }}>
               <span style={{ fontSize: '40px' }}>🛒</span>
               <h2 style={{ color: '#2d5a27', margin: '5px 0' }}>Yo Mama's Basket</h2>
               <p style={{ color: '#666', fontSize: '14px' }}>Welcome back! Login to your account</p>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Email or Phone Number</label>
              <input type="text" placeholder="Enter your email" style={styles.modalInput} />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>
              <input type="password" placeholder="Enter your password" style={styles.modalInput} />
              <p style={styles.forgot}>Forgot Password?</p>
            </div>

            <button style={styles.modalLoginBtn}>Login</button>
            
            <div style={styles.orDivider}><span>or</span></div>
            
            <button style={styles.googleBtn}>
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" width="18" alt="" />
              Continue with Google
            </button>

            <p style={styles.footerText}>
              Don't have an account? <span style={{ color: '#2d5a27', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => { 
      setShowLogin(false);   // Close Login
      setShowSignUp(true);  // Open Sign Up
    }}>Sign Up</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  // Global & Nav
  container: { fontFamily: 'Arial, sans-serif', backgroundColor: '#fff', minHeight: '100vh' },
  topNav: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 40px', borderBottom: '1px solid #eee' },
  logoSection: { display: 'flex', alignItems: 'center', gap: '10px' },
  logoCircle: { fontSize: '24px' },
  searchBar: { display: 'flex', flex: 0.6, border: '1px solid #ddd', borderRadius: '25px', overflow: 'hidden' },
  input: { flex: 1, border: 'none', padding: '10px 20px', outline: 'none' },
  searchBtn: { border: 'none', background: '#7ca971', color: 'white', padding: '0 15px', cursor: 'pointer' },
  navIcons: { display: 'flex', alignItems: 'center', gap: '20px' },
  loginBtn: { background: 'none', border: '1px solid #ddd', padding: '5px 15px', borderRadius: '5px', cursor: 'pointer' },
  signupBtn: { background: '#7ca971', color: 'white', border: 'none', padding: '5px 15px', borderRadius: '5px', cursor: 'pointer' },
  
  // Layout
  mainLayout: { display: 'flex', padding: '20px 40px', minHeight: '600px' },
  sidebar: { width: '250px', padding: '20px', borderRight: '1px solid #2b6613' , backgroundColor:'#b5e9a1',display:'flex', flexDirection:'column', minHeight:'80vh' },
  categoryTitle: { fontSize: '12px', color: '#999', letterSpacing: '1px', marginBottom: '15px' },
  catList: { listStyle: 'none', padding: 0 },
  catItem: { padding: '12px 0', borderBottom: '1px solid #fafafa', cursor: 'pointer', color: '#555', fontSize: '14px' },
  sidebarImage: { marginTop: 'auto', paddingTop: '20px', textAlign: 'center' },

  // Content
  content: { flex: 1, paddingLeft: '30px' },
  banner: { background: '#b5e9a1', borderRadius: '15px', padding: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  bannerText: { flex: 1 },
  bannerImg: { fontSize: '80px' },
  productGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '20px' },
  card: { border: '1px solid #f0f0f0', padding: '15px', borderRadius: '10px', textAlign: 'center', transition: '0.3s' },
  imgPlaceholder: { background: '#f9f9f9', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '50px', borderRadius: '8px' },
  price: { color: '#7ca971', fontWeight: 'bold', margin: '5px 0' },
  addBtn: { background: '#7ca971', color: 'white', border: 'none', padding: '10px 0', width: '100%', borderRadius: '5px', cursor: 'pointer', marginTop: '10px' },

  // Features
  features: { display: 'flex', justifyContent: 'space-around', padding: '40px', backgroundColor: '#fdfdfd', borderTop: '1px solid #eee' },
  featureItem: { textAlign: 'center', color: '#777', fontSize: '14px', fontWeight: '500' },

  // Footer Styles
  footer: { backgroundColor: '#1b4332', color: '#f4f9f2', padding: '30px 20px 20px 20px' },
  footerContainer: { display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap',  margin: '0 auto', paddingTop: '20px',
  paddingBottom: '20px',
  paddingLeft: '15px',
  paddingRight: '15px'},
  footerSection: { marginBottom: '30px', minWidth: '250px' },
  footerTitle: { color: '#e9c46a', fontSize: '1.1rem', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '1px' },
  list: { listStyle: 'none', padding: 0 },
  listItem: { marginBottom: '15px', fontSize: '0.95rem', lineHeight: '1.6' },
  link: { color: '#f4f9f2', textDecoration: 'none' },
  bottomBar: { textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '40px', paddingTop: '20px', fontSize: '0.85rem', opacity: 0.6 },
  overlay: {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
    justifyContent: 'center', alignItems: 'center', zIndex: 1000
  },
  loginCard: {
    background: 'white', padding: '30px', borderRadius: '15px',
    width: '350px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
  },
  inputGroup: { marginTop: '15px' },
  label: { display: 'block', fontSize: '12px', color: '#888', marginBottom: '5px' },
  modalInput: {
    width: '100%', padding: '10px', borderRadius: '8px',
    border: '1px solid #eee', boxSizing: 'border-box', outline: 'none'
  },
  forgot: { fontSize: '11px', textAlign: 'right', color: '#2d5a27', marginTop: '5px', cursor: 'pointer' },
  modalLoginBtn: {
    width: '100%', padding: '12px', background: '#7ca971',
    color: 'white', border: 'none', borderRadius: '8px',
    marginTop: '20px', cursor: 'pointer', fontWeight: 'bold'
  },
  orDivider: {
    textAlign: 'center', borderBottom: '1px solid #eee',
    lineHeight: '0.1em', margin: '25px 0 20px'
  },
  googleBtn: {
    width: '100%', padding: '10px', background: 'white',
    border: '1px solid #ddd', borderRadius: '8px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    gap: '10px', cursor: 'pointer'
  },
  footerText: { textAlign: 'center', fontSize: '13px', marginTop: '20px', color: '#666' },
  toggleLink: {
    color: '#2d5a27', 
    cursor: 'pointer', 
    fontWeight: 'bold', 
    textDecoration: 'underline',
    marginLeft: '5px'
  },
};

export default App;