// js/restaurant-menu.js

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const restaurantId = params.get('id');
  const data = JSON.parse(localStorage.getItem('restaurants')) || [];

  const nameEl = document.getElementById('restaurant-name');
  const container = document.getElementById('menu-items');

  const restaurant = data.find(r => r.id === restaurantId);

  if (!restaurant) {
    nameEl.textContent = "Restaurant not found";
    container.innerHTML = '<p class="text-red-500">No menu available.</p>';
    return;
  }

  nameEl.textContent = restaurant.name;

  restaurant.items.forEach(item => {
    const imageFileName = item.name
      .toLowerCase()
      .replace(/\s+/g, '_')
      .replace(/[^a-z0-9_]/g, '');

    const imagePath = `../images/${restaurantId}/${imageFileName}.jpg`;

    const card = document.createElement('div');
    card.className = "bg-white rounded shadow p-4 flex flex-col justify-between h-full";

    card.innerHTML = `
      <img src="${imagePath}" alt="${item.name}" class="w-full aspect-video object-cover rounded mb-3" onerror="this.src='../images/placeholder.jpg'">
      <h4 class="text-lg font-semibold text-gray-800">${item.name}</h4>
      <p class="text-gray-600 mb-2">$${item.price.toFixed(2)}</p>
      <button onclick='addToCart("${item.name}", ${item.price})' class="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200 ease-in-out">
        Add to Cart
      </button>
    `;

    container.appendChild(card);
  });
});

function addToCart(name, price) {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!loggedInUser || !loggedInUser.email) {
    alert("You must be logged in to add items to the cart.");
    return;
  }

  const cartKey = `cart_${loggedInUser.email}`;
  const cart = JSON.parse(localStorage.getItem(cartKey) || '[]');
  cart.push({ name, price, quantity: 1 });
  localStorage.setItem(cartKey, JSON.stringify(cart));

  alert(`${name} added to cart.`);
}

// ✅ Make it callable from inline HTML
window.addToCart = addToCart;
