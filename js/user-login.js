// js/user-login.js

document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signup-form');
  const loginForm = document.getElementById('login-form');
  const adminLoginForm = document.getElementById('admin-login-form');
  const adminSignupForm = document.getElementById('admin-signup-form');

  // USER SIGNUP
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('signup-email').value.trim();
      const password = document.getElementById('signup-password').value.trim();

      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.find(user => user.email === email)) {
        alert('Email already registered.');
        return;
      }

      users.push({ email, password });
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('loggedInUser', JSON.stringify({ email }));
      window.location.href = 'index.html';
    });
  }

  // USER LOGIN
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value.trim();
      const password = document.getElementById('login-password').value.trim();

      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(user => user.email === email && user.password === password);

      if (!user) {
        alert('Invalid login credentials.');
        return;
      }

      localStorage.setItem('loggedInUser', JSON.stringify({ email }));
      window.location.href = 'index.html';
    });
  }

  // ADMIN LOGIN
  if (adminLoginForm) {
    adminLoginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('admin-login-email').value.trim();
      const password = document.getElementById('admin-login-password').value.trim();

      const admins = JSON.parse(localStorage.getItem('admins') || '[]');
      const valid = admins.find(admin => admin.email === email && admin.password === password);

      if (!valid) {
        alert('Invalid admin credentials.');
        return;
      }

      localStorage.setItem('adminLoggedIn', 'true');
      window.location.href = 'admin-dashboard.html';
    });
  }

  // ADMIN SIGNUP
  if (adminSignupForm) {
    adminSignupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('admin-signup-email').value.trim();
      const password = document.getElementById('admin-signup-password').value.trim();

      const admins = JSON.parse(localStorage.getItem('admins') || '[]');
      if (admins.find(admin => admin.email === email)) {
        alert('Admin already exists.');
        return;
      }

      admins.push({ email, password });
      localStorage.setItem('admins', JSON.stringify(admins));
      alert('Admin account created. Please log in.');
      window.location.href = 'admin-login.html';
    });
  }

  const filterSelect = document.getElementById('category-filter');
  if (filterSelect && typeof renderRestaurants === 'function') {
    filterSelect.addEventListener('change', () => {
      const selected = filterSelect.value;
      const allRestaurants = JSON.parse(localStorage.getItem('restaurants') || '[]');
      const filtered = selected === 'all'
        ? allRestaurants
        : allRestaurants.filter(r =>
            r.category?.toLowerCase() === selected.toLowerCase()
          );
      renderRestaurants(filtered);
    });
  }
});
