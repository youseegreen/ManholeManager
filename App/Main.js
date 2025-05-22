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
  var page=e.parameter["p"];
  var index=e.parameter["i"];

  if(page == "register" || page==null) {
    return HtmlService.createTemplateFromFile('Public/html/register.html').evaluate().setTitle('Manhole register').setFaviconUrl('https://github.com/youseegreen/youseegreen.github.io/blob/develop/src/images/logos/youseegreen.ico').setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);    
  }
  else if(page == "editor") {
    var template = HtmlService.createTemplateFromFile('Public/html/editor.html');
    template.index = index;
    return template.evaluate().setTitle('Manhole editor').setFaviconUrl('https://github.com/youseegreen/youseegreen.github.io/blob/develop/src/images/logos/youseegreen.ico').setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }
  else if(page == "remover") {
    var template = HtmlService.createTemplateFromFile('Public/html/remover.html');
    template.index = index;
    return template.evaluate().setTitle('Manhole remover').setFaviconUrl('https://github.com/youseegreen/youseegreen.github.io/blob/develop/src/images/logos/youseegreen.ico').setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }
  else if(page == "downloader") {
    var template = HtmlService.createTemplateFromFile('Public/html/downloader.html');
    return template.evaluate().setTitle('Manhole Downloader').setFaviconUrl('https://github.com/youseegreen/youseegreen.github.io/blob/develop/src/images/logos/youseegreen.ico').setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }
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


function getAppUrl() {
  return ScriptApp.getService().getUrl();
}
