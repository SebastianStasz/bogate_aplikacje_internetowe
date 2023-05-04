const validateStringLength = (text, setLength, { nullable = false } = {}) => {
  if (text === null && nullable) return false;
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

const validatePositiveNumber = (value, { nullable = false } = {}) => {
  if (value === null && nullable) return false;
  if (typeof value !== "number" || value < 0)
    return "Liczba musi być większa niż 0";
  else return false;
};

const validateIsCorrectArray = (arr) => {
  if (Array.isArray(arr)) return false;
  else return "Wyślij poprawną listę";
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
  validatePositiveNumber,
  validateIsCorrectArray,
  validatePostData,
};
