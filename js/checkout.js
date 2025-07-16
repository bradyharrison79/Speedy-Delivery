document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("checkout-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form[0].value.trim();
    const address = form[1].value.trim();
    const city = form[2].value.trim();
    const card = form[3].value.trim();

    if (!name || !address || !city || !card) {
      alert("Please fill in all fields.");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const order = {
      name,
      address,
      city,
      items: cart,
      timestamp: new Date().toISOString()
    };

    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.removeItem("cart");

    alert("Order placed successfully!");
    window.location.href = "my-orders.html";
  });
});


