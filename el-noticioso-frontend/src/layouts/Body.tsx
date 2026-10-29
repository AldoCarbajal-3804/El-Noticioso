import { useEffect, useState } from "react";
import * as z from "zod";
import { CardIntroduccion } from "@/components/cards/CardIntroduccion";
import { CardNews } from "@/components/news/CardNews";
import { CardAside } from "@/components/news/CardAside";
import { PropsAside } from "@/schemas/props/PropsAside";
import { SpinnerLoad } from "@/components/ui/SpinnerLoad";
import ServiceNews from "@/services/apis-externals/ServiceNews";
import NoticiaService from "@/services/apis-locals/NoticiaService";

type AsideArticle = z.infer<typeof PropsAside>;

type MainNews = {
    uuid: string;
    titulo: string;
    descripcion: string;
    resumen: string;
    urlImagen: string;
    autor: string;
    fecha: Date;
};

function Body() {
    const activeLink = window.location.pathname
    const [asideNews, setAsideNews] = useState<AsideArticle[]>([]);
    const [mainNews, setMainNews] = useState<MainNews[]>([]);
    const [isAsideLoading, setIsAsideLoading] = useState(true);
    const [isMainNewsLoading, setIsMainNewsLoading] = useState(true);
    const [asideError, setAsideError] = useState<string | null>(null);
    const [mainNewsError, setMainNewsError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const loadAsideNews = async () => {
            try {
                const articles = await ServiceNews().getNewsAside();
                if (isMounted) setAsideNews(articles);
            } catch (error) {
                if (isMounted) {
                    setAsideError(error instanceof Error ? error.message : "No se pudieron cargar las noticias.");
                }
            } finally {
                if (isMounted) setIsAsideLoading(false);
            }
        };

        void loadAsideNews();

        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        let isMounted = true;

        const loadMainNews = async () => {
            try {
                const noticias = await NoticiaService().getNoticias();

                const mappedNews = noticias.map((noticia) => ({
                    uuid: String(noticia.id),
                    titulo: noticia.titulo,
                    descripcion: noticia.descripcion,
                    resumen: noticia.resumen,
                    urlImagen: noticia.imagen,
                    autor: noticia.autor,
                    fecha: new Date(noticia.fecha),
                }));

                if (isMounted) setMainNews(mappedNews);
            } catch (error) {
                if (isMounted) {
                    setMainNewsError(error instanceof Error ? error.message : "No se pudieron cargar las noticias principales.");
                }
            } finally {
                if (isMounted) setIsMainNewsLoading(false);
            }
        };

        void loadMainNews();

        return () => {
            isMounted = false;
        };
    }, []);
    
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
                        {isMainNewsLoading && <SpinnerLoad />}
                        {mainNewsError && <p role="alert">{mainNewsError}</p>}
                        {!isMainNewsLoading && !mainNewsError && mainNews.length === 0 && (
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
                        {isAsideLoading && 
                            <SpinnerLoad />
                        }
                        {asideError && <p role="alert">{asideError}</p>}
                        {!isAsideLoading && !asideError && asideNews.length === 0 && (
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