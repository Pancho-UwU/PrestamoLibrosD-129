import { BibliotecariaModel } from "../model/bibliotecaria.js";
import { validatorBibliotecariaParse } from "../schema/bibliotecaria.js";
import { generateToken } from "../utils/generateJwt.js";
export {validatorBibliotecaria, validatorBibliotecariaParse} from "../schema/bibliotecaria.js"

export class BibliotecariaController{
    static async register(req,res){
        const valdidate = validatorBibliotecariaParse(req.body)
        if(!valdidate.success){
            return res.status(400).json({
                message: "Los datos estan mal",
                error: valdidate.error.issues
            })
        }
        try{
            const{message,data,status} = await BibliotecariaModel.register(req.body)
            return res.status(status).json({
                message: message,
                data:data
            })
    
        }catch(error){
            return res.status(500).json({
                message:"Error en la base de datos",
                error: error.message
            })
        }
    }
    static async login(req,res){
        const valdidate = validatorBibliotecariaParse(req.body)
        if(!valdidate.success){
            return res.status(400).json({
                message: "Los datos estan mal",
                error: valdidate.error.issues
            })
        }
        try{
            const {message,data,status} = await BibliotecariaModel.login(req.body)
            
            if(status!==201){
                return res.status(status).json({
                    error:message,
                    data:data
                })
            }
            const token = generateToken({id: data.id,correo:req.body.correo})
            res.cookie('token', token,{
                httpOnly:true,
                sameSite:'strict',
                maxAge:24*60*60*1000,
            })
            return res.status(status).json({
                message: message,
                data: data,
                token:token
            })
        }catch(error){
            return res.status(500).json({
                message:"Error en la base de datos y en el controlador login",
                error: error.message
            })
        }
    }
}