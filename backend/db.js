import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
  host: 'localhost',
  user: 'root', // Cambia si tu usuario es diferente
  password: '', // Cambia si tienes contraseña
  database: 'wolke',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
