import { supabase } from "../database/SupaBase.js";

export class PrestamoModel{
    static async createPrestamo(dataInsert){
        try{
            let{data, error} = await supabase.from('estudiantes').select('nombre').eq('id',dataInsert.estudiante_id);
            if(error){
               return{
                    message:error.message,
                    data:null,
                    status: 500    
                } 
            }
            if(data.length ===0){
                return{
                    message:"El estudiante no existe",
                    status:404
                }
            }
            ({data,error}=await supabase.from('bibliotecaria').select('nombre').eq('id',dataInsert.bibliotecaria_id))
            if(error){
                return{
                    message:error.message,
                    data:null,
                    status: 500    
                } 
            }
            if(data.length ===0){
                return{
                    message:"la bibliotecaria no existe",
                    status:404
                }
            }
            const dataAInsertar = {
                ...dataInsert,
                estaDevuelto: false
            };
            ({data,error} = await supabase.from('libroprestado').insert([dataAInsertar]).select('id'))
             if(error){
                return{
                    message:error.message,
                    data:null,
                    status: 500    
                }
                
            }
            const id = data[0].id
            return{
                message:"Se insertaron los datos en libro prestamo",
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
    static async todoAlumnos(){
        try{
            const {data,error} =await supabase.from('libroprestado').select(`id,nombrelibro,fechaPrestamo,estaDevuelto,estudiantes(nombre, apellido, curso)`)
            if(error){
                return{
                    message:error.message,
                    status:500,
                    data:null
                }
            }
            if(data.length===0){
                return{
                    message:"No se encontraron prestamos",
                    data:null,
                    status:404
                }
            }
            return{
                message: "Prestamos encontrados",
                data:data,
                status:200
            }
        }catch(error){
            return{
                message:error.message,
                data:null,
                status: 500
            }
        }
    }
    static async devolverLibro(id){
        try{
            let{data,error} = await supabase.from('libroprestado').select('estaDevuelto').eq('id',id).single();
            if(error){
                return{
                    message:error.message,
                    status:500,
                    data:null
                }
            }
            let varDevolverLibro = data.estaDevuelto;
            varDevolverLibro = varDevolverLibro === false ? true : false;
            ({data,error} =await supabase.from('libroprestado').update({estaDevuelto:varDevolverLibro}).eq('id',id));
            if(error){
                return{
                    message:error.message,
                    status:500,
                    data:null
                }
            }
            return {
                message:"Se actualizo estado del libro",
                data:{
                    estadoLibro:varDevolverLibro
                },
                status:200
            }
        }catch(error){
            return{
                message:error.message,
                data:null,
                status: 500
            }
        }
    }
}