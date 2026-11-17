import { CardIntroduccion } from "@/components/cards/CardIntroduccion";
import { CardEfemerides } from "@/components/cards/CardEfemerides";
import Main from "./Main";
import Aside from "./Aside";

// Contenido de la sección principal (se muestra en las rutas válidas)
function Body() {

    return (

        <main className="px-0 lg:px-20">
            
            {/* Cada contenedor ocupa la mitad del ancho; [&>*]:flex-1 hace que la tarjeta llene su alto */}
            <section className="flex flex-col md:flex-row items-stretch gap-6 px-6 py-6 bg-sixth">
                <div className="flex flex-col flex-1 *:flex-1">
                    <CardIntroduccion 
                        titulo="Bienvenido al Noticioso" 
                        contenido="Este es un espacio para encontrar noticias de actualidad, siempre con la mejor información y veracidad, para que puedas estar al tanto de lo que sucede en el mundo. Aquí reunimos los acontecimientos más relevantes del día, organizados por categoría y ubicación para que encuentres rápidamente lo que te interesa. Cada noticia incluye un resumen claro, el nombre del autor y la fecha de publicación, de modo que puedas evaluar su contexto antes de leerla completa. En la sección de noticias extras encontrarás artículos de fuentes externas seleccionadas, y en la tarjeta de efemérides descubrirás los hechos históricos que ocurrieron en un día como hoy. Explora, filtra por tus temas favoritos y guarda las noticias que más te importen." 
                    />
                </div>
                <div className="flex flex-col flex-1 *:flex-1">
                    <CardEfemerides />
                </div>
            </section>
            
            <section className="px-6 py-6 bg-sixth">
                
                <div className="flex flex-col items-start gap-6 md:flex-row">
                    <article className="flex flex-col gap-6 w-full md:w-2/3">
                        <Main />
                    </article>
                    
                    <aside className="flex flex-col gap-6 sticky top-6 w-full self-start rounded-lg bg-seventh p-6 shadow-lg md:w-1/3">
                        <Aside />
                    </aside>
                </div>
            </section>
        </main>
    
    );
}

export default Body;
