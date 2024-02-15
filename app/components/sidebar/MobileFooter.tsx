'use client';

import useConversation from "@/app/hooks/useConvesation";
import useRoutes from "@/app/hooks/useRoutes";
import MobileSidebarItem from "./MobileSidebarItem";
import SettingsModal from "./SettingsModal";
import { User } from "@prisma/client";
import { useState } from "react";
import { HiUser } from "react-icons/hi";

interface MobileFooterProps {
    currentUser: User
}

const MobileFooter: React.FC<MobileFooterProps> = ({
    currentUser
}) => {

    const routes = useRoutes();
    const { isOpen } = useConversation();
    const [ isSettingsModalOpen, setIsSettingsModalOpen] = useState<boolean>(false);

    if (isOpen) return null;

    return (
        <>
            <SettingsModal
                currentUser={currentUser} 
                isOpen={isSettingsModalOpen}
                onClose={() => setIsSettingsModalOpen(false)}
            />
            <div className="fixed flex items-center justify-between w-full bottom-0 z-40
            bg-white lg:hidden border-t-[1px]">
                {routes.map((item) => (
                    <MobileSidebarItem 
                        label={item.label}
                        key={item.label}
                        href={item.href}
                        active={item.active}
                        icon={item.icon}
                        onClick={item.onClick}
                    />
                ))}
                <MobileSidebarItem 
                    label={"Profile"}
                    key={"profile"}
                    href={"#"}
                    active={false}
                    icon={HiUser}
                    onClick={() => setIsSettingsModalOpen(true)}
                />
            </div>
        </>
       
    )
}

export default MobileFooter;