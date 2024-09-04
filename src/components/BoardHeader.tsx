import OptionsIcon from '../assets/OptionsIcon';
import { selectBoardById } from '../store/dataSlice';
import { useAppSelector } from '../store/hooks';

const BoardHeader = ({ id }: { id: string }) => {
    const { title } = useAppSelector(selectBoardById(id))[0];

    return (
        <div className="w-full p-4 flex items-center justify-between bg-white font-bold text-2xl">
            {title}
            <OptionsIcon />
        </div>
    );
};

export default BoardHeader;
