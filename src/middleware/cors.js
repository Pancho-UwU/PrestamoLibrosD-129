import cors from 'cors'
const corsOptions = {
  origin: ['http://localhost:3000',
    'https://prestamolibrosd-129.onrender.com/'
  ], // agrega más orígenes si es necesario
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};
export const corsMiddleware = cors(corsOptions);
