import Cookies from "js-cookie";

export const authenticationGuard = async (to, from, next) => {
  const permitted = Cookies.get("user")
  if (!permitted) {
    next({
      path: "/logIn",
      params: { nextUrl: to.fullPath },
    });
  } else next();
};
