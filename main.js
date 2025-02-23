
const submitButton = document.querySelector("#submit-button");
const email = document.querySelector("#email");
const country = document.querySelector("#country");
const postalCode = document.querySelector("#postal-code");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm-password");


submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    checkAllFields("input");
    if (!checkCountrySelection()) {
        console.error("Country is not selected!")
    };
    console.info("All is good. Thanks for submitting the form!");
    
})

function checkAllFields(selectorToCheck) {
    const allTypeElems = document.querySelectorAll(selectorToCheck);
    allTypeElems.forEach((elem) => {
        if (!elem.validity.valid) {
            console.error(`"${elem.value}" value for ${elem.id} is not valid, please check the form`);
            showError(elem);
            return;
        }
    })
    return;
}

function checkCountrySelection() {
    if (country.value === "") {
        country.setCustomValidity("Please select a country.");
        showError(country);
        return false;
    } else {
        country.setCustomValidity("");
        return true;
    }
}
function showError(elem) {
    const errorSpan = document.querySelector(`#${elem.id} + span.error`);

    if (elem.value === "") {
        errorSpan.className = "error";
        return;
    }
    if (!elem.validity.valid) {
        errorSpan.textContent = elem.validationMessage;
        errorSpan.className = "error active"; 
    } else {
        errorSpan.className = "error";  
        errorSpan.textContent = "";
    }
}


function validateEmail(emailElement) {

    if (emailElement.value.length < 10) {
        emailElement.setCustomValidity("The email must be longer than 10 chars");
    } else if (!emailElement.value.endsWith("@kirill.com")) {
        emailElement.setCustomValidity("The email must have @kirill.com domain.");
    } else {
        emailElement.setCustomValidity("");
    }

}

function validatePostalCode(postalCodeElement) {
    if (postalCodeElement.value.length < 6) {
        postalCodeElement.setCustomValidity("The postal code must be longer than 6 chars");
    } else if (!postalCodeElement.value.startsWith("CODE-")) {
        postalCodeElement.setCustomValidity("The postal code must starts with CODE-.");
    } else {
        postalCodeElement.setCustomValidity("");
    }

}

function validatePassword(passElem) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    if (passElem.value.length < 8) {
        passElem.setCustomValidity("The password must be longer than 8 chars");
    } else if (!regex.test(passElem.value)) {
        passElem.setCustomValidity("The password must contain at least one lowercase letter, one uppercase letter, and one digit.");
    } else {
        passElem.setCustomValidity("");
    }

}

function validateConfirmPassword(confPassElem, passElem) {

    if (!passElem.value) {
        confPassElem.setCustomValidity("Please fill in password field first");
    } else if (passElem.value !== confPassElem.value) {
        confPassElem.setCustomValidity("Passwords don't match.");
    } else {
        confPassElem.setCustomValidity("");
    }

}


function validateInputElement(elem) {
    switch(elem.id) {
        case "email":
            validateEmail(elem);
            break;
        case "postal-code":
            validatePostalCode(elem);
            break;
        case "password":
            validatePassword(elem);
            break;
        case "confirm-password":
            validateConfirmPassword(elem, password);
            break;
        default:
            console.log("No such input element");
            break;
    }
}


const handleInput = (event) => {

    validateInputElement(event.target);
    showError(event.target);
}

email.addEventListener("input", handleInput);
postalCode.addEventListener("input", handleInput);
password.addEventListener('input', handleInput);
confirmPassword.addEventListener("input", handleInput);
country.addEventListener("change", checkCountrySelection);