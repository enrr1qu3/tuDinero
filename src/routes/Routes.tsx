import { Suspense, lazy } from "react";
import { Provider } from "react-redux";
import { Route, Navigate } from "react-router-dom"
import store from "../redux/store"
import { RoutesWithNotFound } from "../utilities";
import { PrivateRoutes, PublicRoutes } from "../routes/Public_Private";
// import { Private } from "../pages/Private";
import { AuthGuard } from "../guards";
// import { Login } from "../pages/Login";

const Login = lazy(() => import('../pages/Login/Login'));
const Private = lazy(() => import('../pages/Private/Private'));

export const AppRoutes = () => {
  return (
    <>
      <Suspense fallback={<>Cargando</>}>
        <Provider store={store}>

          {/* <BrowserRouter> */}
          {/* <Logout /> */}
          <RoutesWithNotFound>
            <Route path={PublicRoutes.LOGIN} element={<Login />} />

            <Route path="/" element={<Navigate to={PrivateRoutes.PRIVATE} />} />

            <Route element={<AuthGuard privateValidacion={true} />} >
              <Route path={`${PrivateRoutes.PRIVATE}/*`} element={<Private />} />
            </Route>
            {/* 
              <Route element={<RolGuard rol={Roles.ADMIN} />}>
                <Route path={PrivateRoutes.DASHBOARD} element={<Dashboard />} />
              </Route> */}

          </RoutesWithNotFound>
          {/* </BrowserRouter> */}

        </Provider>
      </Suspense>
    </>
  )
}