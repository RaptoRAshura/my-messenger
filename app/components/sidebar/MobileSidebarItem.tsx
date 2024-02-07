import clsx from "clsx"
import Link from "next/link"

interface MobileSidebarItemProps {
    label: string;
    icon: any;
    href: string;
    onClick?: () => void;
    active?: boolean;
}

const MobileSidebarItem: React.FC<MobileSidebarItemProps> = ({
    label,
    icon: Icon,
    href,
    onClick,
    active
}) => {

    const handleClick = () => {
        if (onClick) return onClick()
    }

    return (
        <Link 
            onClick={handleClick}
            className={clsx(`group flex gap-x-3 p-3 w-full justify-center text-sm leading-6 font-semibold
            text-gray-500 hover:text-black hover:bg-gray-100`,
            active && 'bg-gray-100 text-black')}
            href={href}
        >
            <Icon className="h-6 w-6"/>
            <span className="sr-only">{label}</span>
        </Link>
    )
}

export default MobileSidebarItem;