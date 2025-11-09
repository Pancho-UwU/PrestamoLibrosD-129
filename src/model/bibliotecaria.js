import { supabase } from "../database/SupaBase.js";
import bcrypt from 'bcrypt'

export class BibliotecariaModel{
    static async register(dataPrueba   ){
        try{
            const contraseniaEncript = bcrypt.hashSync(dataPrueba.contrasenia,10)
            let {data,error} =await supabase.from('bibliotecaria').select("id").eq('correo',dataPrueba.correo)
            
            if(error)
            {
                return {
                    message:error,
                    data:data,
                    status:409
                }
            }
            if(data.length>0){
                return{
                    message:"EL correo ya existe",
                    data: data,
                    status:500
                }
            }
            ({data,error} = await supabase.from('bibliotecaria').insert([
                {
                    nombre: dataPrueba.nombre,
                    apellido:dataPrueba.apellido,
                    correo:dataPrueba.correo,
                    contrasenia:contraseniaEncript
                }
            ]).select('id'))
            if(error){
                return{
                    message: error,
                    data:data,
                    status:500
                }
            }
            
            return{
                message: 'Se registro la bibliotecaria',
                data:{
                    id: data[0].id,
                    ...dataPrueba
                },
                status:201 
            }

        }catch(error){
            return{
                message:"Error en el controlador " + error.message,
                data:null,
                status:500
            }
        }
    }
    static async login(dataInsert){
        try{
            const {data,error} = await supabase.from('bibliotecaria').select('contrasenia, id').eq('correo',dataInsert.correo)
            
            if(error){
                return{
                    message: error,
                    data:false,
                    status:500
                }
            }
            if(data.length===0){
                return {
                    message: "No existe el usuario",
                    data: [],
                    status:404
                }
            }
            const id = data[0].id
            if(bcrypt.compareSync(dataInsert.contrasenia,data[0].contrasenia)){
                
                return{
                    message: "Se inicio seción",
                    data:{
                        id:id,
                        ...dataInsert
                    },
                    status:201
                }
            }
            return{
                message: "Contrasenia incorrecta",
                data:false,
                status:401
                }
            }

        catch(error){
            return{
                message: error.message,
                data:null,
                status:500
            }
        }
    }
}