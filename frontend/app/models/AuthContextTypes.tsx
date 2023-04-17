export interface AuthState {
  user: string | null;
  loading: boolean;
  error: string | null;
  authDispatch?: React.Dispatch<AuthActions>;
  id?: number | null;
}

export type AuthActions =
  | { type: "AUTH_START" }
  | { type: "AUTH_SUCCESS"; payload: string }
  | { type: "AUTH_FAILURE"; payload: string }
  | { type: "LOGOUT" }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "ADD_USER"; payload: number };
