'use client';

import clsx from "clsx"
import useConversation from "../hooks/useConvesation";
import EmptyConversationPane from "../components/EmptyConversationPane";


const Home = () => {

    const { isOpen } = useConversation();

    return (
        <div className={clsx(
            "lg:pl-80 h-full lg:block",
            isOpen ? "block " : "hidden",

        )}>
            <EmptyConversationPane />
        </div>
    )
}

export default Home