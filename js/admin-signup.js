// admin-signup.js

document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('admin-signup-form');
  
    if (signupForm) {
      signupForm.addEventListener('submit', function (e) {
        e.preventDefault();
  
        const username = document.getElementById('new-admin-username').value.trim();
        const password = document.getElementById('new-admin-password').value.trim();
  
        if (!username || !password) {
          alert('Please fill in both fields.');
          return;
        }
  
        const admins = JSON.parse(localStorage.getItem('admins') || '[]');
  
        const existing = admins.find(admin => admin.username === username);
        if (existing) {
          alert('An admin with that username already exists.');
          return;
        }
  
        admins.push({ username, password });
        localStorage.setItem('admins', JSON.stringify(admins));
  
        alert('Admin registered successfully. You may now log in.');
        window.location.href = 'admin-login.html';
      });
    }
  });
  