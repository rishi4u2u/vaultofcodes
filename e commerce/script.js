// Sample product data
const products = [
  { id: 1, name: "Shoes", price: 50, image: "images/shoes.jpg" },
  { id: 2, name: "Watch", price: 120, image: "images/watch.jpg" },
  { id: 3, name: "Headphones", price: 80, image: "images/headphones.jpg" },
  { id: 4, name: "T-Shirt", price: 30, image: "images/tshirt.jpg" },
  { id: 5, name: "laptop", price: 500, image: "images/laptop.jpg" },
  { id: 6, name: "Smartphone", price: 300, image: "images/Smartphone.jpg" },
  { id: 7, name: "Home appliances", price: 1000, image: "images/Home appliances.jpg" },
  { id: 8, name: "Sunglasses", price: 20, image: "images/Sunglasses.jpg" },
  { id: 9, name: "Facewash", price: 10, image: "images/Facewash.jpg" },
  { id: 10, name: "Serum", price: 15, image: "images/Serum.jpg" },
  { id: 11, name: "Lotion", price: 20, image: "images/Lotion.jpg" },
  { id: 12, name: "FaceCream", price: 12, image: "images/FaceCream.jpg" },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Display products
function displayProducts(filter = "all", search = "") {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  let filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (filter === "low") filteredProducts = filteredProducts.filter(p => p.price < 50);
  if (filter === "medium") filteredProducts = filteredProducts.filter(p => p.price >= 50 && p.price <= 100);
  if (filter === "high") filteredProducts = filteredProducts.filter(p => p.price > 100);

  filteredProducts.forEach(product => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>$${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productList.appendChild(productDiv);
  });
}

// Add to Cart (with quantity)
function addToCart(id) {
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    const product = products.find(p => p.id === id);
    cart.push({ ...product, quantity: 1 });
  }
  updateCart();
}

// Update Cart
function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const cartCount = document.getElementById("cart-count");

  cartItems.innerHTML = "";
  let total = 0, count = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    count += item.quantity;

    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - $${item.price} x ${item.quantity}
      <button onclick="changeQty(${index}, 1)">+</button>
      <button onclick="changeQty(${index}, -1)">-</button>
      <button onclick="removeFromCart(${index})">Remove</button>
    `;
    cartItems.appendChild(li);
  });

  cartTotal.textContent = total;
  cartCount.textContent = count;
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Change quantity
function changeQty(index, delta) {
  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) cart.splice(index, 1);
  updateCart();
}

// Remove item
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

// Checkout
document.getElementById("checkout-btn").addEventListener("click", () => {
  if(cart.length === 0) return alert("Cart is empty!");
  alert("Thank you for your purchase!");
  cart = [];
  updateCart();
});

// Search & Filter
document.getElementById("search").addEventListener("input", (e) => {
  displayProducts(document.getElementById("filter").value, e.target.value);
});

document.getElementById("filter").addEventListener("change", (e) => {
  displayProducts(e.target.value, document.getElementById("search").value);
});

// Login System
const loginBtn = document.getElementById("login-btn");
const loginModal = document.getElementById("login-modal");
const submitLogin = document.getElementById("submit-login");
const userDisplay = document.getElementById("user-display");

let currentUser = localStorage.getItem("username") || "";

if (currentUser) {
  userDisplay.textContent = `Welcome, ${currentUser}`;
  loginBtn.style.display = "none";
}

loginBtn.addEventListener("click", () => {
  loginModal.style.display = "block";
});

submitLogin.addEventListener("click", () => {
  const username = document.getElementById("username").value;
  if (username.trim()) {
    localStorage.setItem("username", username);
    userDisplay.textContent = `Welcome, ${username}`;
    loginModal.style.display = "none";
    loginBtn.style.display = "none";
  }
});

// Init
displayProducts();
updateCart();
