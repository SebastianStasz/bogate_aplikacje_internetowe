export const getData = (...fetchUrl) => {
  return fetch("http://localhost:5000/api/" + fetchUrl.join("/"), {
    headers: {
      "auth-token": localStorage.getItem("token") ?? "",
    },
  })
    .then((res) => res.json())
    .then((result) => {
      console.log("GET", result);
      return result;
    })
    .catch((err) => {
      return err;
    });
};
