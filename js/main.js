let restaurants = [];

fetch('data/restaurants.json')
  .then(res => res.json())
  .then(data => {
    restaurants = data;
    localStorage.setItem('restaurants', JSON.stringify(data));
    renderRestaurants(data);
  })
  .catch(err => {
    console.error('Failed to load restaurants.json:', err);
  });

function renderRestaurants(data) {
  const container = document.getElementById('restaurant-list');
  container.innerHTML = ''; // Clear "Loading..."

  data.forEach(restaurant => {
    const div = document.createElement('div');
    div.className = 'bg-white p-4 shadow rounded';

    div.innerHTML = `
      <img src="${restaurant.image}" alt="${restaurant.name}" class="w-full h-40 object-cover rounded mb-2">
      <h3 class="text-lg font-semibold">${restaurant.name}</h3>
      <p class="text-sm text-gray-600">${restaurant.cuisine || 'Various'}</p>
      <a href="restaurant.html?id=${restaurant.id}" class="text-blue-500 hover:underline mt-2 block">View Menu</a>
    `;

    container.appendChild(div);
  });
}

function filterRestaurants() {
  const keyword = document.getElementById('search').value.toLowerCase();
  const filtered = restaurants.filter(r =>
    r.name.toLowerCase().includes(keyword)
  );
  renderRestaurants(filtered);
}
