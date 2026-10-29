import { create } from "zustand";
import UsuarioService from "@/services/apis-locals/UsuarioService";
import type { Usuario } from "@/schemas/data/Usuario";

type LoginStore = {
    usuario: Usuario | null;
    // true cuando el usuario llegó desde el enlace del correo y debe elegir una nueva contraseña
    recuperando: boolean;
    // Mensaje si el enlace del correo llegó con error
    errorEnlace: string | null;
    // true mientras el modal de "Mi perfil" está abierto
    perfilAbierto: boolean;
    setUsuario: (usuario: Usuario) => void;
    // Empieza a escuchar la sesión y devuelve la función para dejar de escuchar
    inicializar: () => () => void;
    cerrarSesion: () => Promise<void>;
    finalizarRecuperacion: () => void;
    abrirPerfil: () => void;
    cerrarPerfil: () => void;
};

export const useLogin = create<LoginStore>()((set) => ({
    usuario: null,
    recuperando: false,
    errorEnlace: null,
    perfilAbierto: false,

    setUsuario: (usuario) => set({ usuario }),

    inicializar: () => {
        const enlace = UsuarioService().leerEnlaceRecuperacion();
        // Usa la forma funcional para no borrar un error ya registrado en una segunda ejecución (StrictMode)
        set((state) => ({
            recuperando: state.recuperando || enlace.recuperacion,
            errorEnlace: enlace.error ?? state.errorEnlace,
        }));

        const quitarSesion = UsuarioService().escucharSesion((usuario) => set({ usuario }));
        const quitarRecuperacion = UsuarioService().escucharRecuperacion(() => set({ recuperando: true }));

        return () => {
            quitarSesion();
            quitarRecuperacion();
        };
    },

    cerrarSesion: () => UsuarioService().cerrarSesion(),

    finalizarRecuperacion: () => set({ recuperando: false, errorEnlace: null }),

    abrirPerfil: () => set({ perfilAbierto: true }),

    cerrarPerfil: () => set({ perfilAbierto: false }),
}));
