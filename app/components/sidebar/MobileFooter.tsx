'use client';

import useConversation from "@/app/hooks/useConvesation";
import useRoutes from "@/app/hooks/useRoutes";
import MobileSidebarItem from "./MobileSidebarItem";

const MobileFooter = () => {

    const routes = useRoutes();
    const { isOpen } = useConversation();

    if (isOpen) return null;

    return (
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
        </div>
    )
}

export default MobileFooter;