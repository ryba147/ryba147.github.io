import { API_URL } from './constants.js';

window.addEventListener('load', () => {
    const user = JSON.parse(localStorage.getItem('userData'));

    if (user) {
        if (window.location.toString().includes('edit-profile.html')) {
            const fileSelector = document.getElementById('file-selector');
            fileSelector.addEventListener('change', (event) => {
                const fileList = event.target.files;
                const output = document.getElementById('file-info');
                output.innerHTML = fileList[0].name;
            });
        }

        if (window.location.toString().includes('edit-profile.html')) {
            const signupForm = document.getElementById('update-user-form');

            signupForm.onsubmit = function (event) {
                event.preventDefault();

                const reqURL = `${API_URL}/users/${user.id}`;
                const formData = new FormData(document.forms.userUpdateForm);

                const xhr = new XMLHttpRequest();

                xhr.open('PUT', reqURL, false);
                xhr.setRequestHeader('Authorization', `Basic ${localStorage.getItem('basicAuthToken')}`);
                xhr.send(formData);

                if (xhr.status === 200) {
                    alert('User was updated successfully');
                    window.location.reload();
                    const reqUrl = new URL(`${API_URL}/users/login`);
                    const request = new XMLHttpRequest();

                    reqUrl.searchParams.append('username', user.username);
                    if (formData.get('password').length !== 0) {
                        reqUrl.searchParams.append('password', formData.get('password').toString());
                    } else {
                        const headerToDecode = atob(localStorage.getItem('basicAuthToken'));
                        const decodedPass = headerToDecode
                            .slice(Math.ceil(headerToDecode.length / 2));
                        reqUrl.searchParams.append('password', decodedPass);
                    }

                    request.open('GET', reqUrl.toString(), false);
                    request.setRequestHeader('Content-Type', 'application/json');
                    request.send();

                    const data = JSON.parse(request.response);
                    localStorage.setItem('userData', JSON.stringify((data.userData)));
                    localStorage.setItem('basicAuthToken', data.basicAuthToken);
                }
            };

            document.getElementById('delete-user').addEventListener('click', (event) => {
                const reqUrl = new URL(`${API_URL}/users`);
                const userId = JSON.parse(localStorage.getItem('userData')).id;

                const request = new XMLHttpRequest();

                reqUrl.searchParams.append('id', userId);

                request.open('DELETE', reqUrl.toString(), false);
                request.setRequestHeader('Authorization', `Basic ${localStorage.getItem('basicAuthToken')}`);
                request.send();

                console.log(request.status);
                event.preventDefault();

                if (request.status === 200) {
                    alert('Account was deleted successfully');
                    localStorage.removeItem('userData');
                    localStorage.removeItem('basicAuthToken');
                    window.location.href = 'login.html';
                } else {
                    alert('Cannot delete user');
                }

                window.location.href = 'signup.html';
            });
        }
    } else {
        window.location.replace('login.html');
    }
});
