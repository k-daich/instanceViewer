/**
 * メイン
 */
// ダブルクリックされた要素を格納する変数
var dbclcked_element;
// 主となるイベントリスナーの登録
moveColumnEventListenr();


/**
 * 以降、ファンクション
 */
/**
 * 可動な列を実装するためのイベントリスナーを付与する
 */
function moveColumnEventListenr() {
    // イベントリスナー付与対象の要素を取得する
    var elements = document.getElementsByClassName("moveableColumn");

    // マウスが要素内で押されたとき発火
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener("dblclick", dblclicked, false);
    }
}


/**
 * ダブルクリックされた際の関数
 */
function dblclicked(event) {
    // 直前にダブルクリックした要素を再度ダブルクリックした場合
    if (event.target == dbclcked_element) {
        // 列変更処理のキャンセルを行う
        dbclcked_element = null;
        // クラス名に .tg_dbcl を削除する
        this.classList.remove("tg_dbcl");
    } else {
        // 直前でダブルクリックされた要素が存在しない場合
        if (!dbclcked_element) {
            // クラス名に .tg_dbcl を追加する
            this.classList.add("tg_dbcl");
            // 次のイベントの判定に使用するのでグローバル変数に格納する
            dbclcked_element = this;
        }
        // 直前でダブルクリックされた要素が存在する場合
        else {
            var tableKeys = localStorage.getItem('tableKeysForDispOrder').split(',');
            // ローカルストレージに列移動後のキー名配列を設定する
            localStorage.setItem('tableKeysForDispOrder',
                // 列移動した結果の配列
                moveElement(tableKeys,
                    // 列移動元の配列index
                    Number(dbclcked_element.getAttribute("index_tblKysFDspOrdr")),
                    // 列移動先の配列index
                    Number(this.getAttribute("index_tblKysFDspOrdr"))));
            // キャッシュを利用してリロード
            window.location.reload(false);
        }
    }
}

/**
 * 配列の値を移動
 */
function moveElement(array, srcIndex, destIndex) {
    // 移動先に値を挿入する
    array.splice(destIndex, 0, array[srcIndex]);
    /**
     * 移動元の要素を削除する
     * ※splice第一引数の求め方
     *    前処理で移動先に値を挿入済みであるため、削除対象のインデックスがずれることを考慮
     */
    array.splice((destIndex < srcIndex ? srcIndex + 1 : srcIndex), 1);
    return array;
}

function arrayContent(array) {
    var result = '';
    for (index in array) {
        result = result + index + ' : ' + array[index];
    }
    return result;
}

/**
 * ログUtil
 */
function logging(processName, message) {
    console.log('[' + processName + '] ' + message);
}