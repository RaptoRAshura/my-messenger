

import clsx from "clsx"

interface ButtonProps {
    type?: "button" | "submit" | 'reset' | undefined;
    fullWidth?: boolean;
    children?: React.ReactNode;
    onClick?: () => void;
    secondary?: boolean;
    danger?: boolean;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    type,
    fullWidth,
    children,
    onClick,
    secondary,
    danger,
    disabled
}) => {
    return (
        <button 
            onClick={onClick} 
            type={type}
            disabled={disabled}
            className={clsx(`
                flex
                justify-center
                rounded-full
                px-5
                py-[10px]
                text-sm
                font-semibold
                focus:visible:outline
                focus:visible:autline-2
                focus:visible:autline-offset-2`,
                disabled && "opacity-50 cursor-not-allowed",
                fullWidth && "w-full",
                secondary ? "text-gray-900" : "text-white",
                danger && "bg-rose-600 hover:bg-rose-800 focus-visible:outline-rose-800",
                !secondary && !danger && "bg-blue-500 hover:bg-blue-600 focus-visible:outline-blue-600"
                )}
        >
            {children}
        </button>
    )
}

export default Button