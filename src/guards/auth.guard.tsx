import { useSelector } from "react-redux"
import { AppStore } from "../redux/store"
import { Navigate, Outlet } from "react-router-dom";
import { PrivateRoutes, PublicRoutes } from "../routes";

interface Props {
  privateValidacion: boolean;
}

const PrivateValidacionFragment = <Outlet />;
const PublicValidationFragment = <Navigate replace to={PrivateRoutes.PRIVATE} />;

export const AuthGuard = ({ privateValidacion }: Props) => {
  const userState = useSelector((store: AppStore) => store.user);
  return userState.success ? (
    privateValidacion ? (
      PrivateValidacionFragment
    ) : (
      PublicValidationFragment
    )
  ) : (
    <Navigate replace to={PublicRoutes.LOGIN} />
  );
};

export default AuthGuard;