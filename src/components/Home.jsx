import { TopLink } from "./TopLink";
import quadparrot from '../assets/images/parrot-images/quadparrot.gif'

export const Home = () => {
    return (
        <div className="p-8">
            <h1 className="text-6xl font-bold text-center">目指せ！◯◯◯◯マスター</h1>
            <ul className="flex flex-col items-center gap-8 mt-16">
                <TopLink to="/quiz" title="オウムクイズ" description="オウムの種類を確認することができます。" />
                <TopLink to="/about" title="オウム図鑑" description="オウムの種類を確認することができます。" />
            </ul>
            <img src={quadparrot} alt="quadparrot" className="w-64 mx-auto" />
        </div>
    );
};

