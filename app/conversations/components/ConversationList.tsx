'use client';

import useConversation from "@/app/hooks/useConvesation";
import { FullConversationType } from "@/app/types";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";
import ConversationBox from "./ConversationBox";

interface ConversationListProps {
    initialItems: FullConversationType[]
}

const ConversationList: React.FC<ConversationListProps> = ({
    initialItems
}) => {

    const [ items, setItems ] = useState<FullConversationType[]>(initialItems);

    const router = useRouter();

    const { conversationId, isOpen } = useConversation();

    return (
        <aside className={clsx(`
            fixed
            pb-20
            inset-y-0
            lg:left-20
            lg:pb-0
            lg:w-80
            lg:block
            overflow-y-auto
            border-r
            border-gray-200`,
            isOpen ? 'hidden' : 'block w-full left-0')}>
            <div className="px-5">
                <div className="flex justify-between mb-4 pt-4">
                    <div className="text-2xl font-bold text-neutral-800">
                        Messages
                    </div>
                    <div className="rounded-full hover:opacity-75 cursor-pointer bg-gray-100
                         text-gray-600 p-2 transition">
                        <MdOutlineGroupAdd size={20}/>
                    </div>
                </div>
                {items.map((item) => (
                    <ConversationBox
                        key={item.id}
                        data={item}
                        selected={conversationId === item.id} 
                    />
                ))}
            </div>
        </aside>
    )
}

export default ConversationList