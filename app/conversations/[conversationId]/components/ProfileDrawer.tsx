'use client';

import useOtherUser from "@/app/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import { format } from "date-fns";
import { Fragment, useMemo } from "react";
import { Transition } from "@headlessui/react"

interface ProfileDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    data: Conversation & {
        users: User[]
    }
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
    isOpen,
    onClose,
    data
}) => {

    const otherUser = useOtherUser(data);

    const joiningDate = useMemo(() => {
        return format(new Date(otherUser.createdAt!), 'PP');
    }, [otherUser.createdAt])

    const title = useMemo(() => {
        return data.name || otherUser.name
    }, [otherUser.name]);

    const statusText = useMemo(() => {
        if (data.isGroup) {
            return `${data.users.length} members`
        }
        return 'Active'
    }, [data])

    return (
       <Transition.Root show={isOpen} as={Fragment}>

       </Transition.Root>
    )
}

export default ProfileDrawer