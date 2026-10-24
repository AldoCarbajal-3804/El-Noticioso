import * as z from "zod"
import { PropsNavbar } from "@/schemas/ui/PropsNavbar";
import { useTheme } from "@/store/theme";

type Props = z.infer<typeof PropsNavbar>;

export const LinkNavbar = ({ href, text, onClick: onClick, isActive=false }: Props) => {

    const theme = useTheme((state) => state.theme)

    return (
         <li
            data-theme-mode={theme}
            className={`cursor-pointer p-4 transition duration-300 ease-in-out ${
                isActive
                    ? 'bg-fifth text-white'
                    : 'text-second-light hover:bg-fifth hover:text-gray-300'
            }`}
        >
            <a
                href={href}
                onClick={onClick}
                className="block"
                aria-current={isActive ? 'page' : undefined}
            >
                {text}
            </a>
        </li>
    )

}