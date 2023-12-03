import React, { useState } from "react";
import styles from "../styles/form.module.css";
import { MIN_NAME_LENGTH, MIN_PASSWORD_LENGTH } from "../constants";

export default function Form({
  info,
  idx,
  pendingUserInfo,
  setPendingUserInfo,
}) {
  const [errors, setErrors] = useState({
    name: {
      length: false,
      required: false,
    },
    password: {
      length: false,
      required: false,
    },
  });
  const { name, password } = info;
  const isDuplicateName =
    pendingUserInfo.filter((info) => info.name === name).length > 1;

  const handleFormRemove = (idx) => {
    const updateInfo = [...pendingUserInfo];
    updateInfo.splice(idx, 1);
    setPendingUserInfo(updateInfo);
  };

  const handleInputChange = (idx, field, value) => {
    const newUserInfo = [...pendingUserInfo];
    newUserInfo[idx] = { ...newUserInfo[idx], [field]: value };
    setPendingUserInfo(newUserInfo);
    const MIN_LENGTH = field === "name" ? MIN_NAME_LENGTH : MIN_PASSWORD_LENGTH;

    setErrors((prev) => ({
      ...prev,
      [field]: {
        length: value.length > 0 && value.length < MIN_LENGTH,
        required: value.length === 0,
      },
    }));
  };

  const getLengthErrorMessage = (type, length) => {
    return (
      <p className={styles.errorText}>
        {type} must be at least {length} characters long.
      </p>
    );
  };

  const getRequiredErrorMessage = (type) => {
    return <p className={styles.errorText}>{type} is required.</p>;
  };

  return (
    <form className={styles.form} key={idx}>
      <h3 className={styles.title}>User - {idx}</h3>
      <label htmlFor={`name${idx}`}>Name</label>
      <input
        type="text"
        name={`name${idx}`}
        id={`name${idx}`}
        onChange={(e) => handleInputChange(idx, "name", e.target.value)}
        value={name}
        className={
          errors.name.length || errors.name.required || isDuplicateName
            ? styles.inputError
            : ""
        }
      />
      {errors.name.length && getLengthErrorMessage("Name", MIN_NAME_LENGTH)}
      {errors.name.required && getRequiredErrorMessage("Name")}
      {isDuplicateName && (
        <p className={styles.errorText}>The name '{name}' is duplicated.</p>
      )}
      <label htmlFor={`password${idx}`}>Password</label>
      <input
        type="password"
        name={`password${idx}`}
        id={`password${idx}`}
        onChange={(e) => handleInputChange(idx, "password", e.target.value)}
        value={password}
        className={
          errors.password.length || errors.password.required
            ? styles.inputError
            : ""
        }
      />
      {errors.password.length &&
        getLengthErrorMessage("Password", MIN_PASSWORD_LENGTH)}
      {errors.password.required && getRequiredErrorMessage("Password")}
      <button
        type="button"
        className={styles.closeBtn}
        onClick={() => handleFormRemove(idx)}
      >
        ✖
      </button>
    </form>
  );
}
