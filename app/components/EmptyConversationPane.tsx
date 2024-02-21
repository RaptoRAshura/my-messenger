const EmptyConversationPane = () => {

    return (
        <div className="min-h-full bg-stone-50 flex flex-col items-center justify-center">
            <span className="text-lg font-semibold text-gray-900">Hi,{}</span>
            <span className="text-sm text-gray-900">Start a new conversation.</span>
            <p className="text-sm text-gray-900 w-80 text-wrap text-center">Everyone is a friend here. I will bring the ability to choose whom you want to talk in some time.</p>
        </div>
    )
}

export default EmptyConversationPane;