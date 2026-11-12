import * as z from "zod";

// Forma exacta del JSON que devuelve el servicio de scraping (ExtrasDTO)
// fecha llega como número (milisegundos) porque el backend serializa java.util.Date
export const ExtrasFila = z.object({
    urlNoticia: z.string(),
    titulo: z.string().nullable().optional(),
    fecha: z.union([z.number(), z.string()]).nullable().optional(),
    urlImagen: z.string().nullable().optional(),
    autor: z.string().nullable().optional(),
});

export const ListExtrasResponse = z.array(ExtrasFila);

export type ExtrasFilaTipo = z.infer<typeof ExtrasFila>;
