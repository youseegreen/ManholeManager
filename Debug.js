
function test(){
    console.log(isExistTargetCity('近畿地方', '三重県', '伊勢市', 'いせし'));
    console.log(isExistTargetCity('近畿地方', '三重県', '四日市市', 'よっかいちし'));
}


function test2(){
    console.log(hiraganaToRomaji('ちゅうぶでんりょく'));
}

function test3(){
    var citySheet = getManholeDBSpreadsheet().getSheetByName(PHOTO_SHEET);
    var range = citySheet.getRange(2, 4, citySheet.getLastRow() - 1, 2);  
    var values = range.getValues();
    var i = 0;
    while (1){
      if (values[i] === undefined) break;
      var kana = values[i][0];
      var roma = values[i][1];
      roma = roma.substr(0, roma.length - 6);
      kana = hiraganaToRomaji(kana);
      if (roma !== kana){
        if (kana.substr(kana.length - 3, 3) !== 'cho')
          console.log("%s, %s", roma, kana);
      }
      i = i + 1;
      if (values[i] === undefined) console.log(roma);
    }
    console.log(i);
}

function test4(){
    console.log(compareHiraganas('ひがしおおさかし', 'ひかしおおさかし'));  
    console.log(compareHiraganas('さが', 'さ'));
    console.log(compareHiraganas('さが', 'さか'));
    console.log(compareHiraganas('さが', 'さき'));
    console.log(compareHiraganas('ひ', 'よ'));
}

function test5(){
    console.log(isExistTargetCityInCitySheet('近畿地方', '大阪府', '東大阪市', 'ひがしおおさかし'));
    console.log(isExistTargetCityInCitySheet('近畿地方', '大阪府', '大和市', 'やまとし'));
    console.log(isExistTargetCityInCitySheet('東北地方', '青森県', '八戸市', 'はちのへし'));
    console.log(isExistTargetCityInCitySheet('北海道地方', '北海道', '愛知市', 'あいちし'));
    console.log(isExistTargetCityInCitySheet('その他', '中国', 'わし', 'わし'));
    console.log(isExistTargetCityInCitySheet('ほげし', 'あ', 'い', 'う'));
    console.log(isExistTargetCityInCitySheet('九州地方', '沖縄県', 'わん', 'わん'));

}


function test6(){
    // console.log(registTargetCityToCitySheet(151, '近畿地方', '大阪府', '大和市', 'やまとし'));
    // console.log(registTargetCityToCitySheet(151, '近畿地方', '大阪府', '大和市', 'やまとし'));
    // console.log(registTargetCityToCitySheet(151, '近畿地方', '大阪府', '大和市', 'やまとし'));
    // console.log(editTargetCityInCitySheet(151, '近畿地方', '大阪府', 'やまとし', 'やまとし'));
    // console.log(removeTargetCityFromCitySheet(153));
}

function test7(){
  // console.log(searchManholes([], ['大阪府', '奈良県'], '', ''));
  // console.log(searchManholes([], [], '', ''));
  console.log(searchManholes([], [], '2022.12.31', '2023.12.1'));
}

function test8(){
  console.log(registerManhole("その他", "中国", "阿寒湖", "あかんこ", "2019:08:25 11:12:48", null));
}


