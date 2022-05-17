import axios from "axios";

export const getAllUsersService = () => axios.get("/api/users");
