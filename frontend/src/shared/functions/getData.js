import { API_URL_FULL } from "../constants/config";

export const getData = (...fetchUrl) => {
  return fetch(API_URL_FULL + fetchUrl.join("/"), {
    method: "GET",
    credentials: "include",
    mode: "cors",
  })
    .then((res) => {
      if (res.status === 401) return false;
      return res.json();
    })
    .then((result) => {
      console.log("GET", result);
      return result;
    })
    .catch((err) => {
      return err;
    });
};
