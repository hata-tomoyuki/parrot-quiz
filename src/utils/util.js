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
