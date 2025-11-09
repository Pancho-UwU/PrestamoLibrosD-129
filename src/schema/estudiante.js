import z from 'zod';

const estudianteSchema = z.object({
    id: z.number().int().positive(),
    nombre: z.string().nonempty("Se debe de enviar el nombre"),
    apellido: z.string().nonempty("Se debe de enviar el apellido"),
    curso: z.enum([
        "1-A", "1-B", "1-C",
        "2-A", "2-B", "2-C",
        "3-A", "3-B", "3-C",
        "4-A", "4-B", "4-C",
        "5-A", "5-B", "5-C",
        "6-A", "6-B", "6-C",
        "7-A", "7-B", "7-C",
        "8-A", "8-B", "8-C"
    ], {
        errorMap: () => ({ message: "Debes seleccionar un curso válido" })
    }),
    estado: z.enum(["Disponible", "Deudor","Inactivo"],{errorMap: () => ({ message: "Debes enviar un estado válido" })}),
    fecha: z.coerce.date()
})
export const validateEstudiante= (data) =>{
    return estudianteSchema.safeParse(data);
}
export const validateEstudiantePase= (data) =>{
    return estudianteSchema.partial().safeParse(data);
}