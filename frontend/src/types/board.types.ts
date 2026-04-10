export interface IBoard {
	id: number;
	name: string;
	description?: string;
	savedPins: number[];
}

export interface IBoardPinArgs {
	boardId: number;
	pinId: number;
}
