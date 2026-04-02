import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

type Database = ReturnType<typeof drizzle<typeof schema>>;

let _db: Database | null = null;
let _initialized = false;

/**
 * Lazily initialize the database connection on first use.
 * This prevents the postgres pool from being created at module load,
 * which would crash the server when the DB is unreachable.
 */
function initDb(): Database | null {
  if (_initialized) return _db;
  _initialized = true;

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.warn("[db] DATABASE_URL not set — running without database");
    return null;
  }

  try {
    const client = postgres(connectionString, {
      max: 5,
      idle_timeout: 20,
      connect_timeout: 5,
    });
    _db = drizzle(client, { schema });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.warn(`[db] Failed to initialize: ${msg}`);
  }

  return _db;
}

/**
 * Database instance. `null` until first access via getDb().
 * Kept for backwards compatibility — auth.ts checks `if (db)`.
 * Always null at module load; use getDb() for actual access.
 */
export const db: Database | null = null;

/**
 * Returns the database instance or throws if unavailable.
 * Lazily creates the connection pool on first call.
 */
export function getDb(): Database {
  const instance = initDb();
  if (!instance) {
    throw new Error("Database is not available");
  }
  return instance;
}
