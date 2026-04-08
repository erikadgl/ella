import { Pool } from "pg";

export type Subscription = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  created_at: string;
  status: "pending" | "paid" | "cancelled";
  notes: string | null;
};

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
