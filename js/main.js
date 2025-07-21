// main.js (cleaned - no rendering, only loads data & sets localStorage)

let restaurants = [];

// Fetch restaurant data and store it in localStorage
fetch('../data/restaurants.json')
  .then(res => res.json())
  .then(data => {
    restaurants = data;
    localStorage.setItem('restaurants', JSON.stringify(data));
  })
  .catch(err => {
    console.error('Failed to load restaurants.json:', err);
    const container = document.getElementById('restaurant-list');
    if (container) {
      container.innerHTML = '<p class="text-red-500">Failed to load restaurants. Please try again later.</p>';
    }
  });

// Filtering logic (still useful for search)
function filterRestaurants() {
  const input = document.getElementById('search');
  if (!input) return;

  const keyword = input.value.trim().toLowerCase();
  const filtered = restaurants.filter(r =>
    r.name.toLowerCase().includes(keyword) ||
    (r.cuisine || '').toLowerCase().includes(keyword)
  );

  // Let restaurant.js handle the rendering
  const event = new CustomEvent('filteredRestaurants', { detail: filtered });
  document.dispatchEvent(event);
}

