import menu from '@/assets/icons/menu.svg'
import exit from '@/assets/icons/exit.svg'
import { useState } from 'react'
import { LinkNavbar } from '@/components/ui/LinkNavbar'

export const NavbarMobile = () => {

    const activeLink = window.location.pathname

    const [isOpen, setIsOpen] = useState(false)

    const handleClick = () => setIsOpen(open => !open)

    return(
        <div>
            <button
                type="button"
                aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
                aria-expanded={isOpen}
                className='hover:bg-gray-500 rounded-3xl p-4 *:transition duration-300 ease-in-out'
                onClick={handleClick}
            >
                {
                    isOpen ? 
                        <img src={exit} alt="Exit" width="30" height="30"/>
                     : 
                        <img src={menu} alt="Menu" width="30" height="30"/>
                }
            </button>
            <menu
                aria-hidden={!isOpen}
                inert={!isOpen}
                className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
            >
                <ul className="min-h-0 overflow-hidden">
                    <LinkNavbar href="/" text="Inicio" isActive={activeLink === '/'} />
                    <LinkNavbar href="/local" text="Local" isActive={activeLink === '/local'} />
                    <LinkNavbar href="/regional" text="Regional" isActive={activeLink === '/regional'} />
                    <LinkNavbar href="/nacional" text="Nacional" isActive={activeLink === '/nacional'} />
                    <LinkNavbar href="/otros" text="Otros" isActive={activeLink === '/otros'} />
                </ul>
            </menu>
        </div>
    )
}