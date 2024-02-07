import SideBar from "../components/sidebar/Sidebar";

interface UserLayoutProps {
    children: React.ReactNode
}

const UserLayout: React.FC<UserLayoutProps> = async ({
    children
}) => {
    return (
        <SideBar>
            <div className="h-full">
                {children}
            </div>
        </SideBar>
    )
}

export default UserLayout;