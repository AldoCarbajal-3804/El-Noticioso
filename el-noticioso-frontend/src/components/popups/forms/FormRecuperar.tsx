import { useState } from 'react'
import Campo from './Campo'
import UsuarioService from '@/services/apis-locals/UsuarioService'
import useAsyncAction from '@/hooks/useAsyncAction'

type FormRecuperarProps = {
    onVolver: () => void
}

export default function FormRecuperar({ onVolver }: FormRecuperarProps) {
    const [mensaje, setMensaje] = useState<string | null>(null)

    const { ejecutar, cargando, error } = useAsyncAction((datos: FormData) =>
        UsuarioService().solicitarRecuperacion(String(datos.get('correo')))
    )

    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault()
                setMensaje(null)

                const resultado = await ejecutar(new FormData(e.currentTarget))
                if (resultado.ok) {
                    setMensaje('Si el correo está registrado, te enviamos un enlace para cambiar tu contraseña.')
                }
            }}
            className="flex flex-col gap-4"
        >
            <Campo label="Correo electrónico" name="correo" type="email" autoComplete="email" required />

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

            <div className="flex justify-end gap-3 mt-2">
                <button
                    type="button"
                    onClick={onVolver}
                    className="px-4 py-2 rounded-md text-third hover:opacity-80 transition-opacity"
                >
                    Volver
                </button>
                <button
                    type="submit"
                    disabled={cargando}
                    className="bg-first text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity disabled:opacity-60"
                >
                    {cargando ? 'Enviando...' : 'Enviar enlace'}
                </button>
            </div>
        </form>
    )
}
