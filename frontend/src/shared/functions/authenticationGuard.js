export const authenticationGuard = (to, from, next) => {
  if (
    localStorage.getItem("token") == null ||
    localStorage.getItem("userName") == null
  ) {
    next({
      path: "/logIn",
      params: { nextUrl: to.fullPath },
    });
  } else next();
};
