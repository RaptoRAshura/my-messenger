'use client';

import useRoutes from "@/app/hooks/useRoutes";
import { useState } from "react";
import DesktopSidebarItem from "./DesktopSidebarItem";
import { User } from "@prisma/client";
import Avatar from "./Avatar";

interface DesktopSidebarProps {
    currentUser: User
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
    currentUser
}) => {

    const routes = useRoutes();
    const [ isOpen, setIsOpen ] = useState<Boolean>(false);


    return (
        <div className="hidden gap-y-4 lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 xl:px-6 lg:overflow-y-auto
            lg:bg-white lg:border-r-[1px] lg:pb-4 lg:flex lg:flex-col justify-between">
            <nav className="mt-4 flex flex-col justify-between">
                <ul
                    role="list"
                    className="flex flex-col items-center gap-1"
                >
                    {routes.map((item) => (
                        <DesktopSidebarItem
                            key={item.label}
                            href={item.href}
                            icon={item.icon}
                            active={item.active}
                            label={item.label}
                            onClick={item.onClick} 
                        />
                    ))}
                </ul>
            </nav>
            <nav className="flex item-center flex-col justify-between">
                <div className="cursor-pointer hover:opacity-75 transition"
                    onClick={() => setIsOpen(true)}>
                        <Avatar user={currentUser} />
                </div>
            </nav>
        </div>
    )
}

export default DesktopSidebar;