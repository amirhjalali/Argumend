import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import { sanitizeServerLog } from "@/lib/sanitizeServerLog";

type Database = ReturnType<typeof drizzle<typeof schema>>;

let _db: Database | null = null;
let _initialized = false;

/** Database-backed features are opt-in; an empty value keeps offline mode. */
export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL?.trim());
}

/**
 * Lazily initialize the database connection on first use.
 * This prevents the postgres pool from being created at module load,
 * which would crash the server when the DB is unreachable.
 */
function initDb(): Database | null {
  if (_initialized) return _db;
  _initialized = true;

  const connectionString = process.env.DATABASE_URL?.trim();
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
  } catch (error) {
    console.warn(`[db] Failed to initialize: ${sanitizeServerLog(error)}`);
  }

  return _db;
}

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
