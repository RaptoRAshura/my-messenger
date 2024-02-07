import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"

interface InputProps {
    label?: string;
    id: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
    label,
    id, 
    type="text",
    placeholder="",
    required=false,
    register,
    errors,
    disabled=false
}) => {
    return (
        <div className="flex flex-col group">
            <label htmlFor={id} className={`text-xs font-medium text-gray-600 leading-6 
                ${label ? 'block' : 'hidden'}`}>
                {label}
            </label>
            <input 
                id={id}
                autoComplete={id} 
                type={type}
                placeholder={placeholder} 
                disabled={disabled}
                { ...register(id, { required }) }
                className={clsx(`
                    form-input
                    block
                    bg-stone-100
                    w-full
                    rounded-lg
                    border-[0.5px]
                    border-stone-200
                    focus:border-stone-100
                    py-1.5
                    text-gray-900
                    shadow-sm
                    ring-inset
                    ring-1
                    ring-gray-100
                    placeholder:text-gray-400
                    focus:ring-2
                    focus:ring-inset
                    focus:ring-sky-500
                    sm:text-sm
                    sm:leading-6`,
                    errors[id] && "focus:ring-rose-600",
                    disabled && "opacity-50 cursor-not-allowed")} 
            />
        </div>
    )
}

export default Input;