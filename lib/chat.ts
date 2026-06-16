// NGワード(禁止ワード)の解析・マスク処理ユーティリティ

// 改行・カンマ・読点区切りの文字列をワード配列へ変換する
export const parseBlockedWords = (raw: string | null | undefined): string[] => {
  if (!raw) return [];

  return raw
    .split(/[\n,、]/)
    .map((word) => word.trim())
    .filter((word) => word.length > 0);
};

// 正規表現の特殊文字をエスケープする
const escapeRegExp = (value: string) => {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

// メッセージ内のNGワードを伏字(***)へ置き換える
export const maskBlockedWords = (
  message: string,
  blockedWords: string[]
): string => {
  if (blockedWords.length === 0) return message;

  let result = message;

  for (const word of blockedWords) {
    if (!word) continue;

    const pattern = new RegExp(escapeRegExp(word), "gi");
    result = result.replace(pattern, "***");
  }

  return result;
};
