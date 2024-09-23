import styles from "../styles/SuccessMessage.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";

const ErrorIndicator = ({ showErrorMessage, showSuccessMessage, msgText }) => {
  console.log("SuccessIndicator rendering: ", showSuccessMessage);
  console.log("msgText:", msgText);

  return (
    <>
      <div className={showErrorMessage ? styles.show : styles.hide}>
        <div
          className={`${styles.successMsgContainer} ${styles.errorMsgContainer}`}
        >
          <Image src="/after_ohno.gif" height={80} width={80} />
          <p className={styles.successMessage}>{msgText}</p>
        </div>
      </div>
    </>
  );
};

export default ErrorIndicator;
