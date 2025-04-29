import React from "react";
// import loaderAnimation from "../../assets/loadingAnimation.svg";
import styles from "./Loader.module.scss";

function Loader({ name = "Loading..." }) {
  return (
    <div className={styles.loader}>
      <div className={styles.animation}></div>
      <div className={styles.title}>{name}</div>
      {/* <img src={loaderAnimation} /> */}
    </div>
  );
}

export default Loader;
