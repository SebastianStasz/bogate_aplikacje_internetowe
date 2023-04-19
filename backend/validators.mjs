const validateStringLength = (text, setLength) => {
  if (text.trim().length < setLength)
    return `Tekst powinien mieć conajmniej ${setLength} znaki`;
  else return false;
};
const validateEmail = (email) => {
  if (!email.includes("@") || email.trim().length < 7)
    return "Niepoprawny email";
  else return false;
};
const validateRepeatedString = (text, repeated) => {
  if (text !== repeated) return "Powtórzone hasło musi być takie samo";
  else return false;
};
const validatePostData = (...validations) => {
  var result = [];
  validations.forEach((validation) => {
    result.push(validation);
  });
  if (result.some((x) => x !== false)) return result;
  else return false;
};

export {
  validateStringLength,
  validateEmail,
  validateRepeatedString,
  validatePostData,
};
