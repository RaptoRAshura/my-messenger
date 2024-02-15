'use client';

import { User} from "@prisma/client"
import Image from "next/image";

interface AvatarGroupProps {
    users?: User[]
}

const AvatarGroup: React.FC<AvatarGroupProps> = ({
    users = []
}) => {

    const slicedUsers = users.slice(0,3);

    const positionMap = {
        0: "top-0 left-[10px]",
        1: "bottom-0",
        2: "bottom-0 right-0"
    }

    return (
        <div className="relative h-11 w-11">
            { slicedUsers.map((user, index) => (
                <div
                    key={user.id} 
                    className={`absolute inline-block rounded-full overflow-hidden
                    h-[24px] w-[24px] ${positionMap[index as keyof typeof positionMap]}`}>
                    <Image
                        alt="members" 
                        src={user?.image || "/images/profile_male.jpg"}
                        fill 
                    />
                </div>
            )) }
            
            <span className="bg-green-500 block ring-2 ring-white absolute rounded-full
                top-0 right-0 h-2 w-2 md:w-3 md:h-3" />
        </div>
    )
}
export default AvatarGroup;