// js/cart-utils.js

function getLoggedInUser() {
  return JSON.parse(localStorage.getItem('loggedInUser'));
}

function getCartKey() {
  const user = getLoggedInUser();
  return user ? `cart_${user.email}` : null;
}

function getCart() {
  const cartKey = getCartKey();
  if (!cartKey) return [];
  return JSON.parse(localStorage.getItem(cartKey)) || [];
}

function setCart(cart) {
  const cartKey = getCartKey();
  if (!cartKey) return;
  localStorage.setItem(cartKey, JSON.stringify(cart));
}

function addToCart(newItem) {
  const cart = getCart();
  const index = cart.findIndex(item => item.name === newItem.name && item.price === newItem.price);
  if (index !== -1) {
    cart[index].quantity = (cart[index].quantity || 1) + 1;
  } else {
    cart.push({ ...newItem, quantity: 1 });
  }
  setCart(cart);
  updateCartBadge();
}

function removeFromCart(itemName) {
  const cart = getCart().filter(item => item.name !== itemName);
  setCart(cart);
  updateCartBadge();
}

function clearCart() {
  const cartKey = getCartKey();
  if (!cartKey) return;
  localStorage.removeItem(cartKey);
  updateCartBadge();
}

function updateCartBadge() {
  const cart = getCart();
  const totalQty = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const headerBadge = document.getElementById("cart-count");
  const footerBadge = document.getElementById("footer-cart-count");

  if (headerBadge) headerBadge.textContent = totalQty;
  if (footerBadge) footerBadge.textContent = totalQty;
}

// ✅ Make it available globally
window.updateCartBadge = updateCartBadge;
