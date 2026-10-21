import * as z from "zod"

export const PropsNews = z.object({
    uuid: z.uuid({error: "El UUID es requerido"}),
    titulo: z.string({error: "El título es requerido"})
        .max(100, {error: "El título no puede superar los 100 caracteres"}),
    resumen: z.string({error: "El resumen es requerido"})
        .max(200, {error: "El resumen no puede superar los 200 caracteres"}),
    urlImagen: z.url({error: "La URL de la imagen es requerida"}),
    autor: z.string({error: "El autor es requerido"})
        .max(50, {error: "El autor no puede superar los 50 caracteres"}),
    fecha: z.date({error: "La fecha es requerida"})
        .max(new Date(), {error: "La fecha no puede ser mayor a la fecha actual"})
});