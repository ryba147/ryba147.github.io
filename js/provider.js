window.addEventListener('load', () => {
    console.log(localStorage.getItem('basicAuthToken'));
    console.log(JSON.parse(localStorage.getItem('userData')));

    const user = JSON.parse(localStorage.getItem('userData'));

    document.getElementById('name').innerHTML = user.firstname;
    document.getElementById('full-name').innerHTML = user.firstname + ' ' + user.lastname;

    const b = document.getElementById('b');

    if (b) {
        b.onclick = function logout() {
            localStorage.removeItem('userData');
            localStorage.removeItem('basicAuthToken');
            window.location.href = 'login.html';
        };
    }
});
