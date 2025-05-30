import express from 'express';
import router from './router';
import db from './config/db';
import cors from 'cors';

async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    console.log('Conexión exitosa a la base de datos');
  } catch (error) {
    console.log('Error al conectarse con la BS:');
    console.log(error);
  }
}

connectDB();
const server = express();
server.use(express.json());
server.use(cors());
server.use('/api', router);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

export default server;