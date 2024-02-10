'use client';

import useConversation from "@/app/hooks/useConvesation";
import { FullMessageType } from "@/app/types";

import { useRef, useState } from "react";
import MessageBox from "./MessageBox";


interface BodyProps {
    initialMessages: FullMessageType[]
}

const Body: React.FC<BodyProps> = ({
    initialMessages
}) => {

    const [ messages, setMessages ] = useState<FullMessageType[]>(initialMessages);

    const bottomRef = useRef<HTMLDivElement>(null);

    const { conversationId } = useConversation();



    return (
        <div 
            className="flex-1 overflow-y-auto"
        >
            {
                messages.map((message: FullMessageType, index: number) => (
                    <MessageBox 
                        key={message.id}
                        isLast={index === messages.length - 1}
                        data={message}
                    />
                ))
            }
            <div className="pt-24" ref={bottomRef} /> 
        </div>
    )
}

export default Body