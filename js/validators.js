window.addEventListener('load', function() {
    var password = document.getElementById("password");
    var confirmPassword = document.getElementById("confirmPassword");

    password.onchange = ConfirmPassword;
    confirmPassword.onkeyup = ConfirmPassword;

    function ConfirmPassword() {
        confirmPassword.setCustomValidity("");
        if (password.value !== confirmPassword.value) {
            confirmPassword.setCustomValidity("Password does not match.");
        }
    }
});