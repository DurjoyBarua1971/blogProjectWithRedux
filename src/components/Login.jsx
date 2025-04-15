import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignInForm, SignUpForm } from ".";
import { useSelector } from "react-redux";
import { CurrentUser } from "../../features/loginInfoSlice";

export default function Login() {
  const [toogle, setToggle] = useState(true);
  const navigate = useNavigate();
  const isLogged = Boolean(useSelector(CurrentUser).email);
  const handleBtnClicked = () => {
    setToggle(!toogle);
  };
  
  return (
    <>
      {toogle && <SignInForm handleBtnClicked={handleBtnClicked} />}
      {!toogle && <SignUpForm handleBtnClicked={handleBtnClicked} />}
      { isLogged &&
        <h1 className="text-center">
          {" "}
          You Should Not Be Here ☹️.{" "}
          <span
            className="text-red-500 underline hover:cursor-pointer"
            onClick={() => navigate("/")}
          >Click Me</span>{" "} to Return Home
        </h1>
      }
    </>
  );
}
