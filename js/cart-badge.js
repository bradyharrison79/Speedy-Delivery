// js/cart-badge.js

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const badge = document.getElementById('cart-count');
    if (badge) {
      badge.textContent = cart.length;
      badge.style.display = cart.length > 0 ? 'inline-block' : 'none';
    }
  }
  
  // Update immediately on page load
  updateCartCount();
  
  // Listen for cart changes from other tabs/windows
  window.addEventListener('storage', (e) => {
    if (e.key === 'cart') {
      updateCartCount();
    }
  });
  