import { useState } from 'react'
import Campo from './Campo'
import PerfilService from '@/services/apis-locals/PerfilService'
import useAsyncAction from '@/hooks/useAsyncAction'
import { useLogin } from '@/store/login'
import type { Usuario } from '@/schemas/data/Usuario'

type FormPerfilProps = {
    usuario: Usuario
    onCancel: () => void
}

export default function FormPerfil({ usuario, onCancel }: FormPerfilProps) {
    const setUsuario = useLogin((state) => state.setUsuario)
    const [mensaje, setMensaje] = useState<string | null>(null)

    const { ejecutar, cargando, error } = useAsyncAction((datos: FormData) =>
        PerfilService().actualizarPerfil({
            nombre: String(datos.get('nombre')),
            apellidos: String(datos.get('apellidos')),
            telefono: String(datos.get('telefono')),
            usuario: String(datos.get('usuario')),
        })
    )

    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault()
                setMensaje(null)

                const resultado = await ejecutar(new FormData(e.currentTarget))
                if (!resultado.ok) return

                // El backend devuelve el perfil ya actualizado; lo guardamos en el store
                setUsuario(resultado.data)
                setMensaje('Tus datos se actualizaron correctamente.')
            }}
            className="flex flex-col gap-4"
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Campo
                    label="Nombre"
                    name="nombre"
                    type="text"
                    autoComplete="given-name"
                    defaultValue={usuario.nombre}
                    pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+"
                    title="Solo letras y espacios"
                    maxLength={100}
                    required
                />
                <Campo
                    label="Apellidos"
                    name="apellidos"
                    type="text"
                    autoComplete="family-name"
                    defaultValue={usuario.apellidos}
                    pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+"
                    title="Solo letras y espacios"
                    maxLength={150}
                    required
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Campo
                    label="Teléfono"
                    name="telefono"
                    type="tel"
                    autoComplete="tel"
                    defaultValue={usuario.telefono}
                    pattern="9[0-9]{8}"
                    title="9 dígitos y debe empezar en 9"
                />
                <Campo
                    label="Usuario"
                    name="usuario"
                    type="text"
                    autoComplete="username"
                    defaultValue={usuario.usuario}
                    minLength={6}
                    maxLength={30}
                    required
                />
            </div>

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
                    Cerrar
                </button>
                <button
                    type="submit"
                    disabled={cargando}
                    className="bg-first text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity disabled:opacity-60"
                >
                    {cargando ? 'Guardando...' : 'Guardar cambios'}
                </button>
            </div>
        </form>
    )
}
