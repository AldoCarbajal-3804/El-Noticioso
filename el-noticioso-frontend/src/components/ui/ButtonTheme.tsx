import { useEffect } from "react"
import { useTheme } from "@/store/theme"
import light from '@/assets/icons/light.svg'
import dark from '@/assets/icons/dark.svg'

export const ButtonTheme = () => {
    
    const { theme, changeTheme } = useTheme();

     useEffect(() => {
        const root = document.documentElement;

        root.setAttribute('data-theme', theme);

        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [theme]);
    
    return (
        <button
            type="button"
            onClick={changeTheme}
            className={`grid size-10 place-items-center rounded-full transition-colors sm:size-10 md:size-11 lg:size-12 ${
                theme=='light' ? 'bg-first-light hover:bg-first-dark' : 'bg-second-light'
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