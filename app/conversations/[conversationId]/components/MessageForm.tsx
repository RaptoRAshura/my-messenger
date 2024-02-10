'use client';

import useConversation from "@/app/hooks/useConvesation";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiPaperAirplane } from "react-icons/hi2";
import { HiPhoto } from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { CldUploadButton } from "next-cloudinary";

interface MessageFormProps {
}

const MessageForm: React.FC<MessageFormProps> = ({
}) => {

    const { conversationId } = useConversation();

    const { formState: { errors }, setValue, register, handleSubmit } = useForm<FieldValues>({
        defaultValues: {
            message: ''
        }
    });

    const onSubmit : SubmitHandler<FieldValues> = (data) => {
        setValue('message', '', { shouldValidate: true });

        axios.post('/api/messages', {
            ...data, 
            conversationId
        })
    }

    const handleUpload = (result: any) => {
        axios.post('/api/messages', {
            image: result?.info?.secure_url,
            conversationId
        })
    }

    return (
        <div 
            className="p-4 bg-white border-t lg:gap-4 w-full gap-2 flex items-center"
        >   
            <CldUploadButton
                options={{ maxFiles: 1 }}
                onUpload={handleUpload}
                uploadPreset="lyl1bsns"
            >
                <HiPhoto size={32} className="text-sky-500 cursor-pointer hover:text-sky-600"/>
            </CldUploadButton>
           
            <form 
                onSubmit={handleSubmit(onSubmit)}
                className="flex items-center w-full gap-2 lg:gap-4"
            >
                <MessageInput 
                    id="message" 
                    register={register} 
                    errors={errors} 
                    required
                    placeholder={"Wrtie a message..."} 
                />
                <button type={"submit"} className="rounded-full p-2 cursor-pointer bg-sky-500 hover:bg-sky-600">
                    <HiPaperAirplane className="text-white" size={18}/>
                </button>
            </form>
        </div>
    )
}

export default MessageForm