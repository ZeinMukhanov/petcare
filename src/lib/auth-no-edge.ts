import NextAuth, { NextAuthConfig } from "next-auth";
import credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "./server-utils";
import { authSchema } from "./validations";
import { nextAuthEdgeConfig } from "./auth-edge";

const config = {
  ...nextAuthEdgeConfig,

  providers: [
    credentials({
      async authorize(credentials) {
        // runs on login
        // validation
        const validatedAuthData = authSchema.safeParse(credentials);
        if (!validatedAuthData.success) {
          return null;
        }
        // runs on login
        const { email, password } = validatedAuthData.data;

        const user = await getUserByEmail(email);
        if (!user) {
          console.log("User not found");
          return null;
        }

        const passwordMatch = await bcrypt.compare(
          password,
          user.hashedPassword
        );

        if (!passwordMatch) {
          console.log("Invalid credentials");
          return null;
        }

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(config);
