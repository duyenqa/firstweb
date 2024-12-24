function showHidePassword() {
    let password = document.getElementById("password");

    if (password.type === "password") {
        password.type = "text";
    } else {
        password.type = "password";
    }
}

function onSubmit() {
    const email = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const emailValid = "demouser@example.com";
    const passwordValid = "Test@user1";

    if (!email || !password) {
        alert('Required field');
        return;
    }

    if (!isValidEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    if (!isValidPassword(password)) {
        alert('Password must be at least 10 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character.');
        return;
    }

    if (email === emailValid && password === passwordValid) {
        localStorage.setItem('isLoggedIn', 'true'); // Save login in localStorage
        window.location.href = "dashboard.html"; // Redirect to dashboard
    } else if ((isValidEmail(email) && email != "demouser@example.com") || password === passwordValid) {
        alert("This email account doesn't exist");
    }else{
        alert("Invalid email or password. Please try again!");
    }
}

function isValidEmail(email) {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
}

function isValidPassword(password) {
    if (password.length < 10 || password.length > 10) {
        return false;
    }

    // Check for at least one uppercase letter
    const hasUpperCase = /[A-Z]/.test(password);

    // Check for at least one lowercase letter
    const hasLowerCase = /[a-z]/.test(password);

    // Check for at least one digit
    const hasDigit = /\d/.test(password);

    // Check for at least one special character
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar;
}

function onCopyUserName() {
    let copyText = document.getElementById("valueUsername");
    let notifyMessage = document.getElementById("notifyUsername");

    copyText.select();
    copyText.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(copyText.value);

    notifyMessage.innerHTML = "copied username";
}

function onCopyUserPassword() {
    let copyText = document.getElementById("valuePassword");
    let notifyMessage = document.getElementById("notifyPassword");

    copyText.select();
    copyText.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(copyText.value);

    notifyMessage.innerHTML = "copied password";
}

const login = document.querySelector(".form-login");
const loginSMS = document.querySelector(".form-otp");

function onLoginSMS() {
    loginSMS.classList.add("active");
    login.classList.remove("active");
}

function onLogin(){
    login.classList.add("active");
    loginSMS.classList.remove("active");
}


function validDigit(number) {
    number.value = number.value.replace(/[^0-9]/g, '');
}

function changeInput(inputValue, index){
   const inputs = document.querySelectorAll('.inputOtp');
   if (inputValue.value != "") {
    inputs[index + 1]?.focus();
   } else {
    inputs[index - 1]?.focus();
   }
}

function randomOTP() {
    const numbers = "0123456789";
    let newOTP = "";
    for (let i = 0; i < 6; i++) {
        const random = Math.floor(Math.random() * 10);
        newOTP += numbers[random];
    }
    return newOTP;
}

let validOtp = randomOTP();
document.getElementById("oneTimeOTP").innerHTML = `${validOtp}`;

function getValueOTP() {
    let otpList = " ";

    document.querySelectorAll('.inputOtp').forEach((number) => {
        let newValue = number.value;
        otpList += newValue;
    })
    
    if (otpList.trim() == validOtp.trim()) {
        console.log(typeof(otpList) == typeof(validOtp));
        localStorage.setItem('isLoggedIn', 'true'); // Save login in localStorage
        window.location.href = "dashboard.html"; // Redirect to dashboard
    }else{
        alert("OTP invalid!");
    }
    
}

