import getCurrentUser from "./getCurrentUser";
import getSession from "./getSession";
import prisma from "@/app/libs/prismadb";

const getConversations = async () => {
  
    const currentUser = await getCurrentUser();
    
    if (!currentUser || !currentUser?.id) return [];

    try {

        const conversations = await prisma.conversation.findMany({
            orderBy: {
                lastMessageAt: "desc"
            },
            where: {
                userIds: {
                    has: currentUser.id
                }
            },
            include: {
                users: true,
                messages: {
                    include: {
                        sender: true,
                        seen: true
                    }
                }
            }
        })

        return conversations;

    } catch (error: any) {
        console.log(error);
        return [];
    }
}

export default getConversations;

