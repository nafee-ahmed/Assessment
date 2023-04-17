import * as yup from "yup";

export const signupSchema = yup.object().shape({
  email: yup.string().email("Invalid email format").required("Required"),
  name: yup.string().required("Required"),
  password: yup.string().required("Required").min(3, "Minimum 3 characters!"),
});
