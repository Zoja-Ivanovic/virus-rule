const form = document.getElementById("contactForm");
const successBox = document.getElementById("formSuccess");

const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const message = document.getElementById("message");

const fullNameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");

const letterEmailError = document.getElementById("letterEmailError");
const letterFormSuccess = document.getElementById("letterFormSuccess");

// Newsletter form ID's

const letterForm = document.getElementById("letterForm");
const letterEmail = document.getElementById("letterEmail");
const letterSubmit = document.getElementById("letterSubmit");
//

const emailPattern = /^\S+@\S+\.\S+$/;
const namePattern = /^[A-Za-z ]+$/;

function setError(field, errorEl, msg) {
  field.classList.add("error");
  field.classList.remove("success");
  errorEl.textContent = msg;
}
function setSuccess(field, errorEl) {
  field.classList.remove("error");
  field.classList.add("success");
  errorEl.textContent = "";
}
function clearSuccessMessage() {
  successBox.textContent = "";
}

form.addEventListener("submit", (e)=>{
    e.preventDefault()
    clearSuccessMessage();
    let ok = true;
    const n = fullName.value.trim();
    const em = email.value.trim();
    const msg = message.value.trim();

    if (n.length < 2) {
    setError(fullName, fullNameError, "Name must be at least 2 characters.");
    ok = false;
  } else if (!namePattern.test(n)) {
    setError(fullName, fullNameError, "Use letters and spaces only.");
    ok = false;
  } else {
    setSuccess(fullName, fullNameError);
  }

if (!emailPattern.test(em)) {
    setError(email, emailError, "Please enter a valid email (e.g. you@site.com).");
    ok = false;
  } else {
    setSuccess(email, emailError);
  }

if (msg.length < 10) {
    setError(message, messageError, "Message must be at least 10 characters.");
    ok = false;
  } else {
    setSuccess(message, messageError);
  }

  if (!ok) return;

  // Success state
  successBox.textContent = "Message sent! Thanks for reaching out.";
  form.reset();

  // Clear borders after reset
  [fullName, email, topic, message].forEach((el) => {
    el.classList.remove("error", "success");
  });

})

letterForm.addEventListener("submit", (e)=>{
    e.preventDefault()    
    const em = letterEmail.value.trim();
    let ok = true
    if (!emailPattern.test(em)) {
    setError(letterEmail, letterEmailError, "Please enter a valid email (e.g. you@site.com).");
    ok = false;
  } else {
    setSuccess(letterEmail, letterEmailError);

  }
  if (!ok) return
  letterFormSuccess.content = "Thank you for joining us!"
  letterForm.reset()
})


