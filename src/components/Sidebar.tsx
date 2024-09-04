import { useNavigate, useParams } from 'react-router-dom';
import BoardIcon from '../assets/BoardIcon';
import LogoIcon from '../assets/LogoIcon';
import { useAppSelector } from '../store/hooks';

const Sidebar = () => {
    const { id } = useParams();
    const boards = useAppSelector((state) => state.data.boards);
    const navigate = useNavigate();

    return (
        <div className="w-[250px] h-screen border-r bg-white">
            <div className="p-6">
                <LogoIcon />
            </div>
            <p
                className="pl-6 text-xl text-gray-500 cursor-pointer"
                onClick={() => navigate('/')}
            >
                All Boards ({boards.length})
            </p>
            <div className="mt-2 flex flex-col gap-2">
                {boards.map((board) => (
                    <div
                        key={board.id}
                        className={`pl-6 py-2 flex gap-2 items-center text-lg cursor-pointer 
                            ${
                                board.id === id
                                    ? 'w-full -left-2 bg-purple-600 text-white'
                                    : ''
                            }`}
                        onClick={() => navigate(`/board/${board.id}`)}
                    >
                        <BoardIcon />
                        {board.title}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
