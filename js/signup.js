var url = "https://flask-lpnu.herokuapp.com/user/";
var datatype = 'jsonp';

$(document).ready(function () {
    $('form').on('submit', function (event) {
        $.ajax({
            url: "https://flask-lpnu.herokuapp.com/user/",
            type: "POST",
            data:
                $('form').serialize(),
                // JSON.stringify({
                //     "username": "taras1",
                //     "email": "taras1@taras.com",
                //     "firstname": "Taras",
                //     "lastname": "Vilinskyi",
                //     "password": "admin1",
                //     "location": 123
                // }),
            contentType: "application/json; charset=utf-8",
            datatype: datatype,
        }).done(function (data) {
            console.log(data);
            if (!data.error) {
                alert("Denied");
            } else {
                alert("success")
            }
        });
        event.preventDefault();
    });
});