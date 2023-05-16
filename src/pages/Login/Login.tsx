import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { UserKey, createUser, resetUser } from "../../redux/states/user";
import { useNavigate } from "react-router-dom";
// import { Roles } from "../../models";
import { PrivateRoutes, PublicRoutes } from '../../routes'
import { AuthService } from "../../services";
import { clearLocalStorage } from "../../utilities";
import { Button, Checkbox, Form, Input, message } from 'antd';
import { CustomIconUser } from '../../assets/CustomsIcons';
import "./styleLogin.css"


function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loadings, setLoadings] = useState<boolean[]>([])

  useEffect(() => {
    clearLocalStorage(UserKey);
    dispatch(resetUser());
    navigate(`/${PublicRoutes.LOGIN}`, { replace: true });
  }, [])
  // Antiguio
  const onFinish = async (values: { username: string; password: string }) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[0] = true;
      return newLoadings;
    });
    const { username, password } = values;


    try {
      const result = await AuthService.login(username, password);

      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[0] = false;
        return newLoadings;
      });
      console.log(result);
      localStorage.setItem('username', username);
      dispatch(createUser(result));
      // dispatch(createUser({ ...result, rol: Roles.ADMIN }));
      navigate(`/${PrivateRoutes.PRIVATE}`, { replace: true });
    } catch (error) {
      console.log(error);
      mensajeError()
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[0] = false;
        return newLoadings;
      });
    }
  };
  const mensajeError = () => {
    message.error('Contraseña y/o Usuario Invalido');
  }


  // 


  // const login = async () => {
  //   try {
  //     const result = await getMorty();
  //     dispatch(createUser(result));
  //     dispatch(createUser({ ...result, rol: Roles.ADMIN }));
  //     navigate(`/${PrivateRoutes.PRIVATE}`, { replace: true });
  //   } catch (error) { }
  // };

  return (
    <div className="formularioContenedor">
      <div >
        <nav className="Nav_Login">
          <img className="iconLogin" src="../src/assets/Img/white.png" alt="IconZeus" />
        </nav>
        <section className="FormularioLogin">
          <p className="TituloSesion">Inicia Sesión</p>
          <div >
            <Form
              autoComplete="true"
              className="Login"
              onFinish={onFinish}
            >
              <Form.Item
                label="Usuario"
                name="username"
                rules={[{ required: false, message: 'Colocar Usuario!' }]}
              >
                <Input placeholder="Nombre de usuario" suffix={<CustomIconUser style={{ color: "#667085", }} />} />
              </Form.Item>

              <Form.Item className="passworditem"
                label="Contraseña"
                name="password"
                rules={[{ required: false, message: 'Colocar Contraseña!' }]}
              >
                <Input.Password placeholder="**************" />
              </Form.Item>

              <Form.Item className="opciones">
                <Checkbox className="checkbox">Recuérdame</Checkbox>
                <a className="login-form-forgot" href="">
                  ¿Olvidaste la contraseña?
                </a>
              </Form.Item>

              <Form.Item >
                <Button className="BotonIniciarSesion" type="primary" htmlType="submit" loading={loadings[0]}>
                  Iniciar sesión
                </Button>
              </Form.Item>
            </Form>
          </div>
        </section>

      </div>

      <div className="loginImagen">
      </div>

    </div>

  )
}
export default Login;