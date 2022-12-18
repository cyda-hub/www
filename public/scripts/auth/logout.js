
function logoutUser() {
    Cookies.remove('token')
    window.location.reload();
}
