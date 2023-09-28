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

