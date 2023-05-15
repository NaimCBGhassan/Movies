// [RESPONSE]
export interface User {
  token: string;
  user: UserData;
}

export interface UserData {
  username: string;
  displayName: string;
  id: string;
}

// [REQUEST]
export interface Body {
  username: string;
  password: string;
}

export interface UserRegister extends Body {
  confirmPassword: string;
  displayName: string;
}

export interface UpdatedPassword extends Body {
  newPassword: string;
  confirmNewPassword: string;
}
