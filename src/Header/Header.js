import React, { useEffect } from "react";
import "./Header.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BiMessageAdd } from "react-icons/bi";
import { AiOutlineLogout } from "react-icons/ai";

const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()

  console.log(location.state,"locationHeader")
  const loginVerification = location?.state?.loginVerification
  const loginId = location?.state?.loginId
  useEffect(() => {
    !loginVerification && navigate("/")
    console.log("first")
  },[])
  function additem() {
    navigate("/additem", { state: { loginId: location.state,loginVerification } });
  }
  function onClickLogo() {
    loginId
      ? navigate("/display", { state: { loginId,loginVerification} })
      : navigate("/", { state: { loginId,loginVerification } });
  }
  const moveToLoginPage = () => {
    navigate('/');
  }
  const path = location.pathname;
  return (
    <main>
      <header className="header-main">
        <div>
          <img
            src="/images/Divum_Logo1.svg"
            alt=""
            className="img"
            onClick={onClickLogo}
          />
        </div>
        <div className="icons">
          {(path === "/" || path === "/display" || path === "/sdisplay") && (
            <BiMessageAdd
              className="icons-img"
              role="button"
              onClick={additem}
            />
          )}
          <button className="logoutButton" onClick={moveToLoginPage}> Logout <span ><AiOutlineLogout className="logout-img"/></span> </button>
        </div>
      </header>
    </main>
  );
};

export default Header;
