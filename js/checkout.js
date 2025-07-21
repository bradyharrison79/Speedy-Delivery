// js/checkout.js

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('checkout-form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const address = document.getElementById('address')?.value.trim();
    const message = document.getElementById('message')?.value.trim(); // Optional field
    const currentUser = localStorage.getItem("currentUser");

    if (!currentUser) {
      alert("You must be logged in to place an order.");
      return;
    }

    const cartKey = `cart_${currentUser}`;
    const ordersKey = `orders_${currentUser}`;
    const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

    if (!name || !email || !address || cart.length === 0) {
      alert('Please fill in all fields and make sure your cart is not empty.');
      return;
    }

    const order = {
      name,
      email,
      address,
      message: message || '',
      items: cart,
      timestamp: new Date().toISOString()
    };

    const existingOrders = JSON.parse(localStorage.getItem(ordersKey)) || [];
    existingOrders.push(order);
    localStorage.setItem(ordersKey, JSON.stringify(existingOrders));
    localStorage.removeItem(cartKey);

    alert('Order placed successfully!');
    window.location.href = 'my-orders.html';
  });
});
