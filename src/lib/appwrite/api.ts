import { INewUser } from '@/types';
import { ID } from 'appwrite';
import { account, appwriteConfig, avatars, databases } from './config';

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

		const newUser = await saveUserToDB({
			accountId: newAccount.$id,
			name: newAccount.name,
			email: newAccount.email,
			username: user.username,
			imageUrl: avatorUrl,
		});

		return newUser;
	} catch (error) {
		console.log(error);
		return error;
	}
}

export async function saveUserToDB(user: {
	accountId: string;
	email: string;
	name: string;
	imageUrl: URL;
	username?: string;
}) {
	try {
		const newUser = await databases.createDocument(
			appwriteConfig.databaseId,
			appwriteConfig.usersCollectionId,
			ID.unique(),
			user
		);

		return newUser;
	} catch (error) {
		console.log(error);
	}
}

export async function signInAccount(user: { email: string; password: string }) {
	try {
		const session = await account.createSession(user.email, user.password);

		return session;
	} catch (error) {
		console.log(error);
	}
}
