import quadparrot from "../assets/images/parrot-images/quadparrot.gif";
import { TopLink } from "./TopLink";

export const Home = () => {
	return (
		<div className="p-8">
			<h1 className="text-6xl font-bold text-center">目指せ！◯◯◯◯マスター</h1>
			<ul className="flex flex-col items-center gap-8 mt-16">
				<TopLink
					to="/quiz"
					title="オウム検定"
					description="オウム検定に挑戦できます。"
				/>
				<TopLink
					to="/about"
					title="オウム図鑑"
					description="オウムの種類を確認することができます。"
				/>
			</ul>
			<img src={quadparrot} alt="quadparrot" className="w-64 mx-auto" />
		</div>
	);
};
