import { useEffect, Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader, ThreadModal } from "components";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "features/userProfile/userSlice";
import { getAllPosts, getUserPosts } from "features/home/postSlice";
import { getAllQuestions, getUserQuestions } from "features/home/questionSlice";

// Route based code-splitting
const Login = lazy(() => import("./features/auth/Login"));
const SignUp = lazy(() => import("./features/auth/SignUp"));
const Home = lazy(() => import("./features/home/Home"));
const SinglePost = lazy(() => import("./features/singlePost/SinglePost"));
const SingleQuestion = lazy(() =>
  import("./features/singleQuestion/SingleQuestion")
);
const Bookmarks = lazy(() => import("./features/bookmarks/Bookmarks"));
const UserProfile = lazy(() => import("./features/userProfile/UserProfile"));
const AnswerPage = lazy(() => import("./features/answerPage/AnswerPage"));
const RequiresAuth = lazy(() =>
  import("./components/requiresAuth/RequiresAuth")
);
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
    <div className="App min-h-screen">
      <ToastContainer position="bottom-right" autoClose="2100" />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<RequiresAuth />}>
            <Route path="/" element={<Home />} />
            <Route path="/post/:postId" element={<SinglePost />} />
            <Route path="/question/:questionId" element={<SingleQuestion />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/:userHandle" element={<UserProfile />} />
            <Route path="/answer" element={<AnswerPage />} />
          </Route>
        </Routes>
      </Suspense>
      <ThreadModal />
    </div>
  );
}

export default App;
