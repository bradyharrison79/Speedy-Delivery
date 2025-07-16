// cart-utils.js

export function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }
  
  export function setCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  
  export function addToCart(item) {
    const cart = getCart();
    cart.push(item);
    setCart(cart);
  }
  
  export function removeFromCart(itemId) {
    const cart = getCart().filter(item => item.id !== itemId);
    setCart(cart);
  }
  
  export function clearCart() {
    localStorage.removeItem("cart");
  }
  
  export function updateCartBadge() {
    const count = getCart().length;
    const badge = document.getElementById("cart-badge");
    if (badge) badge.textContent = count;
  }
  