import { HTTP } from "../axios";

const getUser = (formData) => {
  console.log(formData);
  return HTTP.post("/users/signin", formData);
};

const userService = {
  getUser,
};

export default userService;
