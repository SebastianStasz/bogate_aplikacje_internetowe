import { computed, reactive } from "vue";
import Cookies from "js-cookie";

const state = reactive({
  user: Cookies.get("user"),
});

export default function () {
  return {
    user: computed(() => state.user),
    setUser: (userName) => (state.user = userName),
    clearUser: () => (state.user = false),
  };
}
