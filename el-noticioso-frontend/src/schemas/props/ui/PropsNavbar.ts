import * as z from "zod"

export const PropsNavbar = z.object({
    href: z.url({error: "La URL es requerida"}),
    text: z.string({error: "El texto es requerido"})
        .max(50, {error: "El texto no puede superar los 50 caracteres"}),
    onClick: z.function().optional(),
    isActive: z.boolean().optional()
});
