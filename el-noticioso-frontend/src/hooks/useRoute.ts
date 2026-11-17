import { useLocation } from "react-router";

// Cada ruta de la app y la ubicación que se envía al backend (GET /api/noticias?ubicacion=)
const UBICACION_POR_RUTA: Record<string, string | undefined> = {
    "/": undefined,
    "/local": "LOCAL",
    "/regional": "REGIONAL",
    "/nacional": "NACIONAL",
    "/internacional": "INTERNACIONAL",
};

export default function useRoute() {
    const { pathname } = useLocation();

    const ubicacion = UBICACION_POR_RUTA[pathname];
    const seccion = pathname === "/" ? "INICIO" : pathname.slice(1).toUpperCase();

    return { pathname, ubicacion, seccion };
}
