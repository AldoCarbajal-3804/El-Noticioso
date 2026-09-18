import {LinkNavbar} from '../components/ui/LinkNavbar'

function Navbar(){

    return(
        <nav className='bg-third-nav text-second-light'>
            <ul className='flex justify-between gap-8 font-body'>
                <LinkNavbar href="/" text="Inicio" isActive={true} />
                <LinkNavbar href="/noticias" text="Noticias"/>
                <LinkNavbar href="/deportes" text="Deportes" />
                <LinkNavbar href="/entretenimiento" text="Entretenimiento" />
                <LinkNavbar href="/tecnologia" text="Tecnología" />
            </ul>
        </nav>
    )


}

export default Navbar