import { Outlet } from "react-router-dom";

const AppLayout = () => {
    return (
        <div>
            <header>
                <h1 className="text-center my-8">Fluencer Blog App</h1>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default AppLayout;
