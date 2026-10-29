import { useState } from 'react'
import Campo from './Campo'
import PerfilService from '@/services/apis-locals/PerfilService'
import useAsyncAction from '@/hooks/useAsyncAction'

type FormCorreoProps = {
    correoActual: string
}

// Icono de advertencia: el cambio de correo afecta cómo inicia sesión el usuario
function IconoAdvertencia() {
    return (
        <span
            aria-label="Advertencia"
            className="inline-grid size-5 shrink-0 place-items-center rounded-full bg-amber-500 text-white text-xs font-bold"
        >
            !
        </span>
    )
}

export default function FormCorreo({ correoActual }: FormCorreoProps) {
    const [mensaje, setMensaje] = useState<string | null>(null)

    const { ejecutar, cargando, error } = useAsyncAction((nuevoCorreo: string) =>
        PerfilService().cambiarCorreo(nuevoCorreo)
    )

    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault()
                setMensaje(null)

                const formulario = e.currentTarget
                const nuevoCorreo = String(new FormData(formulario).get('nuevoCorreo'))

                const resultado = await ejecutar(nuevoCorreo)
                if (!resultado.ok) return

                formulario.reset()
                setMensaje('Te enviamos un enlace de confirmación al correo nuevo. El cambio se aplicará cuando lo confirmes.')
            }}
            className="flex flex-col gap-4 border-t border-fifth pt-6"
        >
            <div className="flex items-center gap-2">
                <IconoAdvertencia />
                <h4 className="font-semibold text-third">Cambiar correo</h4>
            </div>

            <p className="text-sm text-fifth">
                Correo actual: <span className="text-third">{correoActual}</span>
            </p>
            <p className="text-xs text-fifth">
                Al cambiar tu correo también cambiará la dirección con la que inicias sesión. Revisa bien antes de confirmar.
            </p>

            <Campo label="Nuevo correo" name="nuevoCorreo" type="email" autoComplete="email" required />

            {error && (
                <p role="alert" className="text-sm text-red-600">
                    {error}
                </p>
            )}
            {mensaje && (
                <p role="status" className="text-sm text-first">
                    {mensaje}
                </p>
            )}

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={cargando}
                    className="border border-first text-first px-4 py-2 rounded-md hover:bg-first hover:text-white transition-colors disabled:opacity-60"
                >
                    {cargando ? 'Enviando...' : 'Cambiar correo'}
                </button>
            </div>
        </form>
    )
}
