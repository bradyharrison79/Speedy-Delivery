// auth.js

// Sign up logic
const signupForm = document.getElementById('signupForm');
if (signupForm) {
  signupForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (!username || !email || !password) return alert('All fields required');

    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(u => u.username === username)) {
      return alert('Username already exists!');
    }

    users.push({ username, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify({ username }));
    alert('Account created! You are now logged in.');
    window.location.href = 'index.html';
  });
}

// Login logic
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) return alert('Invalid username or password.');

    localStorage.setItem('currentUser', JSON.stringify({ username }));
    alert('Login successful!');
    window.location.href = 'index.html';
  });
}

// Log out function (can be used anywhere)
function logout() {
  localStorage.removeItem('currentUser');
  window.location.href = 'login.html';
}
