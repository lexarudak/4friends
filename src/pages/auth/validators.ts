import { LoginValues } from "./login-page";

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
