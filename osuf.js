console.log ("hello world");

const passwordBox = document.getElementById("user_password_box")
const passwordField = document.getElementById("user_password")
const confirmedPasswordField = document.getElementById("password_confirmation")

confirmedPasswordField.onfocus = function() {
    // const password = document.getElementById("user_password")
    // console.log(password);
    // const confirmedPassword = document.getElementById("password_confirmation")
    // console.log(confirmedPassword);
    // console.log ("ps");
    var form = document.getElementById("account_form");
    password = form[form.length-3].value;
    passwordConfirmation = form[form.length-2].value;
    console.log(password);
    console.log(passwordConfirmation);
    if (password != passwordConfirmation)
    {
        passwordBox.classList.add("error");
        console.log("hello hello");
    }
    else{
        passwordBox.classList.remove("error");
        console.log("goodbye");
    }
}