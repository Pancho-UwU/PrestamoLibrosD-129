import cors from 'cors'
const corsOptions = {
  origin: ['http://localhost:3000'], // agrega más orígenes si es necesario
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};
export const corsMiddleware = cors(corsOptions);
