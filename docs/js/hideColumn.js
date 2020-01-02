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
    // .hidden を追加する
    // thEle.classList.add("hidden");
    addHiddenLocalStorage(thEle.textContent);
    // キャッシュを利用してリロード
    window.location.reload(false);
}

function addHiddenLocalStorage(storageKey) {
    var locStrgString = localStorage.getItem('hiddenTableKeys');
    logging('storageKey', storageKey);
    logging('locStrgString', locStrgString);
    if (locStrgString) {
        logging('locStrgString + , + storageKey', locStrgString + ',' + storageKey);
        localStorage.setItem('hiddenTableKeys', locStrgString + ',' + storageKey);
    } else {
        logging('storageKey', storageKey);
        localStorage.setItem('hiddenTableKeys', storageKey);
    }
}

/**
 * 指定されたキー名のローカルストレージを取得する
 * ※無い場合は空文字を返す
 */
function getLocalStorageAsArray(storageKey) {
    var locStrgString = localStorage.getItem(storageKey);
    console.log('[getLocalStorageAsArray] ' + storageKey + ' : ' + locStrgString);
    // ローカルストレージに値が有る場合 : カンマ区切りで配列化して返す
    // ローカルストレージに値が無い場合 : 空文字で返す
    return (locStrgString) ? locStrgString.split(',') : '';
}

/**
 * ログUtil
 */
function logging(processName, message) {
    console.log('[' + processName + '] ' + message);
}