// restaurant.js

const urlParams = new URLSearchParams(window.location.search);
const restaurantId = urlParams.get('id');

const restaurantData = JSON.parse(localStorage.getItem('restaurants') || '[]');
const restaurant = restaurantData.find(r => r.id === restaurantId);

if (!restaurant) {
  document.getElementById('restaurant-name').textContent = "Restaurant not found.";
} else {
  document.getElementById('restaurant-name').textContent = restaurant.name;
  renderMenu(restaurant.items);
}

function renderMenu(items) {
  const container = document.getElementById('menu-items');
  container.innerHTML = '';

  items.forEach(item => {
    const div = document.createElement('div');
    div.className = 'bg-white p-4 rounded shadow';

    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="w-full h-40 object-cover rounded mb-2">
      <h3 class="font-semibold text-lg">${item.name}</h3>
      <p class="text-gray-600 mb-2">$${item.price.toFixed(2)}</p>
      <button onclick='addToCart(${JSON.stringify(item)})' class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Add to Cart</button>
    `;

    container.appendChild(div);
  });
}

function addToCart(item) {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  cart.push(item);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${item.name} added to cart!`);
}
