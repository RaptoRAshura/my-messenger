'use client';

import useConversation from "@/app/hooks/useConvesation";
import { FullConversationType } from "@/app/types";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";
import ConversationBox from "./ConversationBox";
import { User } from "@prisma/client";
import GroupChatModal from "./GroupChatModal";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";

interface ConversationListProps {
    initialItems: FullConversationType[]
    users: User[]
}

const ConversationList: React.FC<ConversationListProps> = ({
    initialItems,
    users
}) => {

    const session = useSession();

    const router = useRouter();
    const [ items, setItems ] = useState<FullConversationType[]>(initialItems);
    const [ isModalOpen, setIsModalOpen ] = useState<boolean>(false);

    const { conversationId, isOpen } = useConversation();

    const pusherKey = useMemo(() => {
        return session.data?.user?.email;
    }, [session.data?.user?.email])

   

    useEffect(() => {
        if (!pusherKey) return;

        const newHandler = (conversation: FullConversationType) => {
            setItems((current) => {
                if (find(current, { id: conversationId })) {
                    return current;
                }
                return [conversation, ...current];
            })
        }
    
        const updateHandler = (conversation: FullConversationType) => {
            setItems((current) => current.map((currentConversation) => {
                    if (currentConversation.id === conversation.id) {
                        return { 
                            ...currentConversation,
                            messages: conversation.messages
                        };
                    }
                    return currentConversation;
                })
            )
        }
    
        const removeHandler = (conversation: FullConversationType) => {
            setItems((current) => current.filter((currentConversation) => currentConversation.id !== conversation.id))
            
            if (conversation.id === conversationId) {
                router.push('/conversations')
            }
        }

        pusherClient.subscribe(pusherKey);
        pusherClient.bind('conversation:new', newHandler);
        pusherClient.bind('conversation:update', updateHandler);
        pusherClient.bind('conversation:remove', removeHandler);

        return () => {
            pusherClient.unbind('conversation:new', newHandler);
            pusherClient.unsubscribe(pusherKey);
            pusherClient.unbind('conversation:update', updateHandler);
            pusherClient.unbind('conversation:remove', removeHandler)
        }
    }, [pusherKey, conversationId, router])

    return (
        <>
            <GroupChatModal
                isOpen={isModalOpen}
                users={users}
                onClose={() => setIsModalOpen(false)}
            />
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
                        <div
                            onClick={() => setIsModalOpen(true)} 
                            className="rounded-full hover:opacity-75 cursor-pointer bg-gray-100
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
        </>
        
    )
}

export default ConversationList