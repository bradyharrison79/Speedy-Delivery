// js/load-header.js
fetch('partials/header.html')
  .then(response => response.text())
  .then(html => {
    const placeholder = document.getElementById('header-placeholder');
    if (placeholder) {
      placeholder.innerHTML = html;
      // Load cart badge after header is inserted
      const script = document.createElement('script');
      script.src = 'js/cart-badge.js';
      script.defer = true;
      document.body.appendChild(script);
    }
  });
