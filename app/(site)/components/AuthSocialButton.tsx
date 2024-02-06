import { IconType } from 'react-icons';

interface AuthSocialButtonProps {
    icon: IconType;
    onClick: () => void;
    disabled?: boolean,
    text: string
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
    icon: Icon,
    onClick,
    disabled,
    text
}) => {
    return (
        <button 
            disabled={disabled}
            type="button"
            onClick={onClick}
            className={`group gap-2 flex w-full py-2 px-4 rounded-xl border border-gray-300 shadow-sm 
            items-center justify-between hover:bg-gray-100 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            <Icon /><span className='text-gray-600 text-sm'>{text}</span>
        </button>
    )
}

export default AuthSocialButton