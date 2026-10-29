import { useCallback, useEffect, useRef, useState } from 'react'
import type { MouseEvent } from 'react'

// Debe coincidir con la duración de la transición en index.css (.modal-dialog)
const DURACION_CIERRE = 200

export default function useModal() {
    const dialogRef = useRef<HTMLDialogElement>(null)
    const [isOpen, setIsOpen] = useState(false)

    const cerrarModal = useCallback(() => {
        const dialog = dialogRef.current
        if (!dialog || dialog.hasAttribute('data-closing')) return

        // Activa el fade out y espera a que termine antes de cerrar el dialog nativo
        dialog.setAttribute('data-closing', '')
        setTimeout(() => dialog.close(), DURACION_CIERRE)
    }, [])

    const abrirModal = useCallback(() => {
        const dialog = dialogRef.current
        if (!dialog) return

        dialog.removeAttribute('data-closing')
        dialog.showModal()
        setIsOpen(true)
    }, [])

    const cerrarAlClickFuera = useCallback(
        (e: MouseEvent<HTMLDialogElement>) => {
            if (e.target === dialogRef.current) cerrarModal()
        },
        [cerrarModal]
    )

    // Sincroniza el estado cuando el dialog se cierra y maneja Escape con la misma animación
    useEffect(() => {
        const dialog = dialogRef.current
        if (!dialog) return

        const onClose = () => {
            dialog.removeAttribute('data-closing')
            // Limpia los campos de cualquier formulario dentro del modal
            dialog.querySelectorAll('form').forEach((form) => form.reset())
            setIsOpen(false)
        }

        // Escape dispara "cancel" antes que "close": lo interceptamos para animar la salida
        const onCancel = (e: Event) => {
            e.preventDefault()
            cerrarModal()
        }

        dialog.addEventListener('close', onClose)
        dialog.addEventListener('cancel', onCancel)
        return () => {
            dialog.removeEventListener('close', onClose)
            dialog.removeEventListener('cancel', onCancel)
        }
    }, [cerrarModal])

    // Bloquea el scroll del body mientras el modal esté abierto
    useEffect(() => {
        if (!isOpen) return

        const { overflow, paddingRight } = document.body.style
        // Compensa el ancho de la barra de scroll para que el contenido no salte
        const anchoScroll = window.innerWidth - document.documentElement.clientWidth

        document.body.style.overflow = 'hidden'
        if (anchoScroll > 0) {
            document.body.style.paddingRight = `${anchoScroll}px`
        }

        return () => {
            document.body.style.overflow = overflow
            document.body.style.paddingRight = paddingRight
        }
    }, [isOpen])

    return { dialogRef, isOpen, abrirModal, cerrarModal, cerrarAlClickFuera }
}
