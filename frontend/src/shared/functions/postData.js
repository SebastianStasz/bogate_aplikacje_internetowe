import { API_URL_FULL } from "../constants/config";
import logInUser from "./auth/logInUser";
import router from "../../router";

export const postData = (values, { goTo }, ...fetchUrl) => {
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
      if (res.status === 400) return false;
      console.log("POST", result);
      if (result.auth) logInUser(result);
      if (goTo) router.push(goTo);
      return result;
    })
    .catch((err) => {
      return err;
    });
};
