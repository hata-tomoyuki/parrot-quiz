import { getImageName } from "../utils/util";

const importAll = (r) =>
	r.keys().map((key) => {
		const image = r(key);
		return {
			default: image.default,
			name: getImageName(key),
		};
	});

const images = importAll(
	require.context(
		"../assets/images/parrot-images/standard/",
		false,
		/\.(gif|jpe?g|tiff|png|webp|bmp)$/,
	),
);

const imagesCountries = importAll(
	require.context(
		"../assets/images/parrot-images/countries/",
		false,
		/\.(gif|jpe?g|tiff|png|webp|bmp)$/,
	),
);


const imagesClassic = importAll(
	require.context(
		"../assets/images/parrot-images/classic/",
		false,
		/\.(gif|jpe?g|tiff|png|webp|bmp)$/,
	),
);

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
	return images.find((image) => {
		const imageName = image.name;
		return imageName?.includes(answer);
	});
};

const getCorrectImageCountry = (answer) => {
	return imagesCountries.find((image) => {
		const imageName = image.name;
		return imageName?.includes(answer);
	});
};

const getCorrectImageClassic = (answer) => {
	return imagesClassic.find((image) => {
		const imageName = image.name;
		return imageName?.includes(answer);
	});
};

// 正解の画像を含む選択肢を生成する関数
const generateOptions = (answer) => {
	const correctImage = getCorrectImage(answer);
	const otherImages = images.filter((image) => {
		const imageName = image.name;
		return imageName && !imageName.includes(answer);
	});
	const shuffledOtherImages = shuffleArray([...otherImages]).slice(0, 3);
	return shuffleArray([correctImage, ...shuffledOtherImages]);
};

const generateOptionsCountry = (answer) => {
	const correctImage = getCorrectImageCountry(answer);
	const otherImages = imagesCountries.filter((image) => {
		const imageName = image.name;
		return imageName && !imageName.includes(answer);
	});
	const shuffledOtherImages = shuffleArray([...otherImages]).slice(0, 3);
	return shuffleArray([correctImage, ...shuffledOtherImages]);
};

const generateOptionsClassic = (answer) => {
	const correctImage = getCorrectImageClassic(answer);
	const otherImages = imagesClassic.filter((image) => {
		const imageName = image.name;
		return imageName && !imageName.includes(answer);
	});
	const shuffledOtherImages = shuffleArray([...otherImages]).slice(0, 3);
	return shuffleArray([correctImage, ...shuffledOtherImages]);
};

// クイズデータを生成する関数
const generateQuizData = () => {
	const quizData = images.map((image) => {
		const answer = image.name;
		return {
			question: `${answer} はどれですか?`,
			options: generateOptions(answer),
			answer: answer,
		};
	});
	return shuffleArray(quizData); // クイズデータをシャッフル
};

const generateCountriesQuizData = () => {
	const quizData = imagesCountries.map((image) => {
		const answer = image.name;
		return {
			question: `${answer} はどれですか?`,
			options: generateOptionsCountry(answer),
			answer: answer,
		};
	});
	return shuffleArray(quizData); // クイズデータをシャッフル
};

const generateClassicQuizData = () => {
	const quizData = imagesClassic.map((image) => {
		const answer = image.name;
		return {
			question: `${answer} はどれですか?`,
			options: generateOptionsClassic(answer),
			answer: answer,
		};
	});
	return shuffleArray(quizData); // クイズデータをシャッフル
};

const ranks = [
	{ display: "論外", system: "ロンガイ" },
	{ display: "素人", system: "シロウト" },
	{ display: "おうむ検定４級", system: "おうむケンテイヨンキュウ" },
	{ display: "おうむ検定３級", system: "おうむケンテイサンキュウ" },
	{ display: "おうむ検定２級", system: "おうむケンテイニキュウ" },
	{ display: "おうむ検定準１級", system: "おうむケンテイジュンイッキュウ" },
	{ display: "おうむ検定１級", system: "おうむケンテイイッキュウ" },
	{ display: "おうむマスター", system: "おうむマスター" },
];

export {
	generateQuizData,
	generateCountriesQuizData,
	generateClassicQuizData,
	ranks,
	images,
	imagesCountries,
	imagesClassic,
};
