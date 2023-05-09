import Admin from "../components/admin/Admin";
import Student from "../components/student/Student";
import { useRecoilValue } from "recoil";
import { adminLogin, studentLogin } from "../IsLoggedIn";

export default function Home() {
  const adminLoggedIn = useRecoilValue(adminLogin);
  const studentLoggedIn = useRecoilValue(studentLogin);

  return (
    <>
      {adminLoggedIn && <Admin />}
      {studentLoggedIn && <Student />}
    </>
  );
}
