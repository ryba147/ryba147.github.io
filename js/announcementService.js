import { API_URL } from './constants.js';
import { CLOUDINARY_URL } from './constants.js';

window.addEventListener('load', () => {
    const user = JSON.parse(localStorage.getItem('userData'));
    if (user) {
        if (window.location.toString().includes('logged.html')
            || window.location.toString().includes('my-announcements.html')) {
            let reqURL = new URL(`${API_URL}/announcements`);

            if (window.location.toString().includes('my-announcements.html')) {
                reqURL = new URL(`${API_URL}/announcements/filter_by`);
                reqURL.searchParams.append('author_id', user.id);
            }

            const request = new XMLHttpRequest();
            request.open('GET', reqURL.toString(), false);
            request.setRequestHeader('Authorization', 'Basic ' + localStorage.getItem('basicAuthToken'));
            request.send();
            console.log(request.response);

            const announcements = JSON.parse(request.response);

            const mainContainer = document.getElementById('anno-container');
            for (let i = 0; i < announcements.length; ++i) {
                const container = document.createElement('div');
                container.className = 'ann-container';

                container.innerHTML = 'Name: ' + announcements[i].title + ' ' + announcements[i].description;
                container.innerHTML = `<img src="${CLOUDINARY_URL}${announcements[i].img_name}" alt="">`;
                mainContainer.appendChild(container);

                const annTitle = document.createElement('div');
                annTitle.className = 'ann-name';
                container.appendChild(annTitle).innerHTML = announcements[i].title;

                const insideDate = document.createElement('div');
                insideDate.className = 'ann-date';
                container.appendChild(insideDate).innerHTML = announcements[i].event_date;

                const annDescription = document.createElement('div');
                annDescription.className = 'ann-description';
                container.appendChild(annDescription).innerHTML = announcements[i].description;
            }
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
    }
});
