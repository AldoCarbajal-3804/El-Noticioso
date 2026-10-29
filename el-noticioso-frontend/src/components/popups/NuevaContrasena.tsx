import { useEffect } from 'react'
import useModal from '@/hooks/useModal'
import { useLogin } from '@/store/login'
import FormNuevaContrasena from './forms/FormNuevaContrasena'

// Se abre sola cuando el usuario llega desde el enlace del correo de recuperación
export default function NuevaContrasena() {
    const { dialogRef, abrirModal, cerrarModal, cerrarAlClickFuera } = useModal()
    const recuperando = useLogin((state) => state.recuperando)
    const errorEnlace = useLogin((state) => state.errorEnlace)
    const finalizarRecuperacion = useLogin((state) => state.finalizarRecuperacion)

    useEffect(() => {
        if (recuperando || errorEnlace) abrirModal()
    }, [recuperando, errorEnlace, abrirModal])

    return (
        <dialog
            ref={dialogRef}
            onClick={cerrarAlClickFuera}
            // Al cerrar por cualquier vía (X, Escape, Cancelar) se limpia el estado de recuperación
            onClose={finalizarRecuperacion}
            className="modal-dialog m-auto w-[min(90vw,24rem)] rounded-lg bg-sixth p-6 text-third shadow-xl"
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

                <h3 className="text-xl font-semibold text-third mb-1">Nueva contraseña</h3>

                {errorEnlace ? (
                    <>
                        <p role="alert" className="text-sm text-red-600 mt-6">
                            {errorEnlace}
                        </p>
                        <div className="flex justify-end mt-6">
                            <button
                                type="button"
                                onClick={cerrarModal}
                                className="bg-first text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
                            >
                                Cerrar
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <p className="text-sm text-third">Escribe tu nueva contraseña para tu cuenta.</p>
                        <FormNuevaContrasena onCancel={cerrarModal} onSuccess={cerrarModal} />
                    </>
                )}
            </div>
        </dialog>
    )
}
