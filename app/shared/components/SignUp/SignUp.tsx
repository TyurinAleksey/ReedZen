import { toggleAuth } from "@app/store/Slice/authSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

export default function SignUp() {
  const dispatch = useDispatch();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [usernameError, setUserNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    number: false,
    lowercase: false,
    uppercase: false,
  });

  const validateUsername = () => {
    if (username.length > 0) {
      if (!/^[a-zA-Z]/.test(username)) {
        setUserNameError("Должен начинаться с буквы");
        return false;
      }

      if (!/^[a-zA-Z0-9_@#$%^&*()\-+=[\]{}|;:'",.<>/?]+$/.test(username)) {
        setUserNameError("Содержит недопустимые символы");
        return false;
      }

      if (username.length < 4) {
        setUserNameError("Минимум 4 символа");
        return false;
      }

      if (username.length > 20) {
        setUserNameError("Максимум 20 символов");
        return false;
      }

      setUserNameError("");
      return true;
    } else {
      setUserNameError("");
      return false;
    }
  };

  const validateEmail = () => {
    if (email.length > 0) {
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      setEmailError(isValid ? "" : "Введите действительный email");
      return isValid;
    } else {
      setEmailError("");
      return false;
    }
  };

  const validatePassword = () => {
    const hasLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasLowercase = /[a-zа-яё]/.test(password);
    const hasUppercase = /[A-ZА-ЯЁ]/.test(password);

    setPasswordRequirements({
      length: hasLength,
      number: hasNumber,
      lowercase: hasLowercase,
      uppercase: hasUppercase,
    });

    if (password.length > 0) {
      const isValid = hasLength && hasNumber && hasLowercase && hasLowercase;
      setPasswordError(
        isValid ? "" : "Пароль не соответствует требованиям, необходимо:"
      );
      return isValid;
    } else {
      setPasswordError("");
      return false;
    }
  };

  const validateConfirmPassword = () => {
    if (confirmPassword.length > 0) {
      const isValid = password === confirmPassword;
      setConfirmPasswordError(isValid ? "" : "Пароли должны совпадать");
      return isValid;
    } else {
      setConfirmPasswordError("");
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isPasswordValid = validateConfirmPassword();
    if (!isPasswordValid) {
      return;
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3 className="text-lg p-4 font-bold text-center text-primary">
          Пожалуйста, заполните форму для регистрации!
        </h3>
        <div className="space-y-4 py-8">
          <div className="form-control">
            <label className="label text-primary font-medium mb-2">
              Имя пользователя
            </label>
            <input
              className={`input w-full ${usernameError ? "input-error outline-error outline-2" : "outline-success outline-2"}`}
              type="text"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              onBlur={validateUsername}
              title="Введите имя пользователя"
              placeholder="username"
              required
            />
            {usernameError && (
              <div className="text-error text-sm mt-1">{usernameError}</div>
            )}
          </div>
          <div className="form-control">
            <label className="label text-primary font-medium mb-2">Email</label>
            <input
              className={`input w-full ${emailError ? "input-error outline-error outline-2" : "outline-success outline-2"}`}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={validateEmail}
              title="Должно быть email"
              placeholder="mail@site.com"
              required
            />
            {emailError && (
              <div className="text-error text-sm mt-1">{emailError}</div>
            )}
          </div>
          <div className="form-control">
            <label className="label text-primary font-medium mb-2">
              Пароль
            </label>
            <input
              className={`input w-full ${passwordError ? "input-error outline-error outline-2" : "outline-success outline-2"}`}
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (passwordError) validatePassword();
              }}
              onBlur={validatePassword}
              title="Должно быть более 8 символов, включая цифры, строчные буквы, заглавные буквы"
              placeholder="Введите пароль"
              required
            />
            {passwordError && (
              <div className="mt-2 text-sm">
                <span className="text-error text-sm">{passwordError}</span>
                <div
                  className={`flex items-center ${passwordRequirements.length ? "text-success" : "text-error"}`}
                >
                  {passwordRequirements.length ? "✓" : "•"} Минимум 8 символов
                </div>
                <div
                  className={`flex items-center ${passwordRequirements.number ? "text-success" : "text-error"}`}
                >
                  {passwordRequirements.number ? "✓" : "•"} Хотя бы одна цифра
                </div>
                <div
                  className={`flex items-center ${passwordRequirements.lowercase ? "text-success" : "text-error"}`}
                >
                  {passwordRequirements.lowercase ? "✓" : "•"} Хотя бы одна
                  строчная буква
                </div>
                <div
                  className={`flex items-center ${passwordRequirements.uppercase ? "text-success" : "text-error"}`}
                >
                  {passwordRequirements.uppercase ? "✓" : "•"} Хотя бы одна
                  заглавная буква
                </div>
              </div>
            )}
          </div>
          <div className="form-control">
            <label className="label text-primary font-medium mb-2">
              Повторите пароль
            </label>
            <input
              className={`input w-full ${confirmPasswordError ? "input-error outline-error outline-2" : "outline-success outline-2"}`}
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (confirmPasswordError) validateConfirmPassword();
              }}
              onBlur={validateConfirmPassword}
              title="Пароли должны совпадать"
              placeholder="Повторите пароль"
              required
            />
            {confirmPasswordError && (
              <div className="mt-2 text-sm">
                <span className="text-error text-sm">
                  {confirmPasswordError}
                </span>
              </div>
            )}
          </div>
          <button className="btn btn-primary w-full">Войти</button>
        </div>
      </form>
      <p className="text-center text-base mt-3">
        У вас уже есть учетная запись?{" "}
        <button
          className="btn-link font-bold cursor-pointer hover:text-primary transition-all text-base-content"
          onClick={() => dispatch(toggleAuth())}
        >
          Войти
        </button>
      </p>
    </div>
  );
}
