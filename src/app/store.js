import { configureStore } from "@reduxjs/toolkit";
import loginInfoReducer from "../../features/loginInfoSlice";
import postInfoReducer from "../../features/postInfoSlice";

export const store = configureStore({
    reducer: {
        loginInfo: loginInfoReducer,
        postInfo: postInfoReducer,
    }
})