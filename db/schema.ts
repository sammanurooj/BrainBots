// prisma/schema.prisma

// Define the data source (PostgreSQL in this case)
datasource db {
  provider = "postgresql"
  url = env("DATABASE_URL")
}

// Generator for Prisma Client
generator client {
  provider = "prisma-client-js"
}

model User {
  id       String @id @default (uuid()) // Prisma uses 'String' for UUID types with a default UUID generator
  email    String @unique @db.VarChar(64)
  password String @db.VarChar(64)
  name String? @db.VarChar(64)

  // Relations
  chats    Chat[]  // One-to-many relation: A user can have many chats
}

model Chat {
  id        String @id @default (uuid())
  createdAt DateTime @default (now())  // Prisma uses 'DateTime' for timestamps
  messages  Json       // Prisma uses 'Json' for JSON data
  userId    String     // Foreign key to 'User' model

  // Relations
  user      User @relation(fields: [userId], references: [id])  // Link to User model
}
