import { useEffect, useState } from 'react'
import Campo from './Campo'
import UsuarioService from '@/services/apis-locals/UsuarioService'
import useAsyncAction from '@/hooks/useAsyncAction'
import { useLogin } from '@/store/login'
import { SpinnerLoad } from '@/components/ui/SpinnerLoad'

type FormLoginProps = {
    onCancel: () => void
    onSuccess: () => void
    onOlvide: () => void
}

// Tiempo máximo de espera a que la sesión quede iniciada en la app
const TIEMPO_MAXIMO_SESION_MS = 10000

export default function FormLogin({ onCancel, onSuccess, onOlvide }: FormLoginProps) {
    const { ejecutar, cargando, error } = useAsyncAction((datos: FormData) =>
        UsuarioService().iniciarSesion(
            String(datos.get('correo')),
            String(datos.get('password')),
        )
    )

    const usuario = useLogin((state) => state.usuario)

    // true desde que la contraseña es correcta hasta que la sesión está lista en la app
    const [esperandoSesion, setEsperandoSesion] = useState(false)
    const [errorSesion, setErrorSesion] = useState<string | null>(null)

    // Termina la carga solo cuando el usuario ya está guardado en el store de sesión
    useEffect(() => {
        if (esperandoSesion && usuario) {
            setEsperandoSesion(false)
            onSuccess()
        }
    }, [esperandoSesion, usuario, onSuccess])

    // Si la sesión no llega a tiempo, se muestra un error en vez de quedarse cargando
    useEffect(() => {
        if (!esperandoSesion) return

        const temporizador = setTimeout(() => {
            setEsperandoSesion(false)
            setErrorSesion('La sesión tardó demasiado. Intenta nuevamente.')
        }, TIEMPO_MAXIMO_SESION_MS)

        return () => clearTimeout(temporizador)
    }, [esperandoSesion])

    const ocupado = cargando || esperandoSesion

    return (
        <>
            {ocupado && <SpinnerLoad />}

            {/* El formulario solo se oculta: así no se pierden los datos si la contraseña es incorrecta */}
            <form
                onSubmit={async (e) => {
                    e.preventDefault()
                    setErrorSesion(null)
                    const resultado = await ejecutar(new FormData(e.currentTarget))
                    if (resultado.ok) setEsperandoSesion(true)
                }}
                className={`flex flex-col gap-4 ${ocupado ? 'hidden' : ''}`}
            >
                <Campo label="Correo electrónico" name="correo" type="email" autoComplete="email" required />
                <Campo label="Contraseña" name="password" type="password" autoComplete="current-password" required />

                {(error || errorSesion) && (
                    <p role="alert" className="text-sm text-red-600">
                        {error ?? errorSesion}
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
                        disabled={ocupado}
                        className="bg-first text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity disabled:opacity-60"
                    >
                        {cargando ? 'Entrando...' : 'Entrar'}
                    </button>
                </div>

                <button
                    type="button"
                    onClick={onOlvide}
                    className="self-center text-sm text-first hover:underline"
                >
                    ¿Olvidó su contraseña?
                </button>
            </form>
        </>
    )
}
