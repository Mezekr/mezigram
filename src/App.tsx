import { Route, Routes } from 'react-router-dom';
import AuthLayout from './_auth/AuthLayout';
import SigninForm from './_auth/forms/SigninForm';
import SignupForm from './_auth/forms/SignupForm';
import { Home } from './_root/pages';
import RootLayout from './_root/RootLayout';
import './globals.css';

const App = () => {
	return (
		<main className="flex h-screen">
			<Routes>
				<Route>
					{/* public routes */}
					<Route element={<AuthLayout />}>
						<Route path="/" element={<SigninForm />} />
						<Route path="/" element={<SignupForm />} />
					</Route>

					{/* private routes */}
					<Route element={<RootLayout />}>
						<Route index element={<Home />} />
					</Route>
				</Route>
			</Routes>
		</main>
	);
};

export default App;
