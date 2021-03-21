window.addEventListener('load', function() {
    var password = document.getElementById("password-input");
    var confirmPassword = document.getElementById("confirm-password");

    password.onchange = ConfirmPassword;
    confirmPassword.onkeyup = ConfirmPassword;

    function ConfirmPassword() {
        confirmPassword.setCustomValidity("");
        if (password.value !== confirmPassword.value) {
            confirmPassword.setCustomValidity("Password does not match.");
        }
    }
});