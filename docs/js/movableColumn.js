// メイン
moveColumnEventListenr();

/**
 * 以降、ファンクション
 */
function moveColumnEventListenr() {
    for (var i = 0;; i++) {
    	var elements = document.getElementsByClassName("col_" + i);
    	if (elements.length == 0) break;

        // マウスが要素内で押されたとき発火
        for (var i = 0; i < elements.length / 2; i++) {
            if (elements[i].classList.contains('fixTbl')) continue;
            elements[i].addEventListener("mousedown", function() {
                mdown(elements[i + elements.length / 2])
            }, false);
            elements[i].addEventListener("touchstart", mdown, false);
        }
    }
}

// マウスダウンした時に発火
function mdown(secondTarget, e) {
	loggingObj('e', secondTarget);
	loggingObj('e', e);
    // クラス名に .drag を追加
    this.classList.add("drag");
    secondTarget.classList.add("drag");
    for (var clzz of this.classList) {
        if (clzz.startsWith('col_')) colNo = clzz;
    }

    // タッチデイベントとマウスのイベントの差異を吸収
    if (e.type === "mousedown") {
        var event = e;
    } else {
        var event = e.changedTouches[0];
    }

    // 要素内の相対座標を取得
    x = event.pageX - this.offsetLeft;

    // ムーブイベントにコールバック
    document.body.addEventListener("mousemove", mmove, false);
    document.body.addEventListener("touchmove", mmove, false);
}

// マウスカーソルが動いたときに発火
function mmove(e) {

    // ドラッグしている要素を取得
    var drag = document.getElementsByClassName("drag")[0];

    // 同様にマウスとタッチの差異を吸収
    if (e.type === "mousemove") {
        var event = e;
    } else {
        var event = e.changedTouches[0];
    }

    // フリックしたときに画面を動かさないようにデフォルト動作を抑制
    e.preventDefault();

    // マウスが動いた場所に要素を動かす
    drag.style.left = event.pageX - x + "px";

    // マウスボタンが離されたとき、またはカーソルが外れたとき発火
    drag.addEventListener("mouseup", mup, false);
    document.body.addEventListener("mouseleave", mup, false);
    drag.addEventListener("touchend", mup, false);
    document.body.addEventListener("touchleave", mup, false);
}

// マウスボタンが上がったら発火
function mup(e) {
    var drag = document.getElementsByClassName("drag")[0];

    // ムーブベントハンドラの消去
    document.body.removeEventListener("mousemove", mmove, false);
    drag.removeEventListener("mouseup", mup, false);
    document.body.removeEventListener("touchmove", mmove, false);
    drag.removeEventListener("touchend", mup, false);

    // クラス名 .drag も消す
    drag.classList.remove("drag");
}