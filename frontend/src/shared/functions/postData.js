import { CONFIG } from "../constants/config";

export const postData = (values, ...fetchUrl) => {
  return fetch(CONFIG.API_URL + fetchUrl.join("/"), {
    method: "POST",
    credentials: "include",
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin":
        "http://127.0.0.1/:5173, http://127.0.0.1/:5000",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  })
    .then((res) => res.json())
    .then((result) => {
      console.log("POST", result);
      return result;
    })
    .catch((err) => {
      return err;
    });
};
