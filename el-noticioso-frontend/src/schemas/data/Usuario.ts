import * as z from "zod"

// Perfil tal como lo devuelve el backend en /api/perfil (RegistroResponse)
export const PerfilFila = z.object({
    nombre: z.string(),
    apellidos: z.string(),
    telefono: z.string().nullable(),
    correo: z.string(),
    usuario: z.string(),
}).transform((fila) => ({
    nombre: fila.nombre,
    apellidos: fila.apellidos,
    // En los formularios es más cómodo un string vacío que null
    telefono: fila.telefono ?? "",
    correo: fila.correo,
    usuario: fila.usuario,
}));

// Entidad de la aplicación
export type Usuario = z.output<typeof PerfilFila>;
