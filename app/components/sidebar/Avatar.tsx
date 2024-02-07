'use client';

import { User } from "@prisma/client"
import Image from "next/image";

interface AvatarProps {
    user: User
}

const Avatar: React.FC<AvatarProps> = ({
    user
}) => {
    return (
        <div className="relative flex items-center justify-center">
            <div className="relative inline-block h-6 w-6 md:h-8 md:w-8 rounded-full overflow-hidden">
                <Image
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    alt="profile" 
                    src={user?.image || "/images/profile.png"}
                    fill 
                />
            </div>
            <span className="bg-green-500 block ring-2 ring-white absolute rounded-full
                top-0 right-5 h-2 w-2 md:w-3 md:h-3" />
        </div>
    )
}
export default Avatar;