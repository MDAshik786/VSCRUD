import React from "react";
import "./Header.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BiMessageAdd } from "react-icons/bi";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  function additem() {
    navigate("/additem", { state: { loginId: location.state } });
  }
  function onClickLogo() {
    location.state
      ? navigate("/display", { state: { loginId: location.state } })
      : navigate("/", { state: { loginId: location.state } });
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
        </div>
      </header>
    </main>
  );
};

export default Header;
