document.addEventListener("DOMContentLoaded", () => {
  function updateCartCount() {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const badge = document.getElementById('cart-count');
    if (!loggedInUser || !badge) return;
    const cartKey = `cart_${loggedInUser.email}`;
    const cart = JSON.parse(localStorage.getItem(cartKey) || '[]');
    badge.textContent = cart.length;
  }

  setTimeout(updateCartCount, 100);

  window.addEventListener('storage', (e) => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const cartKey = `cart_${loggedInUser?.email}`;
    if (e.key === cartKey) {
      updateCartCount();
    }
  });
});