"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { RiGoogleFill } from "@remixicon/react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/Button";
import { Divider } from "@/components/Divider";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";

// Form Validation
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema, RegisterForm } from "@/schemas/registerSchema";

import { register } from "@/services/auth";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase";

// Animation parameters
const TOTAL_ROWS = 40;
const TOTAL_COLS = 40;
const TRANSITION_INTERVAL = 3000;
const MIN_SELECTED = 20;
const MAX_SELECTED = 60;

const RegisterPage = () => {
  const { t } = useTranslation();

  const {
    handleSubmit,
    register: formRegister,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      const { email, password } = data;
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await register(
        data.firstName,
        data.lastName,
        user.email || "",
        data.password
      );

      window.location.href = "/auth/login";
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Registration failed:", error.message);
      } else {
        console.error("Registration failed:", error);
      }
    }
  };

  const handleGoogleRegister = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const [firstName, lastName] = user.displayName?.split(" ") || ["", ""];
      await register(
        firstName,
        lastName,
        user.email || "",
        "GoogleAuthPassword"
      );

      window.location.href = "/auth/login";
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Registration failed:", error.message);
      } else {
        console.error("Registration failed:", error);
      }
    }
  };

  const [selectedDivs, setSelectedDivs] = useState(new Set());

  const totalDivs = TOTAL_ROWS * TOTAL_COLS;

  const updateSelectedDivs = useCallback(() => {
    const newSelectedDivs = new Set();
    const numSelected =
      Math.floor(Math.random() * (MAX_SELECTED - MIN_SELECTED + 1)) +
      MIN_SELECTED;

    while (newSelectedDivs.size < numSelected) {
      const randomId = Math.floor(Math.random() * totalDivs);
      newSelectedDivs.add(randomId);
    }

    setSelectedDivs(newSelectedDivs);
  }, [totalDivs]);

  useEffect(() => {
    updateSelectedDivs();
    const intervalId = setInterval(updateSelectedDivs, TRANSITION_INTERVAL);
    return () => clearInterval(intervalId);
  }, [updateSelectedDivs]);

  const gridDivs = useMemo(
    () =>
      Array.from({ length: TOTAL_ROWS }, (_, rowIdx) => (
        <div key={`outer-${rowIdx}`}>
          <div className="flex size-full gap-2">
            {Array.from({ length: TOTAL_COLS }, (_, colIdx) => {
              const divId = rowIdx * TOTAL_COLS + colIdx;
              const isSelected = selectedDivs.has(divId);
              return (
                <div key={`inner-${rowIdx}-${colIdx}`}>
                  <div
                    className={`size-9 rounded-lg shadow ring-1 ring-black/5 transition-all duration-[3000ms] dark:ring-white/5 ${
                      isSelected
                        ? "shadow-blue-500/50 dark:shadow-blue-500/40"
                        : "shadow-blue-500/10 dark:shadow-blue-500/10"
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )),
    [selectedDivs]
  );

  return (
    <>
      <div className="flex min-h-screen w-full">
        <main className="flex-1 shadow-xl dark:border-gray-900 lg:border-r border-zinc-300">
          <div className="flex h-full flex-col items-center justify-center">
            <div className="w-full px-4 sm:max-w-sm sm:px-0">
              <div className="space-y-1">
                <h1 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-50">
                  {t("register.title")}
                </h1>
                <p className="text-sm text-gray-700 dark:text-gray-400">
                  {t("register.subText")}{" "}
                  <Link
                    href="/auth/login"
                    className="font-medium text-blue-500 hover:text-blue-600 dark:text-blue-500 hover:dark:text-blue-600"
                  >
                    {t("login.name")}.
                  </Link>
                </p>
              </div>
              <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-4">
                  <div className="flex space-x-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="first-name"
                        className="text-sm font-medium text-gray-900 dark:text-gray-50"
                      >
                        {t("authForm.firstName")}
                      </Label>
                      <Input
                        type="text"
                        id="firstName"
                        {...formRegister("firstName")}
                        placeholder="John"
                        className="mt-2"
                      />
                      {errors.firstName && (
                        <p className="text-sm text-red-500">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="last-name"
                        className="text-sm font-medium text-gray-900 dark:text-gray-50"
                      >
                        {t("authForm.lastName")}
                      </Label>
                      <Input
                        type="text"
                        id="lastName"
                        {...formRegister("lastName")}
                        placeholder="Doe"
                        className="mt-2"
                      />
                      {errors.lastName && (
                        <p className="text-sm text-red-500">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-900 dark:text-gray-50"
                    >
                      {t("authForm.email")}
                    </Label>
                    <Input
                      type="email"
                      id="email"
                      {...formRegister("email")}
                      placeholder="john@company.com"
                      className="mt-2"
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label
                        htmlFor="password"
                        className="text-sm font-medium text-gray-900 dark:text-gray-50"
                      >
                        {t("authForm.password")}
                      </Label>
                    </div>
                    <Input
                      type="password"
                      id="password"
                      {...formRegister("password")}
                      placeholder="Password"
                      className="mt-2"
                    />
                    {errors.password && (
                      <p className="text-sm text-red-500">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label
                        htmlFor="confirm-password"
                        className="text-sm font-medium text-gray-900 dark:text-gray-50"
                      >
                        {t("authForm.confirmPassword")}
                      </Label>
                    </div>
                    <Input
                      type="password"
                      id="confirmPassword"
                      {...formRegister("confirmPassword")}
                      placeholder="Confirm Password"
                      className="mt-2"
                    />
                    {errors.confirmPassword && (
                      <p className="text-sm text-red-500">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>

                  <Button className="w-full" type="submit">
                    {t("register.button")}
                  </Button>
                </div>
              </form>
              <div>
                <Divider>{t("or")}</Divider>

                <div className="space-y-4">
                  <div className="flex w-full gap-4">
                    <Button onClick={handleGoogleRegister} className="w-full" variant="secondary">
                      <span className="inline-flex items-center gap-2">
                        <RiGoogleFill className="size-4" aria-hidden={true} />
                        {t("register.googleRegister")}
                      </span>
                    </Button>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-xs text-gray-700">
                    {t("register.agreeToTerms")}{" "}
                    <a
                      href="#"
                      className="text-blue-500 hover:text-blue-600 dark:text-blue-500 hover:dark:text-blue-600"
                    >
                      {t("termsOfService")}
                    </a>{" "}
                    and{" "}
                    <a
                      href="#"
                      className="text-blue-500 hover:text-blue-600 dark:text-blue-500 hover:dark:text-blue-600"
                    >
                      {t("privacyPolicy")}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <div
          className="hidden max-h-screen flex-1 overflow-hidden lg:flex"
          aria-hidden="true"
        >
          <div>
            <div className="-ml-2 -mt-2 flex flex-col gap-2">{gridDivs}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
