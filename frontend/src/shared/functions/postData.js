import { CONFIG } from '../constants/config';

export const postData = (values, ...fetchUrl) => {
  return fetch(CONFIG.API_URL + fetchUrl.join("/"), {
    method: "POST",
    credentials: 'include',
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin": "http://127.0.0.1/:5173, http://127.0.0.1/:5000",
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("token") ?? "",
      "auth-userName": localStorage.getItem("userName") ?? "",
    },
    body: JSON.stringify(values),
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.auth) {
        localStorage.setItem("token", result.auth.token);
        localStorage.setItem("userName", result.auth.userName);
      }
      console.log(localStorage);
      console.log("POST", result);
      return result;
    })
    .catch((err) => {
      return err;
    });
};
