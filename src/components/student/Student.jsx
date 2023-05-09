import { useNavigate } from "react-router-dom";
import Styled from "./Student.module.css";

const Student = () => {
  const navigate = useNavigate();
  return (
    <div className={Styled.container}>
      <button onClick={() => navigate("/exam")}>start test</button>
    </div>
  );
};
export default Student;
