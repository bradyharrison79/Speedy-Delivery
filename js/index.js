function renderRestaurantCard(restaurant) {
  const container = document.getElementById('restaurant-list');
  const div = document.createElement('div');
  div.className = 'bg-white p-4 shadow rounded';

  const image = restaurant.image || 'https://via.placeholder.com/300x160?text=No+Image';
  const cuisine = restaurant.cuisine || restaurant.category || 'Various';

  div.innerHTML = `
    <img src="${image}" alt="${restaurant.name}" class="w-full h-40 object-cover rounded mb-2">
    <h3 class="text-lg font-semibold">${restaurant.name}</h3>
    <p class="text-sm text-gray-600">${cuisine}</p>
    <a href="restaurant.html?id=${restaurant.id}" class="text-blue-500 hover:underline mt-2 block">View Menu</a>
  `;

  container.appendChild(div);
}

function filterRestaurants() {
  const query = document.getElementById('search').value.toLowerCase();
  const container = document.getElementById('restaurant-list');
  container.innerHTML = '';

  window.restaurantData
    .filter(r =>
      r.name.toLowerCase().includes(query) ||
      (r.cuisine || '').toLowerCase().includes(query)
    )
    .forEach(renderRestaurantCard);
}

fetch(window.location.origin + '/data/restaurants.json')
  .then(res => res.json())
  .then(data => {
    window.restaurantData = data;

    const container = document.getElementById('restaurant-list');
    container.innerHTML = ''; // Clear the "Loading..." text

    data.forEach(renderRestaurantCard);

    // Optional: save to localStorage
    localStorage.setItem('restaurants', JSON.stringify(data));
  });
