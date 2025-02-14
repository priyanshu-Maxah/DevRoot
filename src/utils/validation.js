const validator = require("validator");

const validateSingUpdate = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name is not Valid");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Enter a valid email");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Enter a strong password");
  }
};
const validateEditProfileData = (req) => {
  const allowedEditFiled = [
    "firstName",
    "lastName",
    "emailId",
    "avatar",
    "about",
    "skills",
    "age",
    "gender",
  ];

  const isEditAllowed = Object.keys(req.body).every((filed) =>
    allowedEditFiled.includes(filed)
  );

  return isEditAllowed;
};

module.exports = { validateSingUpdate, validateEditProfileData };
