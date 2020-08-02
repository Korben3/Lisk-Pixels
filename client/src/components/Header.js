import React from "react";
import "./Header.css";
import liskPixelsLogo from "../assets/liskPixels.png";

const Header = () => {
  return (
    <div className="Header">
      <img src={liskPixelsLogo} alt="Lisk Pixels" />
    </div>
  );
};
export default Header;
