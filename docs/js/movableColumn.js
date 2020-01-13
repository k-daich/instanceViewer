// メイン
// グローバルオブジェクトのプロパティとして保存
movableColumn = new Object();
// イベントリスナーの設定
moveColumnEventListenr();

/**
 * 以降、ファンクション
 */
function moveColumnEventListenr() {
    movableColumn.elements = document.getElementsByClassName('theadTbl');
    movableColumn.dispOrder_ids = [];
    loggingObj('elements', movableColumn.elements);

    // マウスが要素内で押されたとき発火
    for (var index = 0; index < movableColumn.elements.length; index++) {
        var id = movableColumn.elements[index].id;
        movableColumn.dispOrder_ids.push(id);
        if (movableColumn.elements[index].classList.contains('fixTbl')) continue;
        var leftEle = (index == 0) ? null : movableColumn.elements[index - 1];
        var thisEle = movableColumn.elements[index];
        var rightEle = (index == 0) ? null : movableColumn.elements[index + 1];
        movableColumn.elements[index].addEventListener("mousedown", { id: id, thisEle: thisEle, handleEvent: mdown }, false);
    }
}

// マウスダウンした時に発火
function mdown(event) {
    logging('mdown');
    loggingObj('mdown this', this);
    // クラス名に .drag を追加
    this.thisEle.classList.add("drag");

    logging('event.pageX', event.pageX);
    logging('this.thisEle.offsetLeft', this.thisEle.offsetLeft);
    // 要素内の相対座標を取得
    movableColumn.x = event.pageX - this.thisEle.offsetLeft;

    // ムーブイベントにコールバック
    document.body.addEventListener("mousemove", { id: this.id, thisEle: this.thisEle, handleEvent: mmove }, false);
}

// マウスカーソルが動いたときに発火
function mmove(event) {
    var index = movableColumn.dispOrder_ids.indexOf(this.id);
    var thisColumn = movableColumn.elements[index];
    logging('mmove');
    logging('movableColumn.x', movableColumn.x);
    loggingObj('movableColumn.elements', movableColumn.elements);
    loggingObj('mmove this', this);

    // ドラッグしたX座標が左隣の列中央より左に移動した場合
    if (movableColumn.x < 0 && index != 0) {
        var leftColumn = movableColumn.elements[index - 1];
        logging('left event.pageX', event.pageX);
        logging('LeftRect() left:right', leftColumn.getBoundingClientRect().left + ':' + leftColumn.getBoundingClientRect().right);
        if (event.pageX - movableColumn.x < (leftColumn.getBoundingClientRect().left + leftColumn.getBoundingClientRect().right) / 2) {
            leftColumn.classList.replace('col_' + (index - 1), 'col_' + index);
            thisColumn.classList.replace('col_' + index, 'col_' + (index - 1));
        }
    } else if (movableColumn.x > 0 && index != movableColumn.elements.length) {
        var rightColumn = movableColumn.elements[index + 1];
        logging('right event.pageX', event.pageX);
        logging('RightRect() left:right', rightColumn.getBoundingClientRect().left + ':' + rightColumn.getBoundingClientRect().right);
        // ドラッグしたX座標が右隣の列中央より右に移動した場合
        if (event.pageX - movableColumn.x > (rightColumn.getBoundingClientRect().left + rightColumn.getBoundingClientRect().right) / 2) {
            rightColumn.classList.replace('col_' + (index + 1), 'col_' + index);
            thisColumn.classList.replace('col_' + index, 'col_' + (index + 1));
        }
    }

    // マウスが動いた場所に要素を動かす
    // drag.style.left = (event.pageX - x) + 'px';

    // マウスボタンが離されたとき、またはカーソルが外れたとき発火
    thisColumn.addEventListener("mouseup", mup, false);
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