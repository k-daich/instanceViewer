/**
 * メイン
 */
lightUpCrossEventListener();

/**
 * 以降、ファンクション
 */
function lightUpCrossEventListener() {
    // イベントリスナー付与対象の要素を取得する
    var elements = document.getElementById('dynamicTable').getElementsByTagName('td');

    // マウスが要素内で押されたとき発火
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener("dblclick", dblclicked, false);
    }
}

/**
 * ダブルクリックされた際の関数
 */
function dblclicked(event) {
    // TODO:スタイルの初期化
    logging('', event.target);

    // TODO:スタイルの変更
    var position = createPosition(event.target.id);
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

function lightUpAdjacent(column, row) {
    // 左方のライトアップ続行フラグ
    var leftContinueFlg = true;
    // 右方のライトアップ続行フラグ
    var rightContinueFlg = true;
    // 上方のライトアップ続行フラグ
    var upperContinueFlg = true;
    // 下方のライトアップ続行フラグ
    var belowContinueFlg = true;

    // 上下左右に隣接した4データをライトアップ。それ以降の隣接データは同一色で一括ライトアップする
    // 繰り返すごとにライトアップ対象距離をインクリメントする
    for (var distance = 1, interval = 1; ++interval;) {
        if (interval == 5) {
            sleep(1 * interval, function() {
                // 距離5以降の隣接データは一括で同一色にライトアップする
                logging('lightUp', 'TODO:距離5以降のライトアップ処理実装');
            });
            // ライトアップの処理終了
            break;
        } else {
            // 2秒単位に待機してライトアップ処理を実施する
            // ※callback処理以外はsleep非同期で処理が続行するので注意すること
            sleep(1 * interval, function() {
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
function sleep(waitSec, callbackFunc) {

    // 経過時間（秒）
    var spanedSec = 0;

    // 1秒間隔で無名関数を実行
    var id = setInterval(function() {

        spanedSec++;

        // 経過時間 >= 待機時間の場合、待機終了。
        if (spanedSec >= waitSec) {

            // タイマー停止
            clearInterval(id);

            // 完了時、コールバック関数を実行
            if (callbackFunc) callbackFunc();
        }
    }, 1000);

}

/**
 * ログUtil
 */
function logging(processName, message) {
    console.log('[' + processName + '] ' + message);
}