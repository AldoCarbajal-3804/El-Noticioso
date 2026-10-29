import logoLight from '@/assets/logos/logolight.webp'
import logoDark from '@/assets/logos/logodark.webp'
import { useTheme } from '@/store/theme';
import { useLogin } from '@/store/login';
import Login from '@/components/popups/Login';
import Register from '@/components/popups/Register';
import MenuUsuario from '@/components/ui/MenuUsuario';

function Header(){

    const theme = useTheme((state) => state.theme);
    const usuario = useLogin((state) => state.usuario);

    return (
        
        <header className="flex items-center justify-between p-4 bg-second">
            <img src={theme === 'light' ? logoLight : logoDark}
                alt={`Logo del tema ${theme === 'light' ? 'claro' : 'oscuro'}`}
                className="w-30 md:w-35 lg:w-40 h-auto object-cover"
                loading="lazy"
            />

            <h1 className='font-bold font-title text-third
                hidden md:block md:text-3xl lg:text-4xl'>
                EL NOTICIOSO
            </h1>
        
            <menu className='flex items-center gap-6 font-body text-sm md:text-base'>
                {usuario ? (
                    <MenuUsuario />
                ) : (
                    <>
                        <Login />
                        <Register />
                    </>
                )}
            </menu>
        </header>

    )

}

export default Header;
