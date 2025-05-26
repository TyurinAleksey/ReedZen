"use client";

import React, { useState } from "react";
import Modal from "../Modal/layout";
import SignIn from "../SignIn";
import SignUp from "../SignUp";
import { useSelector } from "react-redux";
import { RootState } from "@app/store/store";

export default function AuthModal() {
  const auth = useSelector((state: RootState) => state.auth.auth);
  return (
    <>
      <Modal
        id="authLogin"
        buttonName={auth === "login" ? "Войти" : "Зарегестрироваться"}
      >
        {auth === "login" ? <SignIn /> : <SignUp />}
      </Modal>
    </>
  );
}
