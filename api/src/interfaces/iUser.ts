import { Document, ObjectId } from 'mongoose';

export interface IUser {
	username: string;
	password: string;
}

export interface IUserDocument extends IUser, Document {
	_id: ObjectId;
}
