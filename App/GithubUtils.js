// Github設定
const GITHUB_REPOSITORY_NAME = "youseegreen/youseegreen.github.io";
const GITHUB_BRANCH_NAME = "develop";
const GITHUB_GEOJSON_DIR = "src/data/";
const GITHUB_GEOJSON_FILENAME = "manholes.geojson";
const GITHUB_PHOTO_DIR = "src/images/galleries/manholes/";


/**
 * 前回からの差分ファイルを取得してGithubを更新する
 */
function AutoUpdateGithub() {
  // 変更があったファイル名を取得する
  const fileNames = GetDiffFileNamesFromGithubList();

  if (fileNames.length > 0) {
    // 変更が1個以上ある場合はGithubに追加する
    if (UpdateGithub(fileNames)) {
      // Githubにファイル追加成功 → Diff Filesを削除する
      ClearGithubList();
    }
    else {
      Logger.log("UpdateGithubで失敗しました");
    }
  }
  else {
      Logger.log("追加ファイルは登録されていません");
  }
}


/**
 * fileNameをPropertyのDIFF_FILESに追加する
 */
function PushFileNameToGithubList(fileName) {
  const diffFilesStr = PropertiesService.getScriptProperties().getProperty("DIFF_FILES");
  PropertiesService.getScriptProperties().setProperty("DIFF_FILES", diffFilesStr + fileName);
}


/**
 * PropertyのDIFF_FILESから、変更があった写真ファイル名のリストを取得する
 * @return {Array}  ["osakashi00.jpg", "narashi00.jpg"]
 */
function GetDiffFileNamesFromGithubList() {
  let diffFilesStr = PropertiesService.getScriptProperties().getProperty("DIFF_FILES");
  return [...diffFilesStr.matchAll(/.*?\.jpg/g)].map(m => m[0]);  // .jpgごとに区切る
}


/**
 * PropertyのDIFF_FILESをクリアする
 */
function ClearGithubList() {
  PropertiesService.getScriptProperties().setProperty("DIFF_FILES", "");
}


/**
 * Githubに写真とGeojsonを追加する
 * @param {Array} fileNames   Githubに追加する写真のファイル名のリスト（["osakashi00.jpg", "narashi00.jpg"]等）
 */
function UpdateGithub(fileNames) {
  var contents = []

  // geojsonの情報をpush
  var geojsonValue = getManholeGeojson();
  if (geojsonValue == null) {
    Logger.log("getManholeGeojsonが機能していません");
    return false;
  } 
  contents.push({
    "name": GITHUB_GEOJSON_FILENAME, 
    "dir": GITHUB_GEOJSON_DIR, 
    "encoding": "utf-8", 
    "value": geojsonValue, 
  })

  // 写真ファイルの情報をpush
  for (var i = 0; i < fileNames.length; i++) {
    var photoValue = getBase64FromFilename(fileNames[i]);
    if (photoValue == null) {
      Logger.log(fileNames[i] + "がnullです");
      return false;
    } 
    contents.push({
      "name": fileNames[i], 
      "dir": GITHUB_PHOTO_DIR,
      "encoding": "base64", 
      "value": photoValue,
    })
  }

  doCommit(contents);
  return true;
}


// 以下、https://github.com/OR-Sasaki/MasterdataPresenter/blob/main/masterdata_presenter.gsを流用させていただきました。
/*!
 * MasterPresenter
 *
 * Copyright (c) 2023 OR-Sasaki
 *
 * Released under the MIT license.
 * see https://opensource.org/licenses/MIT
 */

// ================== GitHub =======================
function doCommit(contents)
{
  var refSha = getRefSha();
  var parentCommit = getCommit(refSha);
  var blobContents = [];
  contents.forEach(function(content){
    var blobContent = {
      "name": content["name"],
      "dir": content["dir"],
      "blobSha": getBlobSha(content["value"], content["encoding"])
    };
    blobContents.push(blobContent);
  });
  
  var tree = createTree(parentCommit["tree"]["sha"], blobContents);
  var createdCommit = createCommit(parentCommit["sha"], tree["sha"]);
  var ref = updateRef(createdCommit["sha"]);
}

