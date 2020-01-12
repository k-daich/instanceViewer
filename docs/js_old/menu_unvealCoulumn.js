/**
 * メイン
 */
unvealColumnEventListener();

/**
 * 以降、ファンクション
 */
function unvealColumnEventListener() {
    // イベントリスナー付与対象の要素を取得する
    var elements = document.getElementsByClassName('unveal-column');

    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener("click", click, false);
    }
}


/**
 * クリックされた際の関数
 */
function click(event) {
    removeHiddenLocalStorage(this.textContent);
    // キャッシュを利用してリロード
    window.location.reload(false);
}

/**
 * 
 */
function removeHiddenLocalStorage(storageKey) {
    if (storageKey == 'all') {
        logging('removeHiddenLocalStorage', 'all');
        // all指定の場合はローカルストレージを空文字に設定する
        localStorage.setItem(STORAGE_KEY_HIDDEN_COULUMNS, '');
        return;
    }
    // 
    var locStrgArray = getLocalStorageAsArray(STORAGE_KEY_HIDDEN_COULUMNS);

    var removed = locStrgArray.filter(function(locStrgArray) {
        return locStrgArray != storageKey;
    });
    logging('removeHiddenLocalStorage', 'removed : ' + removed);

    localStorage.setItem(STORAGE_KEY_HIDDEN_COULUMNS, removed);
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