import { useCallback, useState } from "react";

export type ResultadoAccion<T> = { ok: true; data: T } | { ok: false };

// Envuelve una acción asíncrona (por ejemplo, enviar un formulario a la API) y maneja cargando y error.
// "ejecutar" nunca lanza: devuelve { ok, data } para que el componente decida qué hacer.
export default function useAsyncAction<TArgs extends unknown[], TResult>(
    accion: (...args: TArgs) => Promise<TResult>
) {
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const ejecutar = useCallback(
        async (...args: TArgs): Promise<ResultadoAccion<TResult>> => {
            setCargando(true);
            setError(null);

            try {
                const data = await accion(...args);
                return { ok: true, data };
            } catch (err) {
                setError(err instanceof Error ? err.message : "Ocurrió un error inesperado.");
                return { ok: false };
            } finally {
                setCargando(false);
            }
        },
        [accion]
    );

    return { ejecutar, cargando, error };
}
