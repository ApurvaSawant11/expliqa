import { CloseIcon, SearchIcon } from "assets";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "hooks";
import { Loader } from "components";

const SearchModal = ({ setShowSearchModal }) => {
  const navigate = useNavigate();
  const [showUsersList, setShowUsersList] = useState(false);

  const { searchHandler, searchQueryText, showLoader, searchedUsers } =
    useDebounce();

  useEffect(() => {
    searchQueryText !== "" ? setShowUsersList(true) : setShowUsersList(false);
  }, [searchQueryText]);

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
              value={searchQueryText}
              onChange={searchHandler}
            />
          </div>
          <CloseIcon
            className="absolute right-[-0.5rem] top-[-0.5rem] bg-red-400 rounded-full cursor-pointer"
            size={22}
            onClick={() => setShowSearchModal(false)}
          />

          <div className="bg-white mt-3 rounded-md">
            {showUsersList &&
              (showLoader ? (
                <Loader />
              ) : searchedUsers.length > 0 ? (
                searchedUsers.map((user) => (
                  <div
                    className="flex items-center cursor-pointer p-4"
                    key={user._id}
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
                        <span className="text-gray-400">
                          @{user.userHandle}
                        </span>
                      </div>
                      <div className="text-gray-400">{user.bio}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-2 text-center">No users found</div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export { SearchModal };
