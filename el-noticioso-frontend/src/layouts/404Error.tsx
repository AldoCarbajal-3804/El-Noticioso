import { Link } from "react-router";

function Error404() {
    return (
        <section className="flex min-h-screen flex-col items-center justify-center gap-6 bg-sixth px-6 py-20 text-center">
            <p className="text-7xl font-bold text-third">404</p>
            <h1 className="font-bold text-third text-xl md:text-2xl">Página no encontrada</h1>
            <p className="text-third">La dirección que escribiste no existe o fue movida.</p>
            <Link
                to="/"
                className="rounded-lg bg-fifth px-6 py-3 text-white transition hover:bg-fourth"
            >
                Volver al inicio
            </Link>
        </section>
    );
}

export default Error404;
