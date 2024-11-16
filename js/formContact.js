function showAlert() {
    let firstName = document.getElementById("fname").value;
    let lastName = document.getElementById("lname").value;
    let country = document.getElementById("country").value;
    let description = document.getElementById("description").value;
    let gender = "";
    let genderRadioButtons = document.getElementsByName("gender");
    let colors = "";
    let colorCheckboxs = document.getElementsByName("color");

    //radios
    for (let i = 0; i < genderRadioButtons.length; i++) {
        if (genderRadioButtons[i].checked) {
            gender = genderRadioButtons[i].value;
            break; 
        }
    }

    //checkboxs
    for (let i = 0; i < colorCheckboxs.length; i++) {
        if (colorCheckboxs[i].checked) {
            colors += colorCheckboxs[i].value + " ";
        }
    }

    let message = "Full Name: " + lastName + " " + firstName + "\nGender: " + gender  + "\nLive in: " + country + "\nDescription: " + description + "\nColors: " + colors;

    confirm(message);
}
