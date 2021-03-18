window.addEventListener('load', function() {
    var password = document.getElementById("password");
    var confirmPassword = document.getElementById("confirm_password");

    password.onchange = ConfirmPassword;
    confirmPassword.onkeyup = ConfirmPassword;

    function ConfirmPassword() {
        confirmPassword.setCustomValidity("");
        if (password.value !== confirmPassword.value) {
            confirmPassword.setCustomValidity("Password does not match.");
        }
    }
});