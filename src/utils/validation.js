
//validating email address
function validateEmail(value) {
  let error;
  if (!value) {
    error = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = "Invalid email address";
  }
  return error;
}

//validating phone number
function validatePhone(value) {
  let error;
  if (!value) {
    error = "Required";
  } else if (value.length !== 10) {
    error = "Phone Number must be of 10 digit";
  }
  return error;
}

module.exports = {
  validateEmail,
  validatePhone
};
