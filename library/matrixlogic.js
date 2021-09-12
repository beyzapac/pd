

function mulofmatrix(matrix1, matrix2, row1, col1, col2) {
    var mul = [];
    var temp = '';
    var mulexplanation = '';
    var d = '';
    for (i = 0; i < row1; i++) {
        mulexplanation += "<div class='dropdown-divider'></div><br>"
        mulexplanation += "<span style='color:var(--apppink) !important'>"
        mulexplanation += '<span style="font-size: 20px;"> Taking Row ' + String(i + 1) + ' of Matrix 1</span>';
        mulexplanation += "</span><br>"
        mul[i] = [];
        for (j = 0; j < col2; j++) {
            mulexplanation += "<div class='bi' style='border-radius:50px;padding:20px;display:table;margin:3px;width:100%;'>"
            mulexplanation += '<span style="border: 3px solid var(--appblack);padding: 10px;border-radius: 30px;font-size: 20px;">Sütun ' + String(j + 1) + ' , Matrix 2</span><br>';
            mul[i][j] = 0;
            for (k = 0; k < col1; k++) {
                mulexplanation += '\\[a_{' + String(parseInt(j + 1)) + String(parseInt(k + 1)) + '} = ' + String(parseInt(matrix1[i][k])) + '\\quad ve \\quad b_{' + String(parseInt(k + 1)) + String(parseInt(i + 1)) + '} = ' + String(parseInt(matrix2[k][j])) + '\\]\\[\\big( ' + String(parseInt(matrix1[i][k])) + ' &times; ' + String(parseInt(matrix2[k][j])) + ' \\big) = ' + String(parseInt(matrix1[i][k]) * parseInt(matrix2[k][j])) + '\\]'
                temp += String(parseInt(matrix1[i][k]) * parseInt(matrix2[k][j])) + ' + '
                mul[i][j] = parseInt(mul[i][j]) + parseInt(matrix1[i][k]) * parseInt(matrix2[k][j]);
            }
            var dp = '\\[\\begin{bmatrix}'
            var count = 0
            for (ij of matrix1) {
                for (ji of ij) {
                    if (count == i)
                        dp += '\\color{blue}' + ji + "&"
                    else {
                        dp += ji + "&"
                    }
                }
                count += 1;
                dp = dp.slice(0, -1);
                dp += '\\\\';
            }
            dp += '\\end{bmatrix}\\times'
            dp += '\\begin{bmatrix}';
            for (ij of matrix2) {
                var count = 0
                for (ji of ij) {
                    if (count == j)
                        dp += '\\color{blue}' + ji + "&"
                    else {
                        dp += ji + "&"
                    }
                    count += 1;
                }
                dp = dp.slice(0, -1);
                dp += '\\\\';
            }
            dp += '\\end{bmatrix}\\]'

            mulexplanation += dp;
            mulexplanation += '<b style="font-size: 25px;">' + temp.slice(0, -3) + ' = ' + eval(temp.slice(0, -3)) + '</b>';
            var mat = [];
            for (f = 0; f < row1; f++) {
                mat[f] = [];
                for (d = 0; d < col2; d++) {
                    if (f == i && d == j) {
                        mat[f][d] = String(eval(temp.slice(0, -3)))
                    }
                    else {
                        mat[f][d] = '.';
                    }
                }
            }
            dtemp = '\\[\\begin{bmatrix}'
            for (ij of mat) {
                for (ji of ij) {
                    if (ji == '.')
                        dtemp += ji + "&"
                    else
                        dtemp += '\\color{blue}' + ji + "&"
                }
                dtemp = dtemp.slice(0, -1);
                dtemp += '\\\\';
            }
            dtemp += '\\end{bmatrix}\\]'

            mulexplanation += dtemp;
            temp = '';
            mat = '';
            m1 = '';
            mulexplanation += "</div>"
        }
        mulexplanation += '<br>';
    }

    temp = '\\[Çarpma\\space Sonucu' + '\\\\';
    temp += '\\begin{bmatrix}'
    for (var i of mul) {
        for (var j of i) {
            temp += nerdamer(j).toTeX().toString() + "&"
        }
        temp = temp.slice(0, -1);
        temp += '\\\\';
    }
    temp += '\\end{bmatrix}';
    temp += '_{' + row1 + '\\times' + col2 + '}\\]';

    return { 'result': temp, 'steps': mulexplanation };
}

// single matrix

function transpose(matrixsingle, row, col) {
    var trans = [];
    for (var i = 0; i < col; i++) {
        trans[i] = [];
        for (var j = 0; j < row; j++) {
            trans[i][j] = matrixsingle[j][i];
        }
    }

    temp = '\\[Transposed\\space Matrix' + '\\\\';
    temp += '\\begin{bmatrix}'
    for (var i of trans) {
        for (var j of i) {
            temp += nerdamer(j).toTeX().toString() + "&"
        }
        temp = temp.slice(0, -1);
        temp += '\\\\';
    }
    temp += '\\end{bmatrix}';
    temp += '_{' + col + '\\times' + row + '}\\]';

    return { 'result': temp, 'steps': 'Just Interchange Rows and Columns' };
}



