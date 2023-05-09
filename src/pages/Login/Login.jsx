import { useState } from "react";
import style from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { adminLogin, studentLogin } from "../../IsLoggedIn";

export default function Login() {
  const setStudentLoggedIn = useSetRecoilState(studentLogin);
  const setAdminLoggedIn = useSetRecoilState(adminLogin);

  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [isStudentLogin, setIsStudentLogin] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  function handleLoginSubmit(e) {
    e.preventDefault();
    const errors = {};
    if (!email) {
      errors.email = "Email can not be empty";
    }
    if (!password) {
      errors.password = "password cannot be empty";
    }
    setErrors(errors);
    let admin = JSON.parse(localStorage.getItem("admin details"));
    let student = JSON.parse(localStorage.getItem("student details"));

    if (Object.keys(errors).length === 0) {
      if (isStudentLogin) {
        if (!student) {
          alert("First register yourself");
          return [];
        }
        const isStudentExists = student.find(
          (user) => user.Email === email && user.Password === password
        );
        if (isStudentExists) {
          window.alert("student login success");
          navigate("/");
          setStudentLoggedIn(true);
        } else {
          errors.main = "invalid credentials";
          setErrors(errors);
        }
      }
    }
    if (isAdminLogin) {
      if (!admin) {
        alert("First register yourself");
        return [];
      }
      const isAdminExists = admin.find(
        (user) => user.Email === email && user.Password === password
      );
      if (isAdminExists) {
        window.alert(" admin login success");
        navigate("/");
        setAdminLoggedIn(true);
      } else {
        errors.main = "invalid credentials";
        setErrors(errors);
      }
    }
  }

  return (
    <div className={style.mainContainer}>
      {!isAdminLogin && !isStudentLogin ? (
        <div className={style.loginContainer}>
          <button onClick={() => setIsAdminLogin(true)}>Admin Login</button>
          <button onClick={() => setIsStudentLogin(true)}>
            {" "}
            Student Login{" "}
          </button>
          <br />
          <p>
            Do not have account? <Link to={"/register"}>SignUp </Link>
          </p>
        </div>
      ) : null}

      {(isAdminLogin || isStudentLogin) && (
        <form className={style.loginContainer} onSubmit={handleLoginSubmit}>
          {isAdminLogin ? <h1>Admin Login</h1> : <h1>Student Login</h1>}

          {errors.main && <span style={{ color: "red" }}>{errors.main}</span>}
          <br />
          <div className={style.loginForm}>
            <input
              type="text"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            {errors.email && (
              <span style={{ color: "red" }}>{errors.email}</span>
            )}
            <br />
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            {errors.password && (
              <span style={{ color: "red" }}>{errors.password}</span>
            )}

            <button type="submit">Submit</button>
            <br />
          </div>
          <p>
            Don't have an account? <Link to={"/register"}>Sign up</Link>{" "}
          </p>
        </form>
      )}
      {/* {isAdminLogin && <AdminLogin />}

      {isStudentLogin && <StudentLogin />} */}
    </div>
  );
}
