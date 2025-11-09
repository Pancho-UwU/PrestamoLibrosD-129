import { supabase } from "../database/SupaBase.js";

export class EstudianteModule {
    static async getAll(){
        try{
            const {data,error} = await supabase.from('estudiantes').select('id,nombre,apellido,curso,estado,fecha')
            if(error){
                return{
                message:error,
                data:null,
                status: 500    
                }
            }
            if(data.length===0){
                return{
                    message: "No se encontraron datos",
                    data:[],
                    status:404
                }
            }
            return{
                message: data.length ===0? "No existen datos": "Datos encontrados",
                status:data.length ===0?404:200,
                data:data
            }
        }catch(error)
        {
            return{
                message:error.message,
                data:null,
                status: 500
            }
        }
    }
    static async getStudentFromCurso(curso)
    {
        try{
            const {data,error} = await supabase.from('estudiantes').select('id,nombre,apellido,curso,estado,fecha').eq('curso',curso)
            if(error){
                return{
                message:error,
                data:null,
                status: 500    
                }
            }
            if(data.length===0){
                return{
                    message: "No se encontraron datos",
                    data:[],
                    status:404
                }
            }
            return{
                message: data.length ===0? "No existen datos": "Datos encontrados",
                status:data.length ===0?404:200,
                data:data
            }
        }catch(error){
            return{
                message:error.message,
                data:null,
                status: 500
            }
        }
    }
    static async getStudentFilter(dataFilter){
        try{
            let query = supabase.from('estudiantes').select('*')
            if (dataFilter.curso){
                query = query.eq('curso',dataFilter.curso);
            }
            if(dataFilter.nombre){
                query = query.ilike('nombre',`%${dataFilter.nombre}%`)
            }
            if(dataFilter.apellido){
                query = query.ilike('apellido',`%${dataFilter.apellido}%`)
            }
            const {data,error} = await query
            if(error){
                return{
                    message:error.message,
                    data:null,
                    status: 500    
                }
            }
            if(data.length===0){
                return{
                    message: "No se encontraron datos",
                    data:[],
                    status:404
                }
            }
            return{
                message: data.length ===0? "No existen datos": "Datos encontrados",
                status:data.length ===0?404:200,
                data:data
            }
        }catch(error){
            return{
                message:error.message,
                data:null,
                status: 500
            }
        }
    }
    static async postCreateStudent(dataInsert){
        try{
            let {data,error} = await supabase.from('estudiantes').select('nombre').eq('nombre', dataInsert.nombre).ilike('apellido',dataInsert.apellido);
            if(error){
                return{
                    message: "Error en la base de datos",
                    data:dataInsert,
                    status:500
                }
            }
            if(data.length>0){
                return{
                    message:"Ya existe el estudiante",
                    status:409,
                    data:dataInsert
                }
            }
            ({data,error} = await supabase.from('estudiantes').insert([
               {...dataInsert}
            ]).select('id'))
            if(error){
                return{
                    message:error.message,
                    data:null,
                    status: 500    
                }
                
            }
            const id = data[0].id
            return{
                message:"Se insertaron los datos",
                data:{id: id,
                    ...dataInsert},
                status:201
            }
        }catch(error){
            return{
                message:error.message,
                data:null,
                status: 500
            }
        }
    }
    static async PATCHCurso(dataInsert){
        try{
            const{data,error} = await supabase.from('estudiantes').update({'curso':dataInsert.curso}).eq('id',dataInsert.id).select('*')
            if(error){
                return{
                    message:error.message,
                    data:null,
                    status: 500    
                }
            }
            if(data.length === 0 ){
                return{
                    message:"Datos no encontrados",
                    data:null,
                    status:404
                }
            }
            const dataInsertada =data[0]
            
            return{
                message:"Actualizaron los datos",
                data:dataInsertada,
                status:201
            }
        }
        catch(error){
            return{
                message:error.message,
                data:null,
                status: 500
            }
        }
    }
    
    
}