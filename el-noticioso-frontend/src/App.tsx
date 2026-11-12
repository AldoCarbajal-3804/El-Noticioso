
import { useEffect, useState } from 'react'
import './App.css'
import Header from '@/layouts/Header'
import Navbar from '@/layouts/Navbar'
import Body from '@/layouts/Body'
import Footer from '@/layouts/Footer'
import { ButtonTheme } from '@/components/ui/ButtonTheme'
import { useLogin } from '@/store/login'
import NuevaContrasena from '@/components/popups/NuevaContrasena'
import PerfilUsuario from '@/components/popups/PerfilUsuario'
import { Routes, Route } from 'react-router'
import Error404 from '@/layouts/404Error'

function App() {
    const [isFooterVisible, setIsFooterVisible] = useState(false)

    // Restaura la sesión al cargar la app y escucha login/logout
    useEffect(() => useLogin.getState().inicializar(), [])

    useEffect(() => {
        const footer = document.getElementById('site-footer')
        if (!footer) return

        const observer = new IntersectionObserver(([entry]) => {
            setIsFooterVisible(entry.isIntersecting)
        }, { threshold: 0 })

        observer.observe(footer)
        return () => observer.disconnect()
    }, [])

    return (
        <>
            <Header />
            <Navbar />
            <Routes>
                <Route path="/" element={<Body />} />
                <Route path="/local" element={<Body />} />
                <Route path="/regional" element={<Body />} />
                <Route path="/nacional" element={<Body />} />
                <Route path="*" element={<Error404 />} />
            </Routes>
            <Footer />
            <NuevaContrasena />
            <PerfilUsuario />
            <div
                aria-hidden={isFooterVisible}
                inert={isFooterVisible}
                className={`fixed bottom-4 right-4 sm:bottom-8 sm:right-8 md:bottom-12 md:right-12 z-50 transition-all duration-300 ease-out ${
                    isFooterVisible
                        ? 'pointer-events-none translate-y-3 opacity-0'
                        : 'translate-y-0 opacity-100'
                }`}
            >
                <ButtonTheme />
            </div>
        </>
    )
}

export default App
