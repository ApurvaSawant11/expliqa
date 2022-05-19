import { CloseIcon, SearchIcon } from "assets";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SearchModal = ({ setShowSearchModal }) => {
  const navigate = useNavigate();
  const { allUsers } = useSelector((state) => state.user);
  const [searchInput, setSearchInput] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    if (searchInput.trim() !== "")
      setFilteredUsers(
        allUsers.filter((user) =>
          `${user.firstName} ${user.lastName}`
            .toLowerCase()
            .includes(searchInput.toLowerCase().trim())
        )
      );
    else setFilteredUsers([]);
  }, [searchInput]);

  return (
    <>
      <div
        className={`flex items-start justify-center fixed top-0 bottom-0 left-0 right-0 bg-overlay`}
        onClick={() => setShowSearchModal(false)}
      >
        <div
          className="mx-auto mt-[5rem] form-wrapper relative"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center bg-white rounded-md p-4 gap-3">
            <SearchIcon />
            <input
              type="text"
              className="w-full outline-none"
              placeholder="Search users..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          <CloseIcon
            className="absolute right-[-0.5rem] top-[-0.5rem] bg-red-400 rounded-full cursor-pointer"
            size={22}
            onClick={() => setShowSearchModal(false)}
          />

          <div className="bg-white mt-3 rounded-md">
            {filteredUsers?.map((user) => (
              <div
                className="flex items-center cursor-pointer p-4"
                onClick={() => {
                  navigate(`/${user.userHandle}`);
                  setShowSearchModal(false);
                }}
              >
                <img
                  src={user.profilePic}
                  className="rounded-full h-7 w-7 mb-2 mt-1"
                  alt={user.userHandle}
                />
                <div className="flex flex-col ml-2 text-sm">
                  <div className="font-semibold">
                    {`${user.firstName} ${user.lastName}`}{" "}
                    <span className="text-gray-400">@{user.userHandle}</span>
                  </div>
                  <div className="text-gray-400">{user.bio}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export { SearchModal };
