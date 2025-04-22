import { z } from "zod";

// Email verification schema
export const VerifyEmailSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export type VerifyEmailForme = z.infer<typeof VerifyEmailSchema>;


// "Verification code" verification schema
export const VerifyCodeSchema = z.object({
    code: z.number().int().min(4, { message: "Code must be at least 4 digits" }).max(4, { message: "Code must be at most 4 digits" }),
});

export type VerifyCodeForme = z.infer<typeof VerifyCodeSchema>;


// Reset password verification schema
export const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[!@#$%^&*()_\-+={[}\]|:;"'<,>.?]/, {
        message: "Password must contain at least one special character",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export type ResetPasswordForm = z.infer<typeof ResetPasswordSchema>;
