// admin-login.js

// Handle login
document.getElementById('admin-login-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('admin-username').value;
    const password = document.getElementById('admin-password').value;
  
    const admins = JSON.parse(localStorage.getItem('admins') || '[]');
    const validAdmin = admins.find(admin => admin.username === username && admin.password === password);
  
    if (validAdmin) {
      localStorage.setItem('adminLoggedIn', 'true');
      window.location.href = 'admin-dashboard.html';
    } else {
      alert('Invalid credentials.');
    }
  });
  
  // Handle signup
  document.getElementById('admin-signup-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const newUsername = document.getElementById('new-admin-username').value;
    const newPassword = document.getElementById('new-admin-password').value;
  
    if (!newUsername || !newPassword) {
      alert('Please enter username and password.');
      return;
    }
  
    const admins = JSON.parse(localStorage.getItem('admins') || '[]');
  
    if (admins.find(admin => admin.username === newUsername)) {
      alert('Admin already exists.');
      return;
    }
  
    admins.push({ username: newUsername, password: newPassword });
    localStorage.setItem('admins', JSON.stringify(admins));
    alert('Admin account created. Please log in.');
  
    showForm('login');
  });
  
  // Form toggle logic
  function showForm(type) {
    document.getElementById('admin-login-form').classList.toggle('hidden', type !== 'login');
    document.getElementById('admin-signup-form').classList.toggle('hidden', type !== 'signup');
  }
  