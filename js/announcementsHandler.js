window.addEventListener('load', function () {
    // const apiUrl = "https://flask-lpnu.herokuapp.com/user/";
    const apiUrl = "http://127.0.0.1:5000/announcements";

    var request = new XMLHttpRequest();

    request.open("GET", apiUrl, false);
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
