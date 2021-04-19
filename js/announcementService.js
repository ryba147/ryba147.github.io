import { API_URL } from './constants.js';
import { CLOUDINARY_URL } from './constants.js';

if (window.location.toString().includes('my-announcements.html')) {
    window.addEventListener('load', () => {
        const reqURL = new URL(`${API_URL}/announcements`);

        var request = new XMLHttpRequest();

        request.open('GET', reqURL, false);
        request.send();
        console.log(request.response);

        var announcements = JSON.parse(request.response);

        var mainContainer = document.getElementById('anno-container');

        for (let i = 0; i < announcements.length; ++i) {
            var div = document.createElement('div');
            div.className = 'ann-container';
            // var div = document.querySelector('div.ann-container');

            div.innerHTML = 'Name: ' + announcements[i].title + ' ' + announcements[i].description;
            div.innerHTML = `<img src="${CLOUDINARY_URL}${announcements[i].img_name}" alt="">`;
            mainContainer.appendChild(div);
        }
    });
}

if (window.location.toString().includes('add-announcement.html')) {
    const fileSelector = document.getElementById('file-selector');
    fileSelector.addEventListener('change', (event) => {
        const fileList = event.target.files;
        const output = document.getElementById('file-info');
        output.innerHTML = fileList[0].name;
    });

    document.getElementById('add-announcement').addEventListener('click', () => {

        const reqURL = `${API_URL}/announcements`;
        const formData = new FormData(document.forms.announcement);
        const authorId = JSON.parse(localStorage.getItem('userData')).id;
        formData.append('author_id', authorId);

        const xhr = new XMLHttpRequest();
        xhr.open('POST', reqURL, false);
        xhr.setRequestHeader('Authorization', 'Basic ' + localStorage.getItem('basicAuthToken'));
        xhr.send(formData);

        console.log(xhr.response);
        alert('event was added');
    });
}
