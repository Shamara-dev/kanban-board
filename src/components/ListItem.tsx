import { Draggable, Droppable } from '@hello-pangea/dnd';
import { nanoid } from 'nanoid';
import { IList } from '../types/types';

import {
    createCard,
    selectCardsByListId,
    updateListTitle,
} from '../store/dataSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import EditableForm from './EditableForm';
import CardItem from './CardItem';
import EditableTitle from './EditableTitle';

interface ListProps {
    list: IList;
    listIndex: number;
}

const ListItem = ({ list, listIndex }: ListProps) => {
    const { id, title } = list;
    const cards = useAppSelector(selectCardsByListId(id));
    const dispatch = useAppDispatch();

    const handleSubmit = (title: string) => {
        const newCard = {
            id: nanoid(),
            title,
            order: cards.length,
            listId: id,
        };
        dispatch(createCard(newCard));
    };

    const handleChangeTitle = (title: string) => {
        dispatch(updateListTitle({ ...list, title }));
    };

    return (
        <Draggable key={id} draggableId={id} index={listIndex}>
            {(draggableProvider) => (
                <div
                    className="h-full w-[260px] p-2 flex flex-col gap-2 rounded-xl bg-gray-100"
                    ref={draggableProvider.innerRef}
                    {...draggableProvider.draggableProps}
                >
                    <EditableTitle
                        submitHandler={handleChangeTitle}
                        initialValue={title}
                        {...draggableProvider.dragHandleProps}
                    />
                    <Droppable droppableId={id} type="card">
                        {(droppableProvider) => (
                            <div
                                className="flex flex-col gap-2 rounded-lg"
                                ref={droppableProvider.innerRef}
                                {...droppableProvider.droppableProps}
                            >
                                {cards.map((card, index) => (
                                    <CardItem
                                        key={card.id}
                                        card={card}
                                        index={index}
                                    />
                                ))}

                                {droppableProvider.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <EditableForm
                        submitHandler={handleSubmit}
                        placeholder="Enter card title..."
                        buttonText="Add card"
                    />
                </div>
            )}
        </Draggable>
    );
};

export default ListItem;
