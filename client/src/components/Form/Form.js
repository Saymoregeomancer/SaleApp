import { useContext, useState } from "react";
import { useHttp } from "../../hooks/http.hook";
import { AuthContext } from "../../context/AuthContext";
import { Fade } from "react-awesome-reveal";
import "./form.sass";

const Form = () => {
  const auth = useContext(AuthContext);
  const { request } = useHttp();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { ...form });
      //       message(data.message);
      console.log("data", data);
    } catch (e) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form });
      auth.login(data.token, data.userId);
    } catch (e) {}
  };

  return (
    <div className="form">
      <Fade direction="up" duration={1500}>
        <div className="form-box">
          <h1 className="form_title">Вхід</h1>
          <div className="form-wrap">
            <span className="form_label">Email:</span>
            <input
              onChange={changeHandler}
              type="text"
              className="form_input"
              name="email"
            />
            <span className="form_label">Paswword:</span>
            <input
              onChange={changeHandler}
              type="text"
              className="form_input"
              name="password"
            />
          </div>

          <button onClick={loginHandler} className="form_button">
            Log in
          </button>
          <button onClick={registerHandler} className="form_button">
            Log up
          </button>
        </div>
      </Fade>
    </div>
  );
};

export default Form;
