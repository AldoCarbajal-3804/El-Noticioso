import * as z from "zod"

const PropsSchema = z.object({
    titulo: z.string({error: "El título es requerido"})
        .max(100, {error: "El título no puede superar los 100 caracteres"}),
    contenido: z.string({error: "El contenido es requerido"})
        .max(200, {error: "El contenido no puede superar los 200 caracteres"})
});

type Props = z.infer<typeof PropsSchema>;

export const CardIntroduccion = ({titulo, contenido}: Props) => {

    return(
        <blockquote className="bg-white shadow-xl rounded-lg p-6">
            <h3 className="text-title font-bold pb-2
                text-lg md:text-xl lg:text-2xl">
                    {titulo}
            </h3>
            <p className="text-body text-justify leading-relaxed
                text-sm lg:text-base">
                    {contenido}
            </p>
        </blockquote>
    )

}