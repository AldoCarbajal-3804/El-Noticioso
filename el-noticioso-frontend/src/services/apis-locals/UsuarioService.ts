import { supabase } from "@/services/supabase";
import PerfilService from "@/services/apis-locals/PerfilService";
import type { Usuario } from "@/schemas/data/Usuario";

export type DatosRegistro = {
    nombre: string;
    apellidos: string;
    correo: string;
    telefono: string;
    usuario: string;
    password: string;
};

export type ResultadoRegistro = {
    // true cuando Supabase exige confirmar el correo antes de iniciar sesión
    requiereConfirmacion: boolean;
};

export type EnlaceRecuperacion = {
    // true cuando la URL trae un enlace válido para cambiar la contraseña
    recuperacion: boolean;
    // Mensaje si el enlace llegó con error (expirado, ya usado, etc.)
    error: string | null;
};

// Supabase devuelve mensajes en inglés; los traducimos a los casos más comunes
function traducirError(mensaje: string): string {
    if (mensaje.includes("Invalid login credentials")) return "Correo o contraseña incorrectos.";
    if (mensaje.includes("Email not confirmed")) return "Debes confirmar tu correo antes de iniciar sesión.";
    if (mensaje.includes("User already registered")) return "Ya existe una cuenta con ese correo.";
    if (mensaje.includes("Password should be at least")) return "La contraseña es demasiado corta.";
    if (mensaje.includes("should be different from the old password")) return "La nueva contraseña debe ser distinta a la anterior.";
    if (mensaje.includes("rate limit")) return "Espera un momento antes de volver a intentarlo.";
    if (mensaje.includes("expired") || mensaje.includes("invalid")) return "El enlace expiró o ya fue usado. Solicita uno nuevo.";
    // El trigger de la base de datos rechaza correo o usuario duplicados con un error genérico
    if (mensaje.includes("Database error")) return "No se pudo crear la cuenta. Verifica que el correo y el usuario no estén en uso.";
    return "Ocurrió un error. Intenta nuevamente.";
}

function UsuarioService() {

    async function registrar(datos: DatosRegistro): Promise<ResultadoRegistro> {
        // El trigger "crear_usuario_desde_auth_func" crea la fila en "usuario" con estos metadatos
        const { data, error } = await supabase.auth.signUp({
            email: datos.correo.trim(),
            password: datos.password,
            options: {
                data: {
                    nombre: datos.nombre.trim(),
                    apellidos: datos.apellidos.trim(),
                    usuario: datos.usuario.trim(),
                    telefono: datos.telefono.trim() || null,
                },
            },
        });

        if (error) throw new Error(traducirError(error.message));

        return { requiereConfirmacion: data.session === null };
    }

    async function iniciarSesion(correo: string, password: string): Promise<void> {
        const { error } = await supabase.auth.signInWithPassword({
            email: correo.trim(),
            password,
        });

        if (error) throw new Error(traducirError(error.message));
    }

    async function cerrarSesion(): Promise<void> {
        const { error } = await supabase.auth.signOut();
        if (error) throw new Error(traducirError(error.message));
    }

    // Llama a "callback" con el perfil del backend cada vez que cambia la sesión.
    // Devuelve la función para dejar de escuchar.
    function escucharSesion(callback: (usuario: Usuario | null) => void): () => void {
        const { data } = supabase.auth.onAuthStateChange((_evento, session) => {
            if (!session) {
                callback(null);
                return;
            }

            // Se difiere la consulta para no llamar al backend dentro del callback de auth
            setTimeout(() => {
                PerfilService()
                    .obtenerPerfil()
                    .then(callback)
                    .catch(() => callback(null));
            }, 0);
        });

        return () => data.subscription.unsubscribe();
    }

    // Llama a "callback" cuando el usuario llega desde el enlace del correo para cambiar su contraseña
    function escucharRecuperacion(callback: () => void): () => void {
        const { data } = supabase.auth.onAuthStateChange((evento) => {
            if (evento === "PASSWORD_RECOVERY") callback();
        });

        return () => data.subscription.unsubscribe();
    }

    // Revisa la URL con la que Supabase devuelve al usuario después del enlace del correo
    function leerEnlaceRecuperacion(): EnlaceRecuperacion {
        const hash = window.location.hash;
        if (!hash) return { recuperacion: false, error: null };

        const params = new URLSearchParams(hash.slice(1));
        const codigoError = params.get("error_code");

        if (codigoError) {
            // Limpia el hash para que el error no vuelva a mostrarse al recargar
            window.history.replaceState(null, "", window.location.pathname + window.location.search);
            return {
                recuperacion: false,
                error: codigoError === "otp_expired"
                    ? "El enlace expiró o ya fue usado. Solicita uno nuevo."
                    : "No se pudo validar el enlace. Solicita uno nuevo.",
            };
        }

        // No se limpia el hash en el caso correcto: Supabase lo necesita para crear la sesión de recuperación
        return { recuperacion: params.get("type") === "recovery", error: null };
    }

    // Envía el correo con el enlace para cambiar la contraseña.
    // Supabase no informa si el correo existe, para no revelar qué cuentas están registradas.
    async function solicitarRecuperacion(correo: string): Promise<void> {
        const { error } = await supabase.auth.resetPasswordForEmail(correo.trim(), {
            redirectTo: window.location.origin,
        });

        if (error) throw new Error(traducirError(error.message));
    }

    // Guarda la nueva contraseña. Solo funciona con una sesión de recuperación activa.
    async function actualizarContrasena(password: string): Promise<void> {
        const { error } = await supabase.auth.updateUser({ password });
        if (error) throw new Error(traducirError(error.message));
    }

    return {
        registrar,
        iniciarSesion,
        cerrarSesion,
        escucharSesion,
        escucharRecuperacion,
        leerEnlaceRecuperacion,
        solicitarRecuperacion,
        actualizarContrasena,
    };
}

export default UsuarioService;
