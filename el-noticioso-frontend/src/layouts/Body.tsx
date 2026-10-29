import * as z from "zod";
import { CardIntroduccion } from "@/components/cards/CardIntroduccion";
import { CardNews } from "@/components/news/CardNews";
import { CardAside } from "@/components/news/CardAside";
import { PropsAside } from "@/schemas/props/PropsAside";
import type { Noticia } from "@/schemas/data/Noticias";
import { SpinnerLoad } from "@/components/ui/SpinnerLoad";
import ServiceNews from "@/services/apis-externals/ServiceNews";
import NoticiaService from "@/services/apis-locals/NoticiaService";
import useFetch from "@/hooks/useFetch";

type AsideArticle = z.infer<typeof PropsAside>;

// Definidas fuera del componente para que sean estables entre renders
const obtenerNoticiasAside = (): Promise<AsideArticle[]> => ServiceNews().getNewsAside();

const obtenerNoticiasPrincipales = (): Promise<Noticia[]> => NoticiaService().getNoticias();

function Body() {
    const activeLink = window.location.pathname;

    const aside = useFetch(obtenerNoticiasAside, "No se pudieron cargar las noticias.");
    const principal = useFetch(obtenerNoticiasPrincipales, "No se pudieron cargar las noticias principales.");

    const asideNews = aside.data ?? [];
    const mainNews = principal.data ?? [];

    return (

        <main className="px-0 lg:px-20">
            
            <section className="flex flex-col md:flex-row items-center justify-center gap-6 px-6 py-6 bg-sixth">
                <CardIntroduccion 
                    titulo="Bienvenido al Noticioso" 
                    contenido="Este es un espacio para encontrar noticias de actualidad, siempre con la mejor información y veracidad, para que puedas estar al tanto de lo que sucede en el mundo." 
                />
                <CardIntroduccion 
                    titulo="Bienvenido al Noticioso" 
                    contenido="Este es un espacio para encontrar noticias de actualidad, siempre con la mejor información y veracidad, para que puedas estar al tanto de lo que sucede en el mundo." 
                />
            </section>
            
            <section className="px-6 py-6 bg-sixth">
                
                <div className="flex flex-col items-start gap-6 md:flex-row">
                    <article className="flex flex-col gap-6 w-full md:w-2/3">
                        <h2 className="font-bold pb-6 text-third
                            text-lg md:text-xl lg:text-2xl">
                                NOTICIAS - {activeLink !== '/' ? activeLink.slice(1).toUpperCase() : 'INICIO'}
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
                    </article>
                    
                    <aside className="flex flex-col gap-6 sticky top-6 w-full self-start rounded-lg bg-seventh p-6 shadow-lg md:w-1/3">
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
                    </aside>
                </div>
            </section>
        </main>
    
    );
}

export default Body;
