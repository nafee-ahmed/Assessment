"use client";
import { Formik, FormikProps, useFormik } from "formik";
import Image from "next/image";
import signUp from "../../public/signUp.png";
import AuthButton from "../components/AuthButton";
import InputField from "../components/InputField";
import { useAuth } from "../hooks/useAuth";
import { signupSchema } from "../schemas";
import Loading from "./loading";

// IValues corresponds to formik's form's input types.
// Formik is used to do frontend custom validation
// Backend validation is also done.
// For both frontend and backend validation, the error messages are shown on the page.
// Yup is used for the schema of frontend validation, signupSchema
// and formik takes care of the ui and displaying of error messages for it.
interface IValues {
  email: string;
  name: string;
  password: string;
}

const SignupPage: React.FC = () => {
  // useAuth is a custom hook has all logic for auth, and separates the logic
  const { signupHandler, error } = useAuth();
  const {
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    isSubmitting,
  }: FormikProps<IValues> = useFormik<IValues>({
    initialValues: { email: "", name: "", password: "" },
    validationSchema: signupSchema,
    onSubmit: async (values, actions) => {
      await signupHandler(values);
      actions.resetForm();
    },
  });

  return (
    <div className="h-screen flex justify-start items-center">
      {/* form */}
      <div className="w-full mx-8 gap-8 flex flex-col items-start">
        <img
          src="https://matchub.co/wp-content/uploads/2020/03/matchub_blackwords_highres-e1584588152685-2048x1106.png"
          className="w-20 animate-bounce"
          alt=""
        />
        <form onSubmit={handleSubmit} className="flex flex-col  w-full gap-3">
          <h1 className="text-2xl font-bold">Welcome to MatchHub!</h1>
          <p className="font-light text-gray-400">
            Join our community that has more than 10000 student clubs to join...
          </p>
          <div>
            <InputField
              label="Email"
              id="email"
              placeholder="john@gmail.com"
              type="text"
              values={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              isRequired={false}
            />
            {errors.email && touched.email && (
              <p className="text-red-500 text-xs italic">{errors.email}</p>
            )}
          </div>
          <div>
            <InputField
              label="Full Name"
              id="name"
              placeholder="John Doe"
              type="text"
              values={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              isRequired={false}
            />
            {errors.name && touched.name && (
              <p className="text-red-500 text-xs italic">{errors.name}</p>
            )}
          </div>
          <div>
            <InputField
              label="Password"
              id="password"
              placeholder="***"
              type="password"
              values={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              isRequired={false}
            />
            {errors.password && touched.password && (
              <p className="text-red-500 text-xs italic">{errors.password}</p>
            )}
            {error && <p className="text-red-500 text-xs italic">{error}</p>}
          </div>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <a
              href="/"
              className="font-medium text-primaryColor hover:underline"
            >
              Login
            </a>
          </p>
          <div className="my-2">
            <AuthButton type="Sign Up" loading={isSubmitting} />
          </div>
        </form>
      </div>
      {/* Image */}
      <div className="hidden md:block h-full md:flex-grow-3 lg:flex-grow-5">
        <Image
          src={signUp}
          alt="sign in"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default SignupPage;
