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

export { isLengthValid, isPositiveNumber };
