import React from "react";
import styles from "../assets/styles/header.module.css";
import logo from '../assets/icons/logo_mayoo.png'
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Header = () => {

    const location = useLocation();
    const navigate = useNavigate();
    let pageTitle;

    if(location.pathname === "/quizz" || location.pathname === "/quizz/") {
        pageTitle = "Liste Quiz Mayoo";
    } else if(location.pathname === "/quizz/new") {
        pageTitle = "Nouveau Quiz";
    } else if(location.pathname.startsWith("/quizz/question")) {
        pageTitle = "Nouvelle question";
    } else if(location.pathname.startsWith("/view/quizz")) {
        pageTitle = "Détail du quiz";
    }

    const handleLogoClick = (event) => {
        event.preventDefault();
        navigate("/quizz");
    }

  return (
    <div className={styles.header}>
      <div className={styles.nav}>
        <div className={styles.nav_logo} onClick={handleLogoClick}>
          <img
            className={styles.nav_logo_icon}
            src={logo}
            width="45"
            alt=" app Logo"
          />
          <div className={styles.nav_logo_text}>{pageTitle}</div>
        </div>
      </div>
      <div className={styles.line}></div>
    </div>
  );
};

export default Header;
