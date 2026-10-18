import * as z from "zod"

const PropsSchema = z.object({
    href: z.url({error: "La URL es requerida"}),
    img: z.string({error : "La imagen es requerida"}),
    description: z.string({error : "La descripcion esta incompleta"})
        .max(50,{error:"La descripcion no puede superar los 50 caracteres"})
})

type Props = z.infer<typeof PropsSchema>;

export const LinkFooter = ({href,img,description} : Props ) => {

    return(
        <a href={href} target="_blank" rel="noopener noreferrer">
            <img src={img} alt={description} className="w-7 lg:w-10"  />
        </a>
    )
}
