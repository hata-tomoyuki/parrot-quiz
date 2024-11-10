import congaparrot from "../assets/images/parrot-images/standard/congaparrot.gif";
import quadparrot from "../assets/images/parrot-images/standard/quadparrot.gif";
import reversecongaparrot from "../assets/images/parrot-images/standard/reversecongaparrot.gif";
import { TopLink } from "../components/TopLink";

export const Home = () => {
	return (
		<div className="p-8">
			<h1 className="text-2xl md:text-6xl font-bold text-center bg-green-900 text-white lgw-fit mx-auto md:px-12 py-6 rounded-xl">
				目指せ！◯◯◯◯マスター
			</h1>
			<div className="mt-12">
				<div className="flex items-center justify-center mb-8">
					<img src={quadparrot} alt="quadparrot" className="h-12" />
					<h2 className="text-2xl md:text-5xl font-bold">おうむ検定</h2>
					<img src={quadparrot} alt="quadparrot" className="h-12" />
				</div>
				<ul className="flex flex-wrap items-center justify-center gap-8">
					<TopLink
						to="/quiz"
						title="おうむ検定"
						description="おうむ検定に挑戦できます。"
					/>
					<TopLink
						to="/classic"
						title="おうむ検定（クラシック編）"
						description="クラシックおうむ検定に挑戦できます。"
					/>
					<TopLink
						to="/country"
						title="おうむ検定（国旗編）"
						description="国旗おうむ検定に挑戦できます。"
					/>
				</ul>
			</div>
			<div className="mt-12">
				<div className="flex items-center justify-center mb-8">
					<img src={reversecongaparrot} alt="quadparrot" className="h-12" />
					<h2 className="text-2xl md:text-5xl font-bold">その他</h2>
					<img src={congaparrot} alt="quadparrot" className="h-12" />
				</div>
				<ul className="flex flex-wrap justify-center items-center gap-8">
					<TopLink
						to="/about"
						title="おうむ図鑑"
						description="おうむの種類を確認できます。"
					/>
					<TopLink
						to="/chat"
						title="おうむとおしゃべり"
						description="おうむとおしゃべりできます。"
					/>
				</ul>
			</div>
		</div>
	);
};
