import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { getDb, isDatabaseConfigured } from "@/lib/db";
import { users, accounts, sessions, verificationTokens } from "@/lib/db/schema";
import { sanitizeServerLog } from "@/lib/sanitizeServerLog";

function createAuth() {
  // Database sessions are opt-in. Merely importing auth in the default
  // offline build must not initialize a connection pool.
  const databaseConfigured = isDatabaseConfigured();
  if (databaseConfigured) {
    try {
      const database = getDb();
      return NextAuth({
        adapter: DrizzleAdapter(database, {
          usersTable: users,
          accountsTable: accounts,
          sessionsTable: sessions,
          verificationTokensTable: verificationTokens,
        }),
        providers: [Google],
        pages: {
          signIn: "/auth/signin",
        },
        callbacks: {
          session({ session, user }) {
            session.user.id = user.id;
            return session;
          },
        },
      });
    } catch (error) {
      console.warn(
        `[auth] Database initialization failed — using degraded JWT sessions: ${sanitizeServerLog(error)}`
      );
    }
  }

  // When DB is unavailable, use auth without adapter (sessions will not persist,
  // but the site won't crash). Sign-in won't work but browsing is unaffected.
  if (!databaseConfigured && process.env.NEXT_PUBLIC_ENABLE_AUTH === "true") {
    console.warn(
      "[auth] DATABASE_URL not configured — auth running in degraded JWT mode"
    );
  }
  return NextAuth({
    providers: [Google],
    pages: {
      signIn: "/auth/signin",
    },
    session: {
      strategy: "jwt" as const,
    },
    callbacks: {
      session({ session, token }) {
        if (token?.sub) {
          session.user.id = token.sub;
        }
        return session;
      },
    },
  });
}

export const { handlers, auth, signIn, signOut } = createAuth();
