
import { z } from "zod";
import { PropsAside } from "@/schemas/PropsAside";

type Props = z.infer<typeof PropsAside>;

const NewsApiResponse = z.object({
    status: z.literal("ok"),
    articles: z.array(z.object({
        source: z.object({ name: z.string().optional() }).optional(),
        author: z.string().nullable().optional(),
        title: z.string().nullable().optional(),
        url: z.string(),
        urlToImage: z.string().nullable().optional(),
        publishedAt: z.string()
    }))
});

function ServiceNews() {

    const LINK_API = import.meta.env.VITE_LINK_API;
    
    async function getNewsAside(): Promise<Props[]> {
        if (!LINK_API) {
            throw new Error("Falta configurar VITE_LINK_API en el archivo .env");
        }

        const response = await fetch(LINK_API);
        if (!response.ok) {
            throw new Error(`Error al consultar las noticias: ${response.status}`);
        }

        const responseData: unknown = await response.json();
        const data = NewsApiResponse.parse(responseData);

        return data.articles.flatMap((article) => {
            const parsedArticle = PropsAside.safeParse({
                urlNoticia: article.url,
                titulo: article.title,
                urlImagen: article.urlToImage,
                autor: article.author?.trim() || article.source?.name || "Autor desconocido",
                fecha: new Date(article.publishedAt)
            });

            return parsedArticle.success ? [parsedArticle.data] : [];
        });
    }

    return { getNewsAside };
}

export default ServiceNews;