/**
 * URLからテキストを抽出する関数
 * @param {string|object} url - 画像のURLまたはオブジェクト
 * @returns {string|null} - 抽出されたテキスト
 */
export const extractTextFromUrl = (url) => {
    const path = typeof url === 'string' ? url : url.default;
    const match = path.match(/\/([^\/]+)\.[^\/]+\.gif$/);
    return match ? match[1] : null;
};

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
}


