import { useState, useEffect, useCallback, useMemo } from "react";

const useInput = (initInputs) => {
  let initState = useMemo(() => {
    let obj = {};
    initInputs.forEach(({ name }) => {
      obj[`${name}`] = "";
    });
    return obj;
  }, [initInputs]);

  const [values, setValues] = useState(initState);
  const [errors, setErrors] = useState(initState);

  const onChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      setValues((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: null }));
    },
    [initInputs]
  );

  const clearState = () => {
    setValues(initState);
    setErrors(initState);
  };

  const checkState = useCallback(() => {
    let keys = Object.keys(values);
    keys.forEach((key) => {
      if (!values[key] && values[key] === "") {
        setErrors((prev) => ({ ...prev, [key]: "Error" }));
      }
    });
  }, [initInputs, values]);

  return { onChange, values, errors, clearState, checkState };
};

export default useInput;
