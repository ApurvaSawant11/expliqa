import { configureStore } from "@reduxjs/toolkit";
import authReducer from "features/auth/authSlice";
import threadModalReducer from "components/modal/threadModalSlice";
import postReducer from "features/home/postSlice";
import questionReducer from "features/home/questionSlice";
import userReducer from "features/userProfile/userSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    threadModal: threadModalReducer,
    post: postReducer,
    question: questionReducer,
    user: userReducer,
  },
});
