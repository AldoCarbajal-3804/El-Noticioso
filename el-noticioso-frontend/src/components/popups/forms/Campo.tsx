import { useState } from 'react'
import type { InputHTMLAttributes } from 'react'

type CampoProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string
}

function IconoMostrar() {
    return (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    )
}

function IconoOcultar() {
    return (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 19c-7 0-11-7-11-7a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 7 11 7a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
            <line x1="1" y1="1" x2="23" y2="23" />
        </svg>
    )
}

export default function Campo({ label, type, ...inputProps }: CampoProps) {
    const [mostrar, setMostrar] = useState(false)
    const esPassword = type === 'password'

    return (
        <label className="flex flex-col gap-1 text-sm text-third">
            {label}
            <div className="relative">
                <input
                    type={esPassword && mostrar ? 'text' : type}
                    className="w-full bg-seventh text-third border border-fifth rounded-md px-3 py-2 focus:outline-2 focus:outline-first"
                    style={esPassword ? { paddingRight: '2.5rem' } : undefined}
                    {...inputProps}
                />
                {esPassword && (
                    <button
                        type="button"
                        onClick={() => setMostrar((valor) => !valor)}
                        aria-label={mostrar ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                        className="absolute inset-y-0 right-0 flex items-center px-3 text-fifth hover:text-third transition-colors"
                    >
                        {mostrar ? <IconoOcultar /> : <IconoMostrar />}
                    </button>
                )}
            </div>
        </label>
    )
}
