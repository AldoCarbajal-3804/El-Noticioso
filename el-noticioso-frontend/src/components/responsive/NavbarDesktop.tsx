import { LinkNavbar } from '@/components/ui/LinkNavbar'
import useRoute from '@/hooks/useRoute'


export const NavbarDesktop = () => {

    const { pathname: activeLink } = useRoute()

    return(
        <ul className='flex justify-between gap-8 font-body'>
            <LinkNavbar href="/" text="Inicio" isActive={activeLink === '/'} />
            <LinkNavbar href="/local" text="Local" isActive={activeLink === '/local'} />
            <LinkNavbar href="/regional" text="Regional" isActive={activeLink === '/regional'} />
            <LinkNavbar href="/nacional" text="Nacional" isActive={activeLink === '/nacional'} />
            <LinkNavbar href="/internacional" text="Internacional" isActive={activeLink === '/internacional'} />
        </ul>
    )

}