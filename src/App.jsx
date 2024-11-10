import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";

import { About } from "./pages/About";
import { Chat } from "./pages/Chat";
import { Classic } from "./pages/Classic";
import { Country } from "./pages/Country";
import { Home } from "./pages/Home";
import { Quiz } from "./pages/Quiz";

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<header className="flex justify-center gap-12 py-4">
					<Link to="/" className="text-xl hover:text-green-900">
						ホーム
					</Link>
					<Link to="/quiz" className="text-xl hover:text-green-900">
						おうむ検定
					</Link>
					<Link to="/classic" className="text-xl hover:text-green-900">
						おうむ検定（クラシック編）
					</Link>
					<Link to="/country" className="text-xl hover:text-green-900">
						おうむ検定（国旗編）
					</Link>
					<Link to="/about" className="text-xl hover:text-green-900">
						おうむ図鑑
					</Link>
					<Link to="/chat" className="text-xl hover:text-green-900">
						おうむとおしゃべり
					</Link>
				</header>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/quiz" element={<Quiz />} />
					<Route path="/classic" element={<Classic />} />
					<Route path="/country" element={<Country />} />
					<Route path="/about" element={<About />} />
					<Route path="/chat" element={<Chat />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
