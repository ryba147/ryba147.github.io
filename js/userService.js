import { API_URL, CLOUDINARY_URL } from './constants.js';

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

            const updateForm = document.getElementById('update-user-form');

            updateForm.onsubmit = (event) => {
                event.preventDefault();

                const reqURL = `${API_URL}/users/${user.id}`;
                const formData = new FormData(document.forms.userUpdateForm);

                const xhr = new XMLHttpRequest();

                xhr.open('PUT', reqURL, false);
                xhr.setRequestHeader('Authorization', `Basic ${localStorage.getItem('basicAuthToken')}`);
                xhr.send(formData);

                if (xhr.status === 200) {
                    alert('User was updated successfully');
                    // window.location.reload();
                    const reqUrl = new URL(`${API_URL}/users/login`);
                    const request = new XMLHttpRequest();

                    reqUrl.searchParams.append('username', user.username);
                    if (formData.get('password').length !== 0) {
                        reqUrl.searchParams.append('password', formData.get('password').toString());
                    } else {
                        const headerToDecode = atob(localStorage.getItem('basicAuthToken'));
                        const decodedPass = headerToDecode.split(':').pop();
                        formData.set('password', null);
                        reqUrl.searchParams.append('password', decodedPass);
                    }

                    request.open('GET', reqUrl.toString(), false);
                    request.setRequestHeader('Content-Type', 'application/json');
                    request.send();
                    console.log(request.response);

                    const data = JSON.parse(request.response);
                    localStorage.setItem('userData', JSON.stringify((data.userData)));
                    localStorage.setItem('basicAuthToken', data.authHeader);
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
        if (window.location.toString().includes('user-list.html')) {
            const reqURL = new URL(`${API_URL}/users`);

            const request = new XMLHttpRequest();
            request.open('GET', reqURL.toString(), false);
            request.setRequestHeader('Authorization', 'Basic ' + localStorage.getItem('basicAuthToken'));
            request.send();
            console.log(request.response);

            const userList = JSON.parse(request.response);
            console.log(userList.length);

            const mainContainer = document.getElementById('user-list');
            for (let i = 0; i < userList.length; ++i) {
                const userInfo = document.createElement('div');
                userInfo.className = 'ann-info';
                mainContainer.appendChild(userInfo);

                userInfo.innerHTML = `<span class="info-row"><img class="ann-photo" src="${CLOUDINARY_URL}${userList[i].img_name}" alt=""></span>`;
                userInfo.innerHTML
                    += `<span class="info-row">Name: ${userList[i].firstname} ${userList[i].lastname} </span>`
                    + `<span class="info-row">Email: ${userList[i].email} </span>` + `<span class="info-row">Location: ${userList[i].location} </span>`
                    + `<span class="info-row">Role: ${userList[i].role}</span>`;
            }
        }
    } else {
        window.location.replace('login.html');
    }
});
