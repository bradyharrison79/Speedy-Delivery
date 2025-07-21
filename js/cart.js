document.addEventListener("DOMContentLoaded", () => {
  const currentUser = localStorage.getItem("currentUser");
  const cartKey = `cart_${currentUser}`;
  const cartItems = JSON.parse(localStorage.getItem(cartKey)) || [];

  const cartContainer = document.getElementById("cart-items");
  const totalElement = document.getElementById("cart-total");

  if (!cartContainer || !totalElement) return;

  if (cartItems.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    totalElement.textContent = "0.00";
    return;
  }

  let total = 0;
  cartContainer.innerHTML = "";

  cartItems.forEach((item, index) => {
    const price = parseFloat(item.price) || 0;
    total += price;

    const itemDiv = document.createElement("div");
    itemDiv.className = "p-4 border rounded flex justify-between items-center mb-2 bg-white";
    itemDiv.innerHTML = `
      <span>${item.name} - $${price.toFixed(2)}</span>
      <button class="text-red-600 hover:underline" onclick="removeItem(${index})">Remove</button>
    `;
    cartContainer.appendChild(itemDiv);
  });

  totalElement.textContent = total.toFixed(2);
});

function removeItem(index) {
  const currentUser = localStorage.getItem("currentUser");
  const cartKey = `cart_${currentUser}`;
  const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
  cart.splice(index, 1);
  localStorage.setItem(cartKey, JSON.stringify(cart));
  location.reload();
}


