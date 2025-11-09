import { BibliotecariaController } from "../controller/bibliotecaria.js";
import express from 'express'

const bibliotecariaRouter =express.Router()

bibliotecariaRouter.post('/register', BibliotecariaController.register)
bibliotecariaRouter.post('/login',BibliotecariaController.login)

export default bibliotecariaRouter