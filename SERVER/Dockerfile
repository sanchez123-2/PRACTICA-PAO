# Etapa 1: build y entorno de desarrollo
FROM node:18

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos del proyecto
COPY package*.json tsconfig*.json ./
COPY src ./src

# Instala dependencias
RUN npm install

# Expone el puerto donde corre tu API (debe coincidir con la app, p.ej., 8080)
EXPOSE 8080

# Comando para desarrollo (puedes cambiar por otro si usas build separado)
CMD ["npx", "nodemon", "--exec", "ts-node", "src/index.ts"]
