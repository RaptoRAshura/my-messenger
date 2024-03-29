'use client';

import Avatar from "@/app/components/sidebar/Avatar";
import { FullMessageType } from "@/app/types";
import clsx from "clsx";
import { format } from "date-fns/format";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { RiCheckDoubleFill } from "react-icons/ri";
import ImageModal from "./ImageModal";


interface MessageBoxProps {
    data: FullMessageType;
    isLast?: boolean;
}

const MessageBox: React.FC<MessageBoxProps> = ({
    data,
    isLast
}) => {

    const session = useSession();

    const [ isImageModalOpen, setIsImageModalOpen ] = useState<boolean>(false);

    const isOwn = session?.data?.user?.email === data?.sender?.email;

    const seenList = (data?.seen || [])
    .filter((user) => user.email != data?.sender?.email)
    .map((user) => user.name).join(', ');

    const container = clsx(
        "flex gap-3 p-4",
        isOwn && "justify-end"
    )

    const avatar = clsx(
        isOwn && "order-2"
    )

    const body = clsx(
        "flex flex-col gap-2",
        isOwn && "items-end"
    )

    const message = clsx(
        "text-sm w-fit font-medium",
        isOwn ? "bg-sky-500 text-white" : "bg-gray-100 text-gray-900",
        data?.image ? "rounded-md p-0 bg-transparent" : "rounded-full py-2 px-3"
    )

    return (
        <div 
            className={container}
        >
            <div className={avatar} >
                <Avatar user={data?.sender}/>
            </div>
            <div className={body}>
                <div className="flex items-center gap-1">
                    <div className="text-sm text-gray-500">
                        {data?.sender?.name}
                    </div>
                    <div className="text-xs text-gray-400">
                        {format(new Date(data.createdAt), 'p')}
                    </div>
                </div>
                <div className={message}>
                    { isImageModalOpen && (
                        <ImageModal 
                            src={data?.image} 
                            isOpen={isImageModalOpen} 
                            onClose={() => setIsImageModalOpen(false)} 
                            />
                        ) 
                    }
                    {data.image ? (
                        <Image
                            onClick={() => setIsImageModalOpen(true)}
                            alt={"image"}
                            src={data?.image}
                            height={188}
                            width={188}
                            className="object-cover rounded-lg cursor-pointer hover:scale-110 transition translate" 
                        />
                    ) :(
                        <div >{data?.body}</div>
                    )}
                </div>
                {
                    (isLast && isOwn) && (
                        <div>
                            <RiCheckDoubleFill size={18} className={`${seenList.length ? 'text-sky-500' : 'text-gray-400' }`}/>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default MessageBox