import styles from "./AddLink.module.css";
import { Fade } from "react-awesome-reveal";
import { useState } from "react";
import { Widget, Input, Button, Alert } from "../../templates/ui";
import useInput from "../../hooks/useInput.hook";
import useRequest from "../../hooks/useRequestApi.hook";
import { useAuthContext } from "../../hooks/useAuthContext.hook";
const initInputsState = [
  {
    placeholder: "Url:",
    name: "url",
  },
];

const AddLink = () => {
  const { token } = useAuthContext();
  const { requestApi } = useRequest(token);
  const { onChange, values, errors, checkState, clearState } =
    useInput(initInputsState);

  const [alertBody, setAlertBody] = useState(null);

  const pressHandler = async (event) => {
    try {
      checkState();
      if (!errors) {
        return;
      }
      const response = await requestApi("link/addlink", "POST", { ...values });

      setAlertBody(response);
    } catch (e) {
      setAlertBody(e);
      console.log(e);
    }
    finally {
      clearState()      
    }
  };

  return (
    <>
      <div className={styles.container}>
        <Widget>
          <div className={styles.addForm}>
            <div className="addForm-box">
              <h2 className={styles.title}>Додати посилання:</h2>
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
              <div className={styles.buttonWrap}>
                <Button onClick={pressHandler}>Створити</Button>
              </div>
            </div>
          </div>
        </Widget>
      </div>
      <Alert
        message={alertBody?.message}
        type={alertBody?.status === 200 ? "success" : "error"}
      />
    </>
  );
};
export default AddLink;
