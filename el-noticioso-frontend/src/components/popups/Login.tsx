import { useState } from 'react'
import useModal from '../../hooks/useModal'
import FormLogin from './forms/FormLogin'
import FormRecuperar from './forms/FormRecuperar'

type Vista = 'login' | 'recuperar'

export default function Login() {
    const { dialogRef, abrirModal, cerrarModal, cerrarAlClickFuera } = useModal()
    const [vista, setVista] = useState<Vista>('login')

    // Siempre se abre en la vista de login
    const abrir = () => {
        setVista('login')
        abrirModal()
    }

    return (
        <>
            <button
                type="button"
                className="bg-first text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
                onClick={abrir}
            >
                Iniciar Sesión
            </button>

            <dialog
                ref={dialogRef}
                onClick={cerrarAlClickFuera}
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

                    {vista === 'login' ? (
                        <>
                            <h3 className="text-xl font-semibold text-third mb-1">Iniciar Sesión</h3>
                            <p className="text-sm text-third mb-6">Ingresa tus datos para continuar.</p>
                            <FormLogin
                                onCancel={cerrarModal}
                                onSuccess={cerrarModal}
                                onOlvide={() => setVista('recuperar')}
                            />
                        </>
                    ) : (
                        <>
                            <h3 className="text-xl font-semibold text-third mb-1">Recuperar contraseña</h3>
                            <p className="text-sm text-third mb-6">Te enviaremos un enlace para crear una nueva contraseña.</p>
                            <FormRecuperar onVolver={() => setVista('login')} />
                        </>
                    )}
                </div>
            </dialog>
        </>
    )
}
