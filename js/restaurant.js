// /js/restaurant.js

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('restaurant-list');
  const searchInput = document.getElementById('search');
  const restaurantData = JSON.parse(localStorage.getItem('restaurants')) || [];

  if (!container || !searchInput) {
    console.error("Missing container or search input element.");
    return;
  }

  function renderRestaurants(restaurants) {
    container.innerHTML = '';

    if (restaurants.length === 0) {
      container.innerHTML = '<p class="text-gray-600">No restaurants found.</p>';
      return;
    }

    restaurants.forEach(rest => {
      const card = document.createElement('div');
      card.className = "bg-white rounded shadow p-4";

      const category = rest.category || rest.cuisine || "Various";

      card.innerHTML = `
        <h3 class="text-xl font-bold text-gray-800 mb-3">
          ${rest.name}
          <span class="text-sm text-gray-600 font-normal">(${category})</span>
        </h3>
        <a href="../html/restaurant-menu.html?id=${rest.id}" class="text-blue-500 hover:underline">View Menu</a>
      `;
      container.appendChild(card);
    });
  }

  function filterRestaurants() {
    const query = searchInput.value.toLowerCase();
    const filtered = restaurantData.filter(r =>
      r.name.toLowerCase().includes(query) ||
      (r.category && r.category.toLowerCase().includes(query)) ||
      (r.cuisine && r.cuisine.toLowerCase().includes(query))
    );
    renderRestaurants(filtered);
  }

  searchInput.addEventListener('input', filterRestaurants);
  renderRestaurants(restaurantData);
});
