var url = "https://flask-lpnu.herokuapp.com/user/login/";
var data = {username: "taras", password: "admin"};
var datatype = 'jsonp';

$(document).ready(function () {
    $('form').on('submit', function (event) {
        $.ajax({
            data: {
                username: $('#usernameInput').val(),
                password: $('#passwordInput').val()
            },
            type: 'GET',
            url
        }).done(function (data) {
            if (data.error) {
                alert("Denied");
            }
            else {
                alert("Approved");
            }
        });
        event.preventDefault();
    });
});