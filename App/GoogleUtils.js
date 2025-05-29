/**
 * folderIdのフォルダを取得する
 * @return {Folder}  取得したFolder
 */
function getFolder(folderId){
  return DriveApp.getFolderById(folderId);
}


/**
 * tgtFolder内のfileNameという名前のファイルを取得する
 * @param {Folder} tgtFolder     対象のフォルダ（nullの場合はDrive全体）     
 * @param {string} fileName      取得したいファイル名
 * @param {Boolean} isFirstOne   最初のファイルだけを取得するかどうか
 * @return {Files or File or null}        
 */
function getTargetFilesInTargetFolder(tgtFolder, fileName, isFirstOne = true) {
  const files = (tgtFolder == null)? DriveApp.getFilesByName(fileName): tgtFolder.getFilesByName(fileName);
  if (!files.hasNext()) return null; 
  if (isFirstOne) return files.next();
  return files;
}


/**
 * fileNameファイルをImgUrl('data:image/jpeg;base64,/9j/...')に変換する
 * @param {string} tgtFolder  ファイル名が入っているフォルダ名 (nullならDrive全体)
 * @param {string} fileName   URLを取得したいファイル名
 * @return {string}           ファイルのURL
 */
function getImgUrlFromFileName(tgtFolder, fileName){
  var tgtFile = getTargetFilesInTargetFolder(tgtFolder, fileName, true);
  if (tgtFile == null) return null;
  var blob = tgtFile.getBlob();
  var photoData = Utilities.base64Encode(blob.getBytes());
  var contentType = blob.getContentType();
  return 'data:' + contentType + ';base64,' + photoData;
}


/**
 * fileNameファイルをbase64('data:image/jpeg;base64,/9j/...'の'/9/...'部分)に変換する
 * @param {string} fileName   URLを取得したいファイル名
 * @return {string}           ファイルのbase64
 */
function getBase64FromFilename(fileName){
  var tgtFile = getTargetFilesInTargetFolder(getPhotoFolder(), fileName, true);
  if (tgtFile == null) return null;
  var blob = tgtFile.getBlob();
  var photoData = Utilities.base64Encode(blob.getBytes());
  return photoData;
}


/**
 * tgtFolder内のfileNameという名前のファイルを削除する
 * @param {Folder} tgtFolder  対象のフォルダ
 * @param {string} fileName   削除したいファイル名
 * @return {Number}           削除したファイルの数
 */
function deleteTargetFileInTargetFolder(tgtFolder, fileName){
  let retVal = 0;
  if (tgtFolder == null) return retVal;  // Drive全体のファイルを削除するのは危険なので許可しない
  let files = getTargetFilesInTargetFolder(tgtFolder, fileName, false);
  while(files.hasNext()){
    let file = files.next();
    file.setTrashed(true);
    retVal = retVal + 1;
  }  
  return retVal;
}
  

/**
 * tgtFolderにBlobをFileとして保存する
 * @param {Folder} tgtFolder     保存先のフォルダ     
 * @param {string} saveFileName  保存したいファイル名
 * @param {Boolean} blob         保存するファイルのBlob
 * @return {string}              保存したファイルのURL       
 */
function saveBlobAsFile(tgtFolder, saveFileName, blob) {
  let savedFile = tgtFolder.createFile(blob);
  savedFile.setName(saveFileName);
  return savedFile.getUrl();
}


/**
 * imgUrl('data:image/jpeg;base64,/9j/...')のデータをfileNameの画像ファイルに変換する
 * @param {string}  imgUrl    画像ファイルに変換したいimgURLデータ
 * @param {string}  fileName  保存したい名前
 * @return {File}             画像ファイルのBlob
 */
function convertImgUrlToImgBlob(imgUrl, fileName){
  var bytes = Utilities.base64Decode(imgUrl.split(',')[1]);
  var blob = Utilities.newBlob(bytes, 'image/jpeg', fileName);
  return blob;
}

