window.addEventListener('load', () => {
    const password = document.getElementById('password-input');
    const confPassword = document.getElementById('confirm-password');

    function confirmPassword() {
        confPassword.setCustomValidity('');
        if (password.value !== confPassword.value) {
            confPassword.setCustomValidity('Password does not match.');
        }
    }

    password.onchange = confirmPassword;
    confPassword.onkeyup = confirmPassword;
});
