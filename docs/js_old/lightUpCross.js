/**
 * 以降、ファンクション
 */
function lightUpCrossEventListener() {
    // イベントリスナー付与対象の要素を取得する
    var elements = document.getElementById('dynamicTable').getElementsByTagName('td');
    logging('lightUpCross', 'elements : ' + elements.length);

    // マウスが要素内で押されたとき発火
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener("dblclick", dblclicked_atLightUpCross, false);
    }
}

/**
 * ダブルクリックされた際の関数
 */
function dblclicked_atLightUpCross(event) {
    // TODO:スタイルの初期化
    logging('', event.target);

    // TODO:スタイルの変更
    var position = createPosition(event.target.id);
    logging('lightUpCross', this);
    // クラス名に .tg_dbcl を追加する
    this.classList.add("lightUpCenter");

    // 上下左右の隣接データをライトアップしていく
    lightUpAdjacent(position.column, position.row);
}

/**
 * ポジションオブジェクトの生成
 */
function createPosition(id) {
    var posYX = id.split(':');
    var position = new Object();
    position.row = Number(posYX[0]);
    position.column = Number(posYX[1]);
    return position;
}

/**
 * 指定した位置の隣接データをライトアップする
 */
function lightUpAdjacent(column, row) {
    // 左方のライトアップ続行フラグ
    var leftContinueFlg = true;
    // 右方のライトアップ続行フラグ
    var rightContinueFlg = true;
    // 上方のライトアップ続行フラグ
    var upperContinueFlg = true;
    // 下方のライトアップ続行フラグ
    var belowContinueFlg = true;
    // だんだんと色づけるようにエフェクトを実施する隣接数
    var gettingLightUpAmount = 4;
    // だんだんとライトアップする際のインターバル
    var lightUpInterval = 400;

    // 上下左右に隣接した4データをライトアップ。それ以降の隣接データは同一色で一括ライトアップする
    // 繰り返すごとにライトアップ対象距離をインクリメントする
    for (var distance = 1, count = 1; ++count;) {
        if (count == gettingLightUpAmount) {
            sleep(lightUpInterval * count + 700, function() {
                // 列を一括ライトアップする
                lightUpColumn(column);
                // 行を一括ライトアップする
                lightUpRow(row);
            });
            // ライトアップの処理終了
            break;
        } else {
            // 2秒単位に待機してライトアップ処理を実施する
            // ※callback処理以外はsleep非同期で処理が続行するので注意すること
            sleep(lightUpInterval * count, function() {
                if (leftContinueFlg) {
                    var targetEle = document.getElementById(row + ':' + (column - distance));
                    if (targetEle) {
                        targetEle.classList.add("lightUpCenter");
                    } else {
                        leftContinueFlg = false;
                    }
                }
                if (rightContinueFlg) {
                    var targetEle = document.getElementById(row + ':' + (column + distance));
                    if (targetEle) {
                        targetEle.classList.add("lightUpCenter");
                    } else {
                        rightContinueFlg = false;
                    }
                }
                if (upperContinueFlg) {
                    var targetEle = document.getElementById((row - distance) + ':' + column);
                    if (targetEle) {
                        targetEle.classList.add("lightUpCenter");
                    } else {
                        upperContinueFlg = false;
                    }
                }
                if (belowContinueFlg) {
                    var targetEle = document.getElementById((row + distance) + ':' + column);
                    if (targetEle) {
                        targetEle.classList.add("lightUpCenter");
                    } else {
                        belowContinueFlg = false;
                    }
                }
                // インターバルごとの処理が終わるごとに対象距離をインクリメント
                distance++;
            });
        }
    }
}

/**
 * 指定した秒だけ待機する
 */
function sleep(milisec, callbackFunc) {

    // 1秒間隔で無名関数を実行
    var id = setInterval(function() {
            // タイマー停止
            clearInterval(id);
            // 完了時、コールバック関数を実行
            if (callbackFunc) callbackFunc();
        },
        milisec);
}

/**
 * 指定した列をライトアップする
 */
function lightUpColumn(column) {
    var targetId = "lightUp_col_" + column;
    // 既にライトアップされていた場合
    if (document.getElementById(targetId)) {
        // 何もしない
        logging('lightUpColumn', 'already exist id : ' + targetId);
    } else {
        // 列をライトアップするためのstyleタグを追加する
        logging('lightUpColumn', 'adding id : ' + targetId);
        document.getElementById("style_writtenByJavascript").insertAdjacentHTML('beforeend',
            '<style id="' + targetId + '">tbody td:nth-of-type(' + column + ') { background: var(--rightUpColor) !important;transition: 0.7s;}</style>');
    }
}

/**
 * 指定した列をライトアップする
 */
function lightUpRow(row) {
    var targetId = "lightUp_row_" + row;
    // 既にライトアップされていた場合
    if (document.getElementById(targetId)) {
        // 何もしない
        logging('lightUpRow', 'already exist id : ' + targetId);
    } else {
        // 列をライトアップするためのstyleタグを追加する
        logging('lightUpRow', 'adding id : ' + targetId);
        document.getElementById("style_writtenByJavascript").insertAdjacentHTML('beforeend',
            '<style id="' + targetId + '">tbody tr:nth-of-type(' + row + ') { background: var(--rightUpColor) !important;transition: 0.7s;}</style>');
    }
}

/**
 * ログUtil
 */
function logging(processName, message) {
    console.log('[' + processName + '] ' + message);
}