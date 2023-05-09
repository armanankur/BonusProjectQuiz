import Styled from "./Register.module.css";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!name) {
      errors.name = "Name is required";
    }
    if (!email) {
      errors.email = "email is required";
    }
    if (!user) {
      errors.user = " This field is required";
    } else if (user === "Select") {
      errors.user = "select a valid option";
    }
    if (!password) {
      errors.passowrd = "Password is required";
    } else if (password.length < 5) {
      errors.passowrd = "Password must have at least 8 characters";
    }

    setError(errors);

    let admin = JSON.parse(localStorage.getItem("admin details"));
    let student = JSON.parse(localStorage.getItem("student details"));

    if (Object.keys(errors).length === 0) {
      if (user === "Admin") {
        if (!admin) {
          admin = [];
        }
        const checkDuplication = admin.some((user) => user.Email === email);
        if (checkDuplication) {
          window.alert("email id already exists");
        } else {
          admin.push({
            Name: name,
            Email: email,
            Password: password
          });
          localStorage.setItem("admin details", JSON.stringify(admin));
          console.log(admin);
          window.alert("register successfuly");
          navigate("/login");
        }
      }
      if (user === "Student") {
        if (!student) {
          student = [];
        }
        const checkDuplication = student.some((user) => user.Email === email);
        if (checkDuplication) {
          window.alert("email id already exists");
        } else {
          student.push({
            Name: name,
            Email: email,
            Password: password
          });
          console.log(student);
          localStorage.setItem("student details", JSON.stringify(student));
          window.alert(`Your Registration successfuly`);
          navigate("/login");
        }
      }
    }
  };
  return (
    <div className={Styled.mainContainer}>
      <form className={Styled.registerContainer} onSubmit={handleSubmit}>
        <h1>SIGNUP</h1>
        <div className={Styled.registrationForm}>
          <input
            type="text"
            placeholder="Enter Your Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {error.name && <span style={{ color: "red" }}>{error.name}</span>}
          <br />
          <input
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error.email && <span style={{ color: "red" }}>{error.email}</span>}
          <br />
          <select value={user} onChange={(e) => setUser(e.target.value)}>
            <option>Select</option>
            <option>Admin</option>
            <option>Student</option>
          </select>{" "}
          {error.user && <span style={{ color: "red" }}>{error.user}</span>}
          <br />
          <input
            type="password"
            placeholder="Create a passoword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error.password && (
            <span style={{ color: "red" }}>{error.password}</span>
          )}
          <br />
          <button type="submit">Submit</button>
        </div>
        <p>
          Already have an account ! <Link to={"/login"}>Login </Link>
        </p>
      </form>
    </div>
  );
};
export default Register;
