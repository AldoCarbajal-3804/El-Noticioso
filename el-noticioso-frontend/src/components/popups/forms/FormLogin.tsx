import Campo from './Campo'
import UsuarioService from '@/services/apis-locals/UsuarioService'
import useAsyncAction from '@/hooks/useAsyncAction'

type FormLoginProps = {
    onCancel: () => void
    onSuccess: () => void
    onOlvide: () => void
}

export default function FormLogin({ onCancel, onSuccess, onOlvide }: FormLoginProps) {
    const { ejecutar, cargando, error } = useAsyncAction((datos: FormData) =>
        UsuarioService().iniciarSesion(
            String(datos.get('correo')),
            String(datos.get('password')),
        )
    )

    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault()
                const resultado = await ejecutar(new FormData(e.currentTarget))
                if (resultado.ok) onSuccess()
            }}
            className="flex flex-col gap-4"
        >
            <Campo label="Correo electrónico" name="correo" type="email" autoComplete="email" required />
            <Campo label="Contraseña" name="password" type="password" autoComplete="current-password" required />

            {error && (
                <p role="alert" className="text-sm text-red-600">
                    {error}
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
    )
}
