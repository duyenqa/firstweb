function onLogIn() {
    const email = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const emailValid = "demouser@example.com";
    const passwordValid = "Test@user1";

    if (!email || !password) {
        alert('Please fill out both fields.');
        return; 
    }

    if (!isValidEmail(email)) {
        alert('Please enter a valid email address.');
        return; 
    }

    if (!isValidPassword(password)) {
        alert('Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character.');
        return;
    }

    if (email === emailValid && password === passwordValid) {
        console.log("Login successful");
        localStorage.setItem('isLoggedIn', 'true'); // Save login in localStorage
    
        window.location.href = "dashboard.html"; // Redirect to dashboard
    } else {
        alert("Invalid email or password.");
    }
}


function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

function isValidPassword(password) {
    if (password.length < 8) {
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