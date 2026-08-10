const products = [
  {name: "Signature Glow", category: "Makeup", description: "A beauty essential for your everyday glow.", price: 450},
  {name: "Velvet Muse", category: "Makeup", description: "Soft, elegant and made for every mood.", price: 520},
  {name: "Rose Élixir", category: "Women", description: "A feminine fragrance with a delicate character.", price: 850},
  {name: "Noir Élixir", category: "Men", description: "A deep, confident fragrance for him.", price: 900},
  {name: "Blush Veil", category: "Makeup", description: "A fresh finishing touch for your beauty routine.", price: 390},
  {name: "Lumière", category: "Women", description: "A luminous scent made for unforgettable moments.", price: 780}
];

let cart = [];

function renderProducts(list = products) {
  const container = document.getElementById("products");
  container.innerHTML = list.map((p, i) => `
    <article class="product-card">
      <div class="product-image">${p.name}</div>
      <h3>${p.name}</h3>
      <p>${p.description}</p>
      <div class="price">EGP ${p.price.toLocaleString()}</div>
      <button class="add" onclick="addToCart(${i})">Add to bag</button>
    </article>
  `).join("");
}

function filterProducts(category, button) {
  if (button) {
    document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
    button.classList.add("active");
  }
  const list = category === "All" ? products : products.filter(p => p.category === category);
  renderProducts(list);
}

function addToCart(index) {
  cart.push(products[index]);
  document.getElementById("cart-count").textContent = cart.length;
  renderCart();
  openCart();
}

function renderCart() {
  const box = document.getElementById("cart-items");
  if (!cart.length) {
    box.innerHTML = "<p>Your bag is empty.</p>";
  } else {
    box.innerHTML = cart.map((p, i) =>
      `<div class="cart-row"><span>${p.name}</span><span>EGP ${p.price.toLocaleString()} <button onclick="removeFromCart(${i})" style="border:0;background:none;cursor:pointer">×</button></span></div>`
    ).join("");
  }
  const total = cart.reduce((sum, p) => sum + p.price, 0);
  document.getElementById("cart-total").textContent = "EGP " + total.toLocaleString();
}

function removeFromCart(i) {
  cart.splice(i, 1);
  document.getElementById("cart-count").textContent = cart.length;
  renderCart();
}

function openCart() {
  document.getElementById("cart-modal").classList.add("show");
  document.getElementById("cart-modal").setAttribute("aria-hidden", "false");
  renderCart();
}
function closeCart() {
  document.getElementById("cart-modal").classList.remove("show");
  document.getElementById("cart-modal").setAttribute("aria-hidden", "true");
}

document.getElementById("cart-modal").addEventListener("click", e => {
  if (e.target.id === "cart-modal") closeCart();
});

renderProducts();
