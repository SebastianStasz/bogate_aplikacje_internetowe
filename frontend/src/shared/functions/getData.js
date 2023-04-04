import { CONFIG } from "../constants/config";

export const getData = (...fetchUrl) => {
  return fetch(CONFIG.API_URL + fetchUrl.join("/"), {
    method: "GET",
    credentials: "include",
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin":
        "http://127.0.0.1/:5173, http://127.0.0.1/:5000",
      "auth-token": localStorage.getItem("token") ?? "",
      "auth-userName": localStorage.getItem("userName") ?? "",
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
