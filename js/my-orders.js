// js/my-orders.js

document.addEventListener("DOMContentLoaded", () => {
  const currentUser = localStorage.getItem("currentUser");
  if (!currentUser) {
    alert("Please log in to view your orders.");
    window.location.href = "login.html";
    return;
  }

  const ordersKey = `orders_${currentUser}`;
  const orders = JSON.parse(localStorage.getItem(ordersKey)) || [];
  const ordersContainer = document.getElementById("orders-list");

  if (!ordersContainer) return;

  if (orders.length === 0) {
    ordersContainer.innerHTML = "<p>No orders found.</p>";
    return;
  }

  ordersContainer.innerHTML = "";

  orders.forEach((order, index) => {
    const div = document.createElement("div");
    div.className = "p-4 border rounded shadow-sm bg-white mb-4";

    const itemsList = order.items
      .map(item => `<li>${item.name} - $${item.price.toFixed(2)}</li>`)
      .join("");

    div.innerHTML = `
      <h2 class="text-lg font-semibold mb-1">Order #${index + 1}</h2>
      <p><strong>Name:</strong> ${order.name}</p>
      <p><strong>Email:</strong> ${order.email}</p>
      <p><strong>Address:</strong> ${order.address}</p>
      <p><strong>Message:</strong> ${order.message || "N/A"}</p>
      <p class="font-medium mt-2">Items:</p>
      <ul class="list-disc list-inside mb-2">${itemsList}</ul>
      <p class="text-sm text-gray-500">Ordered at: ${new Date(order.timestamp).toLocaleString()}</p>
    `;

    ordersContainer.appendChild(div);
  });
});
