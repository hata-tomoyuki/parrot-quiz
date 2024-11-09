import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";

import { About } from "./pages/About";
import { Country } from "./pages/Country";
import { Home } from "./pages/Home";
import { Quiz } from "./pages/Quiz";

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<header className="flex justify-center gap-12 py-4">
					<Link to="/" className="text-2xl">
						ホーム
					</Link>
					<Link to="/quiz" className="text-2xl">
						オウム検定
					</Link>
					<Link to="/country" className="text-2xl">
						国旗クイズ
					</Link>
					<Link to="/about" className="text-2xl">
						オウム図鑑
					</Link>
				</header>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/quiz" element={<Quiz />} />
					<Route path="/country" element={<Country />} />
					<Route path="/about" element={<About />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
