import { LinkNavbar } from '@/components/ui/LinkNavbar'


export const NavbarDesktop = () => {

    const activeLink = window.location.pathname

    return(
        <ul className='flex justify-between gap-8 font-body'>
            <LinkNavbar href="/" text="Inicio" isActive={activeLink === '/'} />
            <LinkNavbar href="/noticias" text="Noticias" isActive={activeLink === '/noticias'} />
            <LinkNavbar href="/deportes" text="Deportes" isActive={activeLink === '/deportes'} />
            <LinkNavbar href="/entretenimiento" text="Entretenimiento" isActive={activeLink === '/entretenimiento'} />
            <LinkNavbar href="/tecnologia" text="Tecnología" isActive={activeLink === '/tecnologia'} />
        </ul>
    )

}