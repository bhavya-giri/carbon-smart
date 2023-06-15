import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const Logout = () => {
  const handleLogOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {});
  };
    return (
        <li><button onClick={handleLogOut}>Log Out</button></li>    
    )
}

export default Logout;