const products = [
  { id: 1, name: "Smartphone", price: 12000, image: "https://via.placeholder.com/200" },
  { id: 2, name: "Headphones", price: 1500, image: "https://via.placeholder.com/200" },
  { id: 3, name: "Smartwatch", price: 4000, image: "https://via.placeholder.com/200" },
  { id: 4, name: "Laptop", price: 55000, image: "https://via.placeholder.com/200" },
  { id: 5, name: "Bluetooth Speaker", price: 2500, image: "https://via.placeholder.com/200" }
];

const productList = document.getElementById("product-list");
const cartModal = document.getElementById("cart-modal");
const cartBtn = document.getElementById("cart-btn");
const closeCart = document.getElementById("close-cart");
const cartItems = document.getElementById("cart-items");
const totalPrice = document.getElementById("total-price");
const cartCount = document.getElementById("cart-count");
const clearCart = document.getElementById("clear-cart");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Display Products
function renderProducts() {
  products.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productList.appendChild(card);
  });
}

// Add to Cart
function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  updateCart();
  saveCart();
}

// Update Cart Display
function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    const li = document.createElement("li");
    li.textContent = `${item.name} - ₹${item.price}`;
    cartItems.appendChild(li);
  });

  totalPrice.textContent = total;
  cartCount.textContent = cart.length;
}

// Save Cart to Local Storage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Show Cart Modal
cartBtn.addEventListener("click", () => {
  cartModal.style.display = "flex";
  updateCart();
});

// Close Cart Modal
closeCart.addEventListener("click", () => {
  cartModal.style.display = "none";
});

// Clear Cart
clearCart.addEventListener("click", () => {
  cart = [];
  saveCart();
  updateCart();
});

// Close on outside click
window.addEventListener("click", e => {
  if (e.target === cartModal) {
    cartModal.style.display = "none";
  }
});

// Load products on page start
renderProducts();
updateCart();