import { useState, useCallback } from "react";

const apiUrl = process.env.REACT_APP_BASE_URL;

const useRequest = (token = null) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const requestApi = useCallback(
    async (url = "", method = "GET", data = null) => {
      let bufferData = data;
      document.body.style.cursor = "wait ";
      setIsLoading(true);
      setIsError(null);
      let fetchUrl = `${apiUrl}/${url}`;
      if (method === "GET" && bufferData) {
        let params = new URLSearchParams();
        let keys = Object.keys(bufferData);
        keys.forEach((key) => {
          params.append(key, bufferData[key]);
        });
        fetchUrl = fetchUrl + "?" + params.toString();
      }

      let headers = token ? { authorization: `Bearer ${token}` } : {};

      headers["Content-Type"] = "application/json";

      let fetchObj = { method: method };
      if (headers) {
        fetchObj = { ...fetchObj, headers };
      }

      if (method === "POST" && bufferData) {
        fetchObj = { ...fetchObj, body: JSON.stringify(bufferData) };
      }

      const response = await fetch(fetchUrl, fetchObj);

      const result = await response.json();
      document.body.style.cursor = "auto ";
      setIsLoading(false);
      if (response.status !== 200) {
        throw { ...result, status: response.status };
      }
      return { ...result, status: response.status };
    },
    [token]
  );
  // const requestApi = useCallback(
  //   async (url = "", method = "GET", data = null) => {
  //     try {
  //       let bufferData = data;
  //       document.body.style.cursor = "wait ";
  //       setIsLoading(true);
  //       setIsError(null);
  //       let fetchUrl = `${apiUrl}/${url}`;
  //       if (method === "GET") {
  //         let params = new URLSearchParams();
  //         let keys = Object.keys(bufferData);
  //         keys.forEach((key) => {
  //           params.append(key, bufferData[key]);
  //         });
  //         fetchUrl = fetchUrl + "?" + params.toString();
  //       }

  //       let headers = token ? { authorization: `Bearer ${token}` } : {};

  //       headers["Content-Type"] = "application/json";

  //       let fetchObj = { method: method };
  //       if (headers) {
  //         fetchObj = { ...fetchObj, headers };
  //       }

  //       if (method === "POST" && bufferData) {
  //         fetchObj = { ...fetchObj, body: JSON.stringify(bufferData) };
  //       }

  //       const response = await fetch(fetchUrl, fetchObj);

  //       if (response.status !== 200) {
  //         throw response;
  //       }
  //       const result = await response.json();
  //       return { ...result, status: response.status };
  //     } catch (error) {
  //       const result = await error.json();
  //       // (error);
  //       return { ...result, status: error.status };
  //     } finally {
  //       document.body.style.cursor = "auto ";
  //       setIsLoading(false);
  //     }

  //     // return { ...result, status: response.status };
  //   },
  //   [token]
  // );

  return { isLoading, isError, requestApi };
};

export default useRequest;
