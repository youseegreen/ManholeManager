/**
 * 新しいマンホールをマンホールDBに登録する
 * @param {string} area          地方
 * @param {string} prefecture    都道府県
 * @param {string} city          市町村
 * @param {string} city_kana     市町村のひらがな
 * @param {string} date          撮影日時
 * @param {string} latitude      緯度（DMS）
 * @param {string} longitude     経度（DMS）
 * @param {Boolean} pokefuta     ポケふたかどうか
 * @param {Boolean} chara        キャラものかどうか
 * @param {Boolean} color        カラーかどうか
 * @param {Boolean} designed     デザインものかどうか
 * @param {Boolean} reliability  データに信頼性があるかどうか
 * @param {string} photoURL      写真（'data:image/jpeg;base64,/...'形式）
 */
function registerManhole(area, prefecture, city, city_kana, date, latitude, longitude, 
    pokefuta, chara, color, designed, reliability, photoURL){
    // CitySheetに市町村が登録されているか確認する    
    var index = isExistTargetCityInTargetSheet(CITY_SHEET, area, prefecture, city, city_kana);
    
    // 登録されていない場合は、登録する
    if (index < 0) registTargetCityToCitySheet(-index, area, prefecture, city, city_kana);

    // PhotoSheetに登録する
    var index = isExistTargetCityInTargetSheet(PHOTO_SHEET, area, prefecture, city, city_kana);
    var num = getPhotoNumsOfTargetCity(area, prefecture, city, city_kana);
    // 挿入する場所
    var inserIndex = (index < 0)? -index: index + num;  
    // ファイル名
    var fileName = `${hiraganaToRomaji(city_kana)}${num.toString().padStart(2, '0')}.jpg`;

    registTargetCityToPhotoSheet(inserIndex, [area, prefecture, city, city_kana, fileName, 
        date, latitude, longitude, pokefuta, chara, color, designed, reliability]);
    var photoBlob = convertImgUrlToImgBlob(photoURL, fileName);
    saveManholePhotoToPhotoFolder(photoBlob, fileName);
}


/**
 * マンホールDBに登録されている写真や撮影日時の情報を編集する
 * @param {string} rowIndex     編集するデータベースの行番号
 * @param {string} area          地方
 * @param {string} prefecture    都道府県
 * @param {string} city          市町村
 * @param {string} city_kana     市町村のひらがな
 * @param {string} fileName      保存する写真の名前
 * @param {string} date          撮影日時
 * @param {string} latitude      緯度（DMS）
 * @param {string} longitude     経度（DMS）
 * @param {Boolean} pokefuta     ポケふたかどうか
 * @param {Boolean} chara        キャラものかどうか
 * @param {Boolean} color        カラーかどうか
 * @param {Boolean} designed     デザインものかどうか
 * @param {Boolean} reliability  データに信頼性があるかどうか
 * @param {string} photoURL      写真（'data:image/jpeg;base64,/...'形式）
 */
function editManhole(rowIndex, area, prefecture, city, city_kana, fileName, date, latitude, longitude, 
    pokefuta, chara, color, designed, reliability, photoURL){
    editTargetCityInPhotoSheet(rowIndex, [area, prefecture, city, city_kana, fileName, 
        date, latitude, longitude, pokefuta, chara, color, designed, reliability]);
    // fileNameの写真を削除する
    deletePhotoFile(fileName);
    var photoBlob = convertImgUrlToImgBlob(photoURL, fileName);
    saveManholePhotoToPhotoFolder(photoBlob, fileName);
}


/**
 * マンホールDBに登録されている写真や撮影日時の情報を削除する
 * @param {string} rowIndex      削除するデータベースの行番号
 * @param {string} fileName      削除する写真の名前
*/
function removeManhole(rowIndex, fileName){
    removeTargetCityFromPhotoSheet(rowIndex);
    deletePhotoFile(fileName);
}


/**
 * 指定した行番号のマンホール情報をクライアント側に送る
 * @param {Number} rowIndex     編集するデータベースの行番号
 * @return {JSON} 
 */
function getTargetRowManholeInfo(rowIndex){
    const retVal = {};
    const columnNum = 13;
    const photoSheet = getManholeDBPhotoSheet();
    const data = photoSheet.getRange(rowIndex, 1, 1, columnNum).getValues()[0];
    retVal["area"] = data[0];
    retVal["prefecture"] = data[1];
    retVal["city"] = data[2];
    retVal["cityHiragana"] = data[3];
    retVal["fileName"] = data[4];
    retVal["date"] = data[5];
    retVal["latitude"] = data[6];
    retVal["longitude"] = data[7];
    retVal["pokefuta"] = data[8];
    retVal["color"] = data[9];
    retVal["designed"] = data[10];
    retVal["chara"] = data[11];
    retVal["reliability"] = data[12];
    retVal["photoURL"] = getPhotoUrlFromFileName(data[4]);
    return retVal;
}


/**
 * マンホールDBから検索対象に合致するマンホールデータの行番号を抜き出す
 * 1個だけを探す関数よりもめっちゃ低速であることに注意
 * where表現を使ったら高速で探索できるらしいのでFIXME
 * @param {Array.<string>} areas        地方  ['北海道地方', '九州地方'], [] など
 * @param {Array.<string>} prefectures  都道府県  [], ['大阪府', '東京都'] など
 * @param {string} startDate            撮影日時  '2020.01', '' など  
 * @param {string} endDate              撮影日時  '2023.12', '' など
 * @param {Number} color                色付き  0 : 指定しない, 1 : 色付きのみ, 2 : 色なしのみ
 * @param {Number} pokefuta             ポケふた  0 : 指定しない, 1 : ポケふたのみ, 2 : ポケふたなしのみ
 * @param {Number} chara                キャラもの  0 : 指定しない, 1 : キャラもののみ, 2 : キャラものなしのみ
 * @param {Number} design               デザインがある 0 : 指定しない, 1 : デザインありのみ, 2 : デザインなしのみ
 * @return {Array.<Number>}             行番号の配列
 */
function searchManholes(areas, prefectures, startDate, endDate, color = 0, pokefuta = 0, chara = 0, design = 0){
    
    let candPref = [];
    if (areas.length == 0) areas = [...AREAS];
    if (prefectures.length == 0) areas.forEach(a => { candPref = candPref.concat(PREFECTURES[a]); });
    else candPref = [...prefectures];
    const startDateNum = (startDate.length == 0)? dateStrToNumber('1970.01.01'): dateStrToNumber(startDate);
    const endDateNum = (endDate.length == 0)? dateStrToNumber('2060.12.31'): dateStrToNumber(endDate);

    const sheet = getManholeDBPhotoSheet();
    const range = sheet.getRange(1, 1, sheet.getLastRow(), 6);  // headerも含んでいる
    const values = range.getValues();
    const retVal = [];

    for (let i = 1; i < sheet.getLastRow(); i++) {
        if (!candPref.includes(values[i][1])) continue;
        // FIXME
        var cdate = (values[i][5] == 'NULL')? dateStrToNumber('2023.01.01'): dateStrToNumber(values[i][5]);
        if (startDateNum > cdate || cdate > endDateNum) continue;
        retVal.push(i + 1);
    }
    return retVal;
}

