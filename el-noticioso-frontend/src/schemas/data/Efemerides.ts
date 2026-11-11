import * as z from "zod"

export const EfemerideFila = z.object({
    generation: z.string()
}).transform((fila) => ({
    generation: fila.generation
}));

export type Efemeride = z.output<typeof EfemerideFila>;