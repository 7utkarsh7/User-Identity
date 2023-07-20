import mysql, { RowDataPacket, QueryOptions } from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
  // Configure the database connection details
  host: process.env.PGHOST,
  port: parseInt(process.env.PGPORT ?? '', 10),
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
});

// Helper function to check if the query is a table creation query
function isCreateTableQuery(query: string): boolean {
  return query.trim().toLowerCase().startsWith('create table');
}

// Function to get a new connection from the pool
async function getConnection(): Promise<mysql.PoolConnection> {
  const connection = await pool.getConnection();

  try {
    // Execute the create table query
    await connection.query(`
      CREATE TABLE IF NOT EXISTS Contact (
        id int(11) NOT NULL AUTO_INCREMENT,
        phoneNumber text,
        email text,
        linkedId int(11) DEFAULT NULL,
        linkPrecedence text,
        createdAt text,
        updatedAt text,
        PRIMARY KEY (id)
      ) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=latin1;
    `);
  } catch (error) {
    console.error('Error creating table:', error);
    throw error;
  }

  return connection;
}

export async function executeQuery<T>(
  query: string,
  values?: any[],
  options?: QueryOptions
): Promise<T> {
  const connection = await getConnection();

  try {
    // For other queries (SELECT, INSERT, etc.), execute normally
    const [rows, fields] = await connection.query<RowDataPacket[]>(query, values);
    return rows as T;
  } finally {
    connection.release();
  }
}
