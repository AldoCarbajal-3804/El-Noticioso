import * as z from "zod"

export const PropsEfemerides = z.object({
    contenido: z.string({error: "El contenido es requerido"})
        .max(500, {error: "El contenido no puede superar los 500 caracteres"}),
})