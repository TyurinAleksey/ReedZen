import { toggleAuth } from "@app/store/Slice/authSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

export default function SignIn() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    number: false,
    lowercase: false,
    uppercase: false,
  });

  const validateEmail = () => {
    if (email.length > 0) {
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      setEmailError(isValid ? "" : "Введите действительный email");
      return isValid;
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
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (isEmailValid && isPasswordValid) {
      console.log("Форма валидна, можно отправлять");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3 className="text-lg p-4 font-bold text-center text-primary">
          Добро пожаловать!
        </h3>
        <div className="space-y-4 py-8">
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
              <ul className="mt-2 text-sm">
                <span className="text-error text-sm">{passwordError}</span>
                <li
                  className={`flex items-center ${passwordRequirements.length ? "text-success" : "text-error"}`}
                >
                  {passwordRequirements.length ? "✓" : "•"} Минимум 8 символов
                </li>
                <li
                  className={`flex items-center ${passwordRequirements.number ? "text-success" : "text-error"}`}
                >
                  {passwordRequirements.number ? "✓" : "•"} Хотя бы одна цифра
                </li>
                <li
                  className={`flex items-center ${passwordRequirements.lowercase ? "text-success" : "text-error"}`}
                >
                  {passwordRequirements.lowercase ? "✓" : "•"} Хотя бы одна
                  строчная буква
                </li>
                <li
                  className={`flex items-center ${passwordRequirements.uppercase ? "text-success" : "text-error"}`}
                >
                  {passwordRequirements.uppercase ? "✓" : "•"} Хотя бы одна
                  заглавная буква
                </li>
              </ul>
            )}
          </div>
          <button className="btn btn-primary w-full">Войти</button>
        </div>
      </form>
      <p className="text-center text-base">
        У вас нет учетной записи?{" "}
        <button
          className="btn-link font-bold cursor-pointer hover:text-primary transition-all text-base-content"
          onClick={() => dispatch(toggleAuth())}
        >
          Зарегистрируйтесь
        </button>
      </p>
    </div>
  );
}
