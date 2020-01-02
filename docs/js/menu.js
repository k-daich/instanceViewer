/**
 * メイン
 */
disp_menu();

/**
 * 以降、ファンクション
 */
function disp_menu() {
    // イベントリスナー付与対象の要素を取得する
    var element = document.getElementById('menu');

    // マウスが要素内で押されたとき発火
    element.addEventListener("dblclick", dblclicked, false);
}

/**
 * ダブルクリックされた際の関数
 */
function dblclicked(event) {
    if (this.classList.contains("icon-plus")) {
        // クラス名から .icon-plus を削除する（マイナス表記にする）
        this.classList.remove("icon-plus");
    } else {
        // クラス名から .icon-plus を追加する（プラス表記にする）
        this.classList.add("icon-plus");
    }
}



/**
 * ログUtil
 */
function logging(processName, message) {
    console.log('[' + processName + '] ' + message);
}