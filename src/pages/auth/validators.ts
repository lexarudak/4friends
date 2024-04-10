import { LoginValues } from "./login-page";
import { RegisterValues } from "./register-page";

export type ValidateErrors = {
  [key: string]: string;
};

export const getError = (validateError?: string, serverError?: string) =>
  validateError || serverError;

function isEmail(email: string) {
  const pattern = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
  return pattern.test(email);
}

export const roomValidator = ({ room }: { room: string }) => {
  const errors: ValidateErrors = {};

  if (room.length < 1) {
    errors.room = "Room should not be empty";
  }

  return errors;
};

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
  checkbox,
}: RegisterValues) => {
  const errors: ValidateErrors = {
    ...loginValidator({ email, password }),
    ...roomValidator({ room }),
  };

  if (login.length < 1) {
    errors.login = "Username should not be empty";
  }

  if (password2 !== password) {
    errors.password = "Passwords do not match";
  }

  if (!checkbox) {
    errors.checkbox = "Should be accepted to proceed";
  }

  return errors;
};