function getRefSha()
{
  var requestUrl = GITHUB_URL_BASE + "git/refs/heads/" + GITHUB_BRANCH_NAME;
  var sha = fetchGet(requestUrl)["object"]["sha"];
  Logger.log("getRefSha: " + sha);
  return sha;
}

function getCommit(sha)
{
  var requestUrl = GITHUB_URL_BASE + "git/commits/" + sha;
  var commit = fetchGet(requestUrl);
  Logger.log("getCommit: " + commit);
  return commit;
}

function getBlobSha(content, encoding)
{
  var requestUrl = GITHUB_URL_BASE + "git/blobs";
  var payload = { "content": content, "encoding": encoding };
  var blob = fetchPost(requestUrl, payload);
  var sha = blob["sha"];
  Logger.log("getBlobSha: " + sha);
  return sha;
}

function createTree(treeSha, contents)
{
  var requestUrl = GITHUB_URL_BASE + "git/trees";
  var payload = {
    "base_tree": treeSha,
    "tree": []
  };
  contents.forEach(function (content) {
    payload["tree"].push(
      {
        "path": content["dir"] + content["name"],
        "mode": "100644",
        "type": "blob",
        "sha": content["blobSha"]
      }
    );
  });

  var tree = fetchPost(requestUrl, payload);
  Logger.log("createTree: " + tree);
  return tree;
}

function createCommit(parentCommitSha, treeSha)
{
  var requestUrl = GITHUB_URL_BASE + "git/commits";
  var userEmail = Session.getActiveUser().getEmail();
  var payload = {
    "message": "Add new manhole photos / " + Utilities.formatDate(new Date(), 'JST', 'yyyy-MM-dd  HH:mm:ss'),
    "author": {
      "name": userEmail,
      "email": userEmail,
      "date": Date.now
    },
    "parents": [
      parentCommitSha
    ],
    "tree": treeSha
  };
  var commit = fetchPost(requestUrl, payload);
  Logger.log("createCommit: " + commit);
  return commit;
}

function updateRef(commitSha)
{
  var requestUrl = GITHUB_URL_BASE + "git/refs/heads/" + GITHUB_BRANCH_NAME;
  var payload = {
    "sha": commitSha,
    "force": false
  };
  var ref = fetchPost(requestUrl, payload);
  Logger.log("updateRef: " + ref);
  return ref;
}


// ================== API Base =======================

const GITHUB_URL_BASE = "https://api.github.com/repos/" + GITHUB_REPOSITORY_NAME + "/";
const GITHUB_TOKEN = PropertiesService.getScriptProperties().getProperty("GITHUB_TOKEN");
const GITHUB_HEADERS = {
  "Accept": "application/vnd.github+json",
  "Authorization": "Bearer " + GITHUB_TOKEN
};

function fetchGet(requestUrl)
{
  var requestOptions = {
    "method": "get",
    "headers": GITHUB_HEADERS
  };

  var response = UrlFetchApp.fetch(requestUrl, requestOptions);
  var contentText = response.getContentText();
  Logger.log(">>>>>>>[GET]【" + requestUrl + "】 "+ contentText);
  return JSON.parse(contentText);
}

function fetchPost(requestUrl, payload = {})
{
  var requestOptions = {
    "method": "post",
    "headers": GITHUB_HEADERS,
    "payload": JSON.stringify(payload),
    "Content-Type": "application/json"
  };

  var response = UrlFetchApp.fetch(requestUrl, requestOptions);
  var contentText = response.getContentText();
  Logger.log(">>>>>>>[POST]【" + requestUrl + "】 " + contentText);
  return JSON.parse(contentText);
}
