const importAll = (r) => r.keys()
    .filter(key => !key.includes('rythmicalparrot.gif'))
    .map(r)
    .filter(image => !image.default.startsWith('data:image/gif;base64'));
const images = importAll(require.context('../assets/images/parrot-images/', false, /\.(gif|jpe?g|tiff|png|webp|bmp)$/));

// 画像名部分（拡張子除く）を取得する関数
const getImageName = (path) => {
    if (typeof path !== 'string') {
        throw new TypeError('path must be a string');
    }
    const match = path.match(/\/([^\/]+)\.[^\/]+$/);
    if (match) {
        // 不要な文字列を削除
        return match[1].replace(/\.[0-9a-f]{32}$/, '');
    }
    return null;
};

// 配列をランダムにシャッフルする関数
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

// 正解の画像を取得する関数
const getCorrectImage = (answer) => {
    return images.find(image => {
        const imageName = getImageName(image.default);
        return imageName && imageName.includes(answer);
    });
};

// 正解の画像を含む選択肢を生成する関数
const generateOptions = (answer) => {
    const correctImage = getCorrectImage(answer);
    const otherImages = images.filter(image => {
        const imageName = getImageName(image.default);
        return imageName && !imageName.includes(answer);
    });
    const shuffledOtherImages = shuffleArray([...otherImages]).slice(0, 3);
    return shuffleArray([correctImage, ...shuffledOtherImages]);
};

// クイズデータを生成する関数
const generateQuizData = () => {
    const quizData = images.map(image => {
        const answer = getImageName(image.default);
        return {
            question: `${answer} はどれですか?`,
            options: generateOptions(answer),
            answer: answer,
        };
    });
    return shuffleArray(quizData); // クイズデータをシャッフル
}

export const quizData = generateQuizData();
