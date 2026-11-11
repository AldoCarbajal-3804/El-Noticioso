import { useEffect, useState } from "react";
import { SpinnerLoad } from "@/components/ui/SpinnerLoad";
import DOMPurify from "dompurify";
import ServiceEfemerides from "@/services/apis-externals/ServiceEfemerides";
import type { Efemeride } from "@/schemas/data/Efemerides";

export const CardEfemerides = () => {
    const [efemeride, setEfemeride] = useState<Efemeride | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        ServiceEfemerides()
            .getEfemerides()
            .then(setEfemeride)
            .catch((e: unknown) => {
                console.error(e);
                setError("No se pudieron cargar las efemérides.");
            });
    }, []);

    return (
        <blockquote className="bg-seventh shadow-xl rounded-lg p-6">
            <h3 className="text-third font-bold pb-2
                text-lg md:text-xl lg:text-2xl">
                    Efemérides de hoy
            </h3>

            {error && <p role="alert" className="text-third">{error}</p>}

            {!error && !efemeride && <SpinnerLoad/>}

            {efemeride && (
                <div
                    className="text-third text-justify leading-relaxed text-sm lg:text-base
                        [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-2"
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(efemeride.generation) }}
                />
            )}
        </blockquote>
    )
}
