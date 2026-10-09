const mysql = require("mysql2/promise");

// dotenv is loaded once in server.js (the app entry point)
const DB_CONFIG = {
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

const pool = mysql.createPool(DB_CONFIG);

// Build a useful diagnostic message from a failed connection.
// Never includes passwords. Passwords are not part of these error objects.
function safeErrorMessage(error) {
  if (!error) return "Unknown error";

  switch (error.code) {
    case "ECONNREFUSED": {
      // Node connects to both ::1 and 127.0.0.1 for "localhost"; when it
      // fails, it throws an AggregateError with an EMPTY message.
      const addresses =
        Array.isArray(error.errors) && error.errors.length
          ? error.errors
              .map((e) => `${e.address}:${e.port}`)
              .join(", ")
          : `${DB_CONFIG.host}:${DB_CONFIG.port}`;
      return `Connection refused (${addresses}). MySQL server is NOT reachable there. Start/install MySQL or fix DB_HOST / DB_PORT in .env.`;
    }
    case "ER_ACCESS_DENIED_ERROR":
      return `Access denied for DB user. Check DB_USER / DB_PASSWORD in .env.`;
    case "ER_BAD_DB_ERROR":
      return `Database "${DB_CONFIG.database}" does not exist.`
        + " Create it with the SQL in the setup instructions.";
    default:
      return error.message || error.code || "Unknown database error";
  }
}

async function testDatabaseConnection() {
  try {
    const connection = await pool.getConnection();

    console.log("✅ MySQL Database Connected Successfully");

    connection.release();
  } catch (error) {
    console.error(
      "❌ MySQL Connection Failed:",
      safeErrorMessage(error)
    );
    console.error(
      `   (Expected MySQL at ${DB_CONFIG.host}:${DB_CONFIG.port}`
      + `, database "${DB_CONFIG.database || "(not set)"}")`
    );
  }
}

testDatabaseConnection();

module.exports = pool;