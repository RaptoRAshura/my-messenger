'use client';

import Avatar from "@/app/components/sidebar/Avatar";
import useOtherUser from "@/app/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { HiChevronLeft } from "react-icons/hi";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import ProfileDrawer from "./ProfileDrawer";

interface HeaderProps {
    conversation: Conversation & { users: User[] }
}

const Header: React.FC<HeaderProps> = ({
    conversation
}) => {

    const otherUser = useOtherUser(conversation);

    const [ isDrawerOpen, setIsDrawerOpen ] = useState<boolean>(false);

    const statusText = useMemo(() => {
        if (conversation.isGroup) {
            return `${conversation.users.length} members`
        }

        return 'Active';

    }, [conversation]);


    return (
        <>
            <ProfileDrawer
                data={conversation}
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)} 
            />
            <div 
                className="flex justify-between bg-white w-full border-b-[1px]
                items-center shadow-sm py-3 px-4 lg:-px-6"
            >
                <div
                    className="flex gap-3 items-center"
                >
                    <Link
                        className="lg:hidden text-sky-500 block hover:text-sky-600 
                            transition pointer-cursor" 
                        href={'/conversations'}>
                            <HiChevronLeft size={32} />
                    </Link>
                    <Avatar user={otherUser} />
                    <div className="flex flex-col">
                        <div>
                            {conversation.name || otherUser.name}
                        </div>
                        <div className="text-neutral-500 text-sm font-light">
                            {statusText}
                        </div>
                    </div>
                </div>
                <HiEllipsisHorizontal
                    size={32}
                    onClick={() => setIsDrawerOpen(true)} 
                    className="text-sky-500 cursor-pointer hover:text-sky-600 transition"
                />
            </div>
        </>
       
    )
}

export default Header