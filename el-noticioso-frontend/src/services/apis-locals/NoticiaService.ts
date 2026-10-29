import * as z from "zod"
import axios from "axios";
import { Noticias } from "@/schemas/data/Noticias";

const ListNoticias = z.array(Noticias);
type Noticia = z.infer<typeof ListNoticias>[number];

function NoticiaService(){

    const VITE_API_LOCAL = import.meta.env.VITE_API_LOCAL

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