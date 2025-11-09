import express from "express"
import EstudianteRouter from './router/estudiante.js'
import bibliotecariaRouter from "./router/bibliotecaria.js"
import PrestamoRoute from "./router/prestamo.js"
import { corsMiddleware } from "./middleware/cors.js"

const PORT = 3000

const app = express()
app.use(express.json())
app.use(corsMiddleware)
app.use('/estudiante', EstudianteRouter)
app.use('/bibliotecaria', bibliotecariaRouter)
app.use('/prestamo', PrestamoRoute)
app.listen(PORT, ( )=>{
    console.log(`Servidor escuchando en el http://localhost:${PORT}`)
})