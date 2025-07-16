document.addEventListener("DOMContentLoaded", () => {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const cartContainer = document.getElementById("cart-items");

  if (cartItems.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  cartContainer.innerHTML = "";
  cartItems.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "p-4 border rounded flex justify-between items-center";
    itemDiv.innerHTML = `
      <span>${item.name} - $${item.price}</span>
      <button class="text-red-600" onclick="removeItem(${index})">Remove</button>
    `;
    cartContainer.appendChild(itemDiv);
  });
});

function removeItem(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}

