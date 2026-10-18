import * as z from "zod"
//import save from "@/assets/icons/save.svg"


const PropsSchema = z.object({
    uuid: z.uuid({error: "El UUID es requerido"}),
    titulo: z.string({error: "El título es requerido"})
        .max(100, {error: "El título no puede superar los 100 caracteres"}),
    resumen: z.string({error: "El resumen es requerido"})
        .max(200, {error: "El resumen no puede superar los 200 caracteres"}),
    urlImagen: z.url({error: "La URL de la imagen es requerida"}),
    autor: z.string({error: "El autor es requerido"})
        .max(50, {error: "El autor no puede superar los 50 caracteres"}),
    fecha: z.date({error: "La fecha es requerida"})
        .max(new Date(), {error: "La fecha no puede ser mayor a la fecha actual"})
});

type Props = z.infer<typeof PropsSchema>;

export const CardNews = ({uuid, titulo, resumen, urlImagen, autor, fecha}: Props) => {

    return(
        <article id={uuid} className="bg-white shadow-xl rounded-lg p-6">
            
            <header className="flex justify-between items-center mb-4">
                <h3 className="text-title font-bold pb-2
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
                <p className="text-body text-justify leading-relaxed
                text-sm lg:text-base">
                    {resumen}
                </p>
                <img src={urlImagen} alt={titulo} className="rounded-lg mb-4"/>
            </div>
            
            <footer className="flex justify-between items-center mt-4">        
                <p className="text-body text-sm lg:text-base">
                    <span className="font-bold">Autor:</span> {autor}
                </p>
                <time className="text-body text-sm lg:text-base">
                    <span className="font-bold">Fecha:</span> {fecha.toLocaleDateString()}
                </time>
            </footer>
            
        </article>
    )   
}



