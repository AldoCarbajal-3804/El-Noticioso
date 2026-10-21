import * as z from "zod"

export const PropsIntroduccion = z.object({
    titulo: z.string({error: "El título es requerido"})
        .max(100, {error: "El título no puede superar los 100 caracteres"}),
    contenido: z.string({error: "El contenido es requerido"})
        .max(200, {error: "El contenido no puede superar los 200 caracteres"})
});
