import { getData } from "./getData";

export const authenticationGuard = async (to, from, next) => {
  // Probably will change to simple token existance check later
  const permitted = await getData("authenticatePath");
  if (!permitted) {
    next({
      path: "/logIn",
      params: { nextUrl: to.fullPath },
    });
  } else next();
};
