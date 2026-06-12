const loginForm = document.getElementById('loginForm') as HTMLFormElement | null;
const cancelBtn = document.getElementById('cancelBtn') as HTMLButtonElement | null;
const usernameInput = document.getElementById('username') as HTMLInputElement | null;
const passwordInput = document.getElementById('password') as HTMLInputElement | null;

function clearFields(): void {
  if (!usernameInput || !passwordInput) {
    return;
  }

  usernameInput.value = '';
  passwordInput.value = '';
  usernameInput.focus();
}

function handleConfirm(event: Event): void {
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

console.log("is a message loaded from a new change")