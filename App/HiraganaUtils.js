// FIXME : Global変数で持っておくか、関数内変数でもっておくか
const triTable = {
    'きゅう' : 'kyu','しゅう' : 'shu','ちゅう' : 'chu',
    'にゅう' : 'nyu','ひゅう' : 'hyu','みゅう' : 'myu','りゅう' : 'ryu', 
    'ぎゅう' : 'gyu','じゅう' : 'ju','ぢゅう' : 'dyu','びゅう' : 'byu','ぴゅう' : 'pyu',
    'きょう' : 'kyo','しょう' : 'sho','ちょう' : 'cho',
    'にょう' : 'nyo','ひょう' : 'hyo','みょう' : 'myo','りょう' : 'ryo',
    'ぎょう' : 'gyo','じょう' : 'jo','ぢょう' : 'dyo','びょう' : 'byo','ぴょう' : 'pyo',
    'う゛ぁ': 'va','う゛ぃ' : 'vi', 'う゛ぅ' : 'vu','う゛ぇ' : 've', 'う゛ぉ' : 'vo'
};

const biTable = {
    'ぎゃ' : 'gya','ぎゅ' : 'gyu','ぎょ' : 'gyo',
    'しゃ' : 'sha','しゅ' : 'shu','しょ' : 'sho',
    'くう' : 'ku','すう' : 'su','つう' : 'tsu','ぬう' : 'nu',
    'ふう' : 'fu','むう' : 'mu','ゆう' : 'yu','るう' : 'ru',
    'おお' : 'o','こお' : 'ko','そお' : 'so','とお' : 'to','のお' : 'no',
    'ほお' : 'ho','もお' : 'mo','よお' : 'yo','ろお' : 'ro',
    'こう' : 'ko','そう' : 'so','とう' : 'to','のう' : 'no',
    'ほう' : 'ho','もう' : 'mo','よう' : 'yo','ろう' : 'ro',
    'じぇ' : 'jie','ちぇ' : 'chie','てぃ' : 'tei','でぃ' : 'dei','でゅ' : 'deyu',
    'ふぁ' : 'fua','ふぃ' : 'fui','ふぇ' : 'fue','ふぉ' : 'fuo',
    'ヴぁ' : 'bua','ヴぃ' : 'bui','ヴ' : 'bu','ヴぇ' : 'bue','ヴぉ' : 'buo',
    'んば' : 'mba','んび' : 'mbi','んぶ' : 'mbu','んべ' : 'mbe','んぼ' : 'mbo',
    'んま' : 'mma','んみ' : 'mmi','んむ' : 'mmu','んめ' : 'mme','んも' : 'mmo',
    'んぱ' : 'mpa','んぴ' : 'mpi','んぷ' : 'mpu','んぺ' : 'mpe','んぽ' : 'mpo',        
    'きゃ' : 'kya','きゅ' : 'kyu','きょ' : 'kyo',
    'じゃ' : 'ja','じゅ' : 'ju','じょ' : 'jo',
    'ちゃ' : 'cha','ちゅ' : 'chu','ちょ' : 'cho',
    'ぢゃ' : 'dya','ぢゅ' : 'dyu','ぢょ' : 'dyo',
    'でゃ' : 'dha','でょ' : 'dho',
    'にゃ' : 'nya','にゅ' : 'nyu','にょ' : 'nyo',
    'ひゃ' : 'hya','ひゅ' : 'hyu','ひょ' : 'hyo',
    'びゃ' : 'bya','びゅ' : 'byu','びょ' : 'byo',
    'ぴゃ' : 'pya','ぴゅ' : 'pyu','ぴょ' : 'pyo',
    'みゃ' : 'mya','みゅ' : 'myu','みょ' : 'myo',
    'りゃ' : 'rya','りゅ' : 'ryu','りょ' : 'ryo',
    'てぁ' : 'tha','てぇ' : 'tee',
    'う゛' : 'vu','あ゛' : 'a"',
    'っか' : 'kka','っき' : 'kki','っく' : 'kku','っけ' : 'kke','っこ' : 'kko',
    'っさ' : 'ssa','っし' : 'sshi','っす' : 'ssu','っせ' : 'sse','っそ' : 'sso',
    'った' : 'tta','っち' : 'tchi','っつ' : 'ttu','って' : 'tte','っと' : 'tto',
    'っな' : 'nna','っに' : 'nni','っぬ' : 'nnu','っね' : 'nne','っの' : 'nno',
    'っは' : 'hha','っひ' : 'hhi','っふ' : 'ffu','っへ' : 'hhe','っほ' : 'hho',
    'っま' : 'mma','っみ' : 'mmi','っむ' : 'mmu','っめ' : 'mme','っも' : 'mmo',
    'っや' : 'yya', 'っゆ' : 'yyu','っよ' : 'yyo',
    'っら' : 'rra','っり' : 'rri','っる' : 'rru','っれ' : 'rre','っろ' : 'rro',
    'っわ' : 'wwa',
    'っが' : 'gga','っぎ' : 'ggi','っぐ' : 'ggu','っげ' : 'gge','っご' : 'ggo',
    'っざ' : 'zza','っじ' : 'jji','っず' : 'zzu','っぜ' : 'zze','っぞ' : 'zzo',
    'っだ' : 'dda','っぢ' : 'ddi','っづ' : 'ddu','っで' : 'dde','っど' : 'ddo',
    'っば' : 'bba','っび' : 'bbi','っぶ' : 'bbu','っべ' : 'bbe','っぼ' : 'bbo',
    'っぱ' : 'ppa','っぴ' : 'ppi','っぷ' : 'ppu','っぺ' : 'ppe','っぽ' : 'ppo'
};

