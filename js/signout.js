function checkAuth() {
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
