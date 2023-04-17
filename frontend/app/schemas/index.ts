import * as yup from "yup";

// This contains the validation schema for Yup, which is for frontend validation
// on the signup page. 
export const signupSchema = yup.object().shape({
  email: yup.string().email("Invalid email format").required("Required"),
  name: yup.string().required("Required"),
  password: yup.string().required("Required").min(3, "Minimum 3 characters!"),
});
