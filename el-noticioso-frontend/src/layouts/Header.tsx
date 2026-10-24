
import logoLight from '@/assets/logos/logolight.webp'
import logoDark from '@/assets/logos/logodark.webp'
import { useTheme } from '@/store/theme';

function Header(){

    const theme = useTheme((state) => state.theme);

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
        
            <menu className='flex gap-6 font-body text-sm md:text-base'>
                <button className="bg-first text-white px-4 py-2 rounded-md">
                    Iniciar Sesión
                </button>
                <button className="underline text-third">
                    Registrarse
                </button>
            </menu>
        </header>

    )

}

export default Header;
