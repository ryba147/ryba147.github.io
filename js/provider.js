window.addEventListener('load', function() {
    document.getElementById("name").innerHTML = JSON.parse(localStorage.getItem("user"))['username'];
    document.getElementById("full-name").innerHTML =
        JSON.parse(localStorage.getItem("user")).firstname + " " + JSON.parse(localStorage.getItem("user")).lastname;

    const b = document.getElementById("b");

    if (b) {
        b.onclick = function logout() {
            localStorage.removeItem("user");
            location.href = "login.html";
        }
    }


});
