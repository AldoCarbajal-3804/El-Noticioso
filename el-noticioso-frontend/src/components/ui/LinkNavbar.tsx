type Props = {
    href: string;
    text: string;
    isActive?: boolean;
}


export const LinkNavbar = ({ href, text, isActive }: Props) => {

    return (
        <li className={`transition p-4 delay-150 duration-300 ease-in-out ${isActive ? 'bg-gray-600' : ''}`}>
            <a href={href} className="text-second-light hover:text-gray-300">
                {text}
            </a>
        </li>
    )

}