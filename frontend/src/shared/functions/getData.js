export const getData = (...fetchUrl) => {
  return fetch("http://localhost:5000/api/" + fetchUrl.join("/"), {
    headers: {
      "auth-token": localStorage.getItem("token") ?? "",
    },
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.auth) {
        localStorage.setItem("token", result.auth.token);
      }
      console.log(localStorage);
      console.log("token", result);
      return result;
    })
    .catch((err) => {
      return err;
    });
};