function test9(){
  var imgUrl = 'data:image/jpeg;base64,/9j/4QbIRXhpZgAATU0AKgAAAAgADwALAAIAAAAmAAAAwgEAAAQAAAABAAAMwAEBAAQAAAABAAAJkAECAAMAAAADAAAA6AEOAAIAAAAEbWRlAAEPAAIAAAAHAAAA7gEQAAIAAAAJAAAA9QESAAMAAAABAAEAAAEaAAUAAAABAAAA/gEbAAUAAAABAAABBgEoAAMAAAABAAIAAAExAAIAAAAmAAABDgEyAAIAAAAUAAABNAITAAMAAAABAAEAAIdpAAQAAAABAAABSAAAA/NXaW5kb3dzIFBob3RvIEVkaXRvciAxMC4wLjEwMDExLjE2Mzg0AAAIAAgACEhVQVdFSQBXQVMtTFgySgAAAABIAAAAAQAAAEgAAAABV2luZG93cyBQaG90byBFZGl0b3IgMTAuMC4xMDAxMS4xNjM4NAAyMDIwOjAyOjA0IDE4OjE3OjI5AAAmgpoABQAAAAEAAAMSgp0ABQAAAAEAAAMaiCIAAwAAAAEAAgAAiCcAAwAAAAEMgAAAkAAABwAAAAQwMjEwkAMAAgAAABQAAAMikAQAAgAAABQAAAM2kQEABwAAAAQBAgMAkgEACgAAAAEAAANKkgIABQAAAAEAAANSkgMACgAAAAEAAANakgQACgAAAAEAAANikgcAAwAAAAEABQAAkggAAwAAAAEAAQAAkgkAAwAAAAEAAAAAkgoABQAAAAEAAANqknwABwAAAGQAAANykpAAAgAAAAcAAAPWkpEAAgAAAAcAAAPdkpIAAgAAAAcAAAPkoAAABwAAAAQwMTAwoAEAAwAAAAEAAQAAoAIABAAAAAEAAAzAoAMABAAAAAEAAAmQohcAAwAAAAEAAgAAowAABwAAAAEDAAAAowEABwAAAAEBAAAApAEAAwAAAAEAAQAApAIAAwAAAAEAAAAApAMAAwAAAAEAAAAApAQABQAAAAEAAAPrpAUAAwAAAAEAGgAApAYAAwAAAAEAAAAApAcAAwAAAAEAAAAApAgAAwAAAAEAAAAApAkAAwAAAAEAAAAApAoAAwAAAAEAAAAApAwAAwAAAAEAAAAABCwdgDuaygAAAADcAAAAZDIwMTc6MDg6MTUgMjM6MzM6MjkAMjAxNzowODoxNSAyMzozMzoyOQAABI/dAAAnEAAAAOMAAABkAAAAAAAAAAEAAAAAAAAACgAADvYAAAPoIyMjIwoAAABBxjMBCIABAAAAAAAAAAAAAAAAAAQAAACsDQAA/////////////////////////////////////////////////////////////////////////////////////zI1MTkxOAAyNTE5MTgAMjUxOTE4AAAAAGQAAABkAAYBAwADAAAAAQAGAAABGgAFAAAAAQAABEEBGwAFAAAAAQAABEkBKAADAAAAAQACAAACAQAEAAAAAQAABFECAgAEAAAAAQAAAm8AAAAAAAAAYAAAAAEAAABgAAAAAf/Y/9sAQwAIBgYHBgUIBwcHCQkICgwUDQwLCwwZEhMPFB0aHx4dGhwcICQuJyAiLCMcHCg3KSwwMTQ0NB8nOT04MjwuMzQy/9sAQwEJCQkMCwwYDQ0YMiEcITIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIy/8AAEQgAEAAKAwEhAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A85JpuRWJ1Ewh/vUzy/agD//Z/+AAEEpGSUYAAQEAAAEAAQAA/+IB2ElDQ19QUk9GSUxFAAEBAAAByAAAAAAEMAAAbW50clJHQiBYWVogB+AAAQABAAAAAAAAYWNzcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAPbWAAEAAAAA0y0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJZGVzYwAAAPAAAAAkclhZWgAAARQAAAAUZ1hZWgAAASgAAAAUYlhZWgAAATwAAAAUd3RwdAAAAVAAAAAUclRSQwAAAWQAAAAoZ1RSQwAAAWQAAAAoYlRSQwAAAWQAAAAoY3BydAAAAYwAAAA8bWx1YwAAAAAAAAABAAAADGVuVVMAAAAIAAAAHABzAFIARwBCWFlaIAAAAAAAAG+iAAA49QAAA5BYWVogAAAAAAAAYpkAALeFAAAY2lhZWiAAAAAAAAAkoAAAD4QAALbPWFlaIAAAAAAAAPbWAAEAAAAA0y1wYXJhAAAAAAAEAAAAAmZmAADypwAADVkAABPQAAAKWwAAAAAAAAAAbWx1YwAAAAAAAAABAAAADGVuVVMAAAAgAAAAHABHAG8AbwBnAGwAZQAgAEkAbgBjAC4AIAAyADAAMQA2/9sAQwADAgICAgIDAgICAwMDAwQGBAQEBAQIBgYFBgkICgoJCAkJCgwPDAoLDgsJCQ0RDQ4PEBAREAoMEhMSEBMPEBAQ/9sAQwEDAwMEAwQIBAQIEAsJCxAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQ/8AAEQgACAAIAwEiAAIRAQMRAf/EABUAAQEAAAAAAAAAAAAAAAAAAAAI/8QAGRAAAwEBAQAAAAAAAAAAAAAAAAECA1GB/8QAFAEBAAAAAAAAAAAAAAAAAAAABf/EABURAQEAAAAAAAAAAAAAAAAAAAAB/9oADAMBAAIRAxEAPwCQqz2tNzPvAAGH4//Z';
  var photoBlob = convertImgURL2ImgBlob(imgUrl, "hoge.jpg");
  addManholePhotoToPhotoFolder(photoBlob, "hoge.jpg");
}


// GPSをDMS形式（jpeg写真のEXIF）からDEG形式（GoogleMap）に変換する
function test10(){
  var h = 34;
  var m = 43;
  var s = 14.4076000000;
  var r = h + m / 60 + s / 3600;
  console.log(r);
  var h = 134;
  var m = 53;
  var s = 17.5705999;
  var r = h + m / 60 + s / 3600;
  console.log(r);
}


function test11(){
  console.log(getTargetRowManholeInfo(10));
}


function test12(){
  var folder = DriveApp.getFolderById(CipherDecrypt(ENCRYPTED_PHOTO_FOLDER_ID));
  // ファイル名からファイルを検索
  var files = folder.getFilesByName("choshishi02.jpg")
  // ファイルが見つかった場合、最初のファイルを取得
  while(files.hasNext()){
    let file = files.next();
    console.log(file.getName());
  }  
}


function test13(){
  console.log(isExistTargetCityInTargetSheet(CITY_SHEET, "中国地方", "山口県", "てすとし", "てすとし"));
  console.log(isExistTargetCityInTargetSheet(PHOTO_SHEET, "その他", "アメリカ", "てすとし", "てすとし"));
}

