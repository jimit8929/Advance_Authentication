// Backend/MailTrap/mailtrap.config.js
import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Setup __dirname since ES modules don't have it
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from Backend/.env
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const TOKEN = process.env.MAILTRAP_TOKEN;
const ENDPOINT = process.env.MAILTRAP_ENDPOINT;

if (!TOKEN) {
  throw new Error("Mailtrap token not found. Check Backend/.env file!");
}

export const mailtrapclient = new MailtrapClient({
  token: TOKEN,
  endpoint: ENDPOINT,
});

export const sender = {
  email: "hello@demomailtrap.co", // you can change this in Mailtrap settings if needed
  name: "JIMIT MEHTA",
};

const recipients = [
  {
    email: "jimit8929@gmail.com",
  },
];
