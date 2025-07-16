document.addEventListener("DOMContentLoaded", () => {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const ordersContainer = document.getElementById("orders-list");

  if (orders.length === 0) {
    ordersContainer.innerHTML = "<p>No orders found.</p>";
    return;
  }

  orders.forEach((order, index) => {
    const div = document.createElement("div");
    div.className = "p-4 border rounded shadow-sm bg-white";

    const itemsList = order.items.map(item => `<li>${item.name} - $${item.price.toFixed(2)}</li>`).join("");

    div.innerHTML = `
      <h2 class="text-lg font-semibold mb-1">Order #${index + 1}</h2>
      <p><strong>Name:</strong> ${order.name}</p>
      <p><strong>Address:</strong> ${order.address}, ${order.city}</p>
      <p><strong>Items:</strong></p>
      <ul class="list-disc list-inside mb-2">${itemsList}</ul>
      <p class="text-sm text-gray-500">Ordered at: ${new Date(order.timestamp).toLocaleString()}</p>
    `;

    ordersContainer.appendChild(div);
  });
});

