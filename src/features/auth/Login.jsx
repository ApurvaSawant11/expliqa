import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./authSlice";
import { toast } from "react-toastify";
import { useDocumentTitle } from "hooks";

const Login = () => {
  useDocumentTitle("Login");
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (token) {
      setTimeout(() => {
        navigate(location?.state?.from || "/", { replace: true });
      }, 1000);
    }
  }, [token]);

  const loginHandler = (e) => {
    e.preventDefault();
    if (formData.email.trim() === "" && formData.password.trim() === "") {
      toast.error("Please enter valid credentials");
    } else {
      dispatch(loginUser(formData));
    }
  };

  const guestLoginHandler = () => {
    setFormData((form) => ({
      ...form,
      email: "apurvasawant@gmail.com",
      password: "apurvasawant123",
    }));
  };

  return (
    <main className="main-container w-full h-screen text-gray-800 px-4 py-6 flex items-center justify-center">
      <form
        className="px-10 py-6  form-wrapper bg-white rounded-md shadow-md"
        onSubmit={loginHandler}
      >
        <div className="pb-4 mb-4 border-b-2 border-blue-200">
          <h1 className="text-gradient font-bold text-4xl text-center pb-2 cursor-pointer ">
            expliqa
          </h1>
          <div className="font-semibold text-center">
            A forum platform to gain and share knowledge
          </div>
        </div>
        <h4 className="font-bold uppercase text-center text-2xl">
          <span className="border-b-4 border-green-400 rounded"> Login </span>
        </h4>
        <div className="pt-6">
          <label className="block font-semibold">Email</label>
          <input
            type="text"
            placeholder="Email"
            className="border border-l-4 border-green-400 w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-green-400 rounded-md"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <label className="block mt-3 font-semibold">Password</label>
          <input
            type="password"
            placeholder="Password"
            className=" border border-l-4 border-green-400 w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-green-400 rounded-md"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
          <div className="flex gap-3 mt-2">
            <button
              className="font-semibold my-6 bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 basis-full"
              type="submit"
            >
              Login
            </button>
            <button
              className="font-semibold my-6 rounded-md border-2 border-green-500 text-black py-2 px-6 hover:border-green-500 hover:bg-green-500 hover:text-white basis-full"
              onClick={guestLoginHandler}
            >
              Guest Login
            </button>
          </div>
          <div className="text-center font-semibold">
            <Link to="/signup">
              <p className="cursor-pointer hover:underline">
                Create New Account
              </p>
            </Link>
          </div>
        </div>
      </form>
    </main>
  );
};

export default Login;
