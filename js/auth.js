// js/auth.js

document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signup-form");
  const loginForm = document.getElementById("login-form");
  const adminSignupForm = document.getElementById("admin-signup-form");
  const adminLoginForm = document.getElementById("admin-login-form");

  // USER SIGNUP
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("signup-email").value;
      const password = document.getElementById("signup-password").value;

      const users = JSON.parse(localStorage.getItem("users") || "[]");
      if (users.find(user => user.email === email)) {
        alert("Email already registered.");
        return;
      }

      users.push({ email, password });
      localStorage.setItem("users", JSON.stringify(users));
      alert("Signup successful. Please login.");
      window.location.href = "login.html";
    });
  }

  // USER LOGIN
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("login-email").value;
      const password = document.getElementById("login-password").value;

      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find(user => user.email === email && user.password === password);

      if (!user) {
        alert("Invalid credentials.");
        return;
      }

      localStorage.setItem("currentUser", email); // ✅ CORRECTED KEY
      alert("Login successful.");
      window.location.href = "index.html";
    });
  }

  // ADMIN SIGNUP
  if (adminSignupForm) {
    adminSignupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("admin-signup-email").value;
      const password = document.getElementById("admin-signup-password").value;

      const admins = JSON.parse(localStorage.getItem("admins") || "[]");
      if (admins.find(admin => admin.email === email)) {
        alert("Admin already exists.");
        return;
      }

      admins.push({ email, password });
      localStorage.setItem("admins", JSON.stringify(admins));
      alert("Admin account created. Please log in.");
      window.location.href = "admin-login.html";
    });
  }

  // ADMIN LOGIN
  if (adminLoginForm) {
    adminLoginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("admin-login-email").value;
      const password = document.getElementById("admin-login-password").value;

      const admins = JSON.parse(localStorage.getItem("admins") || "[]");
      const admin = admins.find(admin => admin.email === email && admin.password === password);

      if (!admin) {
        alert("Invalid admin credentials.");
        return;
      }

      localStorage.setItem("loggedInAdmin", email); // ✅ KEEP THIS FOR ADMIN ONLY
      alert("Admin login successful.");
      window.location.href = "admin-dashboard.html";
    });
  }
});



