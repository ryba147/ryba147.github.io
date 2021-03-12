const myUrl = "https://flask-lpnu.herokuapp.com/user/";

window.addEventListener("load", function () {
    function sendData() {
        const xhr = new XMLHttpRequest();
        const FD = new FormData(form);

        xhr.addEventListener("load", function (event) {
            alert(event.target.responseText);

        });

        // Define what happens in case of error
        xhr.addEventListener("error", function (event) {
            alert('Oops! Something went wrong.');
        });

        xhr.open("POST", myUrl);
        // xhr.setRequestHeader('Content-Type', 'application/json');

        // xhr.send(JSON.stringify({
        //     "username": "taras1",
        //     "email": "taras1@taras.com",
        //     "firstname": "Taras",
        //     "lastname": "Vilinskyi",
        //     "password": "admin1",
        //     "location": 123
        // }));

        xhr.send(FD);
    }

    const form = document.getElementById("f_id");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        sendData();
    });
});