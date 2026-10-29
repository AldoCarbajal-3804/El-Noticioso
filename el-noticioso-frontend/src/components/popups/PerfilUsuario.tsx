import { useEffect } from 'react'
import useModal from '@/hooks/useModal'
import { useLogin } from '@/store/login'
import FormPerfil from './forms/FormPerfil'
import FormCorreo from './forms/FormCorreo'

// Se abre desde el menú del avatar ("Mi perfil") mediante el store
export default function PerfilUsuario() {
    const { dialogRef, abrirModal, cerrarModal, cerrarAlClickFuera } = useModal()
    const perfilAbierto = useLogin((state) => state.perfilAbierto)
    const cerrarPerfil = useLogin((state) => state.cerrarPerfil)
    const usuario = useLogin((state) => state.usuario)

    useEffect(() => {
        if (perfilAbierto) abrirModal()
    }, [perfilAbierto, abrirModal])

    return (
        <dialog
            ref={dialogRef}
            onClick={cerrarAlClickFuera}
            // Al cerrar por cualquier vía (X, Escape, Cerrar) se marca el perfil como cerrado
            onClose={cerrarPerfil}
            className="modal-dialog m-auto w-[min(90vw,32rem)] max-h-[90vh] overflow-y-auto rounded-lg bg-sixth p-6 text-third shadow-xl"
        >
            <div className="relative">
                <button
                    type="button"
                    onClick={cerrarModal}
                    aria-label="Cerrar"
                    className="absolute -top-2 -right-2 text-white hover:text-third text-2xl leading-none px-2"
                >
                    X
                </button>

                <h3 className="text-xl font-semibold text-third mb-1">Mi perfil</h3>
                <p className="text-sm text-third mb-6">Actualiza tus datos personales.</p>

                {usuario && <FormPerfil usuario={usuario} onCancel={cerrarModal} />}

                <div className="mt-8">
                    <FormCorreo correoActual={usuario?.correo ?? ''} />
                </div>
            </div>
        </dialog>
    )
}
