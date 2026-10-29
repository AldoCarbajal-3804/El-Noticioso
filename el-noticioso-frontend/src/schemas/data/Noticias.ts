import * as z from "zod"

export const Noticias = z.object({
    id: z.number(),
    titulo: z.string(),
    autor: z.string(),
    descripcion: z.string(),
    resumen: z.string(),
    imagen: z.url(),
    fecha: z.string(),
});