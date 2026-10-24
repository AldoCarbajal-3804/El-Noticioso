import { useEffect } from "react"
import { useTheme } from "@/store/theme"
import light from '@/assets/icons/light.svg'
import dark from '@/assets/icons/dark.svg'

export const ButtonTheme = () => {
    
    const theme = useTheme((state) => state.theme);
    const changeTheme = useTheme((state) => state.changeTheme);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);
    
    return (
        <button
            type="button"
            onClick={changeTheme}
            className={`grid size-10 place-items-center rounded-full transition-colors sm:size-10 md:size-11 lg:size-12 ${
                theme=='light' ? 'bg-first' : 'bg-fifth'
            }`}
        >
            <img
                src={theme=='light' ? light : dark}
                alt="Imagen de cambio"
                aria-hidden="true"
                className="size-5 sm:size-6 md:size-6 lg:size-7"
            />
        </button>
    )
}