import { Route, Routes } from 'react-router-dom';
import './globals.css';

const App = () => {
	return (
		<main className="flex h-screen">
			<Routes>
				<Route>
					{/* public routes */}
					<Route path="/" element={<SigninForm />} />

					{/* private routes */}
					<Route index element={<Home />} />
				</Route>
			</Routes>
		</main>
	);
};

export default App;
