import React, { useEffect, useState } from "react";
import { RiContactsFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import "./SetPassword.css";
import { BiSolidShow } from "react-icons/bi";
import { BsEyeSlashFill } from "react-icons/bs";

const SetPassword = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState({
    first:false,
    second:false
  });
  const [email,setEmail] = useState();
  const [password,setPassword] = useState({
    firstPassword:'',
    secondPassword:''
  })
  const [passwordError,setPasswordError] = useState();

  function movetoHomePage() {
    navigate("/");
  }
  function visibleHandeler(value) {
    setVisible((visible) => ({
      ...visible,
      [value]:!visible?.[value]
    }))
  }
  function handelInputChange(e){
     const {name,value} = e.target
     console.log(name,value,"nv")
     setPassword((prevemail) => ({
      ...prevemail,
      [name]:value
     }))
  }

  useEffect(() => {
    setEmail(window.location.href.split('?')[1]);
  })
  function handelSubmitFun(){
    console.log("first")
    if(password.firstPassword != password.secondPassword){
      console.log("inside")
       setPasswordError("Password didn't Match")
    }
    else
    setPasswordError('')
  }
  return (
    <main className="main-conn">
      <div >
        <div className="header-rp">
          <img
            src="/images/divum.png"
            alt=""
            width={100}
            onClick={movetoHomePage}
            className="diuvum-rp"
          />
          <RiContactsFill className="contact-img" />
        </div>
        <div className="main-sp">
          <p className="heading-sp">Reset Account Password</p>
          <p className="name-sp">Enter a New Password For {email} </p>
          <div className="single-container">
              <div className="relative">
                <input
                  type={visible?.first ? "text" : "password"}
                  className="first-name"
                  placeholder="Password"
                  value={password?.firstPassword}
                  name="firstPassword"
                  data-testid="password-id"
                  onChange={handelInputChange}
                />
                {visible?.first ? (
                  <BiSolidShow className="view1" onClick={() => visibleHandeler("first")} />
                ) : (
                  <BsEyeSlashFill className="view1" onClick={() => visibleHandeler("first")} />
                )}
                
              </div>
            </div>
            <div className="single-container">
              <div className="relative">
                <input
                  type={visible?.second ? "text" : "password"}
                  className="first-name"
                  placeholder="Confirm Password"
                  value={password?.secondPassword}
                  name="secondPassword"
                  data-testid="password-id"
                  onChange={handelInputChange}
                />
                {visible.second ? (
                  <BiSolidShow className="view1" onClick={() => visibleHandeler("second")} />
                ) : (
                  <BsEyeSlashFill className="view1" onClick={() => visibleHandeler("second")} />
                )}
                {passwordError && (
                  <p
                    style={{ color: "red", font: "1rem Roboto, sans-serif" }}
                  >{passwordError}</p>
                )}
              </div>
            </div>
            <button className="submit-button" onClick={handelSubmitFun}>Submit</button>
        </div>
      </div>
    </main>
  );
};

export default SetPassword;