import * as z from "zod"

const PropsSchema = z.object({
    href: z.url({error: "La URL es requerida"}),
    text: z.string({error: "El texto es requerido"})
        .max(50, {error: "El texto no puede superar los 50 caracteres"}),
    onClick: z.function().optional(),
    isActive: z.boolean().optional()
});

type Props = z.infer<typeof PropsSchema>;


export const LinkNavbar = ({ href, text, onClick: onClick, isActive=false }: Props) => {

    return (
         <li
            className={`cursor-pointer p-4 transition duration-300 ease-in-out ${
                isActive
                    ? 'bg-gray-500 text-white'
                    : 'text-second-light hover:bg-gray-500 hover:text-gray-300'
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