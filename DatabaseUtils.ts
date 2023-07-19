import mysql, { RowDataPacket, FieldPacket, QueryOptions } from 'mysql2/promise';

const pool = mysql.createPool({
  // Configure the database connection details
  host: 'localhost',
  port: 3306,
  user: 'user',
  password: '',
  database: 'test',
});

export async function executeQuery<T>(
  query: string,
  values?: any[],
  options?: QueryOptions
): Promise<T> {
  const connection = await pool.getConnection();

  try {
    const [rows, fields] = await connection.query<RowDataPacket[]>(query, values);
    return rows as T;
  } finally {
    connection.release();
  }
}
