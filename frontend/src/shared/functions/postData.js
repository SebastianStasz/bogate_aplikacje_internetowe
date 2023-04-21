import { API_URL_FULL } from "../constants/config";

export const postData = (values, ...fetchUrl) => {
  return fetch(API_URL_FULL + fetchUrl.join("/"), {
    method: "POST",
    credentials: "include",
    mode: "cors",
    headers: {
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
