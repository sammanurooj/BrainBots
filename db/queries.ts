import { config } from "dotenv";
import { genSaltSync, hashSync } from "bcrypt-ts";
import { PrismaClient } from '@prisma/client';

config({
  path: ".env.local",
});

// Initialize Prisma Client
const prisma = new PrismaClient();

export async function getUser(email: string) {
  try {
    return await prisma.user.findUnique({
      where: { email },
    });
  } catch (error) {
    console.error("Failed to get user from database");
    throw error;
  }
}

export async function createUser(email: string, password: string) {
  const salt = genSaltSync(10);
  const hash = hashSync(password, salt);

  try {
    return await prisma.user.create({
      data: { email, password: hash },
    });
  } catch (error) {
    console.error("Failed to create user in database");
    throw error;
  }
}

export async function saveChat({
  id,
  messages,
  userId,
}: {
  id: string;
  messages: any;
  userId: string;
}) {
  try {
    const existingChat = await prisma.chat.findUnique({
      where: { id },
    });

    if (existingChat) {
      return await prisma.chat.update({
        where: { id },
        data: {
          messages: messages, // Assuming `messages` is already in the correct format (JSON)
        },
      });
    }

    return await prisma.chat.create({
      data: {
        id,
        createdAt: new Date(),
        messages,
        userId,
      },
    });
  } catch (error) {
    console.error("Failed to save chat in database");
    throw error;
  }
}

export async function deleteChatById({ id }: { id: string }) {
  try {
    return await prisma.chat.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Failed to delete chat by id from database");
    throw error;
  }
}

export async function getChatsByUserId({ id }: { id: string }) {
  try {
    return await prisma.chat.findMany({
      where: { userId: id },
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error("Failed to get chats by user from database");
    throw error;
  }
}

export async function getChatById({ id }: { id: string }) {
  try {
    return await prisma.chat.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error("Failed to get chat by id from database");
    throw error;
  }
}
