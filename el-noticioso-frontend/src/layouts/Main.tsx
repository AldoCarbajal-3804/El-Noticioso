import NoticiaService from "@/services/apis-locals/NoticiaService";
import useFetch from "@/hooks/useFetch";
import useRoute from "@/hooks/useRoute";
import { useCallback } from "react";
import type { Noticia } from "@/schemas/data/Noticias";
import { CardNews } from "@/components/news/CardNews";
import {SpinnerLoad} from "@/components/ui/SpinnerLoad";


function Main(){
    const { ubicacion, seccion } = useRoute();

    // Cambiar de ruta cambia la ubicación; useFetch vuelve a cargar al cambiar obtenerNoticiasPrincipales
    const obtenerNoticiasPrincipales = useCallback(
        (): Promise<Noticia[]> => NoticiaService().getNoticias({ ubicacion }),
        [ubicacion]
    );
    const principal = useFetch(obtenerNoticiasPrincipales, "No se pudieron cargar las noticias principales.");
    const mainNews = principal.data ?? [];

    return (
        <>
            <h2 className="font-bold pb-6 text-third
                text-lg md:text-xl lg:text-2xl">
                    NOTICIAS - {seccion}
            </h2>
            {principal.cargando && <SpinnerLoad />}
            {principal.error && <p role="alert">{principal.error}</p>}
            {!principal.cargando && !principal.error && mainNews.length === 0 && (
                <p>No hay noticias disponibles.</p>
            )}
            {mainNews.map((noticia) => (
                <CardNews
                    key={noticia.uuid}
                    uuid={noticia.uuid}
                    titulo={noticia.titulo}
                    descripcion={noticia.descripcion}
                    resumen={noticia.resumen}
                    urlImagen={noticia.urlImagen}
                    autor={noticia.autor}
                    fecha={noticia.fecha}
                />
            ))}
        </>
    )

}

export default Main;