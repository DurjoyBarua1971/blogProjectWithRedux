import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AllUsersInfo, CurrentUser, setUser } from "../../features/loginInfoSlice";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function SignInForm({ handleBtnClicked }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allUserInfo = useSelector(AllUsersInfo);
  const isLogged = Boolean(useSelector(CurrentUser).email);


const isValid = (email, password) => {
    return allUserInfo.some((user) => user.email === email && user.password === password);
};

const isExist = (email) => {
    return allUserInfo.some((user) => user.email === email);
};

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Use Valid Email Format";
    }

    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length <= 4) {
      errors.password = "invalid password";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      if (isValid(values.email, values.password)) {
        Swal.fire({
            html: '<span class="text-green-700 font-fredoka font-medium" >Signed In Successfully</span>',
            icon: "success",
            showConfirmButton: false,
            timer:1500
          });
        dispatch(setUser(values.email));
        navigate("/");
        resetForm();
      } else {
        if (isExist(values.email)) Swal.fire({
            html: '<span class="text-red-600 font-fredoka font-medium" >Password Is Wrong ....</span>',
            icon: "error",
            showConfirmButton: false,
            timer:2000
          });
        else Swal.fire({
            html: '<span class="text-red-600 font-fredoka font-medium" >Account Not Found</span>',
            icon: "error",
            showConfirmButton: false,
            timer:2000
          });
        resetForm();
      }
    },
  });

  return (
    <div className="flex justify-center items-center mt-40">

      {!isLogged && (
        <form
          onSubmit={formik.handleSubmit}
          className={`bg-[#f0efe4] px-8 py-6 rounded-lg shadow-md w-full max-w-sm `}
        >
          <h2
            className={`text-2xl font-bold mb-6 text-center ${
              (formik.touched.email && formik.errors.email) ||
              (formik.errors.password && formik.touched.password)
                ? "text-red-500"
                : "text-blue-500"
            }`}
          >
            Sign In
          </h2>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Your email"
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm mt-1 ml-2">
                {formik.errors.email}
              </div>
            ) : null}
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Your password"
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-sm mt-1 ml-2">
                {formik.errors.password}
              </div>
            ) : null}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
          <h1 className="text-center mt-5">
            Don't have an account?{" "}
            <span
              onClick={handleBtnClicked}
              className="text-blue-500 hover:text-blue-700 hover:underline hover:font-medium hover:cursor-pointer"
            >
              Sign Up
            </span>
          </h1>
        </form>
      )}
    </div>
  );
}
