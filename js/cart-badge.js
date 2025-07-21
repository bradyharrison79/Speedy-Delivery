// js/cart-badge.js

document.addEventListener('DOMContentLoaded', () => {
  const headerCount = document.getElementById("cart-count");
  const footerCount = document.getElementById("footer-cart-count");

  // ✅ Use the same key as in cart.js
  const email = localStorage.getItem("currentUser");
  let count = 0;

  if (email) {
    const cartKey = `cart_${email}`;
    const cart = JSON.parse(localStorage.getItem(cartKey) || "[]");

    // ✅ Use quantity if present, fallback to 1
    count = cart.reduce((acc, item) => {
      return acc + (item.quantity ? item.quantity : 1);
    }, 0);
  }

  if (headerCount) headerCount.textContent = count;
  if (footerCount) footerCount.textContent = count;
});


