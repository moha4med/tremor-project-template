"use client";

import { useCallback, useEffect, useMemo, useState, useContext } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

/* Context */
import { AuthContext } from "@/context/AuthContext";

/* Components */
import { Button } from "@/components/Button";
import { Divider } from "@/components/Divider";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";

/* Form Validation */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, LoginForm } from "@/schemas/loginSchema";

import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useUser } from "@/store/userStore";

/* Icons */
import { RiGoogleFill } from "@remixicon/react";

// Animation parameters
const TOTAL_ROWS = 40;
const TOTAL_COLS = 40;
const TRANSITION_INTERVAL = 3000;
const MIN_SELECTED = 20;
const MAX_SELECTED = 60;

const LoginPage = () => {
  const { t } = useTranslation();
  const authContext = useContext(AuthContext);

  const { setUser } = useUser();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    console.log("User data: " + data);

    try {
      const { email, password } = data;
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      authContext?.login({ email: user.email || "", password });

      window.location.href = "/";
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      setUser({ id: user.uid, name: "", email: user.email || "" });
      window.location.href = "/";
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Google login failed:", error.message);
      } else {
        console.error("Google login failed:", error);
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
                  {t("login.title")}
                </h1>

                <p className="text-sm text-gray-700 dark:text-gray-400">
                  {t("login.subText")}{" "}
                  <Link
                    href="/auth/register"
                    className="font-medium text-blue-500 hover:text-blue-600 dark:text-blue-500 hover:dark:text-blue-600"
                  >
                    {t("register.name")}.
                  </Link>
                </p>
              </div>

              <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-4">
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
                      placeholder="john@company.com"
                      className="mt-2"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500">{errors.email.message}</p>
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
                      <a
                        href="/auth/forgot-password/verify-email"
                        className="text-sm font-medium text-blue-500 hover:text-blue-600 dark:text-blue-500 hover:dark:text-blue-600"
                      >
                        {t("fpd.name")}?
                      </a>
                    </div>
                    <Input
                      type="password"
                      id="password"
                      placeholder="Password"
                      className="mt-2"
                      {...register("password")}
                    />
                    {errors.password && (
                      <p className="text-sm text-red-500">{errors.password.message}</p>
                    )}
                  </div>

                  <Button className="w-full" type="submit">
                    {t("login.button")}
                  </Button>
                </div>
              </form>

              <div>
                <Divider>{t("or")}</Divider>

                <div className="space-y-4">
                  <div className="flex w-full gap-4">
                    <Button onClick={handleGoogleLogin} className="w-full" variant="secondary">
                      <span className="inline-flex items-center gap-2">
                        <RiGoogleFill className="size-4" aria-hidden={true} />
                        {t("login.googleLogin")}
                      </span>
                    </Button>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-xs text-gray-700">
                    {t("login.agreeToTerms")}{" "}
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

export default LoginPage;
