
import logo from '@/assets/logos/logolight.webp'

function Header(){

    return (
        
        <header className="flex items-center justify-between p-4">
            <img src={logo} 
                alt="Logo Light" 
                className="w-30 md:w-35 lg:w-40 h-auto object-cover"
                loading="lazy"
                decoding='async'
            />

            <h1 className='font-bold font-title text-second-dark
                text-2xl md:text-3xl lg:text-4xl'>
                EL NOTICIOSO
            </h1>
        
            <menu className='flex gap-8 font-body text-sm md:text-base'>
                <button className="bg-first-light text-second-light px-4 py-2 rounded-md 
                    transition delay-150 duration-300 ease-in-out hover:scale-110 hover:bg-cyan-700">
                    Iniciar Sesión
                </button>
                <button className="text-second-dark underline
                    transition delay-150 duration-300 ease-in-out hover:scale-110">
                    Registrarse
                </button>
            </menu>
        </header>

    )

}

export default Header;
