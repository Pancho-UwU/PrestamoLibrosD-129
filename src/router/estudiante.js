import { EstudianteController } from "../controller/estudiante.js";
import express from "express"
import { authJWTAuth } from "../middleware/auth.js";
const EstudianteRouter = express.Router()

EstudianteRouter.get('/',authJWTAuth , EstudianteController.getAll)
EstudianteRouter.get('/curso/',authJWTAuth ,EstudianteController.getStudentFromCurso)
EstudianteRouter.get('/filter',authJWTAuth ,EstudianteController.getStudentFilterd)
EstudianteRouter.post('/register',authJWTAuth ,EstudianteController.postEstudiante)
EstudianteRouter.patch('/curso/:id',authJWTAuth ,EstudianteController.PATCHCurso)
export default EstudianteRouter;