import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = credentials.email as string;
        const password = credentials.password as string;

        try {
          // Find user by email
          const user = await prisma.user.findUnique({
            where: { email },
            include: { loyaltyTier: true },
          });

          if (!user || !user.hashedPassword) {
            return null;
          }

          // Check password
          const isValid = bcrypt.compareSync(password, user.hashedPassword);
          if (!isValid) {
            return null;
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            phone: user.phone,
            loyaltyTierId: user.loyaltyTierId,
            role: user.role,
          };
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        if (!user.email) return false;

        try {
          // Check if user exists
          let existingUser = await prisma.user.findUnique({
            where: { email: user.email },
          });

          if (!existingUser) {
            // Find default loyalty tier (first tier by sortOrder)
            const defaultTier = await prisma.loyaltyTier.findFirst({
              orderBy: { sortOrder: "asc" },
            });

            existingUser = await prisma.user.create({
              data: {
                email: user.email,
                name: user.name || profile?.name,
                image: user.image || (profile as any)?.picture,
                loyaltyTierId: defaultTier?.id || null,
              },
            });
          }

          // Create account link if not exists
          const existingAccount = await prisma.account.findUnique({
            where: {
              provider_providerAccountId: {
                provider: account.provider,
                providerAccountId: account.providerAccountId,
              },
            },
          });

          if (!existingAccount) {
            await prisma.account.create({
              data: {
                userId: existingUser.id,
                type: account.type,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                refresh_token: account.refresh_token as string | null,
                access_token: account.access_token as string | null,
                expires_at: account.expires_at as number | null,
                token_type: account.token_type as string | null,
                scope: account.scope as string | null,
                id_token: account.id_token as string | null,
                session_state: account.session_state as string | null,
              },
            });
          }

          // Update user's avatar if they don't have one
          if (!existingUser.image && user.image) {
            await prisma.user.update({
              where: { id: existingUser.id },
              data: { image: user.image },
            });
          }
        } catch (error) {
          console.error("Google sign in callback error:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.loyaltyTierId = user.loyaltyTierId;
        token.phone = user.phone;
        token.role = user.role;
      }

      if (trigger === "update" && session) {
        if (session.name) token.name = session.name;
        if (session.phone) token.phone = session.phone;
        if (session.loyaltyTierId) token.loyaltyTierId = session.loyaltyTierId;
      }

      // Fetch fresh loyaltyTierId and role on jwt callbacks
      if (token.id) {
        try {
          const dbUser = await prisma.user.findUnique({
            where: { id: token.id as string },
            select: { loyaltyTierId: true, role: true },
          });
          if (dbUser) {
            token.loyaltyTierId = dbUser.loyaltyTierId;
            token.role = dbUser.role;
          }
        } catch (error) {
          console.error("JWT fetch user error:", error);
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        if (session.user) {
          session.user.id = token.id as string;
          session.user.loyaltyTierId = token.loyaltyTierId as string | null;
          session.user.phone = token.phone as string | null;
          session.user.role = token.role as string;
        }
      }
      return session;
    },
  },
  pages: {
    signIn: "/tai-khoan",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
});
