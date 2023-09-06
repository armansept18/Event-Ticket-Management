import { api } from "../../api/axios";
import { types } from "../reducers/types";

export const userLogin = (values) => {
  return async (dispatch) => {
    try {
      const res = await api.post("/users/v2", {
        ...values,
      });

      // if (!res.data.id) throw new Error("wrong username/password");

      const user = res.data.token;
      localStorage.setItem("auth", res.data.token);
      console.log(res.data.token, "token");
      dispatch({
        type: types.login,
        payload: user,
      });

      return types.succes;
    } catch (err) {
      localStorage.removeItem("auth");
      if (err.response && err.response.data) {
        return err.response.data;
      } else {
        // Handle the error when there is no response property or data property
        console.error("Error:", err);
        return "An error occurred";
      }
    }
  };
};
