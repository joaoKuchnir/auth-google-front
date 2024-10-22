import { createStore } from "vuex";
import register from "./register"
import users from "./users"

const store = createStore({
  modules: {
    register,
    users
  }
})

export default store;