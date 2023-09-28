// exec（公開版）
// https://script.google.com/macros/s/AKfycbyQJPfeqoNTVCU5KKDHykwmYwlbHkpxBxXXxvIQ_dR5f7ledPHABlJYvrJ0KAmkjpr0/exec 
// dev（開発版）
// https://script.google.com/macros/s/AKfycbzdCKy4oLzGPjyGH5nwrJg8E4B18kblkYhCsCVLnNg/dev


/**
 * HTTPのGETに対して応答する
 *     パラメータpで指定したregister/remover/editorのページに遷移する
 * @param {Event Objects} リクエストパラメータに関する情報
 * @return {HtmlOutput Object} 表示するhtmlオブジェクト
 */
function doGet(e){
    return HtmlService.createTemplateFromFile('Public/html/register.html').evaluate().setTitle('Manhole register').setFaviconUrl('https://github.com/youseegreen/youseegreen.github.io/blob/develop/src/images/logos/youseegreen.ico');
}
  

/**
 * *.htmlから他のhtmlを読み込む
 * @param  {string} filename includeしたいhtmlファイルのファイル名
 * @return {string}          指定したファイルからHtmlOutputオブジェクトを作成し，
 *     そのHtmlOutputオブジェクトのコンテンツを文字列として返す
 */
function include(filename) {
    return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
