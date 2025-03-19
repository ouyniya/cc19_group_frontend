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


export const createPostSchema = z
  .object({
    title: z.string().nonempty({ message: "Title is required" }),
    content: z.string().nonempty({ message: "Content is required" }),
    budget: z
      .number()
      .positive({ message: "Budget must be a positive number" })
      .nonnegative({ message: "Budget is required" }),
    name: z.string().nonempty({ message: "Name is required" }),
    description: z.string().nonempty({ message: "Description is required" }),
    latitude: z
      .number()
      .min(0, { message: "Latitude must be a non-negative number" }),
    longitude: z
      .number()
      .min(0, { message: "Longitude must be a non-negative number" }),
    provinceId: z
      .number()
      .int()
      .positive({ message: "Province ID must be a positive integer" }),
    districtId: z
      .number()
      .int()
      .positive({ message: "District ID must be a positive integer" }),
  })
  .refine((data) => data.latitude && data.longitude, {
    message: "Latitude and Longitude must be provided",
    path: ["latitude", "longitude"],
  })
  .refine((data) => data.provinceId && data.districtId, {
    message: "Province ID and District ID must be provided",
    path: ["provinceId", "districtId"],
  });