function showAlert() {
    let firstName = document.getElementById("fname").value;
    let lastName = document.getElementById("lname").value;
    let country = document.getElementById("country").value;
    let description = document.getElementById("description").value;
    let gender = "";
    let genderRadioButtons = document.getElementsByName("gender");

    for (let i = 0; i < genderRadioButtons.length; i++) {
        if (genderRadioButtons[i].checked) {
            gender = genderRadioButtons[i].value;
            break; 
        }
    }

    let message = "Full Name: " + lastName + " " + firstName + "\nGender: " + gender + "\nLive in: " + country + "\nDescription: " + description;

    confirm(message);
}
