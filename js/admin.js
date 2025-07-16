// Redirect to login if not already logged in
if (localStorage.getItem('adminLoggedIn') !== 'true') {
  window.location.href = 'admin-login.html';
}

function logout() {
  localStorage.removeItem('adminLoggedIn');
  window.location.href = 'admin-login.html';
}

// Load restaurants from localStorage
let restaurantData = JSON.parse(localStorage.getItem('restaurants')) || [];
const container = document.getElementById('restaurant-sections');

restaurantData.forEach((restaurant, restIndex) => {
  const section = document.createElement('div');
  section.innerHTML = `
    <h3 class="text-lg font-bold text-gray-800 mb-2">${restaurant.name}</h3>
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
    <form onsubmit="addItem(event, ${restIndex})" class="space-x-2">
      <input type="text" placeholder="Name" class="p-2 border rounded" id="name-${restIndex}">
      <input type="number" placeholder="Price" class="p-2 border rounded" id="price-${restIndex}">
      <input type="url" placeholder="Image URL" class="p-2 border rounded" id="image-${restIndex}">
      <button class="bg-green-500 text-white px-4 py-2 rounded">Add</button>
    </form>
    <hr class="my-6">
  `;
  container.appendChild(section);
});

function deleteItem(restIndex, itemIndex) {
  restaurantData[restIndex].items.splice(itemIndex, 1);
  saveAndReload();
}

function addItem(e, restIndex) {
  e.preventDefault();
  const name = document.getElementById(`name-${restIndex}`).value;
  const price = parseFloat(document.getElementById(`price-${restIndex}`).value);
  const image = document.getElementById(`image-${restIndex}`).value;

  if (name && !isNaN(price) && image) {
    restaurantData[restIndex].items.push({ name, price, image });
    saveAndReload();
  }
}

function saveAndReload() {
  localStorage.setItem('restaurants', JSON.stringify(restaurantData));
  location.reload();
}

// Export as JSON
function exportData() {
  const data = localStorage.getItem('restaurants');
  if (!data) {
    alert('No restaurant data found.');
    return;
  }

  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'restaurants-export.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ✅ Export as CSV
function exportCSV() {
  const restaurants = JSON.parse(localStorage.getItem('restaurants') || '[]');
  if (restaurants.length === 0) {
    alert('No data to export.');
    return;
  }

  const rows = [['Restaurant', 'Item', 'Price']];
  restaurants.forEach(rest => {
    rest.items.forEach(item => {
      rows.push([rest.name, item.name, item.price]);
    });
  });

  const csv = rows.map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'restaurants.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
