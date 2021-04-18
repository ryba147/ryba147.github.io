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
    } else {
        window.location.replace('login.html');
    }
});
