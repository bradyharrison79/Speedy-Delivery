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

function addToCart(item) {
  const cart = getCart();
  cart.push(item);
  setCart(cart);
}

function removeFromCart(itemId) {
  const cart = getCart().filter(item => item.id !== itemId);
  setCart(cart);
}

function clearCart() {
  const cartKey = getCartKey();
  if (!cartKey) return;
  localStorage.removeItem(cartKey);
}

function updateCartBadge() {
  const cart = getCart();
  const badge = document.getElementById('cart-badge') || document.getElementById('cart-count');
  if (badge) {
    badge.textContent = cart.length;
    badge.style.display = cart.length > 0 ? 'inline-block' : 'none';
  }
}
