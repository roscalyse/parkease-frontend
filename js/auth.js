// simple authentication helper using users.json
const STORAGE_KEYS = { USER: "user" };

// assume the login form and message div exist in HTML
const loginForm = document.getElementById("login-form");
const username = document.getElementById("username");
const password = document.getElementById("password");
const authMessage = document.getElementById("message");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!validateUsername(username.value.trim())) {
    showError('username-grp', 'Username must be 3-20 characters, letters, numbers, or underscores only.');
    return;
  }
  if (!validatePassword(password.value.trim())) {
    showError('password-grp', 'Password must be 6-20 characters, letters, numbers, or underscores only.');
    return;
  }

  try {
    const resp = await fetch("./assets/json/users.json");
    const users = await resp.json();
    const user = users.find(
      (u) => u.username.toLowerCase() === username.value.trim().toLowerCase() && u.password === password.value.trim(),
    );
    // console.log("Login attempt:", { username: username.value.trim(), password: password.value.trim(), userFound: !!user });
    if (user) {
      // store user info in session storage, redirect to services page
      sessionStorage.setItem(
        STORAGE_KEYS.USER,
        JSON.stringify({
          id: user.id,
          username: user.username,
          name: user.name,
          role: user.role,
        }),
      );
      //store user info in local storage for persistence across sessions
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify({
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role,
      }));
      let page = (user.role === "admin") ? "reports.html" : "dashboard.html";
      window.location.href = page;
    } else {
      authMessage.textContent = "Invalid credentials.";
      authMessage.className = "error";
    }
  } catch (error) {
    console.error(error.message);
    authMessage.textContent = "Incorrect login credentials.";
    authMessage.className = "error";
  }
});
//function to validate username input
function validateUsername(username) {
  return /^[a-zA-Z0-9_]{3,20}$/.test(username);

}
function validatePassword(password) {
  return /^[a-zA-Z0-9_@#]{6,20}$/.test(password);
}

// function to show error message below input field
function showError(inputId, message) {
  const input = document.getElementById(inputId);
  // Remove any existing error
  const existing = document.getElementById(inputId + ' - error');
  if (existing) existing.remove();
  // Create and insert error message
  const err = document.createElement('p');
  err.id = inputId + ' - error';
  err.style.color = 'red';
  err.style.fontSize = '12px';
  err.style.marginTop = '4px';
  err.textContent = message;
  input.parentNode.insertBefore(err, input.nextSibling);
  input.style.borderColor = 'red';
}

// function to clear error message when user starts typing
// document.querySelectorAll('.input-field').forEach(input => {
//   input.addEventListener('input', () => {
//     const err = document.getElementById(input.id + ' - error');
//     if (err) {
//       err.remove();
//       input.style.borderColor = '';
//     }
// });
// });
function clearError(inputId){
  const existing = document.getElementById(inputId + ' - error');
  if(existing) existing.remove();
  document.getElementById(inputId).style.borderColor=''

}

function requireLogin() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (!user) {
        window.location.href = 'index.html';
    }
    return true;
}

// function to sign out user by clearing localStorage and sessionStorage, then redirecting to login page

let signOutBtn = document.getElementById('signout-btn');
signOutBtn.addEventListener('click', function() {   
    // Clear user data from localStorage
    localStorage.removeItem('user');
    // Clear user data from sessionStorage
    sessionStorage.removeItem('user');
    // Redirect to login page
    window.location.href = 'index.html';
});
