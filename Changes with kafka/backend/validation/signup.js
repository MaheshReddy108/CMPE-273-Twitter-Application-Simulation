const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateSignup(data) {
  const errors = {};
  console.log("data.....", data);

  data.username = !isEmpty(data.username) ? data.username : "";
  data.first_name = !isEmpty(data.first_name) ? data.first_name : "";
  data.last_name = !isEmpty(data.last_name) ? data.last_name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isLength(data.username, { min: 2, max: 30 })) {
    errors.username = "User Name must be between 2 and 30 characters";
  }
  if (Validator.isEmpty(data.username)) {
    errors.username = "UserName field is required";
  }
  if (Validator.isEmpty(data.first_name)) {
    errors.first_name = "First Name field is required";
  }
  if (Validator.isEmpty(data.last_name)) {
    errors.last_name = "Last Name field is required";
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email field is Invalid";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
