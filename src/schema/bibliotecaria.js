import z from 'zod';

const bibliotecariaShema = z.object({
    id: z.number().int().positive(),
    nombre: z.string().nonempty("Se debe de enviar el nombre"),
    apellido: z.string().nonempty("Se debe de enviar el apellido"),
    correo: z.email().nonempty("El correo es obligarorio"),
    contrasenia: z.string().nonempty("Se debe de enviar la contraseñia")
})

export const validatorBibliotecaria=(data) =>{
    return bibliotecariaShema.safeParse(data);
}
export const validatorBibliotecariaParse=(data) =>{
    return bibliotecariaShema.partial().safeParse(data);
}
