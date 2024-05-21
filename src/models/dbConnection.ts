import { Client } from "pg";
import { dbConfig } from "../constants";
export const client = new Client(dbConfig);

export default async () => {
  try {
    await client.connect();
    console.log("Connected to PostgreSQL database");
  } catch (err) {
    console.error("Error connecting to PostgreSQL database", err);
  }
};
