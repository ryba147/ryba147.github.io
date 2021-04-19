import { API_URL, CLOUDINARY_URL } from './constants.js';

window.addEventListener('load', () => {
    console.log(localStorage.getItem('basicAuthToken'));
    console.log(JSON.parse(localStorage.getItem('userData')));

    const user = JSON.parse(localStorage.getItem('userData'));
    let userAnnouncementsNo = null;

    if (user) {
        if (window.location.toString().includes('index.html')) {
            window.location.replace('logged.html');
        }

        document.getElementById('navbar-name').innerHTML = user.username;
        if (user.img_name != null) {
            document.getElementById('navbar-avatar').src = `${CLOUDINARY_URL}${user.img_name}`;
        }

        if (window.location.toString().includes('user-page.html')) {
            if (userAnnouncementsNo === null) {
                const reqURL = new URL(`${API_URL}/announcements`);
                const request = new XMLHttpRequest();
                request.open('GET', reqURL, false);
                request.send();
                userAnnouncementsNo = JSON.parse(request.response).length;
            }

            document.getElementById('full-name').innerHTML = user.firstname + ' ' + user.lastname;
            if (user.img_name != null) {
                document.getElementById('user-photo').src = `${CLOUDINARY_URL}${user.img_name}`;
            }
            document.getElementById('email').innerHTML = user.email;
            document.getElementById('user-anno-count').innerHTML = userAnnouncementsNo;
            document.getElementById('location').innerHTML = user.location;

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
    } else if (window.location.toString().includes('index.html')) {
    } else {
        window.location.replace('login.html');
    }
});
