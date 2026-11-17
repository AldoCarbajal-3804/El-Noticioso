import { CardAside } from "@/components/news/CardAside";
import { PropsAside } from "@/schemas/props/PropsAside";
import { SpinnerLoad } from "@/components/ui/SpinnerLoad";
import ServiceExtras from "@/services/apis-externals/ServiceExtras";
import useFetch from "@/hooks/useFetch";
import * as z from "zod";


type AsideArticle = z.infer<typeof PropsAside>;
const obtenerNoticiasAside = (): Promise<AsideArticle[]> => ServiceExtras().getExtrasAside();

function Aside(){

    // Definidas fuera del componente para que sean estables entre renders
    const aside = useFetch(obtenerNoticiasAside, "No se pudieron cargar las noticias.");
    
    const asideNews = aside.data ?? [];
    
    
    return (
        <>
            <h2 className="font-bold text-third
                text-lg md:text-xl lg:text-2xl">
                    NOTICIAS EXTRAS
            </h2>
            {aside.cargando && 
                <SpinnerLoad />
            }
            {aside.error && <p role="alert">{aside.error}</p>}
            {!aside.cargando && !aside.error && asideNews.length === 0 && (
                <p>No hay noticias disponibles.</p>
            )}
            {asideNews.map((article) => (
                <CardAside key={article.urlNoticia} {...article} />
            ))}
        </>
    );
}

export default Aside;