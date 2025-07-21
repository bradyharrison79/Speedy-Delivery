// Redirect if admin not logged in
if (localStorage.getItem('adminLoggedIn') !== 'true') {
  window.location.href = 'admin-login.html';
}

// Logout admin
function logout() {
  localStorage.removeItem('adminLoggedIn');
  window.location.href = 'admin-login.html';
}

// Fetch restaurants data (from localStorage if edited, or fallback to original JSON)
const storedData = localStorage.getItem('restaurants');
const dataPromise = storedData
  ? Promise.resolve(JSON.parse(storedData))
  : fetch('../data/restaurants.json').then(res => res.json());

// Render editable restaurant sections
dataPromise.then(data => {
  const container = document.getElementById('restaurant-sections');
  if (!container) return;

  data.forEach((restaurant, restIndex) => {
    const section = document.createElement('div');
    section.innerHTML = `
      <h3 class="text-xl font-bold text-gray-800 mb-2">${restaurant.name}</h3>
      <ul class="space-y-2 mb-4">
        ${restaurant.items.map((item, itemIndex) => `
          <li class="bg-white p-3 rounded shadow flex justify-between items-center">
            <div>
              <strong>${item.name}</strong> - $${item.price.toFixed(2)}
            </div>
            <button onclick="deleteItem(${restIndex}, ${itemIndex})" class="text-sm text-red-500 hover:underline">Delete</button>
          </li>
        `).join('')}
      </ul>

      <form onsubmit="addItem(event, ${restIndex})" class="space-x-2 mb-6">
        <input type="text" placeholder="Name" class="p-2 border rounded" id="name-${restIndex}" required>
        <input type="number" placeholder="Price" class="p-2 border rounded" id="price-${restIndex}" required>
        <input type="url" placeholder="Image URL" class="p-2 border rounded" id="image-${restIndex}" required>
        <button class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Add</button>
      </form>

      <hr class="my-6">
    `;
    container.appendChild(section);
  });

  window.restaurantData = data;
});

// Handle delete
function deleteItem(restIndex, itemIndex) {
  window.restaurantData[restIndex].items.splice(itemIndex, 1);
  saveAndReload();
}

// Handle add
function addItem(e, restIndex) {
  e.preventDefault();
  const name = document.getElementById(`name-${restIndex}`).value;
  const price = parseFloat(document.getElementById(`price-${restIndex}`).value);
  const image = document.getElementById(`image-${restIndex}`).value;

  if (name && !isNaN(price) && image) {
    window.restaurantData[restIndex].items.push({ name, price, image });
    saveAndReload();
  }
}

// Save updated data to localStorage and refresh
function saveAndReload() {
  localStorage.setItem('restaurants', JSON.stringify(window.restaurantData));
  location.reload();
}
