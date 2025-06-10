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
server.use(cors({
  origin: '*', // Cambia '*' por el dominio específico si es necesario
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
server.use('/api', router);

// Ruta de prueba para saber si el servidor está corriendo
server.get('/', (req, res) => {
  res.send('API corriendo');
});


export default server;