import { Login, SignUp, Home } from "features";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Header, RequiresAuth } from "components";

function App() {
  return (
    <div className="App">
      <Header />
      <ToastContainer position="bottom-right" autoClose="2100" />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<RequiresAuth />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
