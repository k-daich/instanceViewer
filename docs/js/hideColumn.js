/**
 * メイン
 */
hideColumnEventListener();

/**
 * 以降、ファンクション
 */
function hideColumnEventListener() {
    // イベントリスナー付与対象の要素を取得する
    var elements = document.getElementById('dynamicTable').getElementsByClassName('hidableColumn');

    // マウスが要素内で押されたとき発火
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener("dblclick", dblclicked, false);
    }
}

/**
 * ダブルクリックされた際の関数
 */
function dblclicked(event) {
    // 親ノードのイベントリスナーの着火を無効化する
    event.stopPropagation();
    // クリックされた要素から最も近いth祖先タグを取得する
    var thEle = this.closest("th");
    // ローカルストレージ'hiddenColumns'に追加
    addHiddenLocalStorage(thEle.textContent);
    // .hidden を追加する
    hideColumn();
    // キャッシュを利用してリロード
    window.location.reload(false);
}

function addHiddenLocalStorage(storageKey) {
    var locStrgString = localStorage.getItem(STORAGE_KEY_HIDDEN_COULUMNS);
    if (locStrgString) {
        localStorage.setItem(STORAGE_KEY_HIDDEN_COULUMNS, locStrgString + ',' + storageKey);
    } else {
        localStorage.setItem(STORAGE_KEY_HIDDEN_COULUMNS, storageKey);
    }
}

/**
 * 
 * 
 */
function hideColumn() {

}


/**
 * ログUtil
 */
function logging(processName, message) {
    console.log('[' + processName + '] ' + message);
}