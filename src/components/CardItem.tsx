import { Draggable } from '@hello-pangea/dnd';
import { ICard } from '../types/types';
import EditableTitle from './EditableTitle';
import { useAppDispatch } from '../store/hooks';
import { updateCard } from '../store/dataSlice';

interface CardProps {
    card: ICard;
    index: number;
}

const CardItem = ({ card, index }: CardProps) => {
    const dispatch = useAppDispatch();

    const handleChangeTitle = (title: string) => {
        dispatch(updateCard({ ...card, title }));
    };

    return (
        <Draggable draggableId={card.id} index={index}>
            {(draggableProvider) => (
                <div
                    className="p-2 rounded-lg shadow-md bg-white"
                    ref={draggableProvider.innerRef}
                    {...draggableProvider.dragHandleProps}
                    {...draggableProvider.draggableProps}
                >
                    <EditableTitle
                        initialValue={card.title}
                        submitHandler={handleChangeTitle}
                    />
                </div>
            )}
        </Draggable>
    );
};

export default CardItem;
