import { CLOUDINARY_URL } from './constants.js';

window.addEventListener('load', () => {
    console.log(localStorage.getItem('basicAuthToken'));
    console.log(JSON.parse(localStorage.getItem('userData')));

    const user = JSON.parse(localStorage.getItem('userData'));

    if (user) {
        document.getElementById('navbar-name').innerHTML = user.username;
        if (user.img_name != null) {
            document.getElementById('navbar-avatar').src = `${CLOUDINARY_URL}${user.img_name}`;
        }

        if (window.location.toString().includes('user-page.html')) {
            document.getElementById('full-name').innerHTML = user.firstname + ' ' + user.lastname;
            if (user.img_name != null) {
                document.getElementById('user-photo').src = `${CLOUDINARY_URL}${user.img_name}`;
            }

            const logOutBut = document.getElementById('logout');
            if (logOutBut) {
                logOutBut.onclick = function logout() {
                    localStorage.removeItem('userData');
                    localStorage.removeItem('basicAuthToken');
                    window.location.href = 'login.html';
                };
            }
        }

        if (window.location.toString().includes('edit-profile.html')) {
            if (user.img_name !== null) {
                document.getElementById('editor-avatar').src = `${CLOUDINARY_URL}${user.img_name}`;
            }
            document.getElementById('firstname').value = user.firstname;
            document.getElementById('lastname').value = user.lastname;
            document.getElementById('email').value = user.email;
            document.getElementById('location').value = user.location;

            const fileSelector = document.getElementById('file-selector');
            fileSelector.addEventListener('change', (event) => {
                const fileList = event.target.files;
                const output = document.getElementById('file-info');
                output.innerHTML = fileList[0].name;
            });
        }
    } else {
        window.location.replace('login.html');
    }
});
