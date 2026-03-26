import "server-only";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

type Database = ReturnType<typeof drizzle<typeof schema>>;

let _db: Database | null = null;
let _initError: string | null = null;

try {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    _initError = "DATABASE_URL environment variable is not set";
    console.warn(`[db] ${_initError} — running without database`);
  } else {
    const client = postgres(connectionString, {
      max: 50,
      idle_timeout: 30,
      connect_timeout: 10,
    });
    _db = drizzle(client, { schema });
  }
} catch (e) {
  _initError = e instanceof Error ? e.message : String(e);
  console.warn(`[db] Failed to initialize database: ${_initError} — running without database`);
}

/**
 * Database instance. May be `null` if DATABASE_URL is missing or connection failed.
 * Use `getDb()` when you need a guaranteed non-null instance (throws if unavailable).
 */
export const db: Database | null = _db;

/**
 * Returns the database instance or throws if unavailable.
 * Use this in API routes that truly require the database.
 */
export function getDb(): Database {
  if (!_db) {
    throw new Error(
      `Database is not available${_initError ? `: ${_initError}` : ""}`
    );
  }
  return _db;
}
