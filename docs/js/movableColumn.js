// メイン
var initPosition_x;
moveColumnEventListenr();

/**
 * 以降、ファンクション
 */
function moveColumnEventListenr() {
    // for (var i = 0;; i++) {
    var elements = document.getElementsByClassName('theadTbl');
    loggingObj('elements', elements);
    // if (elements.length == 0) break;

    // マウスが要素内で押されたとき発火
    for (var index = 0; index < elements.length; index++) {
        logging('index', index);
        if (elements[index].classList.contains('fixTbl')) continue;
        var leftEle = (index == 0) ? null : elements[index - 1];
        var thisEle = elements[index];
        var rightEle = (index == 0) ? null : elements[index + 1];
        elements[index].addEventListener("mousedown", { index: index, leftEle: leftEle, thisEle: thisEle,  rightEle: rightEle, handleEvent: mdown }, false);
    }
    // }
}

// マウスダウンした時に発火
function mdown(event) {
    logging('mdown');
    loggingObj('mdown this', this);
    // クラス名に .drag を追加
    this.thisEle.classList.add("drag");

    // 要素内の相対座標を取得
    var x = event.pageX - this.thisEle.offsetLeft;

    // ムーブイベントにコールバック
    document.body.addEventListener("mousemove",  { index: this.index, leftEle: this.leftEle, thisEle: this.thisEle,  rightEle: this.rightEle, x:x, handleEvent: mmove }, false);
}

// マウスカーソルが動いたときに発火
function mmove(event) {
    logging('mmove');
    loggingObj('mmove this', this);

    // ドラッグしている要素を取得
    var drag = document.getElementsByClassName("drag")[0];
    loggingObj('drag', drag);

    if (event.pageX - this.x < (this.leftEle.getBoundingClientRect().left + this.leftEle.getBoundingClientRect().right / 2)) {
    	this.leftEle.classList.replace('col_' + (this.index-1), 'col_' + this.index);
    	this.thisEle.classList.replace('col_' + this.index, 'col_' + (this.index-1));
    } 
    // マウスが動いた場所に要素を動かす
    drag.style.left = (event.pageX - x) + 'px';

    // マウスボタンが離されたとき、またはカーソルが外れたとき発火
    drag.addEventListener("mouseup", mup, false);
    document.body.addEventListener("mouseleave", mup, false);
}

// マウスボタンが上がったら発火
function mup(event) {
    logging('mup');
    var drag = document.getElementsByClassName("drag")[0];

    // ムーブベントハンドラの消去
    document.body.removeEventListener("mousemove", mmove, false);
    drag.removeEventListener("mouseup", mmove, false);
    // クラス名 .drag も消す
    drag.classList.remove("drag");
}