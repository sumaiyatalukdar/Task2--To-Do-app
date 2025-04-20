// Toggle form panel
const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');

registerBtn.addEventListener('click', () => container.classList.add('active'));
loginBtn.addEventListener('click', () => container.classList.remove('active'));

// Reusable function to show messages
function showMessage(id, message, isSuccess = false) {
    const el = document.getElementById(id);
    el.innerHTML = `
        <div class="message ${isSuccess ? 'success' : 'error'}">
            <span class="icon">${isSuccess ? '✅' : '⚠️'}</span>
            <span class="text">${message}</span>
        </div>
    `;
    el.classList.add('visible');
    setTimeout(() => el.classList.remove('visible'), 3000);
}

// Register
document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('registerUsername').value.trim();
    const email = document.getElementById('registerEmail').value.trim().toLowerCase();
    const password = document.getElementById('registerPassword').value;

    if (!username || !email || !password) {
        showMessage('registerMessage', 'Please fill in all fields.');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const duplicate = users.find(user => user.username === username || user.email === email);

    if (duplicate) {
        alert('User already registered with this username or email.');
        return;
    }

    const newUser = { username, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registration successful! Redirecting to login...', true);
    setTimeout(() => container.classList.remove('active'), 1500);
});

// Login
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;

    if (!username || !password) {
        showMessage('loginMessage', 'Please fill in all fields.');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.length === 0) {
        alert('No users found. Please register first.');
        return;
    }

    const matchedUser = users.find(user => user.username === username);

    if (!matchedUser) {
        alert('User not found. Please register.');
    } else if (matchedUser.password !== password) {
        alert('Incorrect password. Please try again.');
    } else {
        localStorage.setItem('activeUser', JSON.stringify(matchedUser));
        setTimeout(() => window.location.href = "dashboard.html", 1000);
    }
});

// Logout function moved from dashboard.html
function logout() {
    localStorage.removeItem('activeUser');
    window.location.href = "index.html";
}

// Add event listener for logout button in navbar
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', logout);
}
