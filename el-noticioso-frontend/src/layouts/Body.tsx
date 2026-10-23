import { useEffect, useState } from "react";
import * as z from "zod";
import { CardIntroduccion } from "@/components/cards/CardIntroduccion";
import { CardNews } from "@/components/news/CardNews";
import { CardAside } from "@/components/news/CardAside";
import { PropsAside } from "@/schemas/PropsAside";
import { SpinnerLoad } from "@/components/ui/SpinnerLoad";
import ServiceNews from "@/services/apis-externals/ServiceNews";

type AsideArticle = z.infer<typeof PropsAside>;

function Body() {
    const activeLink = window.location.pathname
    const [asideNews, setAsideNews] = useState<AsideArticle[]>([]);
    const [isAsideLoading, setIsAsideLoading] = useState(true);
    const [asideError, setAsideError] = useState<string | null>(null);

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

    return (

        <main className="px-0 lg:px-20">
            
            <section className="flex flex-col md:flex-row items-center justify-center gap-6 px-6 pb-6
                bg-white">
                <CardIntroduccion 
                    titulo="Bienvenido al Noticioso" 
                    contenido="Este es un espacio para encontrar noticias de actualidad, siempre con la mejor información y veracidad, para que puedas estar al tanto de lo que sucede en el mundo." 
                />
                <CardIntroduccion 
                    titulo="Bienvenido al Noticioso" 
                    contenido="Este es un espacio para encontrar noticias de actualidad, siempre con la mejor información y veracidad, para que puedas estar al tanto de lo que sucede en el mundo." 
                />
            </section>
            
            <section className="bg-white px-6">
                
                <div className="flex flex-col items-start gap-6 md:flex-row">
                    <article className="flex flex-col gap-6 w-full md:w-2/3">
                        <h2 className="font-bold pb-6
                            text-lg md:text-xl lg:text-2xl">
                                NOTICIAS - {activeLink !== '/' ? activeLink.slice(1).toUpperCase() : 'INICIO'}
                        </h2>
                        <CardNews 
                            uuid="123e4567-e89b-12d3-a456-426614174000"
                            titulo="Noticia 1" 
                            resumen="Resumen de la noticia 1"
                            urlImagen="https://via.placeholder.com/150"
                            autor="Autor 1"
                            fecha={new Date("2023-01-01")}
                        />
                        <CardNews 
                            uuid="123e4567-e89b-12d3-a456-426614174001"
                            titulo="Noticia 2" 
                            resumen="Resumen de la noticia 2"
                            urlImagen="https://via.placeholder.com/150"
                            autor="Autor 2"
                            fecha={new Date("2023-01-02")}
                        />
                        <CardNews 
                            uuid="123e4567-e89b-12d3-a456-426614174001"
                            titulo="Noticia 2" 
                            resumen="Resumen de la noticia 2"
                            urlImagen="https://via.placeholder.com/150"
                            autor="Autor 2"
                            fecha={new Date("2023-01-02")}
                        />
                        <CardNews 
                            uuid="123e4567-e89b-12d3-a456-426614174001"
                            titulo="Noticia 2" 
                            resumen="Resumen de la noticia 2"
                            urlImagen="https://via.placeholder.com/150"
                            autor="Autor 2"
                            fecha={new Date("2023-01-02")}
                        />
                    </article>
                    
                    <aside className="flex flex-col gap-6 sticky top-6 w-full self-start rounded-lg bg-white p-6 shadow-lg md:w-1/3">
                        <h2 className="font-bold
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