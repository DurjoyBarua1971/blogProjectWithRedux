import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { addUser, AllUsersInfo } from "../../features/loginInfoSlice";
import { useDispatch, useSelector } from "react-redux";

//* npm install formik --save
//* npm install yup --save

export default function SignUpForm({ handleBtnClicked }) {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-right",
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  const navigate = useNavigate();
  const allUserInfo = useSelector(AllUsersInfo);
  const dispatch = useDispatch();
  const isValidEmail = (email) => {
    let flag = false;
    allUserInfo.map((user) => {
      if (user.email === email) flag = true;
    });
    return flag;
  };

  const isValidUserName = (userName) => {
    let flag = false;
    allUserInfo.map((user) => {
      if (user.username === userName) flag = true;
    });
    return flag;
  };

  const validate = (values) => {
    const errors = {};
    if (!values.userName) {
      errors.userName = "Required";
    } else if (values.userName.trim().length > 10) {
      errors.userName = "Must be 10 characters or less";
    }

    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.trim().length <= 3) {
      errors.password = "Atleast 4 Characters";
    }

    return errors;
  };

  // Pass the useFormik() hook initial form values and a submit function that will be called when the form is submitted
  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      alert(JSON.stringify(values, null, 2));
      if (isValidEmail(values.email)) {
        Toast.fire({
          icon: "error",
          title: "This Email Is Already Taken",
        });
      } else if (isValidUserName(values.userName)) {
        Toast.fire({
          icon: "error",
          title: "This UserName Is Already Taken",
        });
      } else {
        Toast.fire({
          icon: "success",
          title: "Sign Up Successfully !!",
        });
        dispatch(
          addUser({
            email: values.email,
            username: values.userName,
            password: values.password,
          })
        );
        navigate("/login");
        resetForm();
        handleBtnClicked();
      }
    },
  });

  return (
    <div className="flex justify-center items-center mt-40">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-[#f3f1f0] px-8 py-6 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2
          className={`text-2xl font-bold mb-6 text-center ${
            (formik.touched.userName && formik.errors.userName) ||
            (formik.touched.email && formik.errors.email) ||
            (formik.errors.password && formik.touched.password)
              ? "text-red-500"
              : "text-blue-500"
          }`}
        >
          Sign Up
        </h2>
        <div className="mb-4">
          <label
            htmlFor="userName"
            className="block text-sm font-medium text-gray-700"
          >
            User Name
          </label>
          <input
            id="userName"
            name="userName"
            type="text"
            placeholder="Enter your user name"
            className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.userName}
          />
          {formik.touched.userName && formik.errors.userName ? (
            <div className="text-red-500 text-sm mt-1 ml-2">
              {formik.errors.userName}
            </div>
          ) : null}
        </div>

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
            placeholder="Enter your email"
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
            placeholder="Enter your password"
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
          Already Have An Account?{" "}
          <button
            onClick={handleBtnClicked}
            className="text-blue-500 hover:text-blue-700 hover:underline hover:font-medium hover:cursor-pointer"
          >
            Sign In
          </button>
        </h1>
      </form>
    </div>
  );
}
