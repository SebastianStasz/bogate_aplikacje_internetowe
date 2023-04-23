import useState from "../../store/useState";
import Cookies from "js-cookie";

const { setUser } = useState();

const logInUser = (result) => {
  Cookies.set("user", result.auth.user);
  setUser(result.auth.user);
};

export default logInUser;
