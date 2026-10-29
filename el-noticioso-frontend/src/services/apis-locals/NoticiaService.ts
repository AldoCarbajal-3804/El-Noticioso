import * as z from "zod"
import axios from "axios";
import { NoticiaFila } from "@/schemas/data/Noticias";
import type { Noticia } from "@/schemas/data/Noticias";

const ListNoticias = z.array(NoticiaFila);

function NoticiaService(){

    const VITE_API_LOCAL = import.meta.env.VITE_API_LOCAL

    // Devuelve noticias ya mapeadas a la entidad "Noticia"
    async function getNoticias(): Promise<Noticia[]> {
        if (!VITE_API_LOCAL) {
            throw new Error('Falta configurar VITE_API_LOCAL en el archivo .env');
        }

        const response = await axios.get<unknown>(
            `${VITE_API_LOCAL}/noticias`
        );

        return ListNoticias.parse(response.data);
    }

    return { getNoticias };
}

export default NoticiaService
