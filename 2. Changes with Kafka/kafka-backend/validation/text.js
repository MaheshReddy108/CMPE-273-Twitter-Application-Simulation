const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateTextInput(data) {
  const errors = {};
  const text = data;
  text.textContent = !isEmpty(data.textContent) ? data.textContent : "";

  if (Validator.isEmpty(data.textContent)) {
    errors.text = "Type in something";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
