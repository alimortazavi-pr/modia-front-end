import * as yup from "yup";

export const registerValidator = yup.object().shape({
  name: yup.string().required().max(50),
  email: yup.string().required().email(),
  password: yup.string().min(8),
});

export const loginValidator = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().min(8),
});

export const forgetPasswordValidator = yup.object().shape({
  email: yup.string().required().email(),
});

export const resetPasswordValidator = yup.object().shape({
  email: yup.string().required().email(),
  token: yup.string().required(),
  password: yup.string().min(8),
});
