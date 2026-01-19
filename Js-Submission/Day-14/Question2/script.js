const form = document.getElementById("form");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const age = document.getElementById("age");
const button = document.querySelector("button");


function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPassword(value) {
  return /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(value);
}


function setError(input, message) {
  input.classList.add("invalid");
  input.classList.remove("valid");
  input.nextElementSibling.innerText = message;
}

function setSuccess(input) {
  input.classList.add("valid");
  input.classList.remove("invalid");
  input.nextElementSibling.innerText = "";
}


email.addEventListener("input", () => {
  if (!isValidEmail(email.value)) {
    setError(email, "Enter a valid email address");
  } else {
    setSuccess(email);
  }
  checkForm();
});


password.addEventListener("input", () => {
  if (!isValidPassword(password.value)) {
    setError(
      password,
      "Min 8 chars, 1 uppercase, 1 number, 1 special char"
    );
  } else {
    setSuccess(password);
  }
  checkForm();
});


confirmPassword.addEventListener("input", () => {
  if (confirmPassword.value !== password.value || confirmPassword.value === "") {
    setError(confirmPassword, "Passwords must match");
  } else {
    setSuccess(confirmPassword);
  }
  checkForm();
});


age.addEventListener("input", () => {
  const value = Number(age.value);
  if (value < 18 || value > 100) {
    setError(age, "Age must be between 18 and 100");
  } else {
    setSuccess(age);
  }
  checkForm();
});


function checkForm() {
  const allValid =
    email.classList.contains("valid") &&
    password.classList.contains("valid") &&
    confirmPassword.classList.contains("valid") &&
    age.classList.contains("valid");

  button.disabled = !allValid;
}


form.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Form submitted successfully!");
});
