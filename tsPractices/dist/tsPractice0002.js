"use strict";
const loginForm = document.getElementById('loginForm');
const cancelBtn = document.getElementById('cancelBtn');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
function clearFields() {
    if (!usernameInput || !passwordInput) {
        return;
    }
    usernameInput.value = '';
    passwordInput.value = '';
    usernameInput.focus();
}
function handleConfirm(event) {
    event.preventDefault();
    if (!usernameInput || !passwordInput) {
        return;
    }
    const usuario = usernameInput.value;
    const contrasena = passwordInput.value;
    alert(`Usuario: ${usuario}\nContraseña: ${contrasena}`);
}
if (loginForm) {
    loginForm.addEventListener('submit', handleConfirm);
}
if (cancelBtn) {
    cancelBtn.addEventListener('click', clearFields);
}
console.log("is a message loaded from a new change");
//# sourceMappingURL=tsPractice0002.js.map