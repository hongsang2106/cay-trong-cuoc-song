const products = [
  { name: "Phân NPK 16-16-8", price: 250000 },
  { name: "Phân Ure Phú Mỹ", price: 220000 },
  { name: "Thuốc trừ sâu sinh học", price: 180000 }
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
      <div class="fake-img">🌱</div>
      <div class="info">
        <h3>${p.name}</h3>
        <p>${p.price.toLocaleString()} đ / bao</p>
      </div>
      <button onclick="addToCart('${p.name}', ${p.price})">
        Thêm vào giỏ
      </button>
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

function orderViaZalo() {
  let message = "Đơn hàng Cây Trồng Cuộc Sống:%0A";
  cart.forEach(i => {
    message += `- ${i.name}: ${i.price.toLocaleString()} đ%0A`;
  });
  message += `Tổng: ${totalEl.innerText} đ`;

  window.open(
    "https://zalo.me/0948469054?text=" + message,
    "_blank"
  );
}

renderProducts();
renderCart();
