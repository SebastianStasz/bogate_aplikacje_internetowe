import useState from "../../store/useState";
import Cookies from "js-cookie";
import router from "../../../router";
import { postData } from "../postData";

const { clearUser } = useState();

const logOutUser = () => {
  postData({}, {}, "logout");
  Cookies.remove("user", { path: "" });
  clearUser();
  router.push({ name: "HomePage" });
};

export default logOutUser;
