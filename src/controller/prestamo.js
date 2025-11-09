import { PrestamoModel } from "../model/prestamo.js";
import {validatePrestamo,validatePrestamoSafe} from "../schema/prestamo.js"
export class PrestamoController {
    static async createPrestamo(req,res){
        const validate = validatePrestamo(req.body);
        if(!validate.success){
            return res.status(409).json({
                message:"Datos malos",
                error: validate.error.issues
            })
        }
        try{
            const{message,data,status} = await PrestamoModel.createPrestamo(req.body)
            if(status!==201){
                return res.status(status).json({
                    message:message
                })
            }
            return res.status(status).json({
                    message:message,
                    data:data
            })
        }catch(error){
            return res.status(500).json({
                message:"error al insertar datos en el controllador",
                error:error.message
            })
        }
    }
    static async getAllPrestamo(req,res){
        try{
            const {message,data,status} = await PrestamoModel.todoAlumnos()
            if(status!==200){
                return res.status(status).json({
                    message:message
                })
            }
            return res.status(status).json({
                message:message,
                data:data
            })
        }catch(error){
            return res.status(500).json({
                message:"error al insertar datos en el controllador",
                error:error.message
            })
        }
    }
    static async patchEstado(req,res){
        try{
            const{message,data,status} = await PrestamoModel.devolverLibro(req.params.id);
            if(status!==200){
                return res.status(status).json({
                    message:message
                })
            }
            return res.status(status).json({
                message:message,
                data:data
            })
        }catch(error){
            return res.status(500).json({
                message:"error al insertar datos en el controllador",
                error:error.message
            })
        }
    }
}