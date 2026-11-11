import axios from "axios";

import { EfemerideFila } from "@/schemas/data/Efemerides";
import type { Efemeride } from "@/schemas/data/Efemerides";

function ServiceEfemerides(){

    const VITE_API_LOCAL = import.meta.env.VITE_API_LOCAL

    // El backend devuelve un solo objeto: { generation: "<ul><li>...</li></ul>" }
    async function getEfemerides(): Promise<Efemeride> {
        if (!VITE_API_LOCAL) {
            throw new Error('Falta configurar VITE_API_LOCAL en el archivo .env');
        }

        const response = await axios.get<unknown>(
            `${VITE_API_LOCAL}/efemerides`
        );

        return EfemerideFila.parse(response.data);
    }

    return { getEfemerides };
}

export default ServiceEfemerides
