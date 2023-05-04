const changeToList = (value) => {
  return value.split(";");
};

const changeFromList = (value) => {
  var result = [];
  for (var text of value) {
    result.push(text.replace(";", ":"));
  }
  return result.join(";");
};

export { changeToList, changeFromList };
