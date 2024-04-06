import { LoginValues } from "./login-page";
import { RegisterValues } from "./register-page";

export type ValidateErrors = {
  [key: string]: string;
};

function isEmail(email: string) {
  const pattern = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
  return pattern.test(email);
}

export const loginValidator = ({ email, password }: LoginValues) => {
  const errors: ValidateErrors = {};

  if (!email) {
    errors.email = "Email should not be empty";
  }

  if (!isEmail(email)) {
    errors.email = "Email is not valid";
  }

  if (password.length < 4) {
    errors.password = "Password needs 4+ characters";
  }

  return errors;
};

export const registerValidator = ({
  email,
  password,
  password2,
  room,
  login,
}: RegisterValues) => {
  const errors: ValidateErrors = { ...loginValidator({ email, password }) };

  if (login.length < 1) {
    errors.login = "Login should not be empty";
  }

  if (password2 !== password) {
    errors.password = "Passwords do not match";
  }

  if (room.length < 1) {
    errors.room = "Room should not be empty";
  }

  return errors;
};
