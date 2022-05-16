import axios from "axios";

export const loginUserService = async (email, password) => {
  const response = await axios.post("api/auth/login", {
    username: email,
    password: password,
  });
  return response;
};

export const signUpService = async (email, password, firstName, lastName) => {
  const response = axios.post("api/auth/signup", {
    username: email,
    password: password,
    firstName: firstName,
    lastName: lastName,
  });
  return response;
};
