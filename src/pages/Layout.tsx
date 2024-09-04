import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const Layout = () => {
    return (
        <div className="flex bg-slate-200 font-mono">
            <Sidebar />
            <div className="w-full">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
