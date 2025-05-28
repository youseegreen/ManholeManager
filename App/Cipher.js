/**
 * messageを暗号化する
 * @param {string} message 暗号化する文字列
 * @return {string} 暗号化された結果の文字列
 */
function CipherEncrypt(message) {
  var pass_ = PropertiesService.getScriptProperties().getProperty('CIPHER_KEY');
  var algo_ = 'AES';
  if (!pass_) {
    throw 'パスワードを入力してください';
  }
  return CryptoJS[algo_].encrypt(message, pass_).toString();
}


/**
 * messageを復号化する
 * @param {string} message 復号化する文字列
 * @return {string} 復号化された結果の文字列
 */
function CipherDecrypt(encryptedMessage) {
  var pass_ = PropertiesService.getScriptProperties().getProperty('CIPHER_KEY');
  var algo_ = 'AES';
  if (!pass_) {
    throw 'パスワードを入力してください';
  }
  return CryptoJS[algo_].decrypt(encryptedMessage, pass_).toString(CryptoJS.enc.Utf8);
}


/**
 * アクセス権限があるユーザかを判別する
 * @param {string} password_blob 実行権限パスワード（blob形式)
 * @return {bool} アクセス権限の有無
 */
function checkAccessPermission(password_blob) {
    const now = Date.now();  // 現在のミリ秒時刻
    const lastAccessTimeStr = PropertiesService.getScriptProperties().getProperty("LAST_ACCESS_TIME");
    const lastAccessTime = lastAccessTimeStr ? Number(lastAccessTimeStr) : 0;
    // 直近5分以内に正しい投稿があった場合はスルーする。
    if (now - 5 * 60 * 1000 > lastAccessTime) {
        const dec = Utilities.base64Decode(password_blob, Utilities.Charset.UTF_8);
        const password = Utilities.newBlob(dec).getDataAsString();
        const correctPassword = PropertiesService.getScriptProperties().getProperty("PASSWORD");
        if (password !== correctPassword) {
            return false;
        }
        // 認証成功 → アクセスタイム更新
        PropertiesService.getScriptProperties().setProperty("LAST_ACCESS_TIME", String(now));
    }
    return true;
}
