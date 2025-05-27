import Success from "@app/shared/icons/Success";
import { toggleAuth } from "@app/store/Slice/authSlice";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

export default function SignIn() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = () => {
    if (email.length === 0) {
      setEmailError("");
      return false;
    }

    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setEmailError(isValid ? "" : "Введите действительный email");
    return isValid;
  };

  const validatePassword = () => {
    if (password.length === 0) {
      setPasswordError("");
      return false;
    }

    const isValid = password.length >= 8;
    setPasswordError(
      isValid ? "" : "Пароль должен содержать минимум 8 символов"
    );
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (!isEmailValid || !isPasswordValid) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });

      setSuccessMessage("Вы успешно авторизованы");

      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
        axios.defaults.headers.common["Authorization"] =
          `Bearer ${response.data.token}`;
      }

      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (error) {
      setPassword("");

      if (axios.isAxiosError(error)) {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              setErrorMessage("Неверный email или пароль");
              break;
            case 404:
              setErrorMessage("Пользователь не найден");
              break;
            default:
              setErrorMessage("Ошибка сервера");
          }
        } else {
          setErrorMessage("Ошибка соединения с сервером");
        }
      } else {
        setErrorMessage("Произошла непредвиденная ошибка");
        console.error("Login error:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h3 className="text-2xl font-bold text-center text-primary mb-6">
          Добро пожаловать!
        </h3>

        {successMessage && (
          <div className="alert alert-success">
            <Success />
            <span>{successMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="alert alert-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="form-control">
          <label className="label mb-1.5">
            <span className="label-text text-primary font-medium">Email</span>
          </label>
          <input
            className={`input input-bordered w-full ${emailError ? "input-error" : ""}`}
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError("");
              setErrorMessage("");
            }}
            onBlur={validateEmail}
            placeholder="mail@example.com"
            required
          />
          {emailError && (
            <span className="label-text-alt text-error mt-1">{emailError}</span>
          )}
        </div>

        <div className="form-control">
          <label className="label mb-1.5">
            <span className="label-text text-primary font-medium">Пароль</span>
          </label>
          <input
            className={`input input-bordered w-full ${passwordError ? "input-error" : ""}`}
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError("");
              setErrorMessage("");
            }}
            onBlur={validatePassword}
            placeholder="Введите пароль"
            required
          />
          {passwordError && (
            <span className="label-text-alt text-error mt-1">
              {passwordError}
            </span>
          )}
        </div>

        <button
          type="submit"
          className={`btn btn-primary w-full ${isLoading ? "loading" : ""}`}
          disabled={isLoading}
        >
          {isLoading ? "Вход..." : "Войти"}
        </button>
      </form>

      <div className="text-center mt-6">
        <p className="text-sm">
          Нет учетной записи?{" "}
          <button
            onClick={() => dispatch(toggleAuth())}
            className="link link-primary font-bold"
          >
            Зарегистрируйтесь
          </button>
        </p>
      </div>
    </div>
  );
}
