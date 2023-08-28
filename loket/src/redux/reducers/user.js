import { types } from "./types";

const init_state = {
  id: 0,
  fullname: "",
  email: "",
  password: "",
  referralCode: "",
<<<<<<< Updated upstream
  credit: "",
=======
  referralCodeFromFriend: "",
  credit: 0,
  participants: [],
  isAuthenticated: false,
>>>>>>> Stashed changes
};

export const userReducer = (state = init_state, action) => {
  if (action.type === types.login) {
    return {
      ...state,
      id: action.payload.id,
      fullname: action.payload.fullname,
      email: action.payload.email,
<<<<<<< Updated upstream
      credit: action.payload.credit,
      referralCode: action.payload.referralCode,
=======
      password: action.payload.password,
      referralCode: action.payload.referralCode,
      referralCodeFromFriend: action.payload.referralCodeFromFriend,
      credit: action.payload.credit,
      participants: action.payload.participant,
      isAuthenticated: action.payload.isAuthenticated,
>>>>>>> Stashed changes
    };
  } else if (action.type === types.logout) return init_state;
  return state;
};
