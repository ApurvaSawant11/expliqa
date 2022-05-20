import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { followUnFollowUser } from "features/userProfile/userSlice";

const FollowBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);
  const { allUsers } = useSelector((state) => state.user);
  const [userSuggestions, setUserSuggestions] = useState([]);

  useEffect(
    () =>
      setUserSuggestions(
        allUsers
          .filter((user) => user.username !== currentUser.username)
          .filter(
            (user) =>
              !currentUser.following.find((user2) => user2._id === user._id)
          )
      ),
    [currentUser, allUsers]
  );

  return (
    <div className="w-72 ml-8 p-4 sticky top-20 bg-white rounded-md h-max hidden md:block shrink-0">
      <h2 className="text-md font-bold">Who to follow</h2>
      {userSuggestions.length > 0 ? (
        userSuggestions.map((user) => (
          <div
            key={user._id}
            className="flex justify-between items-center mt-4"
          >
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => navigate(`/${user.userHandle}`)}
            >
              <img
                src={user.profilePic}
                className="h-10 w-10 rounded-full"
                alt={user.userHandle}
              />
              <div>
                <h3>
                  {user.firstName} {user.lastName}
                </h3>
                <div className="text-gray-400 text-sm">@{user.userHandle}</div>
              </div>
            </div>
            <button
              className="font-semibold bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 h-max "
              onClick={() =>
                dispatch(
                  followUnFollowUser({
                    userId: user._id,
                    dispatch: dispatch,
                    isFollow: true,
                  })
                )
              }
            >
              Follow
            </button>
          </div>
        ))
      ) : (
        <div className="font-semibold text-center mt-4">No Suggestions</div>
      )}
    </div>
  );
};

export { FollowBar };
