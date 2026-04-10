export interface IBoard {
	id: number;
	name: string;
	boardUrl: string;
	description?: string;
	count: number;
	savedPins: number[];
}

export interface IBoardPinArgs {
	boardId: number;
	pinId: number;
}
