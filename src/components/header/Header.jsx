import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { AnswerIcon, LogoutIcon, ProfileIcon, TrendingIcon } from "assets";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isShowDropDown, setIsShowDropDown] = useState(false);
  const navigate = useNavigate();
  return (
    <header className="flex sticky top-0 items-center justify-between px-6 py-3 bg-white rounded-b-xl z-10">
      <div>
        <h1 className="text-gradient font-bold text-4xl">expliqa</h1>
      </div>
      <div className="flex gap-4 xs:text-lg text-2xl">
        <div className="flex items-center gap-1 cursor-pointer">
          <TrendingIcon />
          <span className="hidden xs:block">Trending</span>
        </div>
        <div className="flex items-center gap-1 cursor-pointer">
          <AnswerIcon />
          <span className="hidden xs:block">Answer</span>
        </div>

        <img
          src={user?.profilePic}
          alt={user?.userHandle}
          className="h-10 w-10 bg-slate-200 rounded-full cursor-pointer"
          onClick={() => setIsShowDropDown(!isShowDropDown)}
        />
      </div>

      {isShowDropDown && (
        <ul className="dropdown absolute m-0 text-md px-1 py-2 rounded-lg top-14 right-4 bg-white w-36 border-2">
          <li
            className="hover:bg-slate-200 flex items-center gap-4  px-3 py-1 rounded-md cursor-pointer"
            tabIndex="0"
            onClick={() => {
              navigate("/profile");
              setIsShowDropDown(false);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                navigate("/profile");
                setIsShowDropDown(false);
              }
            }}
          >
            <ProfileIcon />
            Profile
          </li>
          <li
            className="hover:bg-slate-200 flex items-center gap-4 px-3 py-1 rounded-md cursor-pointer"
            tabIndex="0"
            onClick={() => {
              dispatch(logoutUser());
              setIsShowDropDown(false);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                dispatch(logoutUser());
                setIsShowDropDown(false);
              }
            }}
          >
            <LogoutIcon />
            Logout
          </li>
        </ul>
      )}
    </header>
  );
};

export { Header };
