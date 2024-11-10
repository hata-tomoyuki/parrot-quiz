import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";

import { useState } from "react";
import { About } from "./pages/About";
import { Chat } from "./pages/Chat";
import { Classic } from "./pages/Classic";
import { Country } from "./pages/Country";
import { Home } from "./pages/Home";
import { Quiz } from "./pages/Quiz";

function App() {
	const [menuOpen, setMenuOpen] = useState(false);
	const handleMenuOpen = () => {
		setMenuOpen(!menuOpen);
	};
	const handleMenuClose = () => {
		setMenuOpen(false);
	};

	return (
		<BrowserRouter>
			<div className="App mt-12 lg:mt-0">
				<div
					className={`sp_menu ${menuOpen && "open"}`}
					onClick={handleMenuOpen}
				>
					<span />
					<span />
					<span />
				</div>
				<header
					className={`header ${menuOpen && "open"} flex flex-col lg:flex-row fixed inset-0 bg-white w-screen h-screen lg:static lg:w-auto lg:h-auto justify-center gap-12 lg:py-4 z-50`}
				>
					<Link
						to="/"
						className="text-xl hover:text-green-900"
						onClick={handleMenuClose}
					>
						ホーム
					</Link>
					<Link
						to="/quiz"
						className="text-xl hover:text-green-900"
						onClick={handleMenuClose}
					>
						おうむ検定
					</Link>
					<Link
						to="/classic"
						className="text-xl hover:text-green-900"
						onClick={handleMenuClose}
					>
						おうむ検定（クラシック編）
					</Link>
					<Link
						to="/country"
						className="text-xl hover:text-green-900"
						onClick={handleMenuClose}
					>
						おうむ検定（国旗編）
					</Link>
					<Link
						to="/about"
						className="text-xl hover:text-green-900"
						onClick={handleMenuClose}
					>
						おうむ図鑑
					</Link>
					<Link
						to="/chat"
						className="text-xl hover:text-green-900"
						onClick={handleMenuClose}
					>
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
