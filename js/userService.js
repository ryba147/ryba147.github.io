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
