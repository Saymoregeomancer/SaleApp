import styles from "./Authorization.module.css";
import { Fade } from "react-awesome-reveal";
import { Button, Input, Widget } from "../../templates/ui";
import useInput from "../../hooks/useInput.hook";
import useRequest from "../../hooks/useRequestApi.hook";
import { useAuthContext } from "../../hooks/useAuthContext.hook";

const initInputsState = [
  {
    placeholder: "Email:",
    name: "email",
  },
  {
    placeholder: "Password:",
    name: "password",
  },
];

const Authorization = ({}) => {
  const { login } = useAuthContext();

  const { onChange, values, errors, checkState, clearState } =
    useInput(initInputsState);

  const { requestApi } = useRequest();

  const handleLogin = async () => {
    try {
      checkState();
      if (!errors) {
        return;
      }
      const response = await requestApi("auth/login", "POST", { ...values });
      login(response.token, response.useId);
    } catch (error) {
      console.log(error);
    }
  };

  //   const loginHandler = async () => {
  //     try {
  //       const data = await request(
  //         "http://localhost:5000/api/auth/login",
  //         "POST",
  //         { ...form }
  //       );
  //       auth.login(data.token, data.userId);
  //     } catch (e) {}
  //   };

  return (
    <div className={styles.container}>
      <Widget>
        <div className={styles.wrap}>
          <p className={styles.title}>Авторизація:</p>
          {initInputsState &&
            initInputsState.map((input) => {
              return (
                <Input
                  key={input.name}
                  placeholder={input.placeholder}
                  name={input.name}
                  onChange={onChange}
                  value={values[input.name]}
                  error={errors[input.name]}
                />
              );
            })}
          <Button onClick={handleLogin}>Залогуватися</Button>
          <Button onClick={requestApi}>Зареєструватися</Button>
        </div>
      </Widget>
    </div>
  );
};

export default Authorization;
