import * as z from "zod"
import { PropsFooter } from "@/schemas/ui/PropsFooter";

type Props = z.infer<typeof PropsFooter>;

export const LinkFooter = ({href,img,description} : Props ) => {

    return(
        <a href={href} target="_blank" rel="noopener noreferrer">
            <img src={img} alt={description} className="w-7 lg:w-10"  />
        </a>
    )
}
