import { EstudianteModule } from "../model/estudiante.js";
import {validateEstudiante,validateEstudiantePase} from "../schema/estudiante.js"

export class EstudianteController{
    static async getAll(req,res){
        try{
            const {message,status, data} = await EstudianteModule.getAll()
            
            return res.status(status).json({
                message:message,
                data:data
            })
        }catch(error){
            res.status(500).json({message:"Error en el controlador",
                error: error.message
            })
        }
    }
    static async getStudentFromCurso(req,res){
        const validate =validateEstudiantePase(req.body);
        if(!validate.success){
            return res.status(409).json({
                message:"El el cuerpo esta mal",
                error: validate.error.issues
            })
        }
        try{
            const {message,status, data} = await EstudianteModule.getStudentFromCurso(req.body)
            if(status!==200){
                return res.status(status).json({
                    message:message,
                    data:data
                })
                
            }
            return res.status(status).json({
                message:message,
                data:data
            })
        }catch(error){
            res.status(500).json({message:"Error en el controlador",
                error: error.message
            })
        }
    }
    static async getStudentFilterd(req,res){
        const validate =validateEstudiantePase(req.body);
        if(!validate.success){
            return res.status(409).json({
                message:"El el cuerpo esta mal",
                error: validate.error.issues
            })
        }
        try{
            const {message,data, status} = await EstudianteModule.getStudentFilter(req.body)
            console.log(status)
            if(status !==200){
                return res.status(status).json({
                    message:message,
                    data:data
                })
            }
            return {
                message:message,
                data:data
            }

        }catch(error){
           res.status(500).json({message:"Error en el controlador",
                error: error.message
            }) 
        }
    }
    static async postEstudiante(req,res){
        const validate =validateEstudiantePase(req.body);
        if(!validate.success){
            console.log(validate.error.issues)
            return res.status(409).json({
                message:"El el cuerpo esta mal",
                error: validate.error.issues
            })
        }
        try{
            const{message,data,status} = await EstudianteModule.postCreateStudent(req.body)
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
            es.status(500).json({message:"Error en el controlador",
                error: error.message
            }) 
        }
    }
    static async PATCHCurso(req,res){
        const id = Number(req.params.id)
        if(!Number.isInteger(id) || id<=0){
            return res.status(409).json({
                message:"Formato id incorrecto"
            })
        }
        const validate =validateEstudiantePase({id:id,
            ...req.body
        });
        if(!validate.success){
            return res.status(409).json({
                message:"El el cuerpo esta mal",
                error: validate.error.issues
            })
        }

        try{
            const id = parseInt(req.params.id);
            console.log(req.params.id)
            const { curso } = req.body;
            
            const{message,data,status} = await EstudianteModule.PATCHCurso({id,curso})
            if(status!==201){
                return res.status(status).json({
                    error:message
                })
                
            }
            return res.status(status).json({
                message:message,
                data:data
            })
        }catch(error){
            es.status(500).json({message:"Error en el controlador",
                error: error.message
            }) 
        }
    }
    
}