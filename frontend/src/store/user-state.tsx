import userCredentials from "../models/credentialsModel";

export class UserState {
  user: userCredentials | undefined;
}

export enum userActionType {
  login = "login",
  logout = "logout",
}

// how the action will go, to prevent bugs
export interface userAction {
  type: userActionType;
  payload?: any;
}

export function login(user: userCredentials) {
  return {
    type: userActionType.login,
    payload: user,
  };
}

export function logout() {
  return {
    type: userActionType.logout,
    payload: null,
  };
}

export function userReducer(
  prevUser: UserState = new UserState(),
  action: any
) {
  const newUser = { ...prevUser };
  switch (action.type) {
    case userActionType.login:
      newUser.user = action.payload;
      break;
    case userActionType.logout:
      newUser.user = undefined;
  }
  return newUser;
}
