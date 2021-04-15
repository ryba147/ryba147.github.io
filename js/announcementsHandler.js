import { API_URL } from "./constants.js";

/*
window.addEventListener('load', function () {
    const reqURL = new URL(API_URL + "/announcements");

    var request = new XMLHttpRequest();

    request.open("GET", reqURL, false);
    request.send();
    console.log(request.response);

    // document.getElementById("anno").innerHTML = request.response;


    var announcements = JSON.parse(request.response);

    var mainContainer = document.getElementById("annoContainer");

    for (let i = 0; i < announcements.length; i++) {
        var div = document.createElement("div");
        div.className = "ann-container";
        // var div = document.querySelector('div.ann-container');

        div.innerHTML = 'Name: ' + announcements[i]['name'] + ' ' + announcements[i].description;
        mainContainer.appendChild(div);
    }
});
*/

window.addEventListener('load', () => {
    function addAnnouncement() {
        const reqURL = `${API_URL}/announcements`;

        console.log('here');

        const title = encodeURIComponent(document.getElementById('titleInput').value);
        const description = encodeURIComponent(document.getElementById('descriptionInput').value);
        const pubDate = Date.now();
        const radios = document.getElementsByName('announcementTypeChoice');

        const radiosLength = radios.length;
        let announcementType = null;
        for (let i = 0; i < radiosLength; i += 1) {
            if (radios[i].checked) {
                announcementType = radios[i].value;
                break;
            }
        }

        const authorId = JSON.parse(localStorage.getItem('userData')).id;

        const request = new XMLHttpRequest();
        request.open('POST', reqURL, false);
        request.setRequestHeader('Authorization', 'Basic ' + localStorage.getItem('basicAuthToken'));
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({
            author_id: authorId,
            title: title,
            description: description,
            pub_date: pubDate,
            type: announcementType,
        }));
        console.log(request.response);
    }
});
