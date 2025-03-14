import { z } from "zod";
export const registerSchema = z
  .object({
    email: z
      .string()
      .email("Invalid email format")
      .nonempty("email is required"),
    password: z.string().nonempty("password is required"),
    confirmPassword: z.string().nonempty("password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "password is not match with confirm password",
    path: ["confirmPassword"],
  });

export const login = z.object({
  email: z.string().email("Invalid email format").nonempty("Email is required"),
  password: z.string().nonempty("password is required"),
});

export const updateProfile = z.object({
  username: z.string().nonempty("username is required"),
  email: z.string().email("Invalid email format").nonempty("email is required"),
});
