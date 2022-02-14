import * as yup from "yup";

export const profileValidator = yup.object().shape({
  name: yup.string().required().max(50),
  username: yup.string().required().max(100),
  email: yup.string().required().email(),
  bio: yup.string().max(255),
  website: yup.string().url().nullable(),
  birthday: yup.date(),
});
