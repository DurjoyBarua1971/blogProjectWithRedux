import { createSlice } from "@reduxjs/toolkit";

const usersFromStorage = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];
const userLS = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : { email: "", username: "" };
const initialState = {
  users: usersFromStorage,
  user: userLS,
};

console.log(usersFromStorage, userLS);

export const loginInfoSlice = createSlice({
  name: "loginInfo",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
      localStorage.setItem('users', JSON.stringify(state.users));
    },
    setUser: (state, action) => {
      state.user.email = action.payload;
      const foundUser = state.users.find(user => user.email === action.payload);
      if (foundUser) {
        state.user.username = foundUser.username;
      }
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    clearUser: (state) => {
      state.user.email = "";
      state.user.username = "";
      localStorage.setItem('user', JSON.stringify(state.user));
    },
  },
});

export const AllUsersInfo = (state) => state.loginInfo.users;
export const CurrentUser = (state) => state.loginInfo.user;

export const { addUser, setUser, clearUser } = loginInfoSlice.actions;
export default loginInfoSlice.reducer;
