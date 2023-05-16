import { UserKey, resetUser } from "../../redux/states/user";
import { clearLocalStorage } from "../../utilities";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { PublicRoutes } from "../../routes";

function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const logOut = () => {
    clearLocalStorage(UserKey);
    dispatch(resetUser())
    navigate(`/${PublicRoutes.LOGIN}`, { replace: true });
  }
  return <button onClick={logOut}>Log Out</button>;
}
export default Logout