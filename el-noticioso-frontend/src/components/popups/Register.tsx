import useModal from '../../hooks/useModal'
import FormRegister from './forms/FormRegister'

export default function Register() {
    const { dialogRef, abrirModal, cerrarModal, cerrarAlClickFuera } = useModal()

    return (
        <>
            <button
                type="button"
                className="text-third underline"
                onClick={abrirModal}
            >
                Registrarse
            </button>

            <dialog
                ref={dialogRef}
                onClick={cerrarAlClickFuera}
                className="modal-dialog m-auto w-[min(90vw,36rem)] max-h-[90vh] overflow-y-auto rounded-lg bg-second p-6 text-third shadow-xl"
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

                    <h3 className="text-xl font-semibold text-third mb-1">Crear cuenta</h3>
                    <p className="text-sm text-third mb-6">Completa tus datos para registrarte.</p>

                    <FormRegister onCancel={cerrarModal} onSuccess={cerrarModal} />
                </div>
            </dialog>
        </>
    )
}
