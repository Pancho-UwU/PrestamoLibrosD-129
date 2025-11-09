import z from "zod"

const prestamoSchema = z.object({
    estudiante_id: z.number().positive(),
    bibliotecaria_id: z.number().positive(),
    nombrelibro: z.string(),
    fechaPrestamo: z.coerce.date()
})
export const validatePrestamo = (data) =>{
    return prestamoSchema.safeParse(data);
}
export const validatePrestamoSafe= (data)=>{
    return  prestamoSchema.partial().safeParse(data);
}