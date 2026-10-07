import { LinkNavbar } from '@/components/ui/LinkNavbar'


export const NavbarDesktop = () => {

    const activeLink = window.location.pathname

    return(
        <ul className='flex justify-between gap-8 font-body'>
            <LinkNavbar href="/" text="Inicio" isActive={activeLink === '/'} />
            <LinkNavbar href="/local" text="Local" isActive={activeLink === '/local'} />
            <LinkNavbar href="/regional" text="Regional" isActive={activeLink === '/regional'} />
            <LinkNavbar href="/nacional" text="Nacional" isActive={activeLink === '/nacional'} />
            <LinkNavbar href="/otros" text="Otros" isActive={activeLink === '/otros'} />
        </ul>
    )

}