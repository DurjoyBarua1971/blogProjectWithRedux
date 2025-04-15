import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { CurrentUser } from "../features/loginInfoSlice";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../features/postInfoSlice";

//* npm install formik --save
//* npm install yup --save

export default function MyPost({ handleBtnClicked }) {
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

  const userByLogged = useSelector(CurrentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validate = (values) => {
    const errors = {};
    if (!values.title) {
      errors.title = "Required";
    } else if (values.title.trim().length > 15) {
      errors.title = "Must be 15 characters or less";
    }

    if (!values.text) {
      errors.text = "Required";
    }

    if (!values.username) {
      errors.username = "Please Login Before Posting Any Blog";
    }

    return errors;
  };

  // Pass the useFormik() hook initial form values and a submit function that will be called when the form is submitted
  const formik = useFormik({
    initialValues: {
      title: "",
      text: "",
      username: userByLogged.username,
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      Toast.fire({
        icon: "success",
        title: "Posted Successfully !!",
      });

      dispatch(addPost({ ...values }));
      resetForm();
      navigate("/");
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
            (formik.touched.title && formik.errors.title) ||
            (formik.touched.text && formik.errors.text) ||
            formik.errors.username
              ? "text-red-500"
              : "text-blue-500"
          }`}
        >
          My Post
        </h2>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Post Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Enter your post title"
            className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
          />
          {formik.touched.title && formik.errors.title ? (
            <div className="text-red-500 text-sm mt-1 ml-2">
              {formik.errors.title}
            </div>
          ) : null}
        </div>

        {/* -------------------------------------------------------------- */}

        <div className="mb-4">
          <label
            htmlFor="text"
            className="block text-sm font-medium text-gray-700"
          >
            Post Text
          </label>
          <textarea
            id="text"
            name="text"
            placeholder="Enter your post text"
            className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.text}
          />
          {formik.touched.text && formik.errors.text ? (
            <div className="text-red-500 text-sm mt-1 ml-2">
              {formik.errors.text}
            </div>
          ) : null}
        </div>

        {/* -------------------------------------------------------------- */}

        <div className="mb-6">
          <label
            htmlFor="Posted By"
            className="block text-sm font-medium text-gray-700"
          >
            Posted By
          </label>
          <input
            readOnly
            id="username"
            name="username"
            type="username"
            className="mt-1 p-1 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-200 font-fredoka text-red-600 text-center"
            value={userByLogged.username}
          />
          {formik.errors.username ? (
            <div className="text-red-500 text-sm mt-1 ml-2">
              {formik.errors.username}
            </div>
          ) : null}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

/*

    {
      title: "React Native",
      text: "I am exploring React Native",
      username: "fk19",
      reactionHub: [
        { emojiId: 1, emoji: "✔️", counter: 10 },
        { emojiId: 2, emoji: "❌", counter: 0 },
      ],
      reactedBy: ["fk11"],
      reactionMap: {},
      postId: 1,
    }

    addPost: (state, action) => {
      state.posts.push({ ...action.payload, postId: nanoid() });
    },
    
    
*/
