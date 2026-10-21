import * as z from "zod"

export const PropsFooter = z.object({
    href: z.url({error: "La URL es requerida"}),
    img: z.string({error : "La imagen es requerida"}),
    description: z.string({error : "La descripcion esta incompleta"})
        .max(50,{error:"La descripcion no puede superar los 50 caracteres"})
})