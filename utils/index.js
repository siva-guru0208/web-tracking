import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
const connection = await mysql.createConnection({
  host: "webtracking-webtracking.i.aivencloud.com",
  user: "avnadmin",
  database: "defaultdb",
  password:"process.env.AVNS_YT2KmvvbS0vuH41rdpA",
  port:"16632",
  
});
export const db = drizzle(connection);