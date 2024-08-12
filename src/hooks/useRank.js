import { ranks } from '../const/data';

const useRank = () => {
    const getRank = (correctCount, totalQuestions) => {
        const percentage = (correctCount / totalQuestions) * 100;
        if (correctCount === totalQuestions) {
            return ranks.find(rank => rank.display === "おうむマスター");
        } else if (correctCount <= 10) {
            return ranks.find(rank => rank.display === "素人");
        } else if (percentage >= 90) {
            return ranks.find(rank => rank.display === "おうむ検定１級");
        } else if (percentage >= 80) {
            return ranks.find(rank => rank.display === "おうむ検定準１級");
        } else if (percentage >= 70) {
            return ranks.find(rank => rank.display === "おうむ検定２級");
        } else if (percentage >= 60) {
            return ranks.find(rank => rank.display === "おうむ検定３級");
        } else if (percentage >= 50) {
            return ranks.find(rank => rank.display === "おうむ検定４級");
        } else {
            return ranks.find(rank => rank.display === "素人");
        }
    };

    return { getRank };
};

export default useRank;
