import { useEffect } from "react";
import {
  Login,
  SignUp,
  Home,
  SinglePost,
  SingleQuestion,
  Bookmarks,
} from "features";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Header, ThreadModal, RequiresAuth } from "components";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "features/userProfile/userSlice";
import { getAllPosts, getUserPosts } from "features/home/postSlice";
import { getAllQuestions, getUserQuestions } from "features/home/questionSlice";
function App() {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(getAllUsers());
      dispatch(getAllPosts());
      dispatch(getUserPosts(user.username));
      dispatch(getAllQuestions());
      dispatch(getUserQuestions(user.username));
    }
  }, [token]);

  return (
    <div className="App">
      <Header />
      <ToastContainer position="bottom-right" autoClose="2100" />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<RequiresAuth />}>
          <Route path="/" element={<Home />} />
          <Route path="/post/:postId" element={<SinglePost />} />
          <Route path="/question/:questionId" element={<SingleQuestion />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
        </Route>
      </Routes>
      <ThreadModal />
    </div>
  );
}

export default App;
