import { baseUrl } from "@/app/_lib/const";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials", // Display name for this provider
      credentials: {
        // Defines login form fields
        email: { label: "Email", type: "email" }, // Email input
        password: { label: "Password", type: "password" }, // Password input
      },
      async authorize(credentials) {
        // This function is called when user submits login form
        try {
          // Send credentials to your backend API
          const res = await fetch(`${baseUrl}/api/v1/auth/signin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials), // Send email/password
          });

          const user = await res.json(); // Parse API response

          if (!res.ok) {
            // If HTTP status is not 200-299
            throw new Error(user.message || "Authentication failed");
          }

          // Returned object gets stored in JWT
          return user;
        } catch (error) {
          console.error("Authentication error:", error);
          return null; // Rejects login
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt", // Uses JWT for session management
  },
  secret: process.env.AUTH_SECRET, // Encryption key
  callbacks: {
    async jwt({ token, user }) {
      // Called when:
      // - User logs in (initial token creation)
      // - Session is accessed (token updates)
      if (user) {
        // First login
        token.accessToken = user.token; // Store API's JWT
        token.role = user.role; // Add custom claim
      }
      return token; // Becomes available in session callback
    },
    async session({ session, token }) {
      // Exposes data to client components via useSession()
      session.accessToken = token.accessToken; // For API calls
      session.user.role = token.role; // For role-based UI
      return session;
    },
  },
});

export { handler as GET, handler as POST };
