import React from "react";
import styles from "../assets/styles/header.module.css";
import logo from '../assets/icons/logo_mayoo.png'
import { useLocation } from "react-router-dom";
const Header = () => {

    const location = useLocation();
    let pageTitle;

    if(location.pathname === "/quizz") {
        pageTitle = "Liste Quiz Mayoo";
    } else if(location.pathname === "/quizz/new") {
        pageTitle = "Nouveau Quiz";
    } else if(location.pathname.startsWith("/quizz/question")) {
        pageTitle = "Nouvelle question";
    }

  return (
    <div className={styles.header}>
      <div className={styles.nav}>
        <div className={styles.nav_logo}>
          <img
            className={styles.nav_logo_icon}
            src={logo}
            width="45"
            alt=" app Logo"
          />
          <text className={styles.nav_logo_text}>{pageTitle}</text>
        </div>
      </div>
      <div className={styles.line}></div>
    </div>
  );
};

export default Header;
