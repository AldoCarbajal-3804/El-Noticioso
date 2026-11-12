import * as z from "zod";
import { ListExtrasResponse } from "@/schemas/data/Extras";
import { PropsAside } from "@/schemas/props/PropsAside";

type AsideArticle = z.infer<typeof PropsAside>;

function ServiceExtras() {

    // El gateway reenvía /api/scraping/* al servicio de scraping
    const VITE_API_LOCAL = import.meta.env.VITE_API_LOCAL;

    async function getExtrasAside(): Promise<AsideArticle[]> {
        if (!VITE_API_LOCAL) {
            throw new Error("Falta configurar VITE_API_LOCAL en el archivo .env");
        }

        const response = await fetch(`${VITE_API_LOCAL}/scraping/ultimas-noticias`);
        if (!response.ok) {
            throw new Error(`Error al consultar las noticias extra: ${response.status}`);
        }

        const responseData: unknown = await response.json();
        const data = ListExtrasResponse.parse(responseData);

        return data.flatMap((fila) => {
            const parsed = PropsAside.safeParse({
                urlNoticia: fila.urlNoticia,
                titulo: fila.titulo ?? "",
                urlImagen: fila.urlImagen,
                autor: fila.autor?.trim() || "Autor desconocido",
                fecha: fila.fecha != null ? new Date(fila.fecha) : undefined,
            });

            return parsed.success ? [parsed.data] : [];
        });
    }

    return { getExtrasAside };
}

export default ServiceExtras;
