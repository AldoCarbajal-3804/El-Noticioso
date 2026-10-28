import * as z from "zod"

const NoticiasResponse = z.object({
    id: z.number(),
    titulo: z.string(),
    autor: z.string(),
    descripcion: z.string(),
    resumen: z.string(),
    imagen: z.url(),
    fecha: z.string(),
});

const ListNoticiasResponse = z.array(NoticiasResponse);
type Noticia = z.infer<typeof ListNoticiasResponse>[number];

function NoticiaService(){

    const VITE_API_LOCAL  = import.meta.env.VITE_API_LOCAL

    async function getNoticias(): Promise<Noticia[]> {
        if (!VITE_API_LOCAL) {
            throw new Error('Falta configurar VITE_API_LOCAL en el archivo .env');
        }

        const response = await fetch(VITE_API_LOCAL);
        if (!response.ok) {
            throw new Error(`Error al consultar las noticias: ${response.status}`);
        }

        const responseData: unknown = await response.json();

        return ListNoticiasResponse.parse(responseData);
    }

    return { getNoticias };
}




export default NoticiaService