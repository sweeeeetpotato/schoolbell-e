import React from "react";
import styles from "../styles/userInfo.module.css";

export default function UserInfo({ confirmedUserInfo }) {
  const maskPassword = (password) => {
    const visibleChars = 3;
    const maskedPart = "*".repeat(password.length - visibleChars);
    const visiblePart = password.substring(0, visibleChars);
    return visiblePart + maskedPart;
  };

  return (
    <section className={styles.userInfoBox}>
      {confirmedUserInfo.map((info, idx) => (
        <div key={idx}>
          <p>
            <span className={styles.boldSpan}>Name</span> : {info.name}
          </p>
          <p>
            <span className={styles.boldSpan}>Password</span> :
            {" " + maskPassword(info.password)}
          </p>
        </div>
      ))}
    </section>
  );
}
