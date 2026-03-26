import "server-only";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/lib/db";
import { users, accounts, sessions, verificationTokens } from "@/lib/db/schema";

function createAuth() {
  // When DB is available, use full auth with DrizzleAdapter
  if (db) {
    return NextAuth({
      adapter: DrizzleAdapter(db, {
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
  }

  // When DB is unavailable, use auth without adapter (sessions will not persist,
  // but the site won't crash). Sign-in won't work but browsing is unaffected.
  console.warn("[auth] Database unavailable — auth running in degraded mode (no sessions)");
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
