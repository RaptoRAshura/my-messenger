'use client';

import useConversation from "@/app/hooks/useConvesation";
import useOtherUser from "@/app/hooks/useOtherUser";
import { FullMessageType } from "@/app/types";
import { Conversation, Message, User } from "@prisma/client";
import { useSession } from "next-auth/react";

import { useMemo, useRef, useState } from "react";


interface MessageBoxProps {
    data: FullMessageType;
    isLast?: boolean;
}

const MessageBox: React.FC<MessageBoxProps> = ({
    data,
    isLast
}) => {

    const session = useSession();

    const isOwn = session?.data?.user?.email === data?.sender?.email;

    const seenList = (data?.seen || [])
    .filter((user) => user.email != data?.sender?.email)
    .map((user) => user.name).join(', ');



    return (
        <div 
            className=""
        >
            Message
        </div>
    )
}

export default MessageBox