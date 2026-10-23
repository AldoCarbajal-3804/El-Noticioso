import github from '@/assets/icons/github.svg'
import instagram from '@/assets/icons/instagram.svg'
import twitter from '@/assets/icons/twitter.svg'
import youtube from '@/assets/icons/youtube.svg'
import { LinkFooter } from '@/components/ui/LinkFooter'

function Footer (){

    return(

        <footer id="site-footer" className="bg-unique-1 flex flex-col md:flex-col lg:flex-row lg:justify-center md:px-15 lg:px-30 gap-5 items-center py-10">

            <small className="text-second-light text-xs md:text-sm lg:text-base flex-1 text-center lg:text-left"> 
                © Copyright - 2026 
                <br />
                Todos los derechos reservados
            </small>

            <main className='text-second-light text-xs md:text-sm lg:text-base flex-2 text-center'>
                El Noticioso - Proyecto generado para la recopilación de noticias del Perú y del Mundo
                pero siempre consultar siempre fuentes originales.
            </main>

            <menu className='flex flex-1 justify-end gap-3'>
                <LinkFooter 
                    href="https://github.com/"
                    img={github}
                    description='Enlace a Github'
                />
                <LinkFooter 
                    href="https://instagram.com/"
                    img={instagram}
                    description='Enlace a Instagram'
                />
                <LinkFooter 
                    href="https://x.com/"
                    img={twitter}
                    description='Enlace a Twitter'
                />
                <LinkFooter 
                    href="https://youtube.com/"
                    img={youtube}
                    description='Enlace a Youtube'
                />
            </menu>
        </footer>

    )

}

export default Footer