function showAlert() {
    let firstName = document.getElementById("fname").value;
    let lastName = document.getElementById("lname").value;
    let email = document.getElementById("email").value;
    let country = document.getElementById("country").value;
    let description = document.getElementById("description").value;
    let createdDate = document.getElementById("datepicker").value;
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

    let message = "Full Name: " + lastName + " " + firstName + "\nEmail: " + email + "\nGender: " + gender  + "\nLive in: " + country + "\nDescription: " + description + "\nColors: " + colors + "\nCreated date: " + createdDate;

    confirm(message);
    
    //delete data of form after click submit
    document.getElementById("fname").value = " ";
    document.getElementById("lname").value = " ";
    document.getElementById("email").value = " ";
    document.getElementById("country").value = " ";
    document.getElementById("description").value = " ";
    document.getElementById("datepicker").value = " ";

    for (let i = 0; i < genderRadioButtons.length; i++) {
        genderRadioButtons[i].checked = false;
    }
    gender = " ";

    for (let i = 0; i < colorCheckboxs.length; i++) {
        colorCheckboxs[i].checked = false;
    }
    colors = "";

}
