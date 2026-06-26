import { prisma } from "../src/lib/db";
import bcrypt from "bcryptjs";
import crypto from "crypto";

async function main() {
  const email = "admin@almadungduong.com";
  // Generate a random 12-character alphanumeric password
  const generatedPassword = crypto.randomBytes(6).toString("hex") + "Ad1!";
  const hashedPassword = bcrypt.hashSync(generatedPassword, 10);

  console.log(`Checking if admin user exists: ${email}...`);

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    console.log(`User ${email} already exists. Elevating to admin and resetting password...`);
    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        role: "admin",
        hashedPassword,
      },
    });
    console.log(`Successfully updated admin user:`);
    console.log(`- Email: ${email}`);
    console.log(`- Password: ${generatedPassword}`);
    console.log(`- Role: ${updatedUser.role}`);
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
    console.log(`- Password: ${generatedPassword}`);
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
