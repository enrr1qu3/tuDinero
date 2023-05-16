import { Empty } from "antd";
import { Routes, Route } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}
function RoutesWithNotFound({ children }: Props) {
  return (
    <Routes>
      {children}
      <Route path="*" element={
        <Empty
          description={
            <span>
              Esta pagina no existe <br />
              <a href="Dashboard">Regresar al inicio</a>
            </span>
          }
        />
      } />
    </Routes>
  );
}
export default RoutesWithNotFound;