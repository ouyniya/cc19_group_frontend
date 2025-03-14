import axios from "../configs/axios";

const userApi = {};

userApi.login = (body) => axios.post("/auth/login", body);
userApi.register = (body) => axios.post("/auth/register", body);
userApi.getMe = () => axios.get("/user");
userApi.updateProfile = (body) => axios.patch("/user/profile", body);
userApi.updateProfileInformation = (body) =>
  axios.patch("/user/information", body);

export default userApi;
