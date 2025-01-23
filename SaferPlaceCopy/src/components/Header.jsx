import React from "react";
import styles from "../assets/styles/Header.module.scss";


function Header() {
  
  return (
    <div
      className={`${styles.header_container} d-flex flex-row align-items-center`}
      
    >
    <img src='../saferp_icon.png' alt="SaferPlace icon"/>
    <div>
    {/* App's parameters language change disconnect add emergency number */}
      <ul>
        <li>Parametres</li>
      </ul>
    </div>
    </div>
  );
}

export default Header;
