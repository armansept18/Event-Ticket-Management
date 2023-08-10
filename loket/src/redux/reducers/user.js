import { types } from "./types";

const init_state = {
  id: 0,
  name: "",
  email: "",
  password: "",
  referralCode: "",
};

export const userReducer = (state = init_state, action) => {
  if (action.type === types.login) {
    return {
      ...state,
      id: action.payload.id,
      fullname: action.payload.fullname,
      email: action.payload.email,
    };
  } else if (action.type === types.logout) return init_state;
  return state;
};
