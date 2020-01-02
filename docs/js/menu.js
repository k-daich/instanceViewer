/**
 * メイン
 */
disp_menu();

/**
 * 以降、ファンクション
 */
function disp_menu() {
    // イベントリスナー付与対象の要素を取得する
    var element = document.getElementById('menu-button');

    // マウスが要素内で押されたとき発火
    element.addEventListener("click", click, false);
}

/**
 * クリックされた際の関数
 */
function click(event) {
    if (this.classList.contains("icon-plus")) {
        // クラス名から .icon-plus を削除する（マイナス表記にする）
        this.classList.remove("icon-plus");
        // メニューウィンドウを非表示化する
        unvealMenu();
    } else {
        // クラス名から .icon-plus を追加する（プラス表記にする）
        this.classList.add("icon-plus");
        // メニューウィンドウを非表示化する
        hiddenMenu();
    }
}

/**
 * メニューウィンドウを表示化する
 */
function unvealMenu() {
    document.getElementById('menu-window').classList.remove('hidden');
}

/**
 * メニューウィンドウを非表示化する
 */
function hiddenMenu() {
    document.getElementById('menu-window').classList.add('hidden');
}

/**
 * ログUtil
 */
function logging(processName, message) {
    console.log('[' + processName + '] ' + message);
}