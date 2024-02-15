'use client';

import useActiveList from "@/app/hooks/useActiveList";
import { User } from "@prisma/client"
import Image from "next/image";

interface AvatarProps {
    user: User
}

const Avatar: React.FC<AvatarProps> = ({
    user
}) => {

    const { members } = useActiveList();

    const isActive = members.indexOf(user?.email!) !== -1; 

    return (
        <div className="relative flex items-center justify-center">
            <div className="relative inline-block h-8 w-8 md:h-12 md:w-12 rounded-full overflow-hidden">
                <Image
                    alt="profile" 
                    src={user?.image || "/images/profile_male.jpg"}
                    fill 
                />
            </div>
            { isActive && 
            <span className="bg-green-500 block ring-2 ring-white absolute rounded-full
                top-0 right-0 h-2 w-2 md:w-3 md:h-3" />
            }
        </div>
    )
}
export default Avatar;