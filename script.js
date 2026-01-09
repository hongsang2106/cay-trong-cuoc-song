const products = [
  { name: "Phân NPK 16-16-8", price: 250000, img: "https://images.unsplash.com/photo-1598514983318-2f64f8f4796c" },
  { name: "Phân Ure Phú Mỹ", price: 220000, img: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449" },
  { name: "Thuốc trừ sâu sinh học", price: 180000, img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3" }
];

const list = document.getElementById("products");
const cartList = document.getElementById("cart-items");
const totalEl = document.getElementById("total");
const countEl = document.getElementById("cart-count");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderProducts() {
  list.innerHTML = "";
  products.forEach(p => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <img src="${p.img}">
      <div class="info">
        <h3>${p.name}</h3>
        <p>${p.price.toLocaleString()} đ</p>
      </div>
      <button onclick="addToCart('${p.name}', ${p.price})">Thêm vào giỏ</button>
    `;
    list.appendChild(div);
  });
}

function addToCart(name, price) {
  cart.push({ name, price });
  saveCart();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function renderCart() {
  cartList.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    total += item.price;
    const li = document.createElement("li");
    li.innerHTML = `<span>${item.name}</span><span>${item.price.toLocaleString()} đ</span>`;
    cartList.appendChild(li);
  });
  totalEl.innerText = total.toLocaleString();
  countEl.innerText = "🛒 " + cart.length;
}

renderProducts();
renderCart();
