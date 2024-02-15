'use client';

import useOtherUser from "@/app/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import { format } from "date-fns";
import { Fragment, useMemo, useState } from "react";
import { Dialog, Transition } from "@headlessui/react"
import { IoClose, IoTrash } from "react-icons/io5"
import Avatar from "@/app/components/sidebar/Avatar";
import Modal from "@/app/components/Modal";
import ConfirmModal from "./ConfirmModal";
import AvatarGroup from "@/app/components/sidebar/AvatarGroup";
import useActiveList from "@/app/hooks/useActiveList";

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

    const { members } = useActiveList();

    const isActive = members.indexOf(otherUser?.email!) !== -1; 


    const [ isConfirmOpen, setIsConfirmOpen ] = useState<boolean>(false);

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
        return isActive ? 'Active' : 'Offline'
    }, [data])

    return (
        <>
            <ConfirmModal 
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
            />
            <Transition.Root appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={onClose}>
                    <Transition.Child
                        as={Fragment}
                        enter="east-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="inset-0 bg-black fixed bg-opacity-40"/>
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 
                                flex max-w-full pl-10">
                                <Transition.Child 
                                    as={Fragment} 
                                    enter="transform transition ease-in-out duration-300"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-300"
                                    leaveTo="translate-x-full"
                                >
                                    <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                        <div className="flex h-full flex-col overflow-y-scroll
                                        bg-white py-6 shadow-xl">
                                            <div className="px-4 sm:px-6">
                                                <div className="flex items-center justify-end">
                                                    <div className="ml-3 flex h-7 items-center">
                                                        <button 
                                                            onClick={onClose}
                                                            type="button" 
                                                            className="rounded-md bg-white text-gray-400
                                                            hover:text-gray-500 focus:outline-none focus:ring-2
                                                            focus:ring-sky-500 focus:ring-offset-2">
                                                            <span className="sr-only">Close panel</span>
                                                            <IoClose size={24}/>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                                <div className="flex flex-col items-center">
                                                    <div className="mb-2">
                                                        {data?.isGroup ? (
                                                            <AvatarGroup users={data.users}/>
                                                        ) : <Avatar user={otherUser} />}
                                                    </div>
                                                    <div>
                                                        {title}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {statusText}
                                                    </div>
                                                    <div className="flex gap-10 my-8">
                                                        <div
                                                            onClick={() => setIsConfirmOpen(true)} 
                                                            className="flex flex-col gap-3 items-center 
                                                            cursor-pointer hover:opacity-75">
                                                            <div className="w-10 h-10 bg-neutral-100 rounded-full
                                                                flex items-center justify-center">
                                                                    <IoTrash size={24} />
                                                            </div>
                                                            <span className="text-sm text-gray-500 font-light">Delete Chats</span>
                                                        </div>
                                                    </div>
                                                    <div className="w-full py-5 sm:px-0 sm:py-0 ">
                                                        <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
                                                            {data.isGroup && (
                                                               <div>
                                                                    <dt className="text-sm font-medium text-gray-500
                                                                    sm:w-40 sm:flex-shrink-0">
                                                                        Emails
                                                                    </dt>
                                                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 flex flex-col">
                                                                        {data.users.map((user) => <span className="text-sm text-gray-500">{user.email}</span>)}
                                                                    </dd>
                                                                </div> 
                                                            )}
                                                            {!data.isGroup && (
                                                                <div>
                                                                    <dt className="text-sm font-medium text-gray-500
                                                                    sm:w-40 sm:flex-shrink-0">
                                                                        Email
                                                                    </dt>
                                                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                                                        {otherUser.email}
                                                                    </dd>
                                                                </div> 
                                                            )}
                                                            {
                                                                !data?.isGroup && (
                                                                    <>
                                                                    <hr />
                                                                    <div>
                                                                        <dt className="text-sm sm:flex-shrink-0 sm:w-40 font-medium
                                                                        text-gray-500">
                                                                            Joined
                                                                        </dt>
                                                                        <dd className="text-sm mt-1 text-gray-900 sm:col-span-2"> 
                                                                            <time dateTime={joiningDate}>
                                                                                {joiningDate}
                                                                            </time>
                                                                        </dd>
                                                                    </div>
                                                                    </>
                                                                )
                                                            }
                                                        </dl>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
       
    )
}

export default ProfileDrawer