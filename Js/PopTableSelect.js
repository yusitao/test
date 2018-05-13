var g_oldCell = null;
function popTableSelectInit(cols) {
    var tbDiv = document.getElementById("divUnit");

    // 初始化表格内部的信息
    var valueInfo = document.getElementById("unitInfo").value;
    var arrUnit = valueInfo.split(";");
    var tbInnerInfo = "";
    var colNums = cols;
    var colPos = 0;
    tbInnerInfo = "<table id='tbUnit' width='100%' cellpadding='0' cellspacing='1' border='0'>";
    for (var n = 0; n < arrUnit.length; n++) {
        var oneUnit = arrUnit[n];
        var arrValue = oneUnit.split('|');
        var unitID = arrValue[0];
        var unitText = arrValue[1];
        if (colPos == 0) {
            tbInnerInfo += "<tr>";
        }
        tbInnerInfo += "<td>" + unitText + "</td>";

        colPos++;
        if (colPos == colNums) {
            tbInnerInfo += "</tr>";
            colPos = 0;
        }
    }
    tbInnerInfo += "</table>";
    tbDiv.innerHTML = tbInnerInfo;

    // 动态添加事件和改变样式
    var tb = document.getElementById("tbUnit");
    var tr;
    var rows = tb.rows;
    tbDiv.style.height = (rows.length * 28 + rows.length - 1 + 2) + "px";
    for (var i = 0; i < rows.length; i++) {
        for (var j = 0; j < rows[i].cells.length; j++)//取得第几行下面的td个数，再次循环遍历该行下面的td元素
        {
            var cell = rows[i].cells[j];
            cell.style.backgroundColor = "#fff";
            cell.style.textAlign = "center";
            cell.style.height = "28px";
            cell.style.cursor = "pointer";
            cell.onclick = function () {
                clickCell(this.innerText);
            };
            cell.onmousemove = function () {
                if (g_oldCell != null) {
                    g_oldCell.style.backgroundColor = "#fff";
                }
                this.style.backgroundColor = "#add01f";
            };
            cell.onmouseout = function () {
                this.style.backgroundColor = "#fff";
            }
        }
    }
}



// 处理文挡单击时,无论如何隐藏单位选择DIV
document.onclick = function (e) {
    event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
    var unit = document.getElementById('Unit');
    var bRet = getIDByUnitText(unit.value);
    if (bRet)
        confirmSelect();
}

// 开始单位的选择
function startSelect() {
    event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
    var divUnit = document.getElementById('divUnit');
    var unit = document.getElementById('Unit');
    unit.focus();
    var curValue = unit.value;
    if (divUnit.style.display == 'none') {
        divUnit.style.display = 'block';

        // 将当前的单位处于选择状态
        g_oldCell = null;
        var tb = document.getElementById("tbUnit");
        var rows = tb.rows;
        var bFind = false;
        for (var i = 0; i < rows.length; i++) {
            for (var j = 0; j < rows[i].cells.length; j++) {
                var cell = rows[i].cells[j];
                if (cell.innerText == curValue) {
                    cell.style.backgroundColor = "#add01f";
                    g_oldCell = cell;
                    bFind = true;
                    break;
                }
            }
            if (bFind) {
                break;
            }
        }
    }
}

// 确定单位的选择
function confirmSelect() {
    var divUnit = document.getElementById('divUnit');
    divUnit.style.display = 'none';
}

// 处理单元格的单击
function clickCell(val) {
    event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
    var unit = document.getElementById('Unit');
    unit.value = val;
    var bRet = getIDByUnitText(val);
    if (bRet)
        confirmSelect();
}

// 处理单元格内容变化
function conChange() {
    if (g_oldCell != cell) {
        g_oldCell.style.backgroundColor = "#fff";
    }

    var unit = document.getElementById('Unit');
    var curValue = unit.value;
    var tb = document.getElementById("tbUnit");
    var rows = tb.rows;
    var bFind = false;
    for (var i = 0; i < rows.length; i++) {
        for (var j = 0; j < rows[i].cells.length; j++) {
            var cell = rows[i].cells[j];
            if (cell.innerText == curValue) {
                cell.style.backgroundColor = "#add01f";
                g_oldCell = cell;
                bFind = true;
                break;
            }
        }
        if (bFind) {
            break;
        }
    }
}

// 处理回车操作
function handleKeydown() {
    if (event.keyCode == 13) {
        var unit = document.getElementById('Unit');
        var bRet = getIDByUnitText(unit.value);
        if (bRet)
            confirmSelect();
        return false;
    }
}

// 根据文本找到ID
function getIDByUnitText(val) {
    var id = document.getElementById("ID")
    var valueInfo = document.getElementById("unitInfo").value;
    var arrUnit = valueInfo.split(";");
    var bFind = false;
    for (var n = 0; n < arrUnit.length; n++) {
        var oneUnit = arrUnit[n];
        var arrValue = oneUnit.split('|');
        var unitID = arrValue[0];
        var unitText = arrValue[1];

        if (val == unitText) {
            id.value = unitID;
            bFind = true;
            break;
        }
    }

    if (!bFind) {
        alert('输入或选择的单位不存在');
        return false;
    }
    return true;
}