import { Account, Avatars, Client, Databases, Storage } from 'appwrite';

export const appwriteConfig = {
	projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
	projectUrl: import.meta.env.VITE_APPWRITE_PROJECT_URL,
};

export const client = new Client();

client.setProject(appwriteConfig.projectId);
client.setEndpoint(appwriteConfig.projectUrl);

export const account = new Account(client);
export const database = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
