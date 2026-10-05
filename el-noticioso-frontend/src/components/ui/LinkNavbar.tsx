type Props = {
    href: string;
    text: string;
    onClick?: () => void;
    isActive?: boolean;
}


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