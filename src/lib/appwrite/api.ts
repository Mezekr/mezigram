import { INewUser } from '@/types';
import { ID } from 'appwrite';
import { account, avatars } from './config';

export async function createUserAccount(user: INewUser) {
	try {
		const newAccount = await account.create(
			ID.unique(),
			user.email,
			user.password,
			user.name
		);

		if (!newAccount) throw Error;

		const avatorUrl = avatars.getInitials(user.name);

		return newAccount;
	} catch (error) {
		console.log(error);
		return error;
	}
}
