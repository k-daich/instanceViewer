/**
 * メイン
 */
window.addEventListener('load', (event) => {
  main();
});


/**
 * 以降、ファンクション
 */
function main() {
    // localStorage.setItem('tableKeysForDispOrder', ['起動時刻', 'DB向き先', '環境予約者']);
    // localStorage.setItem(STORAGE_KEY_HIDDEN_COULUMNS, '');
    var tableKeysForDispOrder = decideTableKeysDispOrder();
    var hiddenColumns = getHiddenColumnsArrayFrmLocStrg();

    createTableHeaderRowHtml(tableKeysForDispOrder, hiddenColumns);
    createTableDataRowHtml(tableKeysForDispOrder, hiddenColumns);
}


/**
 * 
 */
function decideTableKeysDispOrder() {
    var locStrgArray = getLocalStorageAsArray(STORAGE_KEY_TBL_KEYS_DISP_ORDER);

    // localStorageの値が妥当な場合
    if (isCorrectTableKeys(locStrgArray)) {
        // ローカルストレージの値を返す
        return locStrgArray;
    }
    // localStorageの値が妥当でない場合
    else {
        // 現在のデータ値からキー値を取得する
        var tableKeysForDispOrder_current = Object.keys(instancesArray[Object.keys(instancesArray)[0]]);
        // ローカルストレージを更新する
        localStorage.setItem(STORAGE_KEY_TBL_KEYS_DISP_ORDER, tableKeysForDispOrder_current);
        return tableKeysForDispOrder_current;
    }
}

/**
 * テーブルキー配列が妥当か現在の値を元に判定する
 */
function isCorrectTableKeys(tableKeysForDispOrder) {
    // 現在のキー配列を取得する
    var currentKeys = instancesArray[Object.keys(instancesArray)[0]];
    // 妥当と判定した回数
    var correctCount = 0;

    // ローカルストレージから取得した配列を元に繰り返し処理
    for (index in tableKeysForDispOrder) {
        // ローカルストレージのキー値が現在のキー配列に存在する場合
        if (tableKeysForDispOrder[index] in currentKeys) {
            // チェック状態管理用フラグを1つ立てる
            ++correctCount;
        } else {
            console.log('[isCorrectTableKeys] false : A');
            return false;
        }
    }
    // 妥当と判定した回数が現在のキー配列長と一致しない場合
    if (Object.keys(currentKeys).length != correctCount) {
        console.log('[isCorrectTableKeys] false : B');
        return false;
    }
    console.log('[isCorrectTableKeys] true');
    return true;
}

/**
 * tableのthタグを連想配列データから生成する
 */
function createTableHeaderRowHtml(tableKeysForDispOrder, hiddenColumns) {
    var index_tblKysFDspOrdr = 0;
    // インスタンス名列定義までは固定定義
    var thHtml = '<thead><tr><th class="no">No</th><th>インスタンス名</th>';
    // 2次元連想配列の内部配列のキー名を繰り返し取得する
    for (index in tableKeysForDispOrder) {
        var keyName = tableKeysForDispOrder[index];
        // thタグを生成する
        thHtml = thHtml + '<th class="moveableColumn' + getIfHidden(hiddenColumns, keyName) + '" index_tblKysFDspOrdr="' + index_tblKysFDspOrdr++ + '">' + keyName + '<br/><div class="icon-column icon-minus hidableColumn"></div></th>';
    }
    // trの閉じタグを追加
    var thHtml = thHtml + '</thead></tr>';
    document.getElementById('dynamicTable').insertAdjacentHTML(
        'afterbegin', thHtml);
}

/**
 * tableのtbodyタグを連想配列データから生成する
 **/
function createTableDataRowHtml(tableKeysForDispOrder, hiddenColumns) {
    // tdタグの位置を示すオブジェクト
    var tdPosition = new Object();
    tdPosition.row = 1;
    tdPosition.column = 0;
    var tbodyHtml = '<tbody>';
    // 列「No」に設定する値
    var no = 1;

    for (outerArrayKey in instancesArray) {
        // Noとインスタンス名列のtdタグを生成
        tbodyHtml = tbodyHtml + '<tr><td id="' + getNextColumnId(tdPosition) + '">' + no++ + '</td><td id="' + getNextColumnId(tdPosition) + '">' + outerArrayKey + '</td>';
        for (internalArrayKey in tableKeysForDispOrder) {
            var columnName = tableKeysForDispOrder[internalArrayKey];
            // 前述以外の列（Noとインスタンス名以外）のtdタグを生成
            tbodyHtml = tbodyHtml + '<td id="' + getNextColumnId(tdPosition) + '" class="' + getIfHidden(hiddenColumns, columnName) + '">' + instancesArray[outerArrayKey][columnName] + '</td>';
        }
        tbodyHtml = tbodyHtml + '</tr>';
        // 行の位置をインクリメント
        tdPosition.row++;
        // 列の位置をリセット
        tdPosition.column = 0;
    }
    // trの閉じタグを追加
    var tbodyHtml = tbodyHtml + '</tbody></tr>';
    document.getElementById('dynamicTable').insertAdjacentHTML(
        'beforeend', tbodyHtml);
}

function getNextColumnId(tdPosition) {
    return tdPosition.row + ':' + ++tdPosition.column;
}

/**
 * キー名(第2引数)が配列（第1引数）に存在する場合は' hidden'の文字列を返す
 */
function getIfHidden(hiddenColumns, targetKey) {
    // 存在しない場合 : 空文字を返す
    // 存在する場合 : ' hidden'を返す
    return (hiddenColumns.indexOf(targetKey) == -1) ? '' : ' hidden';
}