import { useState } from 'react'
import Campo from './Campo'
import UsuarioService from '@/services/apis-locals/UsuarioService'
import useAsyncAction from '@/hooks/useAsyncAction'

type FormNuevaContrasenaProps = {
    onCancel: () => void
    onSuccess: () => void
}

export default function FormNuevaContrasena({ onCancel, onSuccess }: FormNuevaContrasenaProps) {
    const [errorLocal, setErrorLocal] = useState<string | null>(null)

    const { ejecutar, cargando, error } = useAsyncAction((datos: FormData) =>
        UsuarioService().actualizarContrasena(String(datos.get('password')))
    )

    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault()
                const datos = new FormData(e.currentTarget)

                if (datos.get('password') !== datos.get('confirmar')) {
                    setErrorLocal('Las contraseñas no coinciden.')
                    return
                }

                setErrorLocal(null)
                const resultado = await ejecutar(datos)
                if (resultado.ok) onSuccess()
            }}
            className="flex flex-col gap-4 mt-6"
        >
            <Campo
                label="Nueva contraseña"
                name="password"
                type="password"
                autoComplete="new-password"
                minLength={8}
                required
            />
            <Campo
                label="Confirmar contraseña"
                name="confirmar"
                type="password"
                autoComplete="new-password"
                minLength={8}
                required
            />

            {(errorLocal || error) && (
                <p role="alert" className="text-sm text-red-600">
                    {errorLocal ?? error}
                </p>
            )}

            <div className="flex justify-end gap-3 mt-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 rounded-md text-third hover:opacity-80 transition-opacity"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    disabled={cargando}
                    className="bg-first text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity disabled:opacity-60"
                >
                    {cargando ? 'Guardando...' : 'Guardar contraseña'}
                </button>
            </div>
        </form>
    )
}
