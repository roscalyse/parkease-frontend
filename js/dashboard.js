// verify if user is logged in
requireLogin();
// fetching logged in user details from session storage and showing on the sidebar
const user = JSON.parse(sessionStorage.getItem("user"));
document.getElementById("user-name").textContent = user.name;
document.getElementById("user-role").textContent = user.role;