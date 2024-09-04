import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { createBoard } from '../store/dataSlice';
import { nanoid } from 'nanoid';

const MainPage = () => {
    const boards = useAppSelector((state) => state.data.boards);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleCreateBoard = () => {
        dispatch(createBoard({ id: nanoid(), title: 'new board' }));
    };

    return (
        <div>
            <h2 className="m-4 font-bold text-3xl">Boards</h2>
            <div className="p-4 flex gap-4">
                {boards.map((board) => (
                    <div
                        key={board.id}
                        className="p-8 rounded-lg bg-gray-100 cursor-pointer"
                        onClick={() => navigate(`/board/${board.id}`)}
                    >
                        {board.title}
                    </div>
                ))}
                <div
                    className="p-8 rounded-lg bg-gray-100 cursor-pointer"
                    onClick={handleCreateBoard}
                >
                    Create new board
                </div>
            </div>
        </div>
    );
};

export default MainPage;
