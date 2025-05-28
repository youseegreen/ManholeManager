/**
 * マンホールDBをJsonにコンバートしてクライアントに送る
 * @return {string} json string
 */
function getManholeJson() {
    const sheet = getManholeDBPhotoSheet();
    const N = 13;  // シートの列数
    let json = [];    
    let i = 2;
    while (true){
        let row = sheet.getRange(i, 1, 1, N).getValues();
        if (row[0][0] == "END") break;

        var feature = {
              area: row[0][0], 
              prefecture: row[0][1], 
              city: row[0][2], 
              cityKana: row[0][3], 
              photoName: row[0][4], 
              date: row[0][5], 
              pokefuta: row[0][8], 
              chara: row[0][9], 
              color: row[0][10], 
              design: row[0][11], 
        };
        json.push(feature);

        i = i + 1;
    }

  // GeoJSONを文字列に変換
  var JSONString = JSON.stringify(json);
  return JSONString;

  // Google Driveに保存する場合
  var blob = Utilities.newBlob(JSONString, 'application/json', 'manholes.json');
  saveBlobAsFile(getPhotoFolder(), json_filename, blob);
}


/**
 * マンホールDBをGeojsonにコンバートしてクライアントに送る
 * @return {string} geojson string
 */
function getManholeGeojson() {
    const sheet = getManholeDBPhotoSheet();
    const N = 13;
    let geoJSON = {
        type: 'FeatureCollection', 
        features: []
    }
    let i = 2;
    while (true){
        let row = sheet.getRange(i, 1, 1, N).getValues();
        if (row[0][0] == "END") break;
        i = i + 1;

        if (row[0][6] == ""){
          row[0][7] = "0.0";  // 経度
          row[0][6] = "0.0";  // 緯度
        }

        var feature = {
            type: 'Feature',
            properties: {
              area: row[0][0], 
              prefecture: row[0][1], 
              city: row[0][2], 
              cityKana: row[0][3], 
              photoName: row[0][4], 
              date: row[0][5], 
              pokefuta: row[0][8], 
              chara: row[0][9], 
              color: row[0][10], 
              design: row[0][11], 
            },
            geometry: {
              type: 'Point',
              coordinates: [parseFloat(row[0][7]), parseFloat(row[0][6])] // スプレッドシート内のデータから座標を設定
            }
        };
        geoJSON.features.push(feature);
    }

  // GeoJSONを文字列に変換
  var geoJSONString = JSON.stringify(geoJSON);
  return geoJSONString;
}

