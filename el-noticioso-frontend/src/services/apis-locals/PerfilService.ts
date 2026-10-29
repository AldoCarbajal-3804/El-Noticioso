import axios from "axios";
import { PerfilFila } from "@/schemas/data/Usuario";
import type { Usuario } from "@/schemas/data/Usuario";
import { supabase } from "@/services/supabase";

const VITE_API_LOCAL = import.meta.env.VITE_API_LOCAL;

export type DatosPerfil = {
    nombre: string;
    apellidos: string;
    telefono: string;
    usuario: string;
};

// El backend valida el access_token de Supabase en la cabecera Authorization
async function cabeceras(): Promise<Record<string, string>> {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;

    if (!token) throw new Error("Tu sesión expiró. Inicia sesión nuevamente.");
    return { Authorization: `Bearer ${token}` };
}

// El backend responde { "mensaje": "..." } en los errores
function mensajeDeError(err: unknown): string {
    if (axios.isAxiosError(err)) {
        const mensaje = err.response?.data?.mensaje;
        if (typeof mensaje === "string") return mensaje;
        if (err.response?.status === 401) return "Tu sesión expiró. Inicia sesión nuevamente.";
    }
    return "No se pudo completar la operación. Intenta nuevamente.";
}

function traducirErrorCorreo(mensaje: string): string {
    if (mensaje.includes("already been registered") || mensaje.includes("already registered")) {
        return "Ese correo ya está en uso.";
    }
    if (mensaje.includes("rate limit")) return "Espera un momento antes de volver a intentarlo.";
    if (mensaje.includes("should be different")) return "El correo nuevo debe ser distinto al actual.";
    return "No se pudo cambiar el correo. Intenta nuevamente.";
}

function PerfilService() {

    // GET /api/perfil: datos del usuario autenticado
    async function obtenerPerfil(): Promise<Usuario> {
        try {
            const { data } = await axios.get<unknown>(`${VITE_API_LOCAL}/perfil`, {
                headers: await cabeceras(),
            });
            return PerfilFila.parse(data);
        } catch (err) {
            throw new Error(mensajeDeError(err));
        }
    }

    // PUT /api/perfil: el backend no acepta correo aquí, solo los datos del perfil
    async function actualizarPerfil(datos: DatosPerfil): Promise<Usuario> {
        const cuerpo = {
            nombre: datos.nombre.trim(),
            apellidos: datos.apellidos.trim(),
            // El backend valida el teléfono solo si viene, así que enviamos null cuando está vacío
            telefono: datos.telefono.trim() || null,
            usuario: datos.usuario.trim(),
        };

        try {
            const { data } = await axios.put<unknown>(`${VITE_API_LOCAL}/perfil`, cuerpo, {
                headers: await cabeceras(),
            });
            return PerfilFila.parse(data);
        } catch (err) {
            throw new Error(mensajeDeError(err));
        }
    }

    // Cambio de correo con el método nativo de Supabase. Supabase envía un enlace de confirmación al correo nuevo.
    // El backend toma el correo del JWT, así que se actualiza solo cuando el usuario confirma el cambio.
    async function cambiarCorreo(nuevoCorreo: string): Promise<void> {
        const { error } = await supabase.auth.updateUser({ email: nuevoCorreo.trim() });
        if (error) throw new Error(traducirErrorCorreo(error.message));
    }

    return { obtenerPerfil, actualizarPerfil, cambiarCorreo };
}

export default PerfilService;
