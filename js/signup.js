// eslint-disable-next-line import/extensions
import { API_URL } from './constants.js';

window.addEventListener('load', () => {
    const reqUrl = `${API_URL}/users`;
    const signupForm = document.getElementById('signup-form');

    signupForm.onsubmit = function (event) {
        event.preventDefault();

        const request = new XMLHttpRequest(); // xhr

        const firstName = encodeURIComponent(document.getElementById('firstname-input').value);
        const lastName = encodeURIComponent(document.getElementById('lastname-input').value);
        const email = encodeURIComponent(document.getElementById('email-input').value);
        const username = encodeURIComponent(document.getElementById('username-input').value);
        const password = encodeURIComponent(document.getElementById('password-input').value);
        const radios = document.getElementsByName('role-input');

        let userRole = null;
        for (let i = 0; i < radios.length; ++i) {
            if (radios[i].checked) {
                userRole = radios[i].value;
                break; // якщо знайшли обране - виходимо з циклу
            }
        }

        request.open('POST', reqUrl, false);

        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({
            firstname: firstName,
            lastname: lastName,
            email: email,
            username: username,
            role: userRole,
            password: password,
        }));
        console.log(request.response);

        if (request.status === 201) {
            alert('User created');
            window.location.href = 'login.html';
        } else if (request.status === 403) {
            alert('User already exists');
        } else {
            alert('An error occurred while creating user');
        }
    };
});
