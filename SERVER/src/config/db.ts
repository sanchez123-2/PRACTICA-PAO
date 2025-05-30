import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
dotenv.config();

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