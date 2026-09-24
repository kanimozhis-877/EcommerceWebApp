import { useEffect, useState } from "react";
import Login from "./Login";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [apiProducts, setApiProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => setApiProducts(data))
      .catch((error) => console.log(error));
  }, []);

  const fallbackProducts = [
    {
      id: 1,
      name: "Aura Wireless Headphones",
      price: 1499,
      image: "🎧",
    },
    {
      id: 2,
      name: "Nova Smart Watch",
      price: 1999,
      image: "⌚",
    },
    {
      id: 3,
      name: "Urban Laptop Backpack",
      price: 899,
      image: "🎒",
    },
    {
      id: 4,
      name: "Pulse Wireless Mouse",
      price: 599,
      image: "🖱️",
    },
  ];

  const products =
    apiProducts.length > 0 ? apiProducts : fallbackProducts;

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price),
    0
  );

  const checkout = () => {
    fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: cart,
        total: total,
      }),
    })
      .then(() => {
        alert("Order placed successfully!");
        setCart([]);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="app">
      <header className="navbar">
        <div className="brand">
          <div className="brand-icon">S</div>
          <div>
            <h1>ShopEase</h1>
            <span>Simple. Smart. Yours.</span>
          </div>
        </div>

        <div className="nav-actions">
          <button
            className="login-btn"
            onClick={() => setShowLogin(true)}
          >
            Login
          </button>

          <div className="cart-badge">
            🛒 {cart.length}
          </div>
        </div>
      </header>

      {showLogin && (
        <div className="login-section">
          <Login />
        </div>
      )}

      <section className="hero">
        <div className="hero-content">
          <p className="small-title">WELCOME TO SHOPEASY</p>

          <h2>
            Everything you need,
            <br />
            <span>in one beautiful place.</span>
          </h2>

          <p className="hero-text">
            Discover useful products, add your favourites to the cart,
            and enjoy a simple shopping experience.
          </p>

          <a href="#products" className="shop-btn">
            Explore Products →
          </a>
        </div>

        <div className="hero-card">
          <div className="glow-circle"></div>
          <div className="hero-product">🛍️</div>
          <p>YOUR CART</p>
          <h3>{cart.length} Items</h3>
        </div>
      </section>

      <main id="products">
        <div className="section-heading">
          <div>
            <span>OUR COLLECTION</span>
            <h2>Featured Products</h2>
          </div>

          <p>
            Curated picks for your everyday needs.
          </p>
        </div>

        <div className="products">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <div className="product-image">
                {product.image}
              </div>

              <div className="product-info">
                <span className="product-label">
                  FEATURED
                </span>

                <h3>{product.name}</h3>

                <div className="product-bottom">
                  <strong>₹{product.price}</strong>

                  <button
                    onClick={() => addToCart(product)}
                    className="add-btn"
                  >
                    + Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <section className="cart-box">
          <div className="cart-header">
            <div>
              <span>YOUR SELECTION</span>
              <h2>Shopping Cart</h2>
            </div>

            <div className="cart-count">
              {cart.length} items
            </div>
          </div>

          {cart.length === 0 ? (
            <div className="empty-cart">
              <div>🛒</div>
              <h3>Your cart is waiting</h3>
              <p>Add a product above to see it here.</p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cart.map((item, index) => (
                  <div className="cart-item" key={index}>
                    <div>
                      <h3>{item.name}</h3>
                      <p>₹{item.price}</p>
                    </div>

                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <div className="checkout-area">
                <div>
                  <span>Total Amount</span>
                  <h2>₹{total}</h2>
                </div>

                <button
                  className="checkout-btn"
                  onClick={checkout}
                >
                  Proceed to Checkout →
                </button>
              </div>
            </>
          )}
        </section>
      </main>

      <footer>
        <div className="footer-logo">ShopEase</div>
        <p>Made with care for a better shopping experience.</p>
      </footer>
    </div>
  );
}

export default App;