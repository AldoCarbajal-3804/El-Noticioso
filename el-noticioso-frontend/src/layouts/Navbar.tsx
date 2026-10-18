import { NavbarDesktop } from "@/components/responsive/NavbarDesktop"
import { NavbarMobile } from "@/components/responsive/NavbarMobile"

function Navbar() {


    return (
        <nav className='bg-unique-1 text-second-light'>
            
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