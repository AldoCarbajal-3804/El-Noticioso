import * as z from "zod"
import { PropsIntroduccion } from "@/schemas/props/PropsIntroduccion";

type Props = z.infer<typeof PropsIntroduccion>;

export const CardIntroduccion = ({titulo, contenido}: Props) => {

    return(
        <blockquote className="bg-seventh shadow-xl rounded-lg p-6">
            <h3 className="text-third font-bold pb-2
                text-lg md:text-xl lg:text-2xl">
                    {titulo}
            </h3>
            <p className="text-third text-justify leading-relaxed
                text-sm lg:text-base">
                    {contenido}
            </p>
        </blockquote>
    )

}