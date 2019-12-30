/**
 * メイン
 */
rightUpCrossEventListener();

/**
 * 以降、ファンクション
 */
function rightUpCrossEventListener() {
    // イベントリスナー付与対象の要素を取得する
    var elements = document.getElementById('dynamicTable').getElementsByTagName('td');

    // マウスが要素内で押されたとき発火
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener("dblclick", dblclicked, false);
    }
}

/**
 * ダブルクリックされた際の関数
 */
function dblclicked(event) {
    // TODO:スタイルの初期化
    logging('', event.target);

    // TODO:スタイルの変更
    var position = getPosition(event.target.id);
    // クラス名に .tg_dbcl を追加する
    this.classList.add("rightUpCenter");

}

function getPosition(id) {
    logging('', id);
    var posYX = id.split(':');
    var position = new Object();
    position.row = Number(posYX[0]);
    position.column = Number(posYX[1]);
    return position;
}

/**
 * ログUtil
 */
function logging(processName, message) {
    console.log('[' + processName + '] ' + message);
}