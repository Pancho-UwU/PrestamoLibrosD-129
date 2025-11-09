import { PrestamoController } from "../controller/prestamo.js";
import express from "express";
import { authJWTAuth } from "../middleware/auth.js";
const PrestamoRoute =express.Router()

PrestamoRoute.post('/create',authJWTAuth ,PrestamoController.createPrestamo)
PrestamoRoute.get('/all',authJWTAuth ,PrestamoController.getAllPrestamo)
PrestamoRoute.patch('/estado/:id',authJWTAuth ,PrestamoController.patchEstado)

export default PrestamoRoute;