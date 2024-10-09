import { INewUser } from '@/types';
import {
	useInfiniteQuery,
	useMutation,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query';
import { createUserAccount } from '../appwrite/api';

export const useCreateUserAccount = () => {
	return useMutation({
		mutationFn: (user: INewUser) => createUserAccount(user),
	});
};
