/**
 * マンホール管理アプリのユーティリティ
 */


// マンホール写真フォルダの暗号化ID
// const ENCRYPTED_PHOTO_FOLDER_ID = 'U2FsdGVkX1/1iIPWCU0on73PHtuXZ5lk0X1W3lLSn9rZvfGhp3cKFXRYv/HH2uUBuISdxWuPWWx23wHL6KRUeg==';
// 開発用
const ENCRYPTED_PHOTO_FOLDER_ID = 'U2FsdGVkX1/5HsO0hGy87kcdGbkU4trM+uCq6xQo5RUzyeWXAxQnE5FiXs8VYgMXUcujgQBD9ktS2QXOzt7d4A==';

// マンホールDBスプレッドシートの暗号化ID
// const ENCRYPTED_MANHOLEDB_SPREADSHEET_ID = 'U2FsdGVkX1/735YOpBucrfeQADhG65NQeze79wPhOlMBkAej2DhLCpj1BG0ep+3PYw2Cl1+qg+eCkvll/uT8bg==';
// 開発用
const ENCRYPTED_MANHOLEDB_SPREADSHEET_ID = 'U2FsdGVkX194VDMvv7vcFiJn8O1Td8PGsb6zvRcF4L1/E2mr+z1LTP9ePKJ4bQqrogGvxi6iqyfz594UtZT0aA==';

// 市町村シートの名前
const CITY_SHEET = 'city';

// 写真シートの名前
const PHOTO_SHEET = 'photo';

// マンホールDBの定数
const AREAS = ["北海道地方", "東北地方", "関東地方", "中部地方", "近畿地方", "中国地方", "四国地方", "九州地方", "その他"];
const PREFECTURES = {
    "北海道地方": ["北海道"], 
    "東北地方": ["青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県"], 
    "関東地方": ["茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県"], 
    "中部地方": ["新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県", "静岡県", "愛知県"], 
    "近畿地方": ["三重県", "滋賀県", "京都府", "大阪府", "兵庫県", "奈良県", "和歌山県"], 
    "中国地方": ["鳥取県", "島根県", "岡山県", "広島県", "山口県"], 
    "四国地方": ["徳島県", "香川県", "愛媛県", "高知県"], 
    "九州地方": ["福岡県", "長崎県", "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"], 
    "その他": ["中国", "アメリカ", "韓国", "フィリピン", "タイ", "シンガポール", "インド", "イギリス", "オランダ", "台湾", "フランス"]  // FIXME
};


/**
 * マンホール写真フォルダを取得する
 * @return {Folder}  取得したFolder
 */
function getPhotoFolder(){
  return getFolder(CipherDecrypt(ENCRYPTED_PHOTO_FOLDER_ID));
}


/**
 * マンホールDBスプレッドシートを取得する
 * @return {Spreadsheet}  取得したSpreadsheet
 */
function getManholeDBSpreadsheet(){
  return SpreadsheetApp.openById(CipherDecrypt(ENCRYPTED_MANHOLEDB_SPREADSHEET_ID));
}


/**
 * マンホールDBスプレッドシートのCityシートを取得する
 * @return {Sheet}  取得したSheet
 */
function getManholeDBCitySheet(){
  return getManholeDBSpreadsheet().getSheetByName(CITY_SHEET);
}


/**
* マンホールDBスプレッドシートのPhotoシートを取得する
* @return {Sheet}  取得したSheet
*/
function getManholeDBPhotoSheet(){
  return getManholeDBSpreadsheet().getSheetByName(PHOTO_SHEET);
}


/**
 * 画像BlobをPhotoフォルダに画像ファイルとして保存する
 * @param  {string} photoBlob  添付した画像ファイル
 * @param  {string} saveFileName   保存する名前
 * @return {string}  保存したファイルのURLを返す。ファイルが存在しない場合はnullを返す
 */
function saveManholePhotoToPhotoFolder(photoBlob, saveFileName) {
  return saveBlobAsFile(getPhotoFolder(), saveFileName, photoBlob);
}


/**
 * 写真フォルダからfileName画像ファイルのUrlを取得する
 * @return {Spreadsheet}  取得したSpreadsheet
 */
function getPhotoUrlFromFileName(fileName){
  return getImgUrlFromFileName(getPhotoFolder(), fileName);
}


/**
 * Photoフォルダ内のfileNameという画像ファイルを削除する
 * @param {string} fileName   削除したいファイル名
 * @return {Number}           削除したファイルの枚数
*/
function deletePhotoFile(fileName){
  return deleteTargetFileInTargetFolder(getPhotoFolder(), fileName);
}


