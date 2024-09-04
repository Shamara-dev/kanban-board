import { DragDropContext, DropResult, Droppable } from '@hello-pangea/dnd';
import { useParams } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
    createList,
    selectListsByBoardId,
    updateCards,
    updateLists,
} from '../store/dataSlice';
import EditableForm from '../components/EditableForm';
import ListItem from '../components/ListItem';
import BoardHeader from '../components/BoardHeader';

const BoardPage = () => {
    const { id } = useParams();
    const lists = useAppSelector(selectListsByBoardId(id!));
    const cards = useAppSelector((state) => state.data.cards);
    const dispatch = useAppDispatch();

    const onDragEnd = ({ destination, source, type }: DropResult) => {
        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        if (type === 'list') {
            const newLists = [...lists];
            const [movedList] = newLists.splice(source.index, 1);
            newLists.splice(destination.index, 0, movedList);
            dispatch(
                updateLists(
                    newLists.map((list, index) => ({ ...list, order: index }))
                )
            );
        }

        if (type === 'card') {
            const sourceListId = source.droppableId;
            const destinationListId = destination.droppableId;

            const sourceCards = cards
                .filter((card) => card.listId === sourceListId)
                .sort((a, b) => a.order - b.order);
            const [movedCard] = sourceCards.splice(source.index, 1);

            if (sourceListId === destinationListId) {
                sourceCards.splice(destination.index, 0, movedCard);
                const updatedCards = sourceCards.map((card, index) => ({
                    ...card,
                    order: index,
                }));
                dispatch(updateCards(updatedCards));
            } else {
                const destinationCards = cards
                    .filter((card) => card.listId === destinationListId)
                    .sort((a, b) => a.order - b.order);
                destinationCards.splice(destination.index, 0, movedCard);
                const updatedSourceCards = sourceCards.map((card, index) => ({
                    ...card,
                    order: index,
                    listId: sourceListId,
                }));
                const updatedDestinationCards = destinationCards.map(
                    (card, index) => ({
                        ...card,
                        order: index,
                        listId: destinationListId,
                    })
                );
                dispatch(
                    updateCards([
                        ...updatedSourceCards,
                        ...updatedDestinationCards,
                    ])
                );
            }
        }
    };

    const handleSubmit = (title: string) => {
        const newList = {
            id: nanoid(),
            boardId: id!,
            title,
            order: lists.length,
        };
        dispatch(createList(newList));
    };

    return (
        <>
            <BoardHeader id={id!} />
            <div className="p-6 flex gap-6">
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable
                        droppableId="lists"
                        direction="horizontal"
                        type="list"
                    >
                        {(droppableProvider) => (
                            <div
                                className="h-full flex gap-6"
                                ref={droppableProvider.innerRef}
                                {...droppableProvider.droppableProps}
                            >
                                {lists.map((list, index) => (
                                    <ListItem
                                        key={list.id}
                                        list={list}
                                        listIndex={index}
                                    />
                                ))}
                                {droppableProvider.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <EditableForm
                        placeholder="Enter list title..."
                        submitHandler={handleSubmit}
                        buttonText="Add list"
                    />
                </DragDropContext>
            </div>
        </>
    );
};

export default BoardPage;
