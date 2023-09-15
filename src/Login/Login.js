import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { emailRegex } from "../Validation/Regex";
import { apiUrl } from "../Constrains/URL";
import { BiSolidShow } from "react-icons/bi";
import { BsEyeSlashFill } from "react-icons/bs";
//nvm install 18.17.0
const Login = () => {
  const [loginError, setLoginError] = useState({});
  const [visible, setVisible] = useState(false);
  const [login, setlogin] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const userLogin = async (email, password) => {
    try {
      const responseLogin = await axios.post(
        `${apiUrl}/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (responseLogin.data === "admin") {
        navigate("/display", { state: { loginId: true } });
      } else if (responseLogin.data === "Incorrect Password")
        setLoginError((loginError) => ({
          ...loginError,
          password: responseLogin.data,
        }));
      else if (
        responseLogin.data === "Incorrect Password" ||
        responseLogin.data === "Invalid User"
      )
        setLoginError((loginError) => ({
          ...loginError,  
          password: responseLogin.data,
        }));
      else {
        navigate("/single", {
          state: { singleData: responseLogin.data, loginId: false },
        });
      }
      return responseLogin.data;
    } catch (error) {
      console.log(error);
    }
  };
  let Required = true,
    Incorrect = true;
  let errorValidation = {};
  function handelLoginForm(e) {
    const { name, value } = e.target;
    setlogin((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setLoginError((prevState) => {
      const updateData = prevState ? { ...prevState } : {};
      updateData[name] = "";
      return updateData;
    });
  }
  function loginForm(e) {
    e.preventDefault();
    errorValidation = {};
    if (login.email === "") {
      Required = false;
      errorValidation.email = "Email is Required";
    } else if (Required && !emailRegex.test(login.email)) {
      Incorrect = false;
      errorValidation.email = "Invalid Email";
    }
    if (login.password === "") {
      Required = false;
      errorValidation.password = "Password Required";
    }
    setLoginError((loginError) => ({
      ["email"]: errorValidation.email,
      ["password"]: errorValidation.password,
    }));

    if (Required && Incorrect) {
      userLogin(login.email, login.password);
    }
  }
  function moveToFromPage() {
    navigate("/additem", { state: { loginId: false } });
  }
  function visibleHandeler() {
    setVisible(!visible);
  }
  function moveToForgetPage(){
    navigate("/resetPassword")
  }
  return (
    <div className="main-form">
      <div>
        <form action="" className="form-data" onSubmit={loginForm}>
          <div className="flex-content">
            <div>
              <img src="/images/divum.png" alt="" className="img-logo" />
            </div>
            <p className="form-heading">LogIn</p>
            <div className="relative">
              <input
                type="text"
                className="input-element"
                placeholder="Email"
                autoFocus
                value={login.email}
                onChange={handelLoginForm}
                name="email"
              ></input>
              <p className="error-message">{loginError?.email}</p>
            </div>
            <div className="relative">
              <input
                type={visible ? "text" : "password"}
                className="input-element"
                placeholder="Password"
                autoFocus
                name="password"
                value={login.password}
                onChange={handelLoginForm}
                autoComplete="off"
              ></input>
              <p className="forget" onClick={moveToForgetPage}>Forget Password?</p>
              <p className="error-message">{loginError?.password}</p>
              {visible ? (
                <BiSolidShow className="view-icon1" onClick={visibleHandeler} />
              ) : (
                <BsEyeSlashFill
                  className="view-icon"
                  onClick={visibleHandeler}
                />
              )}
            </div>
            
            <div className="button-class">
              <button className="login-button">LOGIN</button>
              <p className="not-register">
                Not Registered?/
                <span className="sign-up" onClick={moveToFromPage}>
                  Sign Up
                </span>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;