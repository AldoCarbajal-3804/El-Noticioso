import { CardIntroduccion } from "@/components/cards/CardIntroduccion";

function Body() {
    
    const activeLink = window.location.pathname


    return (

        <main className="px-0 md:px-15 lg:px-30">
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
                <h2 className="font-bold pb-6
                    text-lg md:text-xl lg:text-2xl">
                        NOTICIAS - {activeLink !== '/' ? activeLink.slice(1).toUpperCase() : 'INICIO'}
                </h2>
            </section>
        </main>
    
    );
}

export default Body;