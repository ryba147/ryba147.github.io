window.addEventListener('load', function() {
    var loginForm = document.getElementById("login-page-form");

    loginForm.onsubmit = function (event) {
        // const apiUrl = new URL("https://flask-lpnu.herokuapp.com/user/login/");
        const apiUrl = new URL("http://127.0.0.1:5000/user/login");

        event.preventDefault();

        var request = new XMLHttpRequest();

        const username = encodeURIComponent(document.getElementById("username-input").value);
        const password = encodeURIComponent(document.getElementById("password-input").value);

        apiUrl.searchParams.append("username", username);
        apiUrl.searchParams.append("password", password);

        request.open("GET", apiUrl.toString(), false);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send();

        console.log(request.response);
        console.log(request.status);

        if (request.status === 200) {
            alert("Login success");
            localStorage
            // localStorage.setItem("username", username);
            // localStorage.setItem("password", password);
            localStorage.setItem("user", request.response);
            location.href = "logged.html";
        }
        else if (request.status === 404) {
            alert("Invalid username or password");
        }
        else  {
            alert("An unexpected error occurred");
        }
    }
});
