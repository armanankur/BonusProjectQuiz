import "./styles.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { useRecoilValue } from "recoil";
import { adminLogin, studentLogin } from "./IsLoggedIn";
import Exam from "./pages/Exam";
export default function App() {
  const adminLoggedIn = useRecoilValue(adminLogin);
  const studentLoggedIn = useRecoilValue(studentLogin);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            adminLoggedIn || studentLoggedIn ? (
              <Home />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/exam"
          element={studentLoggedIn ? <Exam /> : <Navigate to={"/login"} />}
        />
      </Routes>
    </div>
  );
}
