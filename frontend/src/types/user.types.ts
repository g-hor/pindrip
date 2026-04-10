export interface IUser {
	id: number;
	email: string;
	username: string;
	firstName: string;
	lastName?: string;
	about?: string;
	pronouns?: string;
	website?: string;
	gender?: string;
	country?: string;
	avatar?: string;
}
