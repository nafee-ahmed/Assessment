import { AuthActions, AuthState } from "../models/AuthContextTypes";

// This is the reducer for AuthContext
// and updates states for AUthContext accordingly
export const AuthReducer = (state: AuthState, action: AuthActions) => {
  switch (action.type) {
    case "AUTH_START":
      return {
        user: null,
        loading: true,
        error: null,
      };
    case "AUTH_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case "AUTH_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: null,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "ADD_USER":
      return {
        ...state,
        id: action.payload,
      };
    default:
      console.log("Auth Reducer Error");
      return state;
  }
};
