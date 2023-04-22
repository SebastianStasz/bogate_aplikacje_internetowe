const isLengthValid = (text, length) => {
  return {
    isValid: text.trim().length > length,
    message: `Tekst musi być dłuższy od ${length} znaków!`,
  };
};

export { isLengthValid };
