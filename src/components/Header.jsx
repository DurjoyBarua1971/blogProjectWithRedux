import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { clearUser, CurrentUser } from "../../features/loginInfoSlice";

export default function Header() {
  const logged = useSelector(CurrentUser).email;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <div className="sticky px-14 top-0 py-3 backdrop-blur-lg border-b-2 border-b-stone-400/80">
        <div className="flex gap-4 justify-around container max-w-md mx-auto font-fredoka">
          <NavLink 
          to=""
          className={ ({isActive}) => {
            return `${isActive ? "text-teal-700 font-inter font-bold text-lg" : "text-black font-inter font-bold text-lg"}`;
          }}
          >Home</NavLink>
          <NavLink to="post" className={ ({isActive}) => {
            return `${isActive ? "text-teal-700 font-inter font-bold text-lg" : "text-black font-inter font-bold text-lg"}`;
          }}>Post</NavLink>
          {!logged && <NavLink to="login" className={ ({isActive}) => {
            return `${isActive ? "text-teal-700 font-inter font-bold text-lg" : "text-black font-inter font-bold text-lg"}`;
          }}>Sign In</NavLink>}
          {logged && <button className="text-black font-inter font-bold text-lg" onClick={() => {dispatch(clearUser()); navigate("/")}}>Sign Out</button>}
        </div>
      </div>
    </>
  );
}
