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
	createdPins: number[];
	followingCount: number;
	followerCount: number;
	followers: number[];
	followedUsers: number[];
}

export interface IUpdatePasswordArgs {
	id: number;
	email: string;
	oldPw: string;
	newPw: string;
}

export interface IDeleteUserArgs {
	id: number;
	email: string;
	newPw: string;
}

export interface IFollowArgs {
	followingId: number;
	followerId: number;
}
