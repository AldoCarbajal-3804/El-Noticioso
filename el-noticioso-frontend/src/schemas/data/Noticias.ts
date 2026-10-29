import * as z from "zod"

// Noticia tal como la devuelve la API local, convertida a la entidad que usa la aplicación
export const NoticiaFila = z.object({
    id: z.number(),
    titulo: z.string(),
    autor: z.string(),
    descripcion: z.string(),
    resumen: z.string(),
    imagen: z.url(),
    fecha: z.string(),
}).transform((fila) => ({
    uuid: String(fila.id),
    titulo: fila.titulo,
    autor: fila.autor,
    descripcion: fila.descripcion,
    resumen: fila.resumen,
    urlImagen: fila.imagen,
    fecha: new Date(fila.fecha),
}));

export type Noticia = z.output<typeof NoticiaFila>;