/**
 * マンホールDBのCitySheetの指定した行に対象の市町村を登録する
 * @param {string} rowIndex        挿入する行番号（ヘッダー=1を含む）
 * @param {string} tgtArea         対象の地方
 * @param {string} tgtPrefecture   対象の都道府県
 * @param {string} tgtCity         対象の市町村
 * @param {string} tgtCityKana     対象の市町村のひらがな
 * @return {Boolean}               挿入できたか否か
 */
function registTargetCityToCitySheet(rowIndex, tgtArea, tgtPrefecture, tgtCity, tgtCityKana){
  var citySheet = getManholeDBCitySheet();
  citySheet.insertRowBefore(rowIndex);
  // FIXME  更新日時を入れるか否か
  citySheet.getRange(rowIndex, 1, 1, 4).setValues([[tgtArea, tgtPrefecture, tgtCity, tgtCityKana]]);
}


/**
* マンホールDBのCitySheetの指定した行を対象の市町村で上書きする
* @param {string} rowIndex        編集する行番号（ヘッダー=1を含む）
* @param {string} tgtArea         対象の地方
* @param {string} tgtPrefecture   対象の都道府県
* @param {string} tgtCity         対象の市町村
* @param {string} tgtCityKana     対象の市町村のひらがな
* @return {Boolean}               編集できたか否か
*/
function editTargetCityInCitySheet(rowIndex, tgtArea, tgtPrefecture, tgtCity, tgtCityKana){
  var citySheet = getManholeDBCitySheet();
  citySheet.getRange(rowIndex, 1, 1, 4).setValues([[tgtArea, tgtPrefecture, tgtCity, tgtCityKana]]);
}


/**
 * マンホールDBのCitySheetの指定した行を削除する
 * @param {string} rowIndex      削除する行番号（ヘッダー=1を含む）
 * @return {Boolean}             削除できたか否か
 */
function removeTargetCityFromCitySheet(rowIndex){
  var citySheet = getManholeDBCitySheet();
  citySheet.deleteRow(rowIndex);
}


/**
* マンホールDBのPhotoSheetの指定した行に対象の市町村を登録する
* @param {string} rowIndex           挿入する行番号（ヘッダー=1を含む）
* @param {Array.String} insertData   [地方,都道府県, 市町村, 市町村のひらがな, 写真のファイル名, 撮影日時 
* @return {Boolean}                  挿入できたか否か
*/
function registTargetCityToPhotoSheet(rowIndex, insertData){
  var photoSheet = getManholeDBPhotoSheet();
  photoSheet.insertRowBefore(rowIndex);
  photoSheet.getRange(rowIndex, 1, 1, insertData.length).setValues([insertData]);
}


/**
 * マンホールDBのPhotoSheetの指定した行に対象の市町村を上書きする
 * @param {string} rowIndex           編集する行番号（ヘッダー=1を含む）
 * @param {Array.String} insertData   [地方,都道府県, 市町村, 市町村のひらがな, 写真のファイル名, 撮影日時 
 * @return {Boolean}                  編集できたか否か
 */
function editTargetCityInPhotoSheet(rowIndex, insertData){
  var photoSheet = getManholeDBPhotoSheet();
  photoSheet.getRange(rowIndex, 1, 1, insertData.length).setValues([insertData]);
}


/**
* マンホールDBのPhotoSheetの指定した行を削除する
* @param {string} rowIndex   削除する行番号（ヘッダー=1を含む）
* @return {Boolean}          削除できたか否か
*/
function removeTargetCityFromPhotoSheet(rowIndex){
  var photoSheet = getManholeDBPhotoSheet();
  photoSheet.deleteRow(rowIndex);
}


/**
 * マンホールDBの[Target]Sheetに検索対象の市町村が存在するか、またその場所を探す
 * @param {string} tgt_sheet       検索対象のシート　City or Photo
 * @param {string} tgt_area        対象の地方
 * @param {string} tgt_prefecture  対象の都道府県
 * @param {string} tgt_city        対象の市町村
 * @param {string} tgt_city_kana   対象の市町村のひらがな
 * @return {Number}  検索結果
 * Number > 0 : シートのNumberの行に対象の市町村が存在する
 * Number < 0 : 検索対象の市町村は本来(-Number)の行に存在すべきだが、存在しない
 * Number = 0 : その他のエラー
 */
