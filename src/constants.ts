export const dbConfig = {
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PS || "1234",
  host: process.env.DB_HOST || "localhost",
  port: +(process.env.DB_PORT || 5432), // Convert to number
  database: process.env.DB_NAME || "test",
};
