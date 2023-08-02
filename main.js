//color
let colorDark = "000103";
let colorMid = "333138";
let colorLight = "515052";
let colorWhite = "FFFFFA";
let colorError = "FF312E";

// asset
let pathImageO = "./assets/google_fonts__radio_button_unchecked_FILL0_wght400_GRAD0_opsz48.png"
let pathImageX = "./assets/google_fonts__cancel_FILL0_wght400_GRAD0_opsz48.png"
let pathImageY = "./assets/google_fonts__check_circle_FILL0_wght400_GRAD0_opsz48.png"

//init
let valid = false;
let inputPass = ""
const imgO = document.createElement("img");
imgO.src = pathImageO;

//check
function checkEmail (value) {
    return value.match(/.*\@.*\.[a-z]{3}/);
}
function checkCountry (value) {
    return value.match(/[a-z]*/);
}
function checkZipCode (value) {
    return value.match(/^\d{5}/);
}
function checkPassword (value) {
    return true;
}
function checkPasswordConfirm (value) {
    return value == inputPass;
}

//validate
function validateEmail (value) {
    if (checkEmail(value))
    {
        // :valid
        console.log("email confirm");
        inputEmail.setCustomValidity("");
        // image
        while(inputEmailMark.firstChild) {inputEmailMark.removeChild(inputEmailMark.firstChild);}
        const img = document.createElement("img");
        img.src = pathImageY;
        inputEmailMark.appendChild(img);
    }
    else
    {
        // :valid
        console.log("invalid email");
        inputEmail.setCustomValidity("invalid");
        // image
        while (inputEmailMark.firstChild) {inputEmailMark.removeChild(inputEmailMark.firstChild);}
        const img = document.createElement("img");
        img.src = pathImageX;
        inputEmailMark.appendChild(img);
    }
}
function validateCountry(value) {
    if (checkCountry(value))
    {
        // :valid
        console.log("country confirm");
        inputCountry.setCustomValidity("");
        // image
        while (inputCountryMark.firstChild) {inputCountryMark.removeChild(inputCountryMark.firstChild);}
        const img = document.createElement("img");
        img.src = pathImageY;
        inputCountryMark.appendChild(img);
    }
    else
    {
        // :valid
        console.log("invalid zip");
        inputCountry.setCustomValidity("invalid");
        // image
        while (inputCountryMark.firstChild) {inputCountryMark.removeChild(inputCountryMark.firstChild);}
        const img = document.createElement("img");
        img.src = pathImageY;
        inputCountryMark.appendChild(img);
    }
}
function validateZipCode (value) {
    if (checkZipCode(value))
    {
        // :valid
        console.log("zip confirm");
        inputZipCode.setCustomValidity("");
        // image
        while (inputZipCodeMark.firstChild) {inputZipCodeMark.removeChild(inputZipCodeMark.firstChild);}
        const img = document.createElement("img");
        img.src = pathImageY;
        inputZipCodeMark.appendChild(img);
    }
    else
    {
        // :valid
        console.log("invalid zip");
        inputZipCode.setCustomValidity("invalid");
        // image
        while (inputZipCodeMark.firstChild) {inputZipCodeMark.removeChild(inputZipCodeMark.firstChild);}
        const img = document.createElement("img");
        img.src = pathImageX;
        inputZipCodeMark.appendChild(img);
    }
}
function validatePasswordConfirm (value)
{
    if (checkPasswordConfirm(value))
    {
        // :valid
        console.log("pass confirm");
        inputPassConfirm.setCustomValidity("");
        // image
        while(inputPassConfirmMark.firstChild) {inputPassConfirmMark.removeChild(inputPassConfirmMark.firstChild);}
        const img = document.createElement("img");
        img.src = pathImageY;
        inputPassConfirmMark.appendChild(img);
    }
    else
    {
        // :valid
        console.log("invalid pass confirm");
        inputPassConfirm.setCustomValidity("invalid");
        // image
        while(inputPassConfirmMark.firstChild) {inputPassConfirmMark.removeChild(inputPassConfirmMark.firstChild);}
        const img = document.createElement("img");
        img.src = pathImageX;
        inputPassConfirmMark.appendChild(img);
    }
}
// email
const inputEmail = document.getElementById("inputEmail")
const inputEmailMark = document.getElementById("inputEmailMark")
inputEmail.addEventListener("focusout", (e)=> { validateEmail(e.target.value); })
// country
const inputCountry = document.getElementById("inputCountry");
const inputCountryMark = document.getElementById("inputCountryMark");
inputCountry.addEventListener("focusout", (e)=> {validateCountry(e.target.value);})
// zipcode
const inputZipCode = document.getElementById("inputZipCode");
const inputZipCodeMark = document.getElementById("inputZipCodeMark");
inputZipCode.addEventListener("focusout", (e)=> { validateZipCode(e.target.value); })
// password
document.getElementById("inputPassword").addEventListener("focusout", (e)=> {
    inputPass = e.target.value;
})
// password confirmation
const inputPassConfirm = document.getElementById("inputPasswordConfirmation");
const inputPassConfirmMark = document.getElementById("inputPasswordConfirmationMark")
inputPassConfirm.addEventListener("focusout", (e)=> { validatePasswordConfirm(e.target.value); })
const submitButton = document.getElementById("submitButton");
submitButton.addEventListener("click", ()=> {
    if (valid)
    {

    }
    else
    {
        alert("Errors in form");
    }
})