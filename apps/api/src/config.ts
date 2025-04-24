import dotenv from "dotenv";

dotenv.config();

interface Config {
   port: number;
   openrouterKey: string;
}

export const config: Config = {
   port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
   openrouterKey: process.env.OPENROUTER_KEY || "",
};
