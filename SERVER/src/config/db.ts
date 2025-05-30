import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.DB_URL) {
  throw new Error("La variable de entorno DB_URL no está definida. Verifica tu configuración.");
}

const db = new Sequelize(process.env.DB_URL!, {
  models: [__dirname + "/../models/**/*.ts"],
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Solo para desarrollo, en producción usa certificados válidos
    },
  },
});

export default db;