import Loader from '@/components/shared/Loader';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useUserContext } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import {
	useCreateUserAccount,
	useSignInAccount,
} from '@/lib/react-query/queriesAndMutations';
import { SignupValidation } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';

const SignupForm = () => {
	// const isLoading = false;
	const { toast } = useToast();
	const navigate = useNavigate();
	const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

	//call the create new Account react query Mutation hook
	const { mutateAsync: createUserAccount, isPending: isCreatingAccount } =
		useCreateUserAccount();

	//call the sign in Account react query Mutation hook
	const { mutateAsync: signInAccount, isPending: isSigningInUser } =
		useSignInAccount();

	// Define your form.
	const form = useForm<z.infer<typeof SignupValidation>>({
		resolver: zodResolver(SignupValidation),
		defaultValues: {
			name: '',
			username: '',
			email: '',
			password: '',
		},
	});

	// Define a submit handler.
	async function onSubmit(user: z.infer<typeof SignupValidation>) {
		// create a new account with the form values.
		// ✅ This will be type-safe and validated.
		const newUser = await createUserAccount(user);
		console.log('Sign-up Form New User ' + user);
		if (!newUser) {
			toast({ title: 'Sign up failed. Please try again' });
			return;
		}

		const session = await signInAccount({
			email: user.email,
			password: user.password,
		});

		if (!session) {
			return toast({
				title: 'Something went wrong. Please login your new account',
			});
		}

		const isLoggedIn = await checkAuthUser();

		if (isLoggedIn) {
			form.reset();
			navigate('/');
		} else {
			toast({ title: 'Login failed. Please try again.' });
			return;
		}
	}
	return (
		<Form {...form}>
			<div className="sm:w-420 flex-center flex-col">
				<img src="/assets/images/logo.svg" />
				<h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
					Create a new account
				</h2>
				<p className="text-light-3 small-medium md:base-regular mt-2">
					To use Mezigram please enter your details
				</p>

				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className=" flex flex-col gap-5 w-full  mt-4"
				>
					{/* Name input field */}
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input
										type="text"
										className="shad-input"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Username input field */}
					<FormField
						control={form.control}
						name="username"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input
										type="text"
										className="shad-input"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{/* Email input field */}
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										type="email"
										className="shad-input"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{/* Password input field */}
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										type="password"
										className="shad-input"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit" className="shad-button_primary">
						{isCreatingAccount ||
						isSigningInUser ||
						isUserLoading ? (
							<div className="flex-center gap-2">
								<Loader />
								loading...
							</div>
						) : (
							'Sign up'
						)}
					</Button>

					<p className="text-small-regular text-light-2 text-center mt-2">
						Already have an account?
						<Link
							to="/sign-in"
							className="text-primary-500 text-small-semibold ml-2"
						>
							Login
						</Link>
					</p>
				</form>
			</div>
		</Form>
	);
};

export default SignupForm;
