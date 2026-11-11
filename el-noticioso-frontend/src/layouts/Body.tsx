import * as z from "zod";
import { CardIntroduccion } from "@/components/cards/CardIntroduccion";
import { CardEfemerides } from "@/components/cards/CardEfemerides";
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
            
            {/* Cada contenedor ocupa la mitad del ancho; [&>*]:flex-1 hace que la tarjeta llene su alto */}
            <section className="flex flex-col md:flex-row items-stretch gap-6 px-6 py-6 bg-sixth">
                <div className="flex flex-col flex-1 [&>*]:flex-1">
                    <CardIntroduccion 
                        titulo="Bienvenido al Noticioso" 
                        contenido="Este es un espacio para encontrar noticias de actualidad, siempre con la mejor información y veracidad, para que puedas estar al tanto de lo que sucede en el mundo. Aquí reunimos los acontecimientos más relevantes del día, organizados por categoría y ubicación para que encuentres rápidamente lo que te interesa. Cada noticia incluye un resumen claro, el nombre del autor y la fecha de publicación, de modo que puedas evaluar su contexto antes de leerla completa. En la sección de noticias extras encontrarás artículos de fuentes externas seleccionadas, y en la tarjeta de efemérides descubrirás los hechos históricos que ocurrieron en un día como hoy. Explora, filtra por tus temas favoritos y guarda las noticias que más te importen." 
                    />
                </div>
                <div className="flex flex-col flex-1 [&>*]:flex-1">
                    <CardEfemerides />
                </div>
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
