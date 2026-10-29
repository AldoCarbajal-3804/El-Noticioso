import * as z from "zod"
//import save from "@/assets/icons/save.svg"
import { PropsNews } from "@/schemas/PropsNews";

type Props = z.infer<typeof PropsNews>;

export const CardNews = ({uuid, titulo,descripcion, resumen, urlImagen, autor, fecha}: Props) => {

    return(
        <article id={uuid} className="bg-seventh shadow-xl rounded-lg p-6">
            
            <header className="flex justify-between items-center mb-4">
                <h3 className="font-bold pb-2 text-third uppercase
                    text-lg md:text-xl lg:text-2xl">
                        {titulo}
                </h3>
                
                {/*<menu className="flex gap-2">
                    <button className="mt-4 inline-block rounded-lg bg-gray-300 px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-400">
                        Guardar 
                        <img src={save} alt="Guardar" className="inline-block w-4 h-4 ml-2" />
                    </button>
                </menu>*/}
                
            </header>
            
            <div>
                <p className="text-justify leading-relaxed pb-2 text-third font-bold
                    text-sm lg:text-base">
                        {descripcion}
                </p>
                <p className="text-justify leading-relaxed text-third
                text-sm lg:text-base">
                    {resumen}
                </p>
                <br />
                <img src={urlImagen} alt={titulo} className="rounded-lg mb-4"/>
            </div>
            
            <footer className="flex justify-between items-center mt-4">        
                <p className="text-sm lg:text-base text-third">
                    <span className="font-bold">Autor:</span> {autor}
                </p>
                <time className="text-sm lg:text-base text-third">
                    <span className="font-bold">Fecha:</span> {fecha.toLocaleDateString()}
                </time>
            </footer>
            
        </article>
    )   
}



