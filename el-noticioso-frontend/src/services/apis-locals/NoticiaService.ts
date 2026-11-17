import * as z from "zod"

import { NoticiaFila } from "@/schemas/data/Noticias";
import type { Noticia } from "@/schemas/data/Noticias";

const ListNoticiasResponse = z.array(NoticiaFila);

export type FiltrosNoticias = {
    ubicacion?: string;
    categoria?: string;
    busqueda?: string;
};

function NoticiaService(){

    const VITE_API_LOCAL  = import.meta.env.VITE_API_LOCAL

    async function getNoticias(filtros: FiltrosNoticias = {}): Promise<Noticia[]> {
        if (!VITE_API_LOCAL) {
            throw new Error('Falta configurar VITE_API_LOCAL en el archivo .env');
        }

        const params = new URLSearchParams();
        if (filtros.ubicacion) params.set("ubicacion", filtros.ubicacion);
        if (filtros.categoria) params.set("categoria", filtros.categoria);
        if (filtros.busqueda) params.set("busqueda", filtros.busqueda);

        const query = params.toString();
        const response = await fetch(`${VITE_API_LOCAL}/noticias${query ? `?${query}` : ""}`);
        if (!response.ok) {
            throw new Error(`Error al consultar las noticias: ${response.status}`);
        }

        const responseData: unknown = await response.json();

        return ListNoticiasResponse.parse(responseData);
    }

    return { getNoticias };
}

export default NoticiaService
