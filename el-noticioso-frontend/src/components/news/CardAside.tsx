import { PropsAside } from "@/schemas/props/PropsAside";
import { z } from "zod";


type Props = z.infer<typeof PropsAside>;

export const CardAside = ({ urlNoticia, titulo, urlImagen, autor, fecha}: Props) => {
    return(
        <a
            href={urlNoticia}
            className="block w-full rounded-lg bg-sixth p-6 shadow-xl transition-shadow hover:shadow-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700"
            target="_blank"
            rel="noopener noreferrer"
        >
            <header className="flex justify-between items-center mb-4">
                <h3 className="text-title font-bold pb-2 text-third
                    text-lg md:text-xl lg:text-2xl">
                        {titulo}
                </h3>
            </header>
            <div>
                <img src={urlImagen} alt={titulo} className="mb-4 h-auto w-full rounded-lg object-cover"/>
            </div>
            <footer className="flex justify-between items-center mt-4">
                <p className="text-body text-sm lg:text-base text-third">
                    <span className="font-bold">Autor:</span> {autor}
                </p>
                <time className="text-body text-sm lg:text-base text-third">
                    <span className="font-bold">Fecha:</span> {fecha.toLocaleDateString()}
                </time>
            </footer>
        </a>
    )
}
    