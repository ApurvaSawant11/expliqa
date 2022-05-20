import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "./authSlice";

export function SignUp() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    if (token) {
      setTimeout(() => {
        navigate(location?.state?.from || "/", { replace: true });
      }, 1000);
    }
  }, [token]);

  const signUpHandler = (e) => {
    e.preventDefault();
    const { email, password, firstName, lastName } = formData;
    if (email && password && firstName && lastName !== "") {
      dispatch(signUpUser(formData));
    }
  };

  const fillFormValue = (event, fieldName) => {
    const regex = "^\\s+$";
    const { value } = event.target;
    if (!value.match(regex))
      setFormData((prev) => ({ ...prev, [fieldName]: value }));
  };

  return (
    <main className="main-container w-full text-gray-800 px-4 py-6 flex items-center justify-center">
      <form
        className="px-10 py-6  form-wrapper bg-white rounded-md shadow-md"
        onSubmit={signUpHandler}
      >
        <h1 className="text-gradient font-bold text-4xl text-center mb-4 cursor-pointer border-b-2 border-blue-200 pb-4">
          expliqa
        </h1>
        <h4 className="font-bold uppercase text-center text-2xl">
          <span className="border-b-4 border-green-400 rounded"> Sign Up </span>
        </h4>
        <div className="pt-6">
          <div className="flex gap-4 sm:flex-col mb-4">
            <div>
              <label className="block font-semibold">First Name</label>
              <input
                type="text"
                placeholder="First Name"
                className="border border-l-4 border-green-400 w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-green-400 rounded-md"
                value={formData.firstName}
                onChange={(e) => fillFormValue(e, "firstName")}
                required
              />
            </div>
            <div>
              <label className="block font-semibold">Last Name</label>
              <input
                type="text"
                placeholder="Last Name"
                className="border border-l-4 border-green-400 w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-green-400 rounded-md"
                value={formData.lastName}
                onChange={(e) => fillFormValue(e, "lastName")}
                required
              />
            </div>
          </div>
          <label className="block font-semibold">Email</label>
          <input
            type="text"
            placeholder="Email"
            className="border border-l-4 border-green-400 w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-green-400 rounded-md"
            value={formData.email}
            onChange={(e) => fillFormValue(e, "email")}
            required
          />
          <label className="block mt-3 font-semibold">Password</label>
          <input
            type="password"
            placeholder="Password"
            className="border border-l-4 border-green-400 w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-green-400 rounded-md"
            value={formData.password}
            onChange={(e) => fillFormValue(e, "password")}
            required
          />
          <div>
            <button
              className="font-semibold my-6 bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 w-full"
              type="submit"
            >
              Create Account
            </button>
          </div>
          <div className="text-center  font-semibold">
            <Link to="/login">
              <p className="cursor-pointer hover:underline">
                Already Have An Account ?
              </p>
            </Link>
          </div>
        </div>
      </form>
    </main>
  );
}
