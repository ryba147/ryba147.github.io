import { API_URL } from './constants.js';
import { CLOUDINARY_URL } from './constants.js';

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
