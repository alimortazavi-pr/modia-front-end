import * as yup from "yup";

export const postValidator = yup.object().shape({
  content: yup.string().required().max(255),
});
