"use server";

import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { signIn } from "./auth";
import { hash } from "bcrypt-ts";

// Initialize Prisma Client
const prisma = new PrismaClient();

const authFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export interface LoginActionState {
  status: "idle" | "in_progress" | "success" | "failed" | "invalid_data";
}

// Prisma replacement for getUser function
async function getUser(email: string) {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
}

// Prisma replacement for createUser function
async function createUser(email: string, password: string) {
  return await prisma.user.create({
    data: {
      email,
      password, // Make sure password is hashed before storing in production
    },
  });
}

export const login = async (
  _: LoginActionState,
  formData: FormData,
): Promise<LoginActionState> => {
  try {
    const validatedData = authFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    await signIn("credentials", {
      email: validatedData.email,
      password: validatedData.password,
      redirect: false,
    });

    return { status: "success" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { status: "invalid_data" };
    }

    return { status: "failed" };
  }
};

export interface RegisterActionState {
  status:
  | "idle"
  | "in_progress"
  | "success"
  | "failed"
  | "user_exists"
  | "invalid_data";
}

export const register = async (
  _: RegisterActionState,
  formData: FormData,
): Promise<RegisterActionState> => {
  try {
    const validatedData = authFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    let user = await getUser(validatedData.email);

    if (user) {
      return { status: "user_exists" } as RegisterActionState;
    } else {
      const hashedPassword = await hash(validatedData.password, 10);

      await createUser(validatedData.email, hashedPassword);
      console.log(validatedData)
      await signIn("credentials", {
        email: validatedData.email,
        password: validatedData.password,
        redirect: false,
      });

      return { status: "success" };
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { status: "invalid_data" };
    }

    return { status: "failed" };
  }
};
