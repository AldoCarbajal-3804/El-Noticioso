import { useEffect, useRef, useState } from 'react'
import { useLogin } from '@/store/login'
import useAsyncAction from '@/hooks/useAsyncAction'

// Avatar con iniciales y menú desplegable: "Mi perfil" y "Cerrar sesión"
export default function MenuUsuario() {
    const usuario = useLogin((state) => state.usuario)
    const abrirPerfil = useLogin((state) => state.abrirPerfil)
    const cerrarSesion = useLogin((state) => state.cerrarSesion)

    const [abierto, setAbierto] = useState(false)
    const contenedorRef = useRef<HTMLDivElement>(null)
    const { ejecutar, cargando, error } = useAsyncAction(() => cerrarSesion())

    // Cierra el menú al hacer clic fuera o con Escape
    useEffect(() => {
        if (!abierto) return

        const cerrarAlClickFuera = (e: MouseEvent) => {
            if (!contenedorRef.current?.contains(e.target as Node)) setAbierto(false)
        }
        const cerrarConEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setAbierto(false)
        }

        document.addEventListener('mousedown', cerrarAlClickFuera)
        document.addEventListener('keydown', cerrarConEscape)
        return () => {
            document.removeEventListener('mousedown', cerrarAlClickFuera)
            document.removeEventListener('keydown', cerrarConEscape)
        }
    }, [abierto])

    if (!usuario) return null

    const iniciales = `${usuario.nombre.charAt(0)}${usuario.apellidos.charAt(0)}`.toUpperCase()

    return (
        <div ref={contenedorRef} className="relative">
            <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={abierto}
                aria-label="Menú de usuario"
                onClick={() => setAbierto((valor) => !valor)}
                className="grid size-10 place-items-center rounded-full bg-first text-white font-semibold hover:opacity-90 transition-opacity"
            >
                {iniciales}
            </button>

            {abierto && (
                <div
                    role="menu"
                    className="absolute right-0 mt-2 w-56 rounded-md bg-sixth p-2 shadow-lg text-third z-50"
                >
                    <div className="px-3 py-2 mb-1 border-b border-fifth">
                        <p className="font-semibold truncate">
                            {usuario.nombre} {usuario.apellidos}
                        </p>
                        <p className="text-xs text-fifth truncate">{usuario.correo}</p>
                    </div>

                    <button
                        type="button"
                        role="menuitem"
                        onClick={() => {
                            setAbierto(false)
                            abrirPerfil()
                        }}
                        className="w-full text-left px-3 py-2 rounded hover:bg-seventh transition-colors"
                    >
                        Mi perfil
                    </button>

                    <button
                        type="button"
                        role="menuitem"
                        disabled={cargando}
                        onClick={() => ejecutar()}
                        className="w-full text-left px-3 py-2 rounded text-red-600 hover:bg-seventh transition-colors disabled:opacity-60"
                    >
                        {cargando ? 'Saliendo...' : 'Cerrar sesión'}
                    </button>

                    {error && (
                        <p role="alert" className="text-xs text-red-600 px-3 pt-1">
                            {error}
                        </p>
                    )}
                </div>
            )}
        </div>
    )
}
