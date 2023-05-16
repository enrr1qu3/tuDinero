import { useSelector } from "react-redux";
import { AppStore } from "../redux/store";
import { PrivateRoutes} from "../routes";
import { Outlet, Navigate } from "react-router-dom";
import { Roles } from "../models";

interface Props {
  rol: Roles;
}

function RolGuard({ rol }: Props) {
  const userState = useSelector((store: AppStore) => store.user);
  return userState.rol === rol ? <Outlet /> : <Navigate replace to={ PrivateRoutes.PRIVATE}/>;
}
export default RolGuard;