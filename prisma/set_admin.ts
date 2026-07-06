import { prisma } from "../src/lib/db";
import bcrypt from "bcryptjs";

async function main() {
  const email = "admin@almadungduong.com";
  
  // Use stable password or override via environment variable
  const password = process.env.ADMIN_PASSWORD || "46f532c760faAd1!";
  const hashedPassword = bcrypt.hashSync(password, 10);

  console.log(`Checking if admin user exists: ${email}...`);

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    if (existingUser.role === "admin" && existingUser.hashedPassword) {
      console.log(`User ${email} is already an admin with a password. No password reset performed.`);
      console.log(`- Email: ${email}`);
      console.log(`- Role: ${existingUser.role}`);
    } else {
      console.log(`User ${email} exists but is not an admin or lacks a password. Updating...`);
      const updatedUser = await prisma.user.update({
        where: { email },
        data: {
          role: "admin",
          hashedPassword: existingUser.hashedPassword || hashedPassword,
        },
      });
      console.log(`Successfully updated admin user:`);
      console.log(`- Email: ${email}`);
      console.log(`- Role: ${updatedUser.role}`);
    }
  } else {
    console.log(`User ${email} does not exist. Creating new admin user...`);
    const newUser = await prisma.user.create({
      data: {
        email,
        name: "Alma Admin",
        role: "admin",
        hashedPassword,
      },
    });
    console.log(`Successfully created admin user:`);
    console.log(`- Email: ${email}`);
    console.log(`- Password: ${password}`);
    console.log(`- Role: ${newUser.role}`);
  }
}

main()
  .catch((e) => {
    console.error("Error setting admin user:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
