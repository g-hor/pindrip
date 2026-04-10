export interface IPin {
	id: number;
	title: string;
	description?: string;
	altText?: string;
	website?: string;
	photo?: string;
	creator?: string;
}

export interface ICreatePinArgs {
	title: string;
	description: string;
	altText: string;
	website: string;
	photo: File;
}
