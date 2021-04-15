import {API_URL} from "./constants.js";

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

window.addEventListener('load', function () {
    function addAnnouncement() {
        const reqURL = "http://127.0.0.1:5000/announcements";

        console.log("here");

        var title = encodeURIComponent(document.getElementById("titleInput").value);
        var description = encodeURIComponent(document.getElementById("descriptionInput").value);
        var pubDate = Date.now();


        var radios = document.getElementsByName("announcementTypeChoice");
        for (let i = 0, length = radios.length; i < length; ++i) {
            if (radios[i].checked) {
                // alert(radios[i].value);
                var announcementType = radios[i].value;

                break; // якщо знайшли обране - виходимо з циклу
            }
        }

        var author_id = JSON.parse(localStorage.getItem("user"))['id'];

        var request = new XMLHttpRequest();
        request.open("POST", reqURL, false);
        // request.setRequestHeader('Authorization', 'Basic ' + btoa(unescape(encodeURIComponent("admin" + ':' + "YOUR_PASSWORD"))))
        request.setRequestHeader('Authorization', 'Basic YWRtaW46YWRtaW4=')
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({
            "author_id": author_id,
            "title": title,
            "description": description,
            "pub_date": pubDate,
            "type": announcementType
        }));
        console.log(request.response);
    }
});