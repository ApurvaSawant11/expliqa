import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";

const useDebounce = () => {
  const [showLoader, setShowLoader] = useState(false);
  const { allUsers } = useSelector((state) => state.user);
  const [searchQueryText, setSearchQueryText] = useState("");
  const [searchedUsers, setSearchedUsers] = useState([]);

  const searchHandler = (e) => {
    const searchText = e.target.value;
    setSearchQueryText(searchText);
    if (searchText !== "") {
      updateSearchedUsers(searchText);
    }
  };

  const debounce = (callback) => {
    let timeout;
    return (...args) => {
      setShowLoader(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setShowLoader(false);
        callback(...args);
      }, 1000);
    };
  };

  const updateSearchedUsers = useCallback(
    debounce((searchText) => {
      setSearchedUsers(
        allUsers.filter((user) =>
          `${user.firstName} ${user.lastName}`
            .toLowerCase()
            .includes(searchText.toLowerCase().trim())
        )
      );
    }),
    []
  );

  return {
    showLoader,
    searchHandler,
    searchedUsers,
    searchQueryText,
  };
};

export { useDebounce };
