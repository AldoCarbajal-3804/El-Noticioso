import { useState } from 'react'
import Campo from './Campo'
import UsuarioService from '@/services/apis-locals/UsuarioService'
import useAsyncAction from '@/hooks/useAsyncAction'

type FormRegisterProps = {
    onCancel: () => void
    onSuccess: () => void
}

export default function FormRegister({ onCancel, onSuccess }: FormRegisterProps) {
    const [mensaje, setMensaje] = useState<string | null>(null)

    const { ejecutar, cargando, error } = useAsyncAction((datos: FormData) =>
        UsuarioService().registrar({
            nombre: String(datos.get('nombre')),
            apellidos: String(datos.get('apellidos')),
            correo: String(datos.get('correo')),
            telefono: String(datos.get('telefono')),
            usuario: String(datos.get('usuario')),
            password: String(datos.get('password')),
        })
    )

    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault()
                setMensaje(null)

                const resultado = await ejecutar(new FormData(e.currentTarget))
                if (!resultado.ok) return

                if (resultado.data.requiereConfirmacion) {
                    setMensaje('Te enviamos un correo para confirmar tu cuenta.')
                    return
                }

                onSuccess()
            }}
            className="flex flex-col gap-4"
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Campo label="Nombre" name="nombre" type="text" autoComplete="given-name" required />
                <Campo label="Apellidos" name="apellidos" type="text" autoComplete="family-name" required />
            </div>

            <Campo label="Correo electrónico" name="correo" type="email" autoComplete="email" required />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Campo label="Teléfono" name="telefono" type="tel" autoComplete="tel" />
                <Campo label="Usuario" name="usuario" type="text" autoComplete="username" required />
            </div>

            <Campo
                label="Contraseña"
                name="password"
                type="password"
                autoComplete="new-password"
                minLength={8}
                required
            />

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
                    {cargando ? 'Creando cuenta...' : 'Registrarse'}
                </button>
            </div>
        </form>
    )
}
