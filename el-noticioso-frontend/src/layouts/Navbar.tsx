import { NavbarDesktop } from "@/components/responsive/NavbarDesktop"
import { NavbarMobile } from "@/components/responsive/NavbarMobile"

function Navbar() {


    return (
        <nav className='bg-fourth text-white'>
            <div className='hidden md:block'>
                <NavbarDesktop />
            </div>
            <div className='block md:hidden'>
                <NavbarMobile />
            </div>
        </nav>
    )

}

export default Navbar