function isExistTargetCityInTargetSheet(tgt_sheet, tgt_area, tgt_prefecture, tgt_city, tgt_city_kana){

    if (tgt_sheet != CITY_SHEET && tgt_sheet != PHOTO_SHEET) {
        console.log("検索対象のシート名,%s,がおかしい", tgt_sheet);
        return 0;
    }
    const tgt_area_idx = AREAS.indexOf(tgt_area);
    if (tgt_area_idx < 0) {
      console.log("検索対象の地方,%s,が定数に含まれていない", tgt_area);
      return 0;
    }
    const tgt_prefecture_idx = PREFECTURES[tgt_area].indexOf(tgt_prefecture);
    if (tgt_prefecture_idx < 0) {
      console.log("検索対象の都道府県,%s,が定数に含まれていない", tgt_prefecture);
      return 0;
    }

    const sheet = getManholeDBSpreadsheet().getSheetByName(tgt_sheet);        
    // FIXME    
    const A = 0;  // areaの列番号
    const P = 1;  // prefectureの列番号
    const K = 3;  // city_kanaの列番号
    const range = sheet.getRange(1, 1, sheet.getLastRow(), 4);  // headerも含んでいる
    const values = range.getValues();

    let i = 1;
    // 対象の地方まで飛ばす  values[i][0] : area
    while (1) {
        if (values[i] === undefined) {
          console.log("DBを一通り見たが検出できなかったA");
          return 0;
        }
        var cidx = AREAS.indexOf(values[i][0]);
        if (cidx >= tgt_area_idx) break;
        i = i + 1;
    }
    // 対象の都道府県まで飛ばす  values[i][1] : prefecture
    while (1) {
        if (values[i] === undefined) {
          console.log("DBを一通り見たが検出できなかったP");
          return 0;
        }
        var cidx = PREFECTURES[tgt_area].indexOf(values[i][1]);
        if (cidx >= tgt_prefecture_idx || cidx == -1) break;
        i = i + 1;
    }
    // 対象の市があるかを確認   values[i][3] : city_kana
    while (1) {
        if (values[i] === undefined) return 0;
        if (values[i][1] !== tgt_prefecture) return -(i + 1);
        var compResult = compareHiraganas(tgt_city_kana, values[i][3]);
        if (compResult == 0) {  // 対象の市があった
            return (i + 1);
        } 
        else if (compResult == -1){  // 対象の市がなかった
            return -(i + 1);
        }
        i = i + 1;
    }
    return 0;
}


/**
 * 検索対象の市町村の写真が何枚存在するかを取得する
 * @param {string} tgt_area        対象の地方
 * @param {string} tgt_prefecture  対象の都道府県
 * @param {string} tgt_city        対象の市町村
 * @param {string} tgt_city_kana   対象の市町村のひらがな
 * @return {Number}                対象の市町村の写真枚数
 */
function getPhotoNumsOfTargetCity(tgt_area, tgt_prefecture, tgt_city, tgt_city_kana){

    let retVal = 0;   // 戻り値（写真の枚数）
    let i = 1;        // 現在着目しているSheetの行番号

    var photoSheet = getManholeDBPhotoSheet();
    var range = photoSheet .getRange(1, 1, photoSheet.getLastRow(), 4);  // headerも含んでいる
    var values = range.getValues();

    var tgt_area_idx = AREAS.indexOf(tgt_area);
    if (tgt_area_idx < 0) return retVal;  // tgt_areaがDBに存在しない
    var tgt_prefecture_idx = PREFECTURES[tgt_area].indexOf(tgt_prefecture);
    if (tgt_prefecture_idx < 0) return retVal;  // tgt_preferenceがDBに存在しない

    // 対象の地方まで飛ばす  values[i][0] : area
    while (1) {
        if (values[i] === undefined) return retVal;
        var cidx = AREAS.indexOf(values[i][0]);
        if (cidx >= tgt_area_idx) break;
        i = i + 1;
    }
    // 対象の都道府県まで飛ばす  values[i][1] : prefecture
    while (1) {
        if (values[i] === undefined) return retVal;
        var cidx = PREFECTURES[tgt_area].indexOf(values[i][1]);
        if (cidx >= tgt_prefecture_idx) break;
        i = i + 1;
    }
    // 対象の市があるかを確認   values[i][3] : city_kana
    while (1) {
        if (values[i] === undefined) return retVal;
        if (values[i][1] !== tgt_prefecture) return retVal;
        if (tgt_city_kana === values[i][3]) retVal = retVal + 1;
        i = i + 1;
    }
    return retVal;
}

