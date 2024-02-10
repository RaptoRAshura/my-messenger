import getConversationById from "@/app/actions/getConversationById";
import getMessages from "@/app/actions/getMessages";
import EmptyConversationPane from "@/app/components/EmptyConversationPane";
import Header from "./components/Header";
import Body from "./components/Body";
import MessageForm from "./components/MessageForm";

interface IParams {
    conversationId: string;
}

const ConversationId = async ({ params } : { params: IParams }) => {

    const messages = await getMessages(params.conversationId);
    const conversation = await getConversationById(params.conversationId);

    if (!conversation) {
        return (
            <div className="lg:pl-80 h-full">
                <div className="h-full flex flex-col">
                    <EmptyConversationPane />
                </div>
            </div>
        )
    }

    return (
        <div className="lg:pl-80 h-full">
            <div className="flex flex-col h-full">
                <Header conversation={conversation}/>
                <Body initialMessages={messages} />
                <MessageForm />
            </div>
        </div>
    )
}

export default ConversationId;