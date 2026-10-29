import { useEffect, useState } from "react";

type EstadoFetch<T> = {
    data: T | null;
    cargando: boolean;
    error: string | null;
};

// Carga datos al montar el componente (o cuando cambia "fetcher") y expone data, cargando y error.
// "fetcher" debe ser una función estable (definida fuera del componente) para no repetir la carga en cada render.
export default function useFetch<T>(
    fetcher: () => Promise<T>,
    mensajeError = "No se pudieron cargar los datos."
): EstadoFetch<T> {
    const [estado, setEstado] = useState<EstadoFetch<T>>({
        data: null,
        cargando: true,
        error: null,
    });

    useEffect(() => {
        let activo = true;

        fetcher()
            .then((data) => {
                if (activo) setEstado({ data, cargando: false, error: null });
            })
            .catch((err: unknown) => {
                if (activo) {
                    setEstado({
                        data: null,
                        cargando: false,
                        error: err instanceof Error ? err.message : mensajeError,
                    });
                }
            });

        return () => {
            activo = false;
        };
    }, [fetcher, mensajeError]);

    return estado;
}
