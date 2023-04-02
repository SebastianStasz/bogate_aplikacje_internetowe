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
      return result;
    })
    .catch((err) => {
      return err;
    });
};
