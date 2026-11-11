import * as z from "zod"

import { NoticiaFila } from "@/schemas/data/Noticias";
import type { Noticia } from "@/schemas/data/Noticias";

const ListNoticiasResponse = z.array(NoticiaFila);

function NoticiaService(){

    const VITE_API_LOCAL  = import.meta.env.VITE_API_LOCAL

    async function getNoticias(): Promise<Noticia[]> {
        if (!VITE_API_LOCAL) {
            throw new Error('Falta configurar VITE_API_LOCAL en el archivo .env');
        }

        const response = await fetch(`${VITE_API_LOCAL}/noticias`);
        if (!response.ok) {
            throw new Error(`Error al consultar las noticias: ${response.status}`);
        }

        const responseData: unknown = await response.json();

        return ListNoticiasResponse.parse(responseData);
    }

    return { getNoticias };
}

export default NoticiaService
