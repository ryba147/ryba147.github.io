window.addEventListener('load', function() {
    const apiUrl = "https://flask-lpnu.herokuapp.com/user/";
    // const apiUrl = "http://127.0.0.1:5000/user/";
    var signupForm = document.getElementById("signup-form");

    signupForm.onsubmit = function (event) {
        event.preventDefault();

        var request = new XMLHttpRequest(); // xhr

        var firstName = encodeURIComponent(document.getElementById("firstnameInput").value);
        var lastName = encodeURIComponent(document.getElementById("lastnameInput").value);
        var email = encodeURIComponent(document.getElementById("emailInput").value);
        var username = encodeURIComponent(document.getElementById("usernameInput").value);
        var password = encodeURIComponent(document.getElementById("password").value);

        var radios = document.getElementsByName("roleInput");
        for (let i = 0, length = radios.length; i < length; ++i) {
            if (radios[i].checked) {
                // alert(radios[i].value);
                var userRole = radios[i].value;

                break; // якщо знайшли обране - виходимо з циклу
            }
        }

        request.open("POST", apiUrl, false);

        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({
            "firstname": firstName,
            "lastname": lastName,
            "email": email,
            "username": username,
            "role": userRole,
            "password": password
        }));
        console.log(request.response);

        if (request.status === 201) {
            alert("User created");
            location.href = "/login.html";
        } else if (request.status === 403) {
            alert("User already exists");
            // location.href = "/login.html";
        } else {
            alert("An error occurred while creating user");
        }
    }
});