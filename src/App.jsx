import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";

import { About } from "./components/About";
import { Home } from "./components/Home";
import { Quiz } from "./components/Quiz";

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<header className="flex justify-center gap-12 py-4">
					<Link to="/" className="text-2xl hover:text-gray-500">
						ホーム
					</Link>
					<Link to="/quiz" className="text-2xl hover:text-gray-500">
						オウムクイズ
					</Link>
					<Link to="/about" className="text-2xl hover:text-gray-500">
						オウム図鑑
					</Link>
				</header>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/quiz" element={<Quiz />} />
					<Route path="/about" element={<About />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
