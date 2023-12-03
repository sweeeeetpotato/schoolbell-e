import React, { useEffect, useState } from "react";
import Form from "./Form";
import UserInfo from "./UserInfo";
import styles from "../styles/signUp.module.css";
import { MIN_NAME_LENGTH, MIN_PASSWORD_LENGTH } from "../constants";

export default function SignUp() {
  const [confirmedUserInfo, setConfirmedUserInfo] = useState([]);
  const [pendingUserInfo, setPendingUserInfo] = useState([
    { name: "", password: "" },
  ]);
  const [isInfoValid, setInfoValid] = useState(false);

  const handleSubmitBtnClick = () => {
    setConfirmedUserInfo((prev) => [...prev, ...pendingUserInfo]);
    setPendingUserInfo([{ name: "", password: "" }]);
  };

  const handleAddUserClick = () => {
    setPendingUserInfo((prev) => {
      const updateInfo = [{ name: "", password: "" }];
      return [...prev, ...updateInfo];
    });
  };

  useEffect(() => {
    const isNameValid = pendingUserInfo.every(
      (info) => info.name.length >= MIN_NAME_LENGTH
    );
    const isPasswordValid = pendingUserInfo.every(
      (info) => info.password.length >= MIN_PASSWORD_LENGTH
    );
    const isDuplicateNameExist =
      new Set(pendingUserInfo.map((info) => info.name)).size ===
      pendingUserInfo.length;

    setInfoValid(isNameValid && isPasswordValid && isDuplicateNameExist);
  }, [pendingUserInfo]);

  return (
    <div className={styles.wrapper}>
      {pendingUserInfo.map((info, idx) => (
        <Form
          info={info}
          idx={idx}
          pendingUserInfo={pendingUserInfo}
          setPendingUserInfo={setPendingUserInfo}
          key={idx}
        />
      ))}
      <div className={styles.btnBox}>
        <button
          type="button"
          onClick={handleAddUserClick}
          className={styles.addBtn}
        >
          Add User
        </button>
        <button
          type="button"
          onClick={handleSubmitBtnClick}
          disabled={!isInfoValid}
          className={styles.submitBtn}
        >
          Confirm
        </button>
      </div>
      {confirmedUserInfo.length > 0 && (
        <UserInfo confirmedUserInfo={confirmedUserInfo} />
      )}
    </div>
  );
}
