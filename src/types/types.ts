export interface IBoard {
    id: string;
    title: string;

    // createAt: Date;
    // updateAt: Date;
}

export interface IList {
    id: string;
    title: string;
    order: number;

    boardId: string;

    // createAt: Date;
    // updateAt: Date;
}

export interface ICard {
    id: string;
    title: string;
    description?: string;
    order: number;

    listId: string;

    // createAt: Date;
    // updateAt: Date;
}
