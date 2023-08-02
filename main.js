let inputPass = ""

function validateEmail (value) {
    return value.match("[a-z]*[A-Z]*\.[a-z]");
}
function validateCountry (country) {
    return value.match("[a-z]*[A-Z]*");
}
function validateZipCode (value) {
    return value.match("\d\d\d\d\d\d");
}
function validatePassword (value) {
    return value == inputPass;
}


// main ()

document.getElementById("inputEmail").addEventListener("exit", (e)=> {
    validateEmail(e.target.value);
})
document.getElementById("inputCountry").addEventListener("exit", (e)=> {
    validateCountry(e.target.value);
})
document.getElementById("inputZipCode").addEventListener("exit", (e)=> {
    validateZipCode(e.target.value);
})
document.getElementById("inputPassword").addEventListener("exit", (e)=> {
    inputPass = e.target.value;
})
document.getElementById("inputPasswordConfirmation").addEventListener("exit", (e)=> {
    validatePassword(e.target.value);
})