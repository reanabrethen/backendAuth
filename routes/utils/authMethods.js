function isEmpty(str) {
    return str.length === 0
}


function isStrongPassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSpecialChars = password.match(/[!@#$%^&*()\-,.?><]/g) || [];
    if(password.length >= minLength && hasUpperCase && hasLowerCase && hasSpecialChars.length){
        return true
    }else{
        return false
    }
}



function isEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email)
}


function isAlpha(str) {
    const alphaRegex = /^[a-zA-Z]+$/;
    return alphaRegex.test(str);
}


function isAlphanumeric(str) {
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    return alphanumericRegex.test(str);
}

module.exports = {
    isEmail,
    isEmpty,
    isAlpha,
    isAlphanumeric, 
    isStrongPassword
}