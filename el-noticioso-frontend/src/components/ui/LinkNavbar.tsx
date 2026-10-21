import * as z from "zod"
import { PropsNavbar } from "@/schemas/ui/PropsNavbar";

type Props = z.infer<typeof PropsNavbar>;


export const LinkNavbar = ({ href, text, onClick: onClick, isActive=false }: Props) => {

    return (
         <li
            className={`cursor-pointer p-4 transition duration-300 ease-in-out ${
                isActive
                    ? 'bg-unique-2 text-white'
                    : 'text-second-light hover:bg-unique-2 hover:text-gray-300'
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