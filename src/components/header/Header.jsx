import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "features/auth/authSlice";
import { Link } from "react-router-dom";

const Header = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <header className="flex sticky top-0 items-center justify-between p-2 py-3 bg-white rounded-b-xl">
      <div>
        <h1 className="text-gradient font-bold text-4xl">expliqa</h1>
      </div>
      {token ? (
        <button
          className="font-semibold rounded-md border-2 border-green-400 text-black px-4 py-1 hover:border-green-400 hover:bg-green-400 hover:text-white"
          onClick={() => dispatch(logoutUser())}
        >
          Logout
        </button>
      ) : (
        <Link
          to="/login"
          className="font-semibold rounded-md border-2 border-green-400 text-black px-4 py-1 hover:border-green-400 hover:bg-green-400 hover:text-white"
        >
          Login
        </Link>
      )}
    </header>
  );
};

export { Header };
