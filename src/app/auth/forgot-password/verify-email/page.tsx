"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

// Form Validation
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { VerifyEmailSchema, VerifyEmailForme } from "@/schemas/resetPassword";

import { resetPassword } from "@/services/auth";

import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import { Button } from "@/components/Button";

// Animation parameters
const TOTAL_ROWS = 40;
const TOTAL_COLS = 40;
const TRANSITION_INTERVAL = 3000;
const MIN_SELECTED = 20;
const MAX_SELECTED = 60;

const VerifyEmail = () => {
  const [email, setEmail] = useState("");

  const { handleSubmit } = useForm<VerifyEmailForme>({
    resolver: zodResolver(VerifyEmailSchema),
  });

  const onSubmit = async (data: VerifyEmailForme) => {
    try {
      await resetPassword(data.email);
      window.location.href = "/auth/reset-password/verify-code";
    } catch (error) {
      console.error("Login failed:", error);
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
    <div className="flex min-h-screen w-full">
      <main className="flex-1 shadow-xl dark:border-gray-900 lg:border-r border-zinc-300">
        <div className="flex h-full flex-col items-center justify-center">
          <div className="w-full px-4 sm:max-w-sm sm:px-0">
            <div className="space-y-1">
              <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-50">
                Forgot Password
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Enter your email and we’ll send you a verification code.
              </p>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="mt-2"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <Button className="w-full" type="submit">
                Send Verification Code
              </Button>
            </form>
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
  );
};

export default VerifyEmail;
