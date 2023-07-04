import { combineReducers } from "redux";
import tutorials from "./tutorials";
import users from "./userData";
export default combineReducers({
  tutorials,users
});