// eslint-disable-next-line import/extensions
import { API_URL } from './constants.js';

window.addEventListener('load', () => {
    const loginForm = document.getElementById('login-page-form');

    loginForm.onsubmit = function (event) {
        const reqUrl = new URL(`${API_URL}/users/login`);

        event.preventDefault();

        const request = new XMLHttpRequest();

        const username = encodeURIComponent(document.getElementById('username-input').value);
        const password = encodeURIComponent(document.getElementById('password-input').value);

        reqUrl.searchParams.append('username', username);
        reqUrl.searchParams.append('password', password);

        request.open('GET', reqUrl.toString(), false);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send();

        console.log(request.response);
        console.log(request.status);

        const data = JSON.parse(request.response);

        if (request.status === 200) {
            alert('Login success');
            // as we parsed our json we need to revert userData back to json
            localStorage.setItem('userData', JSON.stringify((data.userData)));
            localStorage.setItem('basicAuthToken', data.basicAuthToken);
            window.location.href = 'logged.html';
        } else if (request.status === 404) {
            alert('Invalid username or password');
        } else {
            alert('An unexpected error occurred');
        }
    };
});
