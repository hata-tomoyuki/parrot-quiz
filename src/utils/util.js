import axios from "axios";

/**
 * base64をBlobに変換する関数
 * @param {string} base64Data - base64データ
 * @param {string} contentType - コンテントタイプ
 * @returns {Blob} - Blob
 */
export const base64ToBlob = (base64Data, contentType) => {
	const byteCharacters = atob(base64Data);
	const byteArrays = [];

	for (let offset = 0; offset < byteCharacters.length; offset += 512) {
		const slice = byteCharacters.slice(offset, offset + 512);

		const byteNumbers = new Array(slice.length);
		for (let i = 0; i < slice.length; i++) {
			byteNumbers[i] = slice.charCodeAt(i);
		}

		const byteArray = new Uint8Array(byteNumbers);
		byteArrays.push(byteArray);
	}

	const blob = new Blob(byteArrays, { type: contentType });
	return blob;
};

/**
 * 画像のパスからファイル名（拡張子を除く）を抽出する関数
 * @param {string} path - 画像のパス
 * @returns {string|null} - ファイル名（拡張子を除く）またはnull
 */
export const getImageName = (path) => {
	if (typeof path !== "string") {
		throw new TypeError("path must be a string");
	}
	const match = path.match(/\/([^\/]+)\.[^\/]+$/);
	if (match) {
		// 不要な文字列を削除
		return match[1].replace(/\.[0-9a-f]{32}$/, "");
	}
	return null;
};

/**
 * 環境変数から取得したAPIキーとエンドポイントを使用して、
 * 指定されたメッセージをOpenAI APIに送信します。
 *
 * @param {Array<Object>} messages - APIに送信するメッセージの配列。
 * 各メッセージは、`role`と`content`を含むオブジェクトです。
 * 例: [{ role: "user", content: "こんにちは" }]
 *
 * @returns {Promise<Object>} - APIからのレスポンスを含むPromise。
 * レスポンスは通常、`data`プロパティに含まれています。
 */
export const postToAPI = async (messages) => {
	try {
		const response = await axios.post(
			process.env.REACT_APP_OPENAI_ENDPOINT,
			{
				model: "gpt-4o-mini",
				messages,
			},
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
				},
			},
		);
		return response.data;
	} catch (error) {
		console.error("Error posting to API:", error);
		throw error;
	}
};

/**
 * テキストを解析し、感情スコアを計算します。
 * @param {string} text - 解析するテキスト。
 * @returns {Promise<Object>} - 感情スコアを含むオブジェクト。
 */
export const scoring = async (text) => {
	const parts = text.split(" ");
	let happy = 0;
	let anger = 0;
	let sadness = 0;
	let joy = 0;

	for (let i = 0; i < parts.length; i += 2) {
		const keyword = parts[i];
		const value = Number.parseFloat(parts[i + 1]);

		if (keyword === "喜") {
			happy = value;
		} else if (keyword === "怒") {
			anger = value;
		} else if (keyword === "哀") {
			sadness = value;
		} else if (keyword === "楽") {
			joy = value;
		}
	}

	return { happy, anger, sadness, joy };
};