const uniTable = {
    'あ' : 'a','い' : 'i' ,'う' : 'u','え' : 'e','お' : 'o',
    'か' : 'ka','き' : 'ki','く' : 'ku','け' : 'ke','こ' : 'ko',
    'さ' : 'sa','し' : 'shi','す' : 'su','せ' : 'se','そ' : 'so',
    'た' : 'ta','ち' : 'chi','つ' : 'tsu','て' : 'te','と' : 'to',
    'な' : 'na','に' : 'ni','ぬ' : 'nu','ね' : 'ne','の' : 'no',
    'は' : 'ha','ひ' : 'hi','ふ' : 'fu','へ' : 'he','ほ' : 'ho',
    'ま' : 'ma','み' : 'mi','む' : 'mu','め' : 'me','も' : 'mo',
    'や' : 'ya','ゆ' : 'yu','よ' : 'yo',
    'ら' : 'ra','り' : 'ri','る' : 'ru','れ' : 're','ろ' : 'ro',
    'わ' : 'wa','を' : 'wo','ん' : 'n',
    'が' : 'ga','ぎ' : 'gi','ぐ' : 'gu','げ' : 'ge','ご' : 'go',
    'ざ' : 'za','じ' : 'ji','ず' : 'zu','ぜ' : 'ze','ぞ' : 'zo',
    'だ' : 'da','ぢ' : 'ji','づ' : 'zu','で' : 'de','ど' : 'do',
    'ば' : 'ba','び' : 'bi','ぶ' : 'bu','べ' : 'be','ぼ' : 'bo',
    'ぱ' : 'pa','ぴ' : 'pi','ぷ' : 'pu','ぺ' : 'pe','ぽ' : 'po',
    'ぁ' : 'xa','ぃ' : 'xi','ぅ' : 'xu','ぇ' : 'xe','ぉ' : 'xo',
    '（' : '_', '）' : '', '、' : '_'
};


 /**
 * ひらがなをヘボン式ローマ字に変換する
 * @param {string} hiraganaText   ひらがな
 * @return {string}               ローマ字
 */
 function hiraganaToRomaji(hiraganaText) {
    var arrayedString = hiraganaText.split('');
    var value = '';

    if(triTable[hiraganaText] !== undefined){
        return triTable[hiraganaText];
    } else if(biTable[hiraganaText] !== undefined) {
        return biTable[hiraganaText];
    }

    var biCheck = new Object();
    for (var k in biTable){
        var tmp = k.split('');
        biCheck[tmp[0]] = true;
    }

    var triCheck = new Object();
    for (var tk in triTable){
        var tmp = tk.split('');
        triCheck[tmp[0] + tmp[1]] = true;
        biCheck[tmp[0]] = true; 
    }


    var buf = '';
    for(var i = 0; i < arrayedString.length ; i++){
        var str = arrayedString[i];
        buf += str;

        var A = -1;

        if(buf.length == 3){
            if(triTable[buf] !== undefined){
                value += triTable[buf];
                buf = '';
                A = 1;
            } else {
                tmp = buf.split('');
                value += biTable[tmp[0] + tmp[1]];
                if(biCheck[tmp[2]] !== undefined){                
                  buf = tmp[2];
                }
                else {
                  value += uniTable[tmp[2]] === undefined ? tmp[2] : uniTable[tmp[2]]
                  buf = '';
                }
                A = 2;
            }
        } 
        else if(buf.length == 2) {
            if(triCheck[buf] !== undefined) { 
                A = 3;
            } 
            else if(biTable[buf] !== undefined) {
                value += biTable[buf];
                buf = '';
                A = 4;
            } else {
                tmp = buf.split('');
                value += uniTable[tmp[0]]; 
                if(biCheck[tmp[1]] !== undefined){
                  buf = ''; 
                  buf += tmp[1];
                  A = 6;
                }else{
                  value += uniTable[tmp[1]] === undefined ? tmp[1] : uniTable[tmp[1]]; 
                  buf = '';                    
                  A = 5;
                }
            }  
        } 
        else if(biCheck[buf] !== undefined){
                  A = 7;
        } 
        else { 
                value += uniTable[str] === undefined ? str : uniTable[str];
                buf = '';
                  A = 8;
        }

        // console.log("%d, %s, %d, %s, %s", i, str, A, buf, value);
    }

    value += buf !== '' ? uniTable[buf] : '';

    value = value.replace(/([aiueo])ー/gi,'$1');
    return value;
}


/**
 * 2個のひらがなの順序を比較する
 * @param {string} kana1  比較したいひらがな1
 * @param {string} kana2  比較したいひらがな2
 * @return {Number}  比較結果
 *  0 : kana1とkana2は同じ
 * -1 : kana1の方が前に来る
 * +1 : kana2の方が前に来る
 */
function compareHiraganas(kana1, kana2) {
  // ひらがな文字を正規化
  function normalizeKana(kana) {
    return kana.replace(/[\u3041-\u3096]/g, function(match) {
      return String.fromCharCode(match.charCodeAt(0) + 0x60);
    });
  }

  kana1 = normalizeKana(kana1);
  kana2 = normalizeKana(kana2);
  if (kana1 < kana2) return -1;
  if (kana2 < kana1) return 1;
  return 0;
}


/**
 * 日付文字列を数値に変換する
 * @param {string} dateStr  日付文字列
 * @return {Number}  日付の数値（1970年1月1日からのミリ秒数）
 */
function dateStrToNumber(dateStr) {
  dateStr = dateStr.replace(/:/g, '.');
  if (dateStr.length > 10) dateStr = dateStr.substr(0, 10);
  var dateObject = new Date(dateStr);
  var dateNumber = dateObject.getTime();
  return dateNumber;
}

