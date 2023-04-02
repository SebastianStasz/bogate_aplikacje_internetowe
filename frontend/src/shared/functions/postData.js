export const postData = (values, ...fetchUrl) => {
  return fetch("http://localhost:5000/api/" + fetchUrl.join("/"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("token") ?? "",
    },
    body: values,
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.auth) {
        localStorage.setItem("token", result.auth.token);
      }
      console.log(localStorage);
      console.log("POST", result);
      return result;
    })
    .catch((err) => {
      return err;
    });
};
