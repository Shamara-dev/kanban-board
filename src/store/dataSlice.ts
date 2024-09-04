import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICard, IList, IBoard } from '../types/types';
import { RootState } from './store';

interface dataSliceProps {
    boards: IBoard[];
    lists: IList[];
    cards: ICard[];
}

const initialState: dataSliceProps = {
    boards: JSON.parse(localStorage.getItem('boards') || '[]'),
    lists: JSON.parse(localStorage.getItem('lists') || '[]'),
    cards: JSON.parse(localStorage.getItem('cards') || '[]'),
};

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        createBoard: (state, action: PayloadAction<IBoard>) => {
            state.boards.push(action.payload);
            localStorage.setItem('boards', JSON.stringify(state.boards));
        },
        createList: (state, action: PayloadAction<IList>) => {
            state.lists.push(action.payload);
            localStorage.setItem('lists', JSON.stringify(state.lists));
        },
        updateLists: (state, action: PayloadAction<IList[]>) => {
            state.lists = action.payload;
            localStorage.setItem('lists', JSON.stringify(state.lists));
        },
        updateListTitle: (state, action: PayloadAction<IList>) => {
            state.lists = state.lists.map((list) =>
                list.id === action.payload.id ? action.payload : list
            );
            localStorage.setItem('lists', JSON.stringify(state.lists));
        },
        createCard: (state, action: PayloadAction<ICard>) => {
            state.cards.push(action.payload);
            localStorage.setItem('cards', JSON.stringify(state.cards));
        },
        updateCard: (state, action: PayloadAction<ICard>) => {
            state.cards = state.cards.map((card) =>
                card.id === action.payload.id ? action.payload : card
            );
            localStorage.setItem('cards', JSON.stringify(state.cards));
        },
        updateCards: (state, action: PayloadAction<ICard[]>) => {
            const updatedCards = action.payload;
            state.cards = state.cards.map(
                (card) =>
                    updatedCards.find(
                        (updatedCard) => updatedCard.id === card.id
                    ) || card
            );
            localStorage.setItem('cards', JSON.stringify(state.cards));
        },
    },
});

export const {
    createBoard,
    createList,
    updateLists,
    updateListTitle,
    createCard,
    updateCard,
    updateCards,
} = dataSlice.actions;

export const selectBoardById = (boardId: string) =>
    createSelector(
        (state: RootState) => state.data.boards,
        (boards) => boards.filter((board) => board.id === boardId)
    );

export const selectListsByBoardId = (boardId: string) =>
    createSelector(
        (state: RootState) => state.data.lists,
        (lists) =>
            lists
                .filter((list) => list.boardId === boardId)
                .sort((a, b) => a.order - b.order)
    );

export const selectCardsByListId = (listId: string) =>
    createSelector(
        (state: RootState) => state.data.cards,
        (cards) =>
            cards
                .filter((card) => card.listId === listId)
                .sort((a, b) => a.order - b.order)
    );

export default dataSlice.reducer;
