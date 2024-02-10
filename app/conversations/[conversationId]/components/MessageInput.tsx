'use client';

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProps {
    id: string;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    type?: string;
    required?: boolean;
    placeholder?: string;
}

const MessageInput: React.FC<MessageInputProps> = ({
    id,
    register,
    errors,
    type,
    required,
    placeholder
}) => {
    return (
        <div className="w-full">
            <input 
                id={id}
                type={type}
                { ...register(id, { required }) }
                placeholder={placeholder}
                autoComplete={id}
                className="text-neutral-800 font-light py-2 px-4 bg-neutral-100 w-full
                    rounded-full focus:outline-none"
            />
        </div>
    )
}
export default MessageInput;