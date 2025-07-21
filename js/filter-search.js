// js/filter-search.js

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search');
    const restaurantList = document.getElementById('restaurant-list');
  
    // Backup of original data
    let allRestaurants = [];
  
    // Fetch data and render all restaurants initially
    fetch('../data/restaurants.json')
      .then(res => res.json())
      .then(data => {
        allRestaurants = data;
        renderRestaurants(allRestaurants);
      });
  
    // Filter restaurants on input
    searchInput?.addEventListener('input', () => {
      const searchTerm = searchInput.value.toLowerCase();
      const filtered = allRestaurants.filter(r =>
        r.name.toLowerCase().includes(searchTerm)
      );
      renderRestaurants(filtered);
    });
  
    // Function to render restaurants
    function renderRestaurants(restaurants) {
      restaurantList.innerHTML = '';
      if (restaurants.length === 0) {
        restaurantList.innerHTML = '<p>No restaurants found.</p>';
        return;
      }
  
      restaurants.forEach(restaurant => {
        const card = document.createElement('div');
        card.className = 'bg-white p-4 rounded shadow';
        card.innerHTML = `
          <h3 class="text-lg font-semibold mb-2">${restaurant.name}</h3>
          <p class="mb-2">${restaurant.description || ''}</p>
          <a href="restaurant-menu.html?id=${restaurant.id}" class="text-blue-600 hover:underline">View Menu</a>
        `;
        restaurantList.appendChild(card);
      });
    }
  });
  