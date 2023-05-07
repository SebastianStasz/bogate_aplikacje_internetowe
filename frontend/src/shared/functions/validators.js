const isLengthValid = (text, length) => {
  return {
    isValid: text.trim().length > length,
    message: `Tekst musi być dłuższy od ${length} znaków!`,
  };
};

const isPositiveNumber = (value) => {
  return {
    isValid: typeof value === "number" && value >= 0,
    message: `Podaj nieujemną liczbę całkowitą!`,
  };
};

const isNotEmptyArray = (arr, strLength) => {
  return {
    isValid: arr.length > 0 && !arr.some((el) => el.length < strLength),
  };
};

export { isLengthValid, isPositiveNumber, isNotEmptyArray };
