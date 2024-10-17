import { config } from "dotenv";
import { execSync } from "child_process";

config({
  path: ".env.local",
});

const runMigrate = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined");
  }

  try {
    console.log("⏳ Running Prisma migrations...");

    const start = Date.now();

    // Run the Prisma migration using execSync to call Prisma CLI
    execSync("npx prisma migrate dev", { stdio: "inherit" });

    const end = Date.now();
    console.log("✅ Migrations completed in", end - start, "ms");

    process.exit(0);
  } catch (error) {
    console.error("❌ Migration failed");
    console.error(error);
    process.exit(1);
  }
};

runMigrate();
