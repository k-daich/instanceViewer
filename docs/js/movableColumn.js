// メイン
moveColumnEventListenr();

/**
 * 以降、ファンクション
 */
function moveColumnEventListenr() {
    for (var i = 0; i < 10; i++) {
        var elements = document.getElementsByClassName("col_" + i);
        logging('i', i);
        loggingObj('elements', elements);
        if (elements.length == 0) break;

        // マウスが要素内で押されたとき発火
        for (var j = 0; j < elements.length / 2; j++) {
            if (elements[j].classList.contains('fixTbl')) continue;
            elements[j].addEventListener("mousedown", mdown, false);
        }
    }
}

// マウスダウンした時に発火
function mdown(event) {
    // クラス名に .drag を追加
    this.classList.add("drag");

    // 要素内の相対座標を取得
    x = event.pageX - this.offsetLeft;

    // ムーブイベントにコールバック
    document.body.addEventListener("mousemove", mmove, false);
}

// マウスカーソルが動いたときに発火
function mmove(event) {

    // ドラッグしている要素を取得
    var drag = document.getElementsByClassName("drag")[0];

    // マウスが動いた場所に要素を動かす
    drag.style.left = event.pageX - x + "px";
    // document.documentElement.style.setProperty('--Drag_x_3', x + "px");

    // マウスボタンが離されたとき、またはカーソルが外れたとき発火
    drag.addEventListener("mouseup", mup, false);
    document.body.addEventListener("mouseleave", mup, false);
}

// マウスボタンが上がったら発火
function mup(event) {
    var drag = document.getElementsByClassName("drag")[0];

    // ムーブベントハンドラの消去
    document.body.removeEventListener("mousemove", mmove, false);
    drag.removeEventListener("mouseup", mup, false);

    // クラス名 .drag も消す
    drag.classList.remove("drag");
}