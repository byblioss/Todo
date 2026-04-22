import sql from 'mssql/msnodesqlv8';

export const dbConfig: sql.config = {
  server: 'localhost\\SQLEXPRESS',
  database: 'TodoAppDb',
  driver: 'ODBC Driver 18 for SQL Server',
  options: {
    trustedConnection: true,
    trustServerCertificate: true,
  },
};

let pool: sql.ConnectionPool | null = null;

export async function getConnection() {
  if (pool) return pool;
  pool = await sql.connect(dbConfig);
  return pool;
}