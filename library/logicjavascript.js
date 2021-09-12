function convertkatex(element, value) {
    var x = nerdamer(value);
    var value = x.toTeX();
    katex.render(value, element, {
        throwOnError: false,
    });
}

function expandedform(input) {
    if (String(document.getElementById(input).value) == "") return "";
    else {
        if (input == "inpo") {
            var num = parseInt(document.getElementById(input).value);
        } else {
            var num = parseInt(document.getElementById(input).textContent);
        }
        i = 1;
        j = 0;
        var ar = [];
        var temp = "";
        while (parseInt(num) != 0) {
            var last = parseInt(num % 10);
            var br = last * i;
            ar[j] = br;
            num = num / 10;
            i = i * 10;
            j++;
        }
        var temp = ar.reverse().join("+");
        return temp;
    }
}


function romanize(input) {
    if (input == "inpo") {
        var num = parseInt(document.getElementById(input).value);
    } else {
        var num = parseInt(input);
    }
    if (!+num) return "";
    var digits = String(+num).split(""),
        key = [
            "",
            "C",
            "CC",
            "CCC",
            "CD",
            "D",
            "DC",
            "DCC",
            "DCCC",
            "CM",
            "",
            "X",
            "XX",
            "XXX",
            "XL",
            "L",
            "LX",
            "LXX",
            "LXXX",
            "XC",
            "",
            "I",
            "II",
            "III",
            "IV",
            "V",
            "VI",
            "VII",
            "VIII",
            "IX",
        ],
        roman = "",
        i = 3;
    while (i--) roman = (key[+digits.pop() + i * 10] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
}


function sin(degrees) {
    var radians = (degrees * Math.PI) / 180;
    return Math.sin(radians);
}

function cos(degrees) {
    var radians = (degrees * Math.PI) / 180;
    return Math.cos(radians);
}


function expandedformde(input, output) {
    if (document.getElementById(input).textContent == "")
        document.getElementById(output).innerHTML = "";
    else {
        var val = document.getElementById(input).textContent;
        var expanded = expandedform(input);
        var ar = [];
        ar = expanded.split("+");
        var temp = "";
        for (var i of ar) {
            if (i == 0) {
                temp += "";
            } else {
                temp += romanize(i) + "+";
            }
        }
        temp = temp.slice(0, -1);
        document.getElementById(output).innerHTML = temp;
    }
}







function deromanize(str) {
    var str = str.toUpperCase(),
        validator = /^M*(?:D?C{0,3}|C[MD])(?:L?X{0,3}|X[CL])(?:V?I{0,3}|I[XV])$/,
        token = /[MDLV]|C[MD]?|X[CL]?|I[XV]?/g,
        key = {
            M: 1000,
            CM: 900,
            D: 500,
            CD: 400,
            C: 100,
            XC: 90,
            L: 50,
            XL: 40,
            X: 10,
            IX: 9,
            V: 5,
            IV: 4,
            I: 1,
        },
        num = 0,
        m;
    if (!(str && validator.test(str)))
        if (document.getElementById("rinp").value == "") {
            return "";
        } else {
            return "Enter Valid Roman Number";
        }
    var temp = "";
    while ((m = token.exec(str))) num += key[m[0]];
    return num;
}


function callder() {
    document.getElementById("out2").innerHTML = deromanize(
        document.getElementById("rinp").value
    );
}


function callr() {
    var x = parseInt(document.getElementById("inpo").value);
    if (x > 0) {
        var y = x % 5000000;
        x = (x - y) / 1000000;
        var z = y % 5000;
        y = (y - z) / 1000;
        document.getElementById("ouroman-1").innerHTML = romanize(x.toString());
        document.getElementById("ouroman-2").innerHTML = romanize(y.toString());
        document.getElementById("ouroman-3").innerHTML = romanize(z.toString());
        console.log((romanize(x.toString())));
        console.log((romanize(y.toString())));
    } else if (x < 0) {
        document.getElementById("ouroman-3").innerHTML = "Error: There are no negative Roman Numerals";
    } else if (x == 0) {
        document.getElementById("ouroman-3").innerHTML = "Error: There are no Roman Numerals for 0";
    }

}

function performdivide() {
    var dividend = parseFloat(document.getElementById("dividendnum").value);
    var divisor = parseFloat(document.getElementById("divisornumwith").value);
    if (String(divisor) == "NaN" || String(dividend) == "NaN" || divisor == 0) {
        if (String(dividend) == "NaN") {
            document.getElementById("resultdivi").innerHTML = "Enter Dividend";
        }
        if (String(divisor) == "NaN") {
            document.getElementById("resultdivi").innerHTML = "Enter Divisor";
        }
        if (divisor == 0) {
            document.getElementById("resultdivi").innerHTML = "";
        }
        if (String(divisor) == "NaN" && String(dividend) == "NaN") {
            document.getElementById("resultdivi").innerHTML =
                "Enter Divisor and Dividend";
        }
    } else {
        var rem = dividend % divisor;
        var c = dividend / divisor;
        var temp =
            dividend +
            " ÷ " +
            divisor +
            " = " +
            c +
            "<br>" +
            "Quotient = " +
            parseInt(c) +
            "<br>" +
            "Remainder = " +
            rem;
        document.getElementById("resultdivi").innerHTML = temp;
    }
}


function divisionwithsteps(dividend,divisor) {
    performdivide();

    var resultContainer = $("#resultofdivsteps");
    var numberFormatTester = new RegExp("^[1-9]{1}[0-9]*$");
    var isDecimal =
        ("" + dividend).indexOf(".") > -1 || ("" + divisor).indexOf(".") > -1;
    var isNum =
        !(isNaN(+dividend) && isNaN(+divisor)) &&
        parseFloat(dividend) >= 0 &&
        parseFloat(divisor) >= 0;
    if (String(dividend) == "" || String(divisor) == "") {
        document.getElementById("resultofdivsteps").innerHTML = "";
    } else if ("" + divisor == "0") {
        document.getElementById("resultofdivsteps").innerHTML =
            "You cannot divide by 0";
        return false;
    } else if (isDecimal) {
        document.getElementById("resultofdivsteps").innerHTML =
            "Can't show steps for Decimal Division";
        return false;
    } else if (!numberFormatTester.test(divisor)) {
        if (String(divisor) == "") {
            document.getElementById("resultofdivsteps").innerHTML = "";
        } else {
            document.getElementById("resultofdivsteps").innerHTML =
                "Can't show steps for Negative Divisor";
        }
        return false;
    } else if (!numberFormatTester.test(dividend)) {
        if (String(dividend) == "") {
            document.getElementById("resultofdivsteps").innerHTML = "";
        } else {
            document.getElementById("resultofdivsteps").innerHTML =
                "Can't show steps for Negative Dividend";
        }
        return false;
    } else {
        var quotient = Math.floor(dividend / divisor);
        var remainder = dividend % divisor;
        var dividendLength = dividend.toString().length;
        var divisorLength = divisor.toString().length;
        var tableBody = "";
        var tableNumColumns = dividendLength + divisorLength;
        var tableNumRows = dividendLength * 2 + 2;
        var numSteps = dividendLength + 1;
        var tmpVar;
        for (var a = 1; a <= tableNumRows; a++) {
            tableBody += "<tr>";
            for (var b = 1; b <= tableNumColumns; b++) {
                tableBody +=
                    '<td style="padding: 7px; border:1px solid var(--apppink); ;"></td>';
            }
            tableBody += "</tr>";
        }
        resultContainer.html(
            '<div><h4 style="color:white"><table class="table table-bordered" style="color:white;width: 50px; padding: 0; margin-left:auto;margin-right:auto; border:2px solid light-grey;">' +
            tableBody +
            "</table></div>"
        );
        var tableRows = resultContainer.find("table tr");
        for (var i = 0; i < divisorLength; i++) {
            tableRows.eq(1).find("td").eq(i).html(divisor.toString()[i]);
        }
        tableRows
            .eq(1)
            .find("td")
            .eq(divisorLength - 1)
            .css("border-right", "6px solid white");
        for (var i = 0; i < dividendLength; i++) {
            tableRows
                .eq(1)
                .find("td")
                .eq(divisorLength + i)
                .html(dividend.toString()[i])
                .css("border-top", "6px solid white");
        }
        for (var currentStep = 1; currentStep < numSteps; currentStep++) {
            if (!bufferVar) var bufferVar = dividend.toString()[0];
            var stepResult = Math.floor(bufferVar / divisor);
            tableRows
                .eq(0)
                .find("td")
                .eq(divisorLength + currentStep - 1)
                .html(stepResult);
            tmpVar = (stepResult * divisor).toString();
            for (var a = tmpVar.length - 1; a >= 0; a--) {
                tableRows
                    .eq(currentStep * 2)
                    .find("td")
                    .eq(divisorLength + currentStep - a - 1)
                    .html(tmpVar[tmpVar.length - a - 1])
                    .css("border-bottom", "6px solid white");
            }
            tmpVar = (bufferVar - stepResult * divisor).toString();
            for (var a = tmpVar.length - 1; a >= 0; a--) {
                tableRows
                    .eq(currentStep * 2 + 1)
                    .find("td")
                    .eq(divisorLength + currentStep - a - 1)
                    .html(tmpVar[tmpVar.length - a - 1]);
            }
            tableRows
                .eq(currentStep * 2 + 1)
                .find("td")
                .eq(divisorLength + currentStep)
                .html(dividend.toString()[currentStep]);
            bufferVar = tmpVar + dividend.toString()[currentStep];
        }
    }
}


function checkdivisibility() {
    var n1 = parseInt(document.getElementById("n1").value);
    var n2 = parseInt(document.getElementById("n2").value);

    if (String(n1) != NaN && String(n2) != "NaN" && n1 % n2 == 0) {
        document.getElementById("divisibilitycheckresult").innerHTML =
            "Yes! " + String(n1) + " is Divisible by " + n2 + "<br>";
        document.getElementById("divisibilitycheckresult").innerHTML +=
            "\\[ \\frac{" +
            String(n1) +
            "}{" +
            String(n2) +
            "} = " +
            eval(String(n1 / n2)) +
            " \\]";
        document.getElementById("divisibilitycheckresultexplanation").innerHTML =
            "Explanation:<br>When " +
            String(n1) +
            " divides with " +
            String(n2) +
            " leaves Remainder 0.";






    } else if (String(n1) != "NaN" && String(n2) != "NaN") {
        document.getElementById("divisibilitycheckresult").innerHTML =
            "No! " + String(n1) + " is not Divisible by " + n2;
        document.getElementById("divisibilitycheckresultexplanation").innerHTML =
            "Explanation:<br>When " +
            String(n1) +
            " divides with " +
            String(n2) +
            " leaves Remainder " +
            eval(n1 % n2) +
            ".";
    }
    renderMathInElement(document.getElementById("divisibilitycheckresult"));
}


function printfactors() {
    var num = parseInt(document.getElementById("numforfactorhcflcm").value);
    var temp = "";
    var tt = "";
    var v = "";
    for (var i = 2; i <= num; i++) {
        while (num % i == 0) {
            temp += i + "&nbsp;&nbsp;&nbsp;<br>";
            v += i + ",";
            tt += "<pu>" + num + "</pu><br>";
            num = num / i;
        }
        document.getElementById("dividefactor").innerHTML = temp;
        document.getElementById("dividefactorresult").innerHTML = tt;
        document.getElementById("factorresult").innerHTML =
            "\\[Prime \\space Factors \\space are:\\]\\[" + v.slice(0, -1) + "\\]";
        renderMathInElement(document.getElementById("factorresult"));
    }
}


function printmorefactors(input, output) {
    document.getElementById(output).textContent = "";
    var ar = [];
    var val = document.getElementById(input).value;
    val = val.replace(/\s+$/, "");
    val = val.replace(/^\s+/, "");
    if (val.search(/^[0-9 ]+$/) == -1) {
        document.getElementById("hcfprimefactor").innerHTML = "Enter numbers only";
        return;
    }
    val = val.split(" ");
    ar = val;
    var temp = "";
    document.getElementById(output).innerHTML =
        "\\[Prime \\space Factors \\space of \\space\\]";
    for (var num of ar) {
        var getnu = "\\[" + num + "\\space : \\space";
        var i;
        for (var i = 2; i <= num; i++) {
            while (num % i == 0) {
                temp += i + ",";
                num = num / i;
            }
        }
        temp = temp.slice(0, -1);
        document.getElementById(output).innerHTML += getnu + temp + "\\]";
        temp += "<br>";
        temp = "";
    }
    renderMathInElement(document.getElementById(output));
}


function removeDuplicates(array) {
    return array.filter((a, b) => array.indexOf(a) === b);
}


function factorselect(numid) {
    var num = document.getElementById(numid).value;
    num = num.replace(/^\s+/, "");
    num = num.replace(/\s+$/, "");
    if (num.search(/^[0-9 ]+$/) == -1) {
        document.getElementById("hcfprimefactor").innerHTML = "Enter positive numbers only";
        return;
    }
    num = num.split(" ");
    if (num.length == 1) {
        printfactors();
    } else {
        printmorefactors(numid, "factorresult");
    }
}

function splittrifind() {
    var side = parseInt(document.getElementById('splittri').value);
    if (!isNaN(side)) {
        document.getElementById("splittrians1").innerHTML = "\\[First, \\space we \\space find \\space Binomial \\space Coefficient \\space of \\space (2 \\times " + side + ") \\space and \\space " + side + "\\]"
        var c = binomialCoeff(2 * side, side);
        var ans = c / ((2 * side) + 1);
        document.getElementById("splittrians2").innerHTML = "\\[Number \\space of \\space ways \\space is \\space \\space \\frac{Binomila \\space Coefficient}{2 \\times side} \\space \\space = \\space \\frac{" + c + "}{2 \\times " + side + "} \\space = \\space " + ans.toFixed(3) + "\\]";
        renderMathInElement(document.getElementById("splittrians1"));
        renderMathInElement(document.getElementById("splittrians2"));
    }
    else {
        document.getElementById("splittrians3").innerHTML = "\\[Please \\space enter \\space all \\space the \\space values\\]";
        document.getElementById("splittrians4").innerHTML = "";
    }
    renderMathInElement(document.getElementById("splittrians3"));
    renderMathInElement(document.getElementById("splittrians4"));
}
function binomialCoeff(n, k) {
    var res = 1;
    if (k > n - k)
        k = n - k;
    for (i = 0; i < k; ++i) {
        res *= (n - i);
        res /= (i + 1);
    }
    return res;
}



function beta_fact(num) {
    var f = 1;
    for (var i = 1; i <= num; i++) {
        f = (f * i);
    }
    return f;
}
function exterior() {



    var into = document.getElementById("exterior").value
    document.getElementById("exteriorinfo").innerHTML = "The exterior angle of a cyclic quadrilateral is same as sum of opposite interior angles"
    document.getElementById("exteriorans").innerHTML = "The exterior angle is " + into
}


function chordsub() {
    var into = document.getElementById("chsub").value
    if (into != "") {
        document.getElementById("chsubinfo").innerHTML = "Equal chords of a circle subtend equal angles at the centre."
        document.getElementById("chsubans").innerHTML = "The angle subtended by chord at the center is  " + into
    }
    else {
        document.getElementById("chsubinfo").innerHTML = "Please enter valid input"
        document.getElementById("chsubans").innerHTML = ""
    }
}


function checkforusetrigovalue() {
    var el = document.getElementById("soltri");
    if (
        el.innerText != "" &&
        el.innerText != "-ve Karekök için Hesaplanamıyor" &&
        el.innerText != "Hipotenüs Daha Büyük Olmalı" &&
        el.innerText != "Lütfen En Az 2 alanı doldurun" &&
        el.innerText != "Bu ölçülerde dik açılı üçgen mümkün değildir."
    ) {
        $("#usetrigovaluesbtn").fadeIn();
    } else {
        $("#usetrigovaluesbtn").fadeOut();
    }
}



function greatsfind() {
    let side = parseInt(document.getElementById("greatinin1").value)
    if (!isNaN(side)) {
        let nextN = Math.floor(Math.sqrt(side)) + 1;
        let ans = nextN * nextN
        document.getElementById("greatsquare").innerHTML = ans
    }
    else {
        document.getElementById('greatsquare').innerHTML = 'Please enter all Input';
    }
}

function ssdfind() {
    let side = parseInt(document.getElementById("inputsidessd").value);
    let vol = (1.25 * side * side * side * 13.71).toFixed(3);
    let ar = 15 * side * side * 3.078;
    let ans = document.getElementById("resultofvolssd");
    let ans1 = document.getElementById("resultofareassd");
    let temp1 = "";
    let temp2 = "";
    if (!isNaN(side)) {
        temp1 += "\\[\\frac{5}{4} \\times " + side + "^{3} \\space \\times \\space (7 \\space + \\space 3 \\sqrt{5} ) \\]"
        temp1 += "\\[ " + (5 / 4) + "\\times" + (side) ** 3 + " \\times " + ((7 + 3 * Math.sqrt(5)).toFixed(2)) + " \\]"
        temp1 += "\\[Volume \\space of \\space Small \\space Stellated \\space Dodecahedron \\space is \\]";
        temp1 += "\\[" + vol + " \\]"
        ans.innerHTML = temp1;
        renderMathInElement(ans);
        temp2 += "\\[15 \\times " + (side) + "^{2} \\times \\sqrt{5+2\\sqrt{5}} \\]";
        temp2 += "\\[15 \\times " + (side) ** 2 + "\\times" + (Math.sqrt(5 + (2 * (Math.sqrt(5)))).toFixed(3)) + " \\]";
        temp2 += "\\[Area \\space of \\space Small \\space Stellated \\space Dodecahedron \\space is \\]";
        temp2 += "\\[" + ar + " \\]";
        ans1.innerHTML = temp2;
        renderMathInElement(ans1);
    }
    else {
        temp1 += "\\[Please \\space enter \\space side \\space a \\]";
        temp2 += "";
        ans.innerHTML = temp1;
        ans1.innerHTML = temp2;
        renderMathInElement(ans);
        renderMathInElement(ans1);
    }
}

function glomefind() {
    var r = parseInt(document.getElementById("inputsideglome").value);
    var area = 16 * 3.14 * r * r;
    var vol = 2 * 3.14 * 3.14 * r * r * r;
    document.getElementById("resultofvolglome").innerHTML = "\\[The \\space volume \\space of Glome \\space shape \\space is \\newline 2 \\times \\pi^2 \\times " + r + "^3 \\space = \\space " + vol.toFixed(3) + "\\]";
    renderMathInElement(document.getElementById("resultofvolglome"));
    document.getElementById("resultofareaglome").innerHTML = "\\[The \\space area \\space of \\space Glome \\space shape \\space is \\newline 16 \\times \\pi \\times " + r + "^2 \\space = \\space" + area.toFixed(3) + "\\]";
    renderMathInElement(document.getElementById("resultofareaglome"));
}


function solvesimpletrigo() {
    var pp = document.getElementById("p").value;
    var base = document.getElementById("base").value;
    var hyp = document.getElementById("h").value;
    if ((pp == "" && base == "") || (base == "" && hyp == "") || (hyp == "" && pp == "")) {
        document.getElementById("soltri").innerHTML =
            "Lütfen En Az 2 alanı doldurun";
    }
    else if (pp < 0 || base < 0 || hyp < 0) {
        document.getElementById("soltri").innerHTML = "Kenarlar negatif değer alamaz"
    }
    else {
        if (parseInt(hyp) < parseInt(pp) || parseInt(hyp) < parseInt(base)) {
            document.getElementById("h").style.color = "red";
            document.getElementById("soltri").innerHTML =
                "Hipotenüs Daha Büyük Olmalı";
        } else if (pp != "" && base != "" && hyp != "" && parseInt(hyp) ^ 2 != parseInt(pp) ^ 2 + parseInt(base) ^ 2 && parseInt(hyp) ^ 2 != parseInt(base) ^ 2 + parseInt(pp) ^ 2) {
            document.getElementById("soltri").innerHTML =
                "Bu ölçülerde dik açılı üçgen mümkün değildir.";
        } else if (pp == "") {
            document.getElementById("h").style.color = "white";
            var pp = eval(hyp * hyp - base * base);
            var kl = String(pp);
            pp = Math.sqrt(String(pp));
            if (pp.toString() != "NaN") {
                pp = pp.toFixed(2);
                var tempp =
                    "\\[Perpendicular \\space değeri = \\sqrt{" +
                    kl +
                    "}=" +
                    pp +
                    "\\]";
                tempp +=
                    String(
                        "\\[sin\\theta =\\frac{p}{h} =\\frac{" +
                        pp +
                        "}{" +
                        hyp +
                        "} = " +
                        eval(String(pp + "/" + hyp)).toFixed(2)
                    ) + "\\]";
                tempp +=
                    "\\[cos\\theta =\\frac{b}{h} =\\frac{" +
                    base +
                    "}{" +
                    hyp +
                    "}= " +
                    eval(String(base + "/" + hyp)).toFixed(2) +
                    "\\]";
                tempp +=
                    "\\[tan\\theta=\\frac{p}{b} =\\frac{" +
                    pp +
                    "}{" +
                    base +
                    "}= " +
                    eval(String(pp + "/" + base)).toFixed(2) +
                    "\\]";
                tempp +=
                    "\\[cosec\\theta=\\frac{h}{p} =\\frac{" +
                    hyp +
                    "}{" +
                    pp +
                    "}= " +
                    eval(String(hyp + "/" + pp)).toFixed(2) +
                    "\\]";
                tempp +=
                    "\\[sec\\theta=\\frac{h}{b} =\\frac{" +
                    hyp +
                    "}{" +
                    base +
                    "}= " +
                    eval(String(hyp + "/" + base)).toFixed(2) +
                    "\\]";
                tempp +=
                    "\\[cot\\theta=\\frac{b}{p} =\\frac{" +
                    base +
                    "}{" +
                    pp +
                    "}= " +
                    eval(String(base + "/" + pp)).toFixed(2) +
                    "\\]";
                document.getElementById("soltri").innerHTML = tempp;
                renderMathInElement(document.getElementById("soltri"));
            } else {
                document.getElementById("soltri").innerHTML =
                    "-ve Karekök için Hesaplanamıyor";
            }
        } else if (base == "") {
            document.getElementById("h").style.color = "white";
            var base = eval(hyp * hyp - pp * pp);
            var kll = String(base);
            base = Math.sqrt(String(base));
            if (base.toString() != "NaN") {
                base = base.toFixed(2);
                var tempp =
                    "\\[Base \\space değeri=\\sqrt{" + kll + "}=" + base + "\\]";
                tempp +=
                    String(
                        "\\[sin\\theta =\\frac{p}{h} =\\frac{" +
                        pp +
                        "}{" +
                        hyp +
                        "} = " +
                        eval(String(pp + "/" + hyp)).toFixed(2)
                    ) + "\\]";
                tempp +=
                    "\\[cos\\theta=\\frac{b}{h} =\\frac{" +
                    base +
                    "}{" +
                    hyp +
                    "} = " +
                    eval(String(base + "/" + hyp)).toFixed(2) +
                    "\\]";
                tempp +=
                    "\\[tan\\theta=\\frac{p}{b} =\\frac{" +
                    pp +
                    "}{" +
                    base +
                    "}= " +
                    eval(String(pp + "/" + base)).toFixed(2) +
                    "\\]";
                tempp +=
                    "\\[cosec\\theta=\\frac{h}{p} =\\frac{" +
                    hyp +
                    "}{" +
                    pp +
                    "}= " +
                    eval(String(hyp + "/" + pp)).toFixed(2) +
                    "\\]";
                tempp +=
                    "\\[sec\\theta=\\frac{h}{b} =\\frac{" +
                    hyp +
                    "}{" +
                    base +
                    "} = " +
                    eval(String(hyp + "/" + base)).toFixed(2) +
                    "\\]";
                tempp +=
                    "\\[cot\\theta=\\frac{b}{p} =\\frac{" +
                    base +
                    "}{" +
                    pp +
                    "} = " +
                    eval(String(base + "/" + pp)).toFixed(2) +
                    "\\]";
                document.getElementById("soltri").innerHTML = tempp;
                renderMathInElement(document.getElementById("soltri"));
            } else {
                document.getElementById("soltri").innerHTML =
                    "-ve Karekök için Hesaplanamıyor";
            }
        } else if (hyp == "") {
            document.getElementById("h").style.color = "white";
            var hyp = eval(base * base + pp * pp);
            var klll = String(hyp);
            hyp = Math.sqrt(String(hyp));
            if (hyp.toString() != "NaN") {
                hyp = hyp.toFixed(2);
                var tempp =
                    "\\[Hypotenuse \\space değeri \\sqrt{" +
                    klll +
                    "}=" +
                    hyp +
                    "\\]";
                tempp +=
                    String(
                        "\\[sin\\theta =\\frac{p}{h} =\\frac{" +
                        pp +
                        "}{" +
                        hyp +
                        "}= " +
                        eval(String(pp + "/" + hyp)).toFixed(2)
                    ) + "\\]";
                tempp +=
                    "\\[cos\\theta=\\frac{b}{h} =\\frac{" +
                    base +
                    "}{" +
                    hyp +
                    "}= " +
                    eval(String(base + "/" + hyp)).toFixed(2) +
                    "\\]";
                tempp +=
                    "\\[tan\\theta=\\frac{p}{b} =\\frac{" +
                    pp +
                    "}{" +
                    base +
                    "}= " +
                    eval(String(pp + "/" + base)).toFixed(2) +
                    "\\]";
                tempp +=
                    "\\[cosec\\theta=\\frac{h}{p} =\\frac{" +
                    hyp +
                    "}{" +
                    pp +
                    "}= " +
                    eval(String(hyp + "/" + pp)).toFixed(2) +
                    "\\]";
                tempp +=
                    "\\[sec\\theta=\\frac{h}{b} =\\frac{" +
                    hyp +
                    "}{" +
                    base +
                    "}= " +
                    eval(String(hyp + "/" + base)).toFixed(2) +
                    "\\]";
                tempp +=
                    "\\[cot\\theta=\\frac{b}{p} =\\frac{" +
                    base +
                    "}{" +
                    pp +
                    "} = " +
                    eval(String(base + "/" + pp)).toFixed(2) +
                    "\\]";

                document.getElementById("soltri").innerHTML = tempp;
                renderMathInElement(document.getElementById("soltri"));
            } else {
                document.getElementById("soltri").innerHTML =
                    "-ve Karekök için Hesaplanamıyor";
            }
        } else {
            document.getElementById("h").style.color = "white";
            var tempp =
                String(
                    "\\[sin\\theta =\\frac{p}{h} =\\frac{" +
                    pp +
                    "}{" +
                    hyp +
                    "} = " +
                    eval(String(pp + "/" + hyp)).toFixed(2)
                ) + "\\]";
            tempp +=
                "\\[cos\\theta=\\frac{b}{h} =\\frac{" +
                base +
                "}{" +
                hyp +
                "}=" +
                eval(String(base + "/" + hyp)).toFixed(2) +
                "\\]";
            tempp +=
                "\\[tan\\theta=\\frac{p}{b} =\\frac{" +
                pp +
                "}{" +
                base +
                "}= " +
                eval(String(pp + "/" + base)).toFixed(2) +
                "\\]";
            tempp +=
                "\\[cosec\\theta=\\frac{h}{p} =\\frac{" +
                hyp +
                "}{" +
                pp +
                "} = " +
                eval(String(hyp + "/" + pp)).toFixed(2) +
                "\\]";
            tempp +=
                "\\[sec\\theta=\\frac{h}{b} =\\frac{" +
                hyp +
                "}{" +
                base +
                "} = " +
                eval(String(hyp + "/" + base)).toFixed(2) +
                "\\]";
            tempp +=
                "\\[cot\\theta=\\frac{b}{p} =\\frac{" +
                base +
                "}{" +
                pp +
                "}= " +
                eval(String(base + "/" + pp)).toFixed(2) +
                "\\]";
            document.getElementById("soltri").innerHTML = tempp;
            renderMathInElement(document.getElementById("soltri"));
        }
    }
}


function set(obj) {
    if (
        document.getElementById("cal").style.display == "" ||
        document.getElementById("cal").style.display == "none"
    ) {
        opencal();
    }
    var pp = document.getElementById("p").value;
    var base = document.getElementById("b").value;
    var hyp = document.getElementById("h").value;
    if (hyp == "") {
        var hyp = eval(base * base + pp * pp);
        hyp = Math.sqrt(String(hyp));
        hyp = hyp.toFixed(2);
    }
    if (pp == "") {
        var pp = eval(hyp * hyp - base * base);
        pp = Math.sqrt(String(pp));
        pp = pp.toFixed(2);
    }
    if (base == "") {
        var base = eval(hyp * hyp - pp * pp);
        base = Math.sqrt(String(base));
        base = base.toFixed(2);
    }

    if (obj.id == "sini") {
        var sintheta = String(eval(String(pp + "/" + hyp)).toFixed(2));
        document.getElementById("txt").value += sintheta;
    }
    if (obj.id == "cosi") {
        var costheta = eval(String(base + "/" + hyp)).toFixed(2);
        document.getElementById("txt").value += costheta;
    }
    if (obj.id == "tani") {
        var tantheta = eval(String(pp + "/" + base)).toFixed(2);
        document.getElementById("txt").value += tantheta;
    }
    if (obj.id == "coseci") {
        var cosectheta = eval(String(hyp + "/" + pp)).toFixed(2);
        document.getElementById("txt").value += cosectheta;
    }
    if (obj.id == "seci") {
        var sectheta = eval(String(hyp + "/" + base)).toFixed(2);
        document.getElementById("txt").value += sectheta;
    }
    if (obj.id == "coti") {
        var cottheta = eval(String(base + "/" + pp)).toFixed(2);
        document.getElementById("txt").value += cottheta;
    }
}


function solveintegralwithoutsteps() {
    var intval = document.getElementById("inputintegral").value;

}

var intsol = "";

function findintesol(input, output) {
    var inp = document.getElementById(input).value;
    intsol = nerdamer.integrate(inp, "x");
    document.getElementById(input).value += "";
}

var diffvariable = "";
var difforder = "";

function getdifforder(value) {
    difforder = value;
}

function diffsolve() {
    var ok = document.getElementById("inputdifferentiatequation").value;
    ok = encodeURIComponent(ok);
    window.open(
        "https://www.emathhelp.net/calculators/calculus-1/derivative-calculator/?f=" +
        ok +
        "+&order=" +
        difforder +
        "&var=" +
        diffvariable +
        "&p=&steps=on#solution"
    );
}

var pardifforder = "";
function getparorder(value) {
    pardifforder = value;
}

function gif() {
    var giffnum = parseFloat(document.getElementById("giffnum").value)
    var output = document.getElementById("giffans");
    var temp = "";
    if (!isNaN(giffnum)) {
        "\\[The \\space Greatest \\space Integer \\space Function \\space will \\space be,\\]"
        if (giffnum >= 0) {
            var ans = Math.floor(giffnum)
            temp += "\\[Here, \\space since \\space " + giffnum + " \\space is \\space greater \\space than \\space or \\space equal \\space to \\space 0\\]"
            temp += "\\[GIF \\space = \\space (Largest \\space integer \\space less \\space than \\space or \\space equal \\space to \\space " + giffnum + ")\\]"
            temp += "\\[\\space = \\space " + ans + "\\]"

            output.innerHTML = temp;
        }
        else {
            var ans1 = Math.abs(giffnum)
            var ans = Math.ceil(ans1)
            temp += "\\[Here, \\space since \\space " + giffnum + " \\space is \\space less \\space than \\space 0\\]"
            temp += "\\[GIF \\space = \\space (Rounded \\space number \\space up \\space to \\space the \\space next \\space largest \\space integer) \\space of \\space |" + giffnum + "|\\]"
            temp += "\\[\\space = \\space(Rounded \\space number \\space up \\space to \\space the \\space next \\space largest \\space integer) \\space  of \\space " + ans1 + "\\]"
            temp += "\\[\\space = \\space " + ans + " \\]"

            output.innerHTML = temp;
        }
    } else {
        temp = "\\[Please \\space enter \\space valid \\space input \\]"

        output.innerHTML = temp;
    }
    renderMathInElement(output);
}

function inDP() {
    var inDPnum1 = parseInt(document.getElementById("inDPnum1").value);
    var inDPnum2 = parseInt(document.getElementById("inDPnum2").value);
    var inDPnum3 = parseInt(document.getElementById("inDPnum3").value);
    var output = document.getElementById("inDPans")
    var ans = "";
    if (!isNaN(inDPnum1) && !isNaN(inDPnum2) && !isNaN(inDPnum3)) {
        var fourthVal = ((inDPnum1) * (inDPnum2)) / (inDPnum3);
        ans += "\\[X1 \\times Y1 \\space = \\space X2 \\times Fourth Value \\]"
        ans += "\\[Fourth Value \\space = \\space \\frac{X1 \\times Y1}{X2} \\space = \\space \\frac{ " + inDPnum1 + " \\times " + inDPnum2 + "}{" + inDPnum3 + "} \\space = \\space \\frac{ " + inDPnum1 * inDPnum2 + "}{" + inDPnum3 + "} \\space = \\space " + fourthVal.toFixed(3) + " \\]"
        output.innerHTML = ans;
    }
    else {
        ans += "\\[Please \\space enter \\space the \\space value \\]";
        output.innerHTML = ans;
    }
    renderMathInElement(output);
}

function cross() {
    var crossA = document.getElementById("inputA").value;
    var crossB = document.getElementById("inputB").value;
    var crossC = document.getElementById("inputC").value;
    var crossD = document.getElementById("inputD").value;
    var cross_explain = document.getElementById("cross_explain");
    if (crossA != "" && crossB != "" && crossC != "" && crossD != "") {

    }
    else if (crossA != "" && crossB != "" && crossC != "") {
        crossD = (parseInt(crossC) * parseInt(crossB) / parseInt(crossA)).toFixed(2);
        document.getElementById("inputD").value = crossD;
        cross_explain.innerHTML = "\\[ \\underline {D \\space \\ için \\space çözüm }\\]" + "\\[\\frac{" + crossA + "}{" + crossB + "}=\\frac{" + crossC + "}{D}\\]" + "\\[\\underline {1.Çapraz \\space Çarpım}\\]" + "\\[" + crossA + "\\times D \\space = \\space " + crossB + "\\times " + crossC + "\\]" + "\\[\\underline {2.İki \\space tarafın \\space " + crossA + "\\space ile \\space çarpılması}\\]" + "\\[D=(" + crossB + "\\times" + crossC + ")/" + crossA + "\\]" + "\\[\\underline {3.Sonuç}\\]" + "\\[D=" + crossD + "\\]";
        cross_explain.innerHTML += "\\[\\underline {Final \\space Durumu}\\]" + "\\[\\frac{" + crossA + "}{" + crossB + "}=\\frac{" + crossC + "}{" + crossD + "}\\]"
        renderMathInElement(document.getElementById("cross_explain"));
    }
    else if (crossA != "" && crossB != "" && crossD != "") {
        crossC = (parseInt(crossA) * parseInt(crossD) / parseInt(crossB)).toFixed(2);
        document.getElementById("inputC").value = crossC;
        cross_explain.innerHTML = "\\[ \\underline {C \\space \\ için \\space çözüm }\\]" + "\\[\\frac{" + crossA + "}{" + crossB + "}=\\frac{C}{" + crossD + "}\\]" + "\\[\\underline {1.Çapraz \\space Çarpım}\\]" + "\\[" + crossA + "\\times " + crossD + " \\space = \\space " + crossB + "\\times C\\]" + "\\[\\underline {2.İki \\space tarafın \\space  " + crossB + "\\space ile \\space çarpılması}\\]" + "\\[C=(" + crossA + "\\times" + crossD + ")/" + crossB + "\\]" + "\\[\\underline {3.Sonuç}\\]" + "\\[C=" + crossC + "\\]";
        cross_explain.innerHTML += "\\[\\underline {Final \\space  Durumu}\\]" + "\\[\\frac{" + crossA + "}{" + crossB + "}=\\frac{" + crossC + "}{" + crossD + "}\\]"
        renderMathInElement(document.getElementById("cross_explain"));
    }
    else if (crossA != "" && crossC != "" && crossD != "") {
        crossB = (parseInt(crossA) * parseInt(crossD) / parseInt(crossC)).toFixed(2);
        document.getElementById("inputB").value = crossB;
        cross_explain.innerHTML = "\\[ \\underline {B \\space \\ için \\space çözüm }\\]" + "\\[\\frac{" + crossA + "}{B}=\\frac{" + crossC + "}{" + crossD + "}\\]" + "\\[\\underline {1.Çapraz \\space Çarpım}\\]" + "\\[" + crossA + "\\times " + crossD + " \\space = \\space B \\times " + crossC + "\\]" + "\\[\\underline {2.İki \\space tarafın \\space " + crossC + "\\space ile \\space çarpılması}\\]" + "\\[B=(" + crossA + "\\times" + crossD + ")/" + crossC + "\\]" + "\\[\\underline {3.Sonuç}\\]" + "\\[B=" + crossB + "\\]";
        cross_explain.innerHTML += "\\[\\underline {Final \\space  Durumu}\\]" + "\\[\\frac{" + crossA + "}{" + crossB + "}=\\frac{" + crossC + "}{" + crossD + "}\\]"
        renderMathInElement(document.getElementById("cross_explain"));
    }
    else if (crossD != "" && crossB != "" && crossC != "") {
        crossA = (parseInt(crossC) * parseInt(crossB) / parseInt(crossD)).toFixed(2);
        document.getElementById("inputA").value = crossA;
        cross_explain.innerHTML = "\\[ \\underline {A \\space \\ için \\space çözüm }\\]" + "\\[\\frac{A}{" + crossB + "}=\\frac{" + crossC + "}{" + crossD + "}\\]" + "\\[\\underline {1.Çapraz \\space Çarpım}\\]" + "\\[A\\times " + crossD + " \\space = \\space " + crossB + "\\times " + crossC + "\\]" + "\\[\\underline {2.İki \\space tarafın \\space " + crossD + "\\space ile \\space çarpılması}\\]" + "\\[A=(" + crossB + "\\times" + crossC + ")/" + crossD + "\\]" + "\\[\\underline {3.Sonuç}\\]" + "\\[A=" + crossA + "\\]";
        cross_explain.innerHTML += "\\[\\underline {Final \\space Durumu}\\]" + "\\[\\frac{" + crossA + "}{" + crossB + "}=\\frac{" + crossC + "}{" + crossD + "}\\]"
        renderMathInElement(document.getElementById("cross_explain"));
    }
    else {
        cross_explain.innerHTML = "";
    }
}

function goldrec() {
    var gra = document.getElementById("gra").value;
    var grb = document.getElementById("grb").value;
    var grab = document.getElementById("grab").value;
    var grar = document.getElementById("grar").value;
    var goldr_explain = document.getElementById("goldrec_explain");
    if (gra != "" && grb != "" && grab != "" && grar != "")
        goldr_explain.innerHTML = "Reset the Calculator";
    else if (gra != "") {
        grb = (parseFloat(gra) / 1.618).toFixed(3);
        grab = (1.618 * parseFloat(gra)).toFixed(3);
        grar = (parseFloat(gra) * parseFloat(grab)).toFixed(3);

        document.getElementById("grb").value = grb;
        document.getElementById("grab").value = grab;
        document.getElementById("grar").value = grar;

        goldr_explain.innerHTML = "\\[ b=\\frac{a}{Golden \\space Ratio}\\]" + "\\[\\space = \\frac{" + gra + "}{1.618}=" + grb + "\\]";
        goldr_explain.innerHTML += "\\[a+b=(a)\\times (Golden \\space Ratio)\\]" + "\\[\\space \\space = 1.618 \\times" + gra + "=" + grab + "\\]";
        goldr_explain.innerHTML += "\\[Area=(a)\\times (a+b)\\]" + "\\[\\space \\space = " + gra + "\\times" + grab + "=" + grar + "\\]";

        renderMathInElement(document.getElementById("goldrec_explain"));
    }
    else if (grb != "") {
        gra = (1.618 * parseFloat(grb)).toFixed(3);
        grab = (1.618 * gra).toFixed(3);
        grar = (parseFloat(gra) * parseFloat(grab)).toFixed(3);

        document.getElementById("gra").value = gra;
        document.getElementById("grab").value = grab;
        document.getElementById("grar").value = grar;

        goldr_explain.innerHTML = "\\[ a=b\\times (Golden \\space Ratio)\\]" + "\\[\\space =1.618 \\times" + grb + "=" + gra + "\\]";
        goldr_explain.innerHTML += "\\[ a+b=a\\times (Golden \\space Ratio)\\]" + "\\[\\space\\space = 1.618 \\times" + gra + "=" + grab + "\\]";
        goldr_explain.innerHTML += "\\[Area=(a)\\times (a+b)\\]" + "\\[\\space\\space = " + gra + "\\times" + grab + "=" + grar + "\\]";

        renderMathInElement(document.getElementById("goldrec_explain"));
    }
    else if (grab != "") {
        gra = (parseFloat(grab) / 1.618).toFixed(3);
        grb = (gra / 1.618).toFixed(3);
        grar = (parseFloat(gra) * parseFloat(grab)).toFixed(3);

        document.getElementById("gra").value = gra;
        document.getElementById("grb").value = grb;
        document.getElementById("grar").value = grar;

        goldr_explain.innerHTML = "\\[ a=\\frac{a+b}{Golden \\space Ratio}\\]" + "\\[\\space = \\frac{" + grab + "}{1.618}=" + gra + "\\]";
        goldr_explain.innerHTML += "\\[b=\\frac{a}{Golden \\space Ratio}\\]" + "\\[\\space = \\frac{" + gra + "}{1.618}=" + grb + "\\]";
        goldr_explain.innerHTML += "\\[Area=(a)\\times (a+b)\\]" + "\\[\\space\\space = " + gra + "\\times" + grab + "=" + grar + "\\]";

        renderMathInElement(document.getElementById("goldrec_explain"));
    }
    else if (grar != "") {
        gra = (Math.sqrt(parseFloat(grar) / 1.618)).toFixed(3);
        grb = (gra / 1.618).toFixed(3);
        grab = (1.618 * gra).toFixed(3);

        document.getElementById("gra").value = gra;
        document.getElementById("grb").value = grb;
        document.getElementById("grab").value = grab;

        goldr_explain.innerHTML = "\\[ a=\\sqrt{\\frac{Area}{Golden \\space Ratio}}\\]" + "\\[\\space =\\sqrt{ \\frac{" + grar + "}{1.618}}=" + gra + "\\]";
        goldr_explain.innerHTML += "\\[b=\\frac{a}{Golden \\space Ratio}\\]" + "\\[\\space = \\frac{" + gra + "}{1.618}=" + grb + "\\]";
        goldr_explain.innerHTML += "\\[ a+b=a\\times (Golden \\space Ratio)\\]" + "\\[\\space\\space = 1.618 \\times" + gra + "=" + grab + "\\]";

        renderMathInElement(document.getElementById("goldrec_explain"));
    }
}
function diamond() {
    var diamondA = document.getElementById("dinputA").value;
    var diamondB = document.getElementById("dinputB").value;
    var diamondprod = document.getElementById("dprod").value;
    var diamondsum = document.getElementById("dsum").value;
    var diamond_explain = document.getElementById("diamond_explain");

    if (diamondA != "" && diamondB != "") {
        diamondA = parseInt(diamondA);
        diamondB = parseInt(diamondB);
        diamondprod = diamondA * diamondB;
        diamondsum = diamondA + diamondB;
        document.getElementById("dprod").value = diamondprod;
        document.getElementById("dsum").value = diamondsum;
        diamond_explain.innerHTML = "\\[ Product=A*B=" + diamondA + "*" + diamondB + "=" + diamondprod + "\\]";
        diamond_explain.innerHTML += "\\[ Sum=A+B=" + diamondA + "+" + diamondB + "=" + diamondsum + "\\]";
        renderMathInElement(document.getElementById("diamond_explain"));
    }
    else if (diamondA != "" && diamondprod != "") {
        diamondA = parseInt(diamondA);
        diamondprod = parseInt(diamondprod);
        diamondB = diamondprod / diamondA;
        diamondsum = diamondA + diamondB;
        document.getElementById("dinputB").value = diamondB;
        document.getElementById("dsum").value = diamondsum;
        diamond_explain.innerHTML = "\\[ B=Product/A=" + diamondprod + "/" + diamondA + "=" + diamondB + "\\]";
        diamond_explain.innerHTML += "\\[ Sum=A+B=" + diamondA + "+" + diamondB + "=" + diamondsum + "\\]";
        renderMathInElement(document.getElementById("diamond_explain"));

    }
    else if (diamondA != "" && diamondsum != "") {
        diamondA = parseInt(diamondA);
        diamondsum = parseInt(diamondsum);
        diamondB = diamondsum - diamondA;
        diamondprod = diamondA * diamondB;
        document.getElementById("dinputB").value = diamondB;
        document.getElementById("dprod").value = diamondprod;
        diamond_explain.innerHTML = "\\[ B=Sum-A=" + diamondsum + "-" + diamondA + "=" + diamondB + "\\]";
        diamond_explain.innerHTML += "\\[ Product=A*B=" + diamondA + "*" + diamondB + "=" + diamondprod + "\\]";
        renderMathInElement(document.getElementById("diamond_explain"));
    }
    else if (diamondB != "" && diamondprod != "") {
        diamondB = parseInt(diamondB);
        diamondprod = parseInt(diamondprod);
        diamondA = diamondprod / diamondB;
        diamondsum = diamondA + diamondB;
        document.getElementById("dinputA").value = diamondA;
        document.getElementById("dsum").value = diamondsum;
        diamond_explain.innerHTML = "\\[ A=Product/B=" + diamondprod + "/" + diamondB + "=" + diamondA + "\\]";
        diamond_explain.innerHTML += "\\[ Sum=A+B=" + diamondA + "+" + diamondB + "=" + diamondsum + "\\]";
        renderMathInElement(document.getElementById("diamond_explain"));
    }
    else if (diamondB != "" && diamondsum != "") {
        diamondB = parseInt(diamondB);
        diamondsum = parseInt(diamondsum);
        diamondA = diamondsum - diamondB;
        diamondprod = diamondA * diamondB;
        document.getElementById("dinputA").value = diamondA;
        document.getElementById("dprod").value = diamondprod;
        diamond_explain.innerHTML = "\\[ A=Sum-B=" + diamondsum + "-" + diamondB + "=" + diamondA + "\\]";
        diamond_explain.innerHTML += "\\[ Product=A*B=" + diamondA + "*" + diamondB + "=" + diamondprod + "\\]";
        renderMathInElement(document.getElementById("diamond_explain"));
    }
    else if (diamondprod != "" && diamondsum != "") {
        diamondprod = parseInt(diamondprod);
        diamondsum = parseInt(diamondsum);
        let d = diamondsum * diamondsum - 4 * diamondprod;
        if (d < 0) {
            diamond_explain.innerHTML = "\\[ No solution exist for these Product and Sum\\]";
            renderMathInElement(document.getElementById("diamond_explain"));
        }
        else {
            diamondA = (-diamondsum + Math.sqrt(d)) / 2;
            diamondB = (-diamondsum - Math.sqrt(d)) / 2;
            document.getElementById("dinputA").value = diamondA;
            document.getElementById("dinputB").value = diamondB;
            diamond_explain.innerHTML = "\\[ A ,B=" + diamondA + "," + diamondB + "\\]";
            renderMathInElement(document.getElementById("diamond_explain"));
        }
    }
    else {
        diamond_explain.innerHTML = "Enter two values";
    }
}
function fp() {
    var giffnum = parseFloat(document.getElementById("giffnum").value)
    var output = document.getElementById("giffans");
    var temp = "";
    if (!isNaN(giffnum)) {
        "\\[The \\space Fractional \\space Part \\space Function \\space will \\space be,\\]"
        if (giffnum >= 0) {
            var ans1 = Math.floor(giffnum)
            var ans = giffnum - ans1
            temp += "\\[Here, \\space since \\space " + giffnum + " \\space is \\space greater \\space than \\space or \\space equal \\space to \\space 0\\]"
            temp += "\\[Fractional \\space Part \\space = \\space " + giffnum + " \\space - \\space (Largest \\space integer \\space less \\space than \\space or \\space equal \\space to \\space " + giffnum + ")\\]"
            temp += "\\[\\space = \\space " + giffnum + " \\space - \\space " + ans1 + "\\]"
            temp += "\\[\\space = \\space " + ans.toFixed(3) + "\\]"

            output.innerHTML = temp;
        } else {
            var ans1 = Math.abs(giffnum)
            var ans2 = Math.ceil(ans1)
            var ans = ans2 - ans1
            temp += "\\[Here, \\space since \\space " + giffnum + " \\space is \\space less \\space than \\space 0\\]"
            temp += "\\[Fractional \\space Part \\space = \\space (Rounded \\space number \\space up \\space to \\space the \\space next \\space largest \\space integer) \\space of \\space |" + giffnum + "| \\space - \\space |" + giffnum + "|\\]"
            temp += "\\[\\space = \\space (Rounded \\space number \\space up \\space to \\space the \\space next \\space largest \\space integer) \\space  of \\space " + ans1 + " \\space - \\space " + ans1 + "\\]"
            temp += "\\[\\space = \\space " + ans2 + " \\space - \\space " + ans1 + "\\]"
            temp += "\\[\\space = \\space " + ans.toFixed(3) + "\\]"

            output.innerHTML = temp;
        }
    } else {
        temp = "\\[Please \\space enter \\space valid \\space input \\]"

        output.innerHTML = temp;
    }
    renderMathInElement(output);
}

function getUnknown() {
    selectElement =
        document.querySelector('#unknown');
    output = selectElement.value;
    var arr = ["Work", "Time", "Men"];
    for (var i = 0; i < arr.length; i++) {
        var unknown = 'unknown' + arr[i];
        document.getElementById(unknown).style.display = "none";
    }

    if (output == "Work") {
        document.getElementById('unknownWork').style.display = "block";
    } else if (output == "Time") {
        document.getElementById('unknownTime').style.display = "block";
    } else if (output == "Men") {
        document.getElementById('unknownMen').style.display = "block";
    }
}

function findWork() {
    const work1 = parseInt(document.getElementById('1work1').value);
    const time1 = parseInt(document.getElementById('1time1').value);
    const men1 = parseInt(document.getElementById('1men1').value);
    const time2 = parseInt(document.getElementById('1time2').value);
    const men2 = parseInt(document.getElementById('1men2').value);
    var result = document.getElementById('stepswork');

    if (isNaN(work1) || isNaN(time1) || isNaN(men1) || isNaN(time2) || isNaN(men2)) {
        document.getElementById('workans').innerHTML = "Please enter all fields";
    } else {
        if (work1 < 0 || time1 < 0 || men1 < 0 || time2 < 0 || men2 < 0) {
            document.getElementById('workans').innerHTML = "Invalid Input : Value of  WORK/TIME/MEN cant be in negative";
        } else {
            let workans = parseFloat(work1 * (time2 * men2) / (time1 * men1));
            document.getElementById('workans').innerHTML = "The work done is " + workans;
            result.innerHTML += "\\[Working \\space Steps\\]"
            result.innerHTML += "\\[Formula \\space -> \\space W_2 \\space = \\space \\frac{T_2 \\times N_2 \\times W_1}{T_1 \\times N_1}\\]";
            result.innerHTML += "\\[= \\space \\frac{" + time2 + " \\times " + men2 + "\\times " + work1 + "}{" + time1 + "\\times " + men1 + "}\\]";
            result.innerHTML += "\\[= \\space " + workans + "\\]";
            renderMathInElement(result);
        }
    }
}

function findTime() {
    const work1 = parseInt(document.getElementById('2work1').value);
    const time1 = parseInt(document.getElementById('2time1').value);
    const men1 = parseInt(document.getElementById('2men1').value);
    const work2 = parseInt(document.getElementById('2work2').value);
    const men2 = parseInt(document.getElementById('2men2').value);
    var result = document.getElementById('stepstime');

    if (isNaN(work1) || isNaN(time1) || isNaN(men1) || isNaN(work2) || isNaN(men2)) {
        document.getElementById('timeans').innerHTML = "Please enter all fields";
    } else {
        if (work1 < 0 || time1 < 0 || men1 < 0 || work2 < 0 || men2 < 0) {
            document.getElementById('timeans').innerHTML = "Invalid Input : Value of  WORK/TIME/MEN cant be in negative";
        } else {
            let timeans = parseFloat(work2 * (time1 * men1) / (work1 * men2));
            document.getElementById('timeans').innerHTML = "Total time taken = " + timeans;
            result.innerHTML += "\\[Working \\space Steps\\]"
            result.innerHTML += "\\[Formula \\space -> \\space T_2 \\space = \\space \\frac{T_1 \\times N_1 \\times W_2}{N_2 \\times W_1}\\]";
            result.innerHTML += "\\[= \\space \\frac{" + time1 + " \\times " + men1 + "\\times " + work2 + "}{" + men2 + "\\times " + work1 + "}\\]";
            result.innerHTML += "\\[= \\space " + timeans + "\\]";
            renderMathInElement(result);
        }
    }
}

function findMen() {
    const work1 = parseInt(document.getElementById('3work1').value);
    const time1 = parseInt(document.getElementById('3time1').value);
    const men1 = parseInt(document.getElementById('3men1').value);
    const time2 = parseInt(document.getElementById('3time2').value);
    const work2 = parseInt(document.getElementById('3work2').value);
    var result = document.getElementById('stepsmen');


    if (isNaN(work1) || isNaN(time1) || isNaN(men1) || isNaN(work2) || isNaN(time2)) {
        document.getElementById('menans').innerHTML = "Please enter all fields";
    } else {
        if (work1 < 0 || time1 < 0 || men1 < 0 || work2 < 0 || time2 < 0) {
            document.getElementById('menans').innerHTML = "Invalid Input : Value of  WORK/TIME/MEN cant be in negative";
        } else {
            let menans = Math.floor(work2 * (time1 * men1) / (work1 * time2));
            document.getElementById('menans').innerHTML = "No of men required = " + menans;
            result.innerHTML += "\\[Working \\space Steps\\]"
            result.innerHTML += "\\[Formula \\space -> \\space N_2 \\space = \\space \\frac{N_1 \\times T_1 \\times W_2}{T_2 \\times W_1}\\]";
            result.innerHTML += "\\[= \\space \\frac{" + men1 + " \\times " + time1 + "\\times " + work2 + "}{" + time2 + "\\times " + work1 + "}\\]";
            result.innerHTML += "\\[= \\space " + menans + "\\]";
            renderMathInElement(result);
        }
    }
}


function parapipe() {
    var first = document.getElementById("para1").value;
    var second = document.getElementById("para2").value;
    var third = document.getElementById("para3").value;
    var voloutput = document.getElementById("volparapipe");
    var saoutput = document.getElementById("saparapipe");
    var diagoutput = document.getElementById("diagparapipe");
    var voltemp = "";
    var satemp = "";
    var diagtemp = "";
    if ((first != "") && (second != "") && (third != "")) {
        voltemp += "\\[" + first + "*" + second + "*" + third + "\\]";
        voltemp += "\\[Volume \\space of \\space Parallelepiped \\space is \\space \\]";
        voltemp += "\\[" + eval(String(first * second * third)) + "\\]";
        voloutput.innerHTML = voltemp;
        satemp += "\\[ 2(" + first + "\\times " + second + "+" + second + "\\times" + third + "+" + third + "\\times" + first + ") \\]";
        satemp += "\\[Surface \\space Area \\space of \\space Parallelepiped \\space is \\space \\]";
        satemp += "\\[" + eval(String(2 * (first * second + second * third + third * first))) + "\\]";
        saoutput.innerHTML = satemp;
        var dig = eval(String((first * first) + (second * second) + (third * third)));
        var g = nerdamer.sqrt(dig).toString();
        diagtemp += "\\[d= \\sqrt{" + first + "^2+" + second + "^2+" + third + "^2} \\]";
        diagtemp += "\\[ \\sqrt{" + (first * first) + "+" + (second * second) + "+" + (third * third) + "} \\]";
        diagtemp += "\\[ \\sqrt{" + dig + "} \\]";
        diagtemp += "\\[Diagonal \\space of \\space Parallelepiped \\space is \\space \\]";
        diagtemp += "\\[" + eval(g).toFixed(3) + "\\]";
        diagoutput.innerHTML = diagtemp;

        renderMathInElement(voloutput);
        renderMathInElement(saoutput);
        renderMathInElement(diagoutput);

    } else {
        voloutput.innerHTML = "";
        saoutput.innerHTML = "";
        diagoutput.innerHTML = "";
    }
}

function Rhombohedron() {
    var a = parseInt(document.getElementById("rhomhededgea").value);
    var ang = document.getElementById("rhomhedangle").value;
    var a2 = 180 - ang;
    var a1 = ang * math.pi / 180;
    var vol = a ** 3 * (1 - math.cos(a1)) * math.sqrt(1 + 2 * math.cos(a1));
    var area = 6 * a ** 2 * math.sin(a1);

    if (a != "" && ang != "") {
        document.getElementById("rhomhedsecondang").innerHTML = "\\[Second \\space Angle \\space (β) \\space of \\space Rhombohedron \\space \\newline 180 \\degree - " + ang + "= " + a2.toFixed(3) + "\\]";
        document.getElementById("rhomhedvol").innerHTML = "\\[Volume \\space (V) \\space of \\space Rhombohedron \\space \\newline " + a + "^3 \\times (1 - \cos{(" + a1.toFixed(2) + ")}) \\times \\sqrt{ 1 + 2 \cos{(" + a1.toFixed(2) + ")}} \\newline \\space = " + vol.toFixed(3) + "\\]";
        document.getElementById("rhomhedsurarea").innerHTML = "\\[Area \\space (A) \\space of \\space Reuleaux \\space Triangle \\space \\newline 6 \\times " + a + "^2 \\times  \\sin{(" + a1.toFixed(2) + ")} \\newline \\space= " + area.toFixed(3) + "\\]"

        renderMathInElement(document.getElementById("rhomhedsecondang"));
        renderMathInElement(document.getElementById("rhomhedvol"));
        renderMathInElement(document.getElementById("rhomhedsurarea"));

    } else {
        document.getElementById("rhomhedsecondang").innerHTML = "";
        document.getElementById("rhomhedvol").innerHTML = "";
        document.getElementById("rhomhedsurarea").innerHTML = "";
    }
}

function cramer() {
    var a = parseInt(document.getElementById('cab').value);
    var b = parseInt(document.getElementById('cab1').value);
    var c = parseInt(document.getElementById('cab2').value);
    var d = parseInt(document.getElementById('cab3').value);
    var e = parseInt(document.getElementById('cab4').value);
    var f = parseInt(document.getElementById('cab5').value);
    var cramtemp = "";
    var cramoutput = document.getElementById("cramerres");
    if (!isNaN(a) && !isNaN(b) && !isNaN(c) && !isNaN(d) && !isNaN(e) && !isNaN(f)) {
        var res = (a * e) - (b * d);
        var res1 = (c * e) - (b * f);
        var res2 = (a * f) - (c * d);
        var x = (res1 / res);
        var y = (res2 / res);
        cramtemp += "\\[Öncelikle, \\space Hesaplamamız \\space gereken \\space değerler \\space Δ ,\\space  Δ_x, \\space Δ_y\\]"
        cramtemp += "\\[Δ \\space = \\space ((a \\times  e) - (b \\times d))\\]"
        cramtemp += "\\[\\space = \\space ((" + a + " \\times  " + e + ") - (" + b + " \\times " + d + "))\\]"
        cramtemp += "\\[\\space = \\space ((" + (a * e) + ") - (" + (b * d) + "))\\]"
        cramtemp += "\\[\\space = \\space " + res + "\\]"
        cramtemp += "\\[Δ_x \\space = \\space ((c \\times  e) - (b \\times f))\\]"
        cramtemp += "\\[\\space = \\space ((" + c + " \\times  " + e + ") - (" + b + " \\times " + f + "))\\]"
        cramtemp += "\\[\\space = \\space ((" + (c * e) + ") - (" + (b * f) + "))\\]"
        cramtemp += "\\[\\space = \\space " + res1 + "\\]"
        cramtemp += "\\[Δ_y \\space = \\space ((a \\times  f) - (c \\times d))\\]"
        cramtemp += "\\[\\space = \\space ((" + a + " \\times  " + f + ") - (" + c + " \\times " + d + "))\\]"
        cramtemp += "\\[\\space = \\space ((" + (a * f) + ") - (" + (c * d) + "))\\]"
        cramtemp += "\\[\\space = \\space " + res2 + "\\]"
        cramtemp += "\\[Sonuç, \\space X \\space = \\space \\frac{Δ_x}{Δ}\\]"
        cramtemp += "\\[\\space = \\space \\frac{" + res1 + "}{" + res + "} \\space = \\space " + x + "\\]";
        cramtemp += "\\[\\space Y \\space = \\space \\frac{Δ_y}{Δ}\\] \\]"
        cramtemp += "\\[\\space = \\space \\frac{" + res2 + "}{" + res + "} \\space Y = " + y + "\\]";
        cramtemp += "\\[Çözüm \\space kümesi \\space : \\space (X,Y) =  (" + x + "," + y + ") \\]";
        cramoutput.innerHTML = cramtemp;
        renderMathInElement(cramoutput);
    }
    else {
        cramoutput.innerHTML = "\\[Lütfen \\space tüm \\space alanları \\space doldurun\\]";
        renderMathInElement(cramoutput);
    }
}

function faulfind() {
    let p = parseInt(document.getElementById("faulin").value)
    document.getElementById("faulans").innerHTML = "\[\frac{n^{p+1}{p+1}+0.5*n^{p}\]"
}

function solvepenta() {
    var a = document.getElementById("inputsidepenta1").value;
    var b = document.getElementById("inputsidepenta2").value;
    var voloutput = document.getElementById("resultofpentavol");
    var saoutput = document.getElementById("resultofpentaarea");
    var voltemp = "";
    var satemp = "";
    if ((a != "") && (b != "")) {
        voltemp += "\\[ \\frac{" + a + "\\times" + a + "\\times" + b + "}{" + 3 + "}\\]";
        voltemp += "\\[Volume \\space of \\space Pentahedron \\space is \\space \\]";
        voltemp += "\\[" + eval(String((a * a * b) / 3)) + "\\]";
        voloutput.innerHTML = voltemp;
        satemp += "\\[ " + a + "(" + a + "+\\sqrt{" + "(" + "4" + "\\times" + b + "\\times" + b + "+" + a + "\\times" + a + "})" + ")\\]";
        satemp += "\\[Surface \\space Area \\space of \\space Pentahedron \\space is \\space \\]";
        satemp += "\\[" + parseFloat(a) * ((parseFloat(a) + (Math.sqrt((4 * parseFloat(b) * parseFloat(b)) + (parseFloat(a) * parseFloat(a)))))) + "\\]";
        saoutput.innerHTML = satemp;
        renderMathInElement(voloutput);
        renderMathInElement(saoutput);
    }
    else {
        voloutput.innerHTML = "";
        saoutput.innerHTML = "";

    }
}

function solvepentakis() {
    var a = document.getElementById("inputsidepentakis").value;
    var voloutput = document.getElementById("resultofpentakisvol");
    var saoutput = document.getElementById("resultofpentakisarea");
    var boutput = document.getElementById("resultofpentakisb");
    var voltemp = "";
    var satemp = "";
    var btemp = "";
    var vol = 9.394 * a * a * a;
    var area = 21.981 * a * a;
    var b = 0.887 * a;
    if (a != "") {
        voltemp += "\\[ \\frac{15}{76} \\times " + a + "\\times" + a + "\\times" + a + "\\times (23 + 11 \\sqrt{5})" + "\\]";
        voltemp += "\\[Volume \\space of \\space Pentakis \\space Dodecahedron \\space is \\space \\]";
        voltemp += "\\[" + eval(String(vol)) + "\\]";
        voloutput.innerHTML = voltemp;
        satemp += "\\[ \\frac{15}{19} \\times" + a + "\\times" + a + "\\times \\sqrt{413+162 \\sqrt{5}}" + "\\]";
        satemp += "\\[Surface \\space Area \\space of \\space Pentakis \\space Dodecahedron \\space is \\space \\]";
        satemp += "\\[" + eval(String(area)) + "\\]";
        saoutput.innerHTML = satemp;
        btemp += "\\[ \\frac{3}{38} \\times (9+\\sqrt{5})" + "\\]";
        btemp += "\\[Surface \\space Area \\space of \\space Pentakis \\space Dodecahedron \\space is \\space \\]";
        btemp += "\\[" + eval(String(b)) + "\\]";
        boutput.innerHTML = btemp;
        renderMathInElement(voloutput);
        renderMathInElement(saoutput);
        renderMathInElement(boutput);
    }
    else {
        voloutput.innerHTML = "";
        saoutput.innerHTML = "";
        boutput.innerHTML = "";

    }
}
function solveper() {
    var x = parseFloat(document.getElementById('x').value);
    var y = parseFloat(document.getElementById('y').value);
    if (!isNaN(x) || !isNaN(y)) {
        var res = (y * x * 0.01);

        document.getElementById('op1').innerHTML = "\\[ " + y + "\\times " + x + " \\times \\frac{1}{100} \\space = \\space " + res.toFixed(3) + "\\]";
        renderMathInElement(document.getElementById('op'));
        renderMathInElement(document.getElementById('op1'));
    } else {
        document.getElementById('op1').innerHTML = "";
        document.getElementById('op').innerHTML = "\\[Lütfen tüm alanları doldurun\\]";
        renderMathInElement(document.getElementById('op'));
    }
}

function setBits(n) {
    var count = 0;

    while (n > 0) {
        n = n & (n - 1);
        count++;
    }
    return count;
}

function impsefind() {
    var x = (document.getElementById("impse1").value);
    var n = (document.getElementById("impse2").value);
    if (x != "" && n != "") {
        var ans = (x / 81) * (Math.pow(10, n) - 1 - (9 * n));
        document.getElementById("impseans").innerHTML = "\\[The \\space Sum \\space of \\space the \\space sequence \\space  x, \\space xx, \\space xxx,\\space  ……… \\space will \\space be\\]";
        document.getElementById("impseans1").innerHTML = "\\[\\frac{" + x + "}{81} \\times (10^" + n + " \\space - \\space 1 \\space - \\space (9 \\times " + n + ")) \\space = \\space " + (x / 81).toFixed(2) + " \\times " + (Math.pow(10, n) - 1 - (9 * n)).toFixed(2) + " \\space = \\space " + ans.toFixed(3) + "\\]";
        renderMathInElement(document.getElementById('impseans'));
        renderMathInElement(document.getElementById('impseans1'));
    } else {
        document.getElementById('impseans').innerHTML = "";
        document.getElementById('impseans1').innerHTML = "\\[Please \\space enter \\space all \\space Input\\]";
        renderMathInElement(document.getElementById('impseans1'));
    }
}


function gen(n) {
    if (n == 0)
        return 0;


    else if (n == 1)
        return 1;


    else if (n % 2 == 0)
        return 4 * gen(parseInt(n / 2, 10));


    else if (n % 2 == 1)
        return 4 * gen(parseInt(n / 2, 10)) + 1;

    return 0;
}

let N = 1000000007;


function find_count(ele) {
    var count = 0;
    for (let i = 0; i < ele.length; i++) {
        let p = [];
        let c = 0;
        for (let j = ele.length - 1;
            j >= (ele.length - 1 - i) && j >= 0;
            j--)
            p.push(ele[j]);
        let j = ele.length - 1, k = 0;
        while (j >= 0) {
            if (ele[j] != p[k])
                break;
            j--; k++;
            if (k == p.length) {
                c++; k = 0;
            }
        }
        count = Math.max(count, c);
    }
    return count;
}


function twicefind() {
    var a = parseInt(document.getElementById("aofeqn3").value)
    var b = parseInt(document.getElementById("bofeqn3").value)
    var c = parseInt(document.getElementById("cofeqn3").value)
    if (!isNaN(a) && !isNaN(b) && !isNaN(c)) {
        if (2 * b * b == 9 * a * c) {
            document.getElementById("twiceans").innerHTML = "\\[Since \\space here, \\space (2 \\times b \\times b) \\space exactly \\space equals \\space to \\space (9 \\times a \\times c) \\space that \\space  is, \\newline " + (2 * b * b) + " \\space = \\space " + (9 * a * c) + " \\newline Hence, \\space one \\space root \\space  of \\space the \\space Quadratic \\space Equation \\space is \\space twice\\]";
        } else {
            document.getElementById("twiceans").innerHTML = "\\[Since \\space here, \\space (2 \\times b \\times b) \\space NOT \\space equals \\space to \\space (9 \\times a \\times c) \\space that \\space  is, \\newline " + (2 * b * b) + " \\space != \\space " + (9 * a * c) + " \\newline Hence, \\space one \\space root \\space  of \\space the \\space Quadratic \\space Equation \\space is \\space NOT \\space twice\\]";
        }
    } else {
        document.getElementById("twiceans").innerHTML = "\\[Please \\space enter \\space valid \\space input\\]";
    }
    renderMathInElement(document.getElementById("twiceans"));
}

function partialdiffsolve() {
    var ikk = document.getElementById("inputpartialorder");
    if (ikk.value == "") {
        ikk.value = "x";
    }
    var parok = encodeURIComponent(
        document.getElementById("inputpartialdiff").value
    );
    var parorder = encodeURIComponent(
        document.getElementById("inputpartialorder").value
    );
    window.open(
        "https://www.emathhelp.net/calculators/calculus-3/partial-derivative-calculator/?f=" +
        parok +
        "&var=" +
        parorder +
        "&steps=on#solution"
    );
}

var integralvar = "";

function getintegralvar(value) {
    integralvar = value;
}

function solveintegral() {
    if (checkit == "notok" || checkit == "") {
        var inte = encodeURIComponent(
            document.getElementById("inputintegral").value
        );
        window.open(
            "https://www.emathhelp.net/calculators/calculus-2/integral-calculator/?f=" +
            inte +
            "&var=" +
            integralvar +
            "&steps=on#solution"
        );
    }
    if (checkit == "ok") {
        var upperlim = document.getElementById("upperlimit").value;
        var lowerlim = document.getElementById("lowerlimit").value;
        var integ = encodeURIComponent(
            document.getElementById("inputintegral").value
        );
        var iv = "";
        if (upperlim == "" && lowerlim == "") {
            var upperlimmm = "inf";
            var lowerlimmm = "-inf";
        } else if (lowerlim != "" && upperlim == "") {
            var upperlimmm = "inf";
            var lowerlimmm = lowerlim;
        } else if (lowerlim == "" && upperlim != "") {
            var upperlimmm = upperlim;
            var lowerlimmmgf = "-inf";
        } else if (lowerlim != "" && upperlim != "") {
            var upperlimmm = upperlim;
            var lowerlimmm = lowerlim;
        }
        window.open(
            "https://www.emathhelp.net/calculators/calculus-2/definite-integral-calculator/?f=" +
            integ +
            "&var=" +
            integralvar +
            "&a=" +
            lowerlimmm +
            "&b=" +
            upperlimmm +
            "&steps=on#solution"
        );
    }
}

var checkit = "";

function solvelaplace() {
    var lurl = encodeURIComponent(document.getElementById("inputlaplace").value);
    window.open(
        "https://www.emathhelp.net/calculators/differential-equations/laplace-transform-calculator/?f=" +
        lurl +
        "#solution"
    );
}

function solveinverselaplace() {
    var ilurl = encodeURIComponent(
        document.getElementById("inputinverselaplace").value
    );
    window.open(
        "https://www.emathhelp.net/calculators/differential-equations/inverse-laplace-transform-calculator/?f=" +
        ilurl +
        "#solution"
    );
}


function checklimit() {
    let num = parseInt(document.querySelector("#numtable").value);
    let end = parseInt(document.querySelector("#numending").value);
    let error = document.querySelector(".error");

    document.getElementById("resulttable").innerText = "";

    if (num > 25000 || end > 25000)
        error.innerText = "Number cannot be greater than 25000";
    else if (
        (end < 25000 && isNaN(num)) ||
        (num < 25000 && isNaN(end)) ||
        (num < 25000 && end < 25000)
    )
        error.innerText = "";
}

function possible() {
    let N = parseInt(document.getElementById("ssdies").value)
    let a = parseInt(document.getElementById("initialangle").value)
    let b = parseInt(document.getElementById("increangle").value)
    let n = parseInt(document.getElementById("nthside").value)

    let sum_of_angle = 180 * (N - 2);


    let Total_angle = Math.floor((N * ((2 * a) + (N - 1) * b)) / 2);


    if (sum_of_angle != Total_angle)
        document.getElementById("nthans").innerHTML = "Not Possible"
    else {
        let nth = 0;

        nth = a + (n - 1) * b;
        document.getElementById("nthans").innerHTML = "The angle of nth side will be " + nth
    }

}
function printtable() {
    var temp =
        "<table class='table table-bordered' style='color:white;width: 50px; padding: 0; margin: 0 auto; border:2px solid light-grey;'>";
    var num = parseFloat(document.getElementById("numtable").value);
    var end = parseInt(document.getElementById("numending").value);

    if (num == "" && end == "") {
        document.getElementById("resulttable").innerHTML = "";
    } else if (String(num) != "NaN" && String(end) != "NaN") {
        for (var i = 1; i <= end; i++) {
            temp += "<tr>";
            temp +=
                "<td>" +
                num +
                "</td><td>×</td><td>" +
                i +
                "</td><td>=</td><td>" +
                (num * i).toFixed(2) +
                "</td>";
            temp += "</tr>";
        }
        temp += "</table>";
        document.getElementById("resulttable").innerHTML = "<b>" + temp + "</b>";
    }
}

function endpointsolve() {
    var X1, X2, Y1, Y2;
    X1 = parseFloat(document.getElementById('xOne').value);
    X2 = parseFloat(document.getElementById('xTwo').value);
    Y1 = parseFloat(document.getElementById('yOne').value);
    Y2 = parseFloat(document.getElementById('yTwo').value);
    var explain_end = document.getElementById("dis_formula");
    var temp = "";
    if (isNaN(X1) || isNaN(X2) || isNaN(Y1) || isNaN(Y2)) {
        temp += "\\[Please \\space enter \\space all \\space fields \\]";
        explain_mid.innerHTML = temp;
        renderMathInElement(explain_mid);
        document.getElementById('outPut').innerHTML = "";
    } else {
        var endpoint1 = (2 * X2 - X1);
        var endpoint2 = (2 * Y2 - Y1);
        if (X1 < 0 && Y1 > 0) {
            temp += "\\[Endpoint \\space coordinates \\space given  \\space starting \\space and \\space midpoint \\space coordinates \\space is  \\] ";
            temp += "\\[ ( 2*x2 - x1 \\space , \\space 2*y2-y1 ) \\]";
            temp += "\\[ (2 \\times " + X2 + "-(" + X1 + " )\\space , \\space 2\\times" + Y2 + " -" + Y1 + " ) \\]";
            explain_end.innerHTML = temp;
            renderMathInElement(explain_end);
            document.getElementById('outPut').innerHTML = 'The endpoint where starting coordinates (' + X1 + ',' + Y1 + ') and midpoint coordinates (' + X2 + ',' + Y2 + ') is ' + '(' + endpoint1 + ',' + endpoint2 + ')';
        }
        else if (X1 > 0 && Y1 < 0) {
            temp += "\\[Endpoint \\space coordinates \\space given  \\space starting \\space and \\space midpoint \\space coordinates \\space is  \\] ";
            temp += "\\[ ( 2*x2 - x1 \\space , \\space 2*y2-y1 ) \\]";
            temp += "\\[ (2 \\times " + X2 + "-" + X1 + " \\space , \\space 2\\times" + Y2 + "-(" + Y1 + " )) \\]";
            explain_end.innerHTML = temp;
            renderMathInElement(explain_end);
            document.getElementById('outPut').innerHTML = 'The endpoint where starting coordinates (' + X1 + ',' + Y1 + ') and midpoint coordinates (' + X2 + ',' + Y2 + ') is ' + '(' + endpoint1 + ',' + endpoint2 + ')';
        }
        else {
            temp += "\\[Endpoint \\space coordinates \\space given  \\space starting \\space and \\space midpoint \\space coordinates \\space is  \\] ";
            temp += "\\[ ( 2*x2 - x1 \\space , \\space 2*y2-y1 ) \\]";
            temp += "\\[ (2 \\times " + X2 + "-" + X1 + " \\space , \\space 2\\times" + Y2 + "-" + Y1 + " ) \\]";
            explain_end.innerHTML = temp;
            renderMathInElement(explain_end);
            document.getElementById('outPut').innerHTML = 'The endpoint where starting coordinates (' + X1 + ',' + Y1 + ') and midpoint coordinates (' + X2 + ',' + Y2 + ') is ' + '(' + endpoint1 + ',' + endpoint2 + ')';
        }
    }
}
function angleb() {

    var a = parseFloat(document.getElementById('aba1').value);
    var b = parseFloat(document.getElementById('abb1').value);
    var c = parseFloat(document.getElementById('abc1').value);
    var d = parseFloat(document.getElementById('aba2').value);
    var e = parseFloat(document.getElementById('abb2').value);
    var f = parseFloat(document.getElementById('abc2').value);

    var x = (a * a) + (b * b);
    var y = (d * d) + (e * e);

    document.getElementById('abr').innerHTML = "\\[ \\newline Angle \\space Bisector \\space \\newline \\newline"
    document.getElementById('abr').innerHTML += "  \\frac{ " + a + " x \\space + ( " + b + " )y \\space + ( " + c + " ) } { \\sqrt { " + x + "} } \\space = ";
    document.getElementById('abr').innerHTML += " \\pm \\frac{ " + d + " x \\space + ( " + e + " )y \\space + ( " + f + " ) } { \\sqrt { " + y + "} } \\space  \\]";
    renderMathInElement(document.getElementById("abr"));


}

function anglesolve() {
    var a1 = parseFloat(document.getElementById('aone').value);
    var b1 = parseFloat(document.getElementById('bone').value);
    var c1 = parseFloat(document.getElementById('cone').value);
    var a2 = parseFloat(document.getElementById('atwo').value);
    var b2 = parseFloat(document.getElementById('btwo').value);
    var c2 = parseFloat(document.getElementById('ctwo').value);

    if (isNaN(a1) || isNaN(b1) || isNaN(a2) || isNaN(b2)) {
        document.getElementById("formula").innerHTML = "\\[Please \\space enter \\space all \\space fields \\]";
        document.getElementById("formula1").innerHTML = "";
        document.getElementById("formula2").innerHTML = "";
        document.getElementById("formula3").innerHTML = "";
        document.getElementById('inter_output').innerHTML = "";
        renderMathInElement(document.getElementById("formula"));
        renderMathInElement(document.getElementById("formula1"));
        renderMathInElement(document.getElementById("formula2"));
        renderMathInElement(document.getElementById("formula3"));
        renderMathInElement(document.getElementById("inter_output"));
    } else {
        var M1 = (-a1) / b1;
        var M2 = (-a2) / b2;
        var angle = Math.atan((M2 - M1) / (1 + M1 * M2));
        document.getElementById("formula").innerHTML = "\\[Angle \\space between \\space two \\space lines \\space \\space m1 = \\frac{(-" + a1 + ")}{" + b1 + "}  \\space , \\space m2 = \\frac{(-" + a2 + ")}{" + b2 + "}\\] ";
        document.getElementById("formula1").innerHTML = "\\[\\space = \\space tan^{-1}(\\frac{m2 - m1}{1+m1 \\times m2})\\]";
        document.getElementById("formula2").innerHTML = "\\[\\space = \\space tan^{-1}(\\frac{(" + M2.toFixed(2) + ") - (" + M1.toFixed(2) + ")}{1+ (" + M1.toFixed(2) + ") \\times (" + M2.toFixed(2) + ")}) \\]";
        document.getElementById('inter_output').innerHTML = "\\[Angle \\space is \\space \\frac{" + angle.toFixed(3) + "}{\\pi} \\space = \\space" + (angle * 180 / Math.PI).toFixed(1) + "\\degree\\]";
        renderMathInElement(document.getElementById("formula"));
        renderMathInElement(document.getElementById("formula1"));
        renderMathInElement(document.getElementById("formula2"));
        renderMathInElement(document.getElementById("inter_output"));

    }
}

function interpointsolve() {
    var a1 = parseFloat(document.getElementById('aone').value);
    var b1 = parseFloat(document.getElementById('bone').value);
    var c1 = parseFloat(document.getElementById('cone').value);
    var a2 = parseFloat(document.getElementById('atwo').value);
    var b2 = parseFloat(document.getElementById('btwo').value);
    var c2 = parseFloat(document.getElementById('ctwo').value);

    if (isNaN(a1) || isNaN(b1) || isNaN(c1) || isNaN(a2) || isNaN(b2) || isNaN(c2)) {
        document.getElementById("formula").innerHTML = "\\[Please \\space enter \\space all \\space fields \\]";
        document.getElementById("formula1").innerHTML = "";
        document.getElementById("formula2").innerHTML = "";
        document.getElementById("formula3").innerHTML = "";
        document.getElementById('inter_output').innerHTML = "";
        renderMathInElement(document.getElementById("formula"));
        renderMathInElement(document.getElementById("formula1"));
        renderMathInElement(document.getElementById("formula2"));
        renderMathInElement(document.getElementById("formula3"));
        renderMathInElement(document.getElementById("inter_output"));
    } else {
        var point1 = ((b1 * c2 - b2 * c1) / (a1 * b2 - a2 * b1)).toFixed(1);
        var point2 = ((a2 * c1 - a1 * c2) / (a1 * b2 - a2 * b1)).toFixed(1);
        document.getElementById("formula").innerHTML = "\\[Intersection \\space point \\space\\]"
        document.getElementById("formula1").innerHTML = "\\[ \\space =\\space  (\\frac{b1 \\times c2 - b2 \\times c1}{a1 \\times b2 - a2 \\times b1}, \\space \\frac{a2 \\times c1 - a1 \\times c2}{a1 \\times b2 - a2 \\times b1} ) \\] ";
        document.getElementById("formula2").innerHTML = "\\[ \\space =\\space  (\\frac{" + b1 + " \\times " + c2 + " - " + b2 + " \\times " + c1 + "}{" + a1 + " \\times " + b2 + " - " + a2 + " \\times " + b1 + "}, \\space \\frac{" + a2 + " \\times " + c1 + " - " + a1 + " \\times " + c2 + "}{" + a1 + " \\times " + b2 + " - " + a2 + " \\times " + b1 + "} ) \\] ";
        document.getElementById("formula3").innerHTML = "\\[ \\space =\\space  (\\frac{" + (b1 * c2 - b2 * c1).toFixed(2) + "}{" + (a1 * b2 - a2 * b1).toFixed(2) + "}, \\space \\frac{" + (a2 * c1 - a1 * c2).toFixed(2) + "}{" + (a1 * b2 - a2 * b1).toFixed(2) + "}) \\] ";
        document.getElementById('inter_output').innerHTML = "\\[The \\space intersection \\space point \\space of \\space " + a1 + "x +" + b1 + "y +" + c1 + "= 0 \\space and \\space " + a2 + "x +" + b2 + "y +" + c2 + "= 0 \\space is \\space (" + point1 + "," + point2 + ")\\]";
        renderMathInElement(document.getElementById("formula"));
        renderMathInElement(document.getElementById("formula1"));
        renderMathInElement(document.getElementById("formula2"));
        renderMathInElement(document.getElementById("formula3"));
        renderMathInElement(document.getElementById("inter_output"));
    }
}


function calculatePrimorial(n) {
    let result = 1;
    for (let i = 0; i < n; i++)
        result = result * primes[i];
    return result;
}

let MAX = 100000;
let primes = [];
function sieveSundaram() {
    let marked = new Array(MAX / 2 + 1).fill(0);
    for (let i = 1; i <= (Math.sqrt(MAX) - 1) / 2; i++)
        for (let j = (i * (i + 1)) << 1;
            j <= MAX / 2; j += 2 * i + 1)
            marked[j] = true;
    primes.push(2);
    for (let i = 1; i <= MAX / 2; i++)
        if (marked[i] == false)
            primes.push(2 * i + 1);
}

function Hosoya(n, m) {
    if ((n == 0 && m == 0) || (n == 1 && m == 0) || (n == 1 && m == 1) || (n == 2 && m == 1)) {
        return 1;
    }
    if (n > m)
        return Hosoya(n - 1, m) + Hosoya(n - 2, m);

    else if (m == n)
        return Hosoya(n - 1, m - 1) + Hosoya(n - 2, m - 2);

    else
        return 0;
}


function alisum2find() {
    let n = parseInt(document.getElementById("alisum2").value)
    if (!isNaN(n)) {
        Set < Integer > v;
        v = ABUNDANT();
        for (let i = 1; i <= n; i++) {
            if (v.contains(i) & v.contains(n - i)) {
                document.getElementById("alisum2ans").innerHTML = i + " " + (n - i);
                return;
            }
        }
        document.getElementById("alisum2exp").innerHTML = "\\[if j is proper divisor sum+=j\\]"
        document.getElementById("alisum2exp").innerHTML = "\\[if i is not a perfect square sum +=i/j\\]"
        document.getElementById("alisum2exp").innerHTML = "\\[if sum is greater than i then i is a abundant number\\]"
        renderMathInElement(document.getElementById("alisum2exp"))
    }
    else
        document.getElementById("alisum2ans").innerHTML = "Please Enter valid input"
}

function ABUNDANT() {
    Set < Integer > v;
    v = new HashSet();
    for (let i = 1; i < N; i++) {
        let sum = 1;
        for (let j = 2; j * j <= i; j++) {
            if (i % j == 0) {
                sum += j;
                if (i / j != j) {
                    sum += i / j;
                }
            }
        }
        if (sum > i) {
            v.add(i);
        }
    }

    return v;
}

function getSum(n) {
    let sum = 0;
    for (let i = 1; i <= Math.sqrt(n); i++) {
        if (n % i == 0) {
            if (n / i == i)
                sum = sum + i;
            else {
                sum = sum + i;
                sum = sum + (n / i);
            }
        }
    }
    return sum;
}
function checkAbundant(n) {
    return (getSum(n) - n > n);
}
function isDeficient(n) {
    return (getSum(n) < (2 * n));
}
function dispointsolve() {
    var a, b, c;
    a = parseFloat(document.getElementById('a').value);
    b = parseFloat(document.getElementById('b').value);
    c = parseFloat(document.getElementById('c').value);
    x1 = parseFloat(document.getElementById('point_one').value);
    y1 = parseFloat(document.getElementById('point_two').value);

    if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(x1) || isNaN(y1)) {
        document.getElementById("dis_point").innerHTML = "\\[ Please \\space enter \\space all \\space fields \\]";
        document.getElementById("dis_point1").innerHTML = "";
        document.getElementById("dis_point2").innerHTML = "";
        document.getElementById('dis_op').innerHTML = "";
        renderMathInElement(document.getElementById("dis_point"));
        renderMathInElement(document.getElementById("dis_point1"));
        renderMathInElement(document.getElementById("dis_point2"));
        renderMathInElement(document.getElementById("dis_op"));
    } else {
        var dis = (Math.abs(a * x1 + b * y1 + c)) / (Math.sqrt(a * a + b * b)).toFixed(2);
        document.getElementById("dis_point").innerHTML = "\\[Distance \\space between \\space point \\space and \\space a \\space line \\space  = \\space  \\frac{A \\times x1 + B \\times y1 + C}{\\sqrt{A^2+B^2}} \\space\\]";
        document.getElementById("dis_point1").innerHTML = "\\[\\frac{" + a + "\\times " + x1 + " \\space + \\space " + b + " \\times " + y1 + " \\space + \\space " + c + "}{\\sqrt{" + a + "^2 \\space + \\space " + b + "^2}} \\space\\]";
        document.getElementById("dis_point2").innerHTML = "\\[\\frac{" + (Math.abs(a * x1 + b * y1 + c)) + "}{" + (Math.sqrt(a * a + b * b)).toFixed(2) + "} \\space = \\space " + dis.toFixed(2) + "\\] ";
        document.getElementById('dis_op').innerHTML = "\\[The \\space distance \\space between \\space (" + x1 + "," + y1 + ") \\space and \\space" + a + "x" + "+" + b + "y" + "+" + c + "=0 \\space is  \\space" + dis.toFixed(3) + "\\]";
        renderMathInElement(document.getElementById("dis_point"));
        renderMathInElement(document.getElementById("dis_point1"));
        renderMathInElement(document.getElementById("dis_point2"));
        renderMathInElement(document.getElementById("dis_op"));
    }
}

function reflex() {
    var a = parseFloat(document.getElementById('plpa').value);
    var b = parseFloat(document.getElementById('plpb').value);
    var c = parseFloat(document.getElementById('plpc').value);
    var x1 = parseFloat(document.getElementById('plpx').value);
    var y1 = parseFloat(document.getElementById('plpy').value);



    var dis = -2 * (((a * x1) + (b * y1) - c) / (a ^ 2 + b ^ 2));

    var x = a * dis + x1;
    var y = b * dis + y1;
    if (isNaN(x1) || isNaN(y1) || isNaN(a) || isNaN(b) || isNaN(c)) {
        document.getElementById('plp_op').innerHTML = "\\[ Please \\space enter \\space all \\space input \\]";
        renderMathInElement(document.getElementById("plp_op"));
    } else {

        document.getElementById('plp_op').innerHTML = 'Reflexation Of  point (' + x1 + ',' + y1 + ')  by Line  ' + a + 'x' + b + 'y' + '=' + c + 'is ( ' + x + ' , ' + y + ' )';

    }
}

function foot() {
    var a = parseFloat(document.getElementById('plpa').value);
    var b = parseFloat(document.getElementById('plpb').value);
    var c = parseFloat(document.getElementById('plpc').value);
    var x1 = parseFloat(document.getElementById('plpx').value);
    var y1 = parseFloat(document.getElementById('plpy').value);

    var work = document.getElementById("ppp_work");

    var dis = -(((a * x1) + (b * y1) - c) / (a ^ 2 + b ^ 2));

    var x = a * dis + x1;
    var y = b * dis + y1;
    if (isNaN(x1) || isNaN(y1) || isNaN(a) || isNaN(b) || isNaN(c)) {
        document.getElementById('plp_op').innerHTML = "\\[ Please \\space enter \\space all \\space input \\]";
        renderMathInElement(document.getElementById("plp_op"));
    } else {

        document.getElementById('plp_op').innerHTML = 'Foot Of  point (' + x1 + ',' + y1 + ')  on Line  ' + a + 'x' + b + 'y' + '=' + c + 'is ( ' + x + ' , ' + y + ' )';

        renderMathInElement(work);
    }
}

function perpendicularsolve() {
    var x1, y1, x2, y2, x3, y3, x4, y4;
    x1 = parseFloat(document.getElementById('xone').value);
    y1 = parseFloat(document.getElementById('yone').value);
    x2 = parseFloat(document.getElementById('xtwo').value);
    y2 = parseFloat(document.getElementById('ytwo').value);
    x3 = parseFloat(document.getElementById('xthree').value);
    y3 = parseFloat(document.getElementById('ythree').value);
    x4 = parseFloat(document.getElementById('xfour').value);
    y4 = parseFloat(document.getElementById('yfour').value);
    var explain = document.getElementById("line1");
    var explain1 = document.getElementById("line2");

    if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2) || isNaN(x3) || isNaN(y3) || isNaN(x4) || isNaN(y4)) {
        explain.innerHTML = "\\[Please \\space enter \\space all \\space fields \\]";
        explain1.innerHTML = "";
        renderMathInElement(explain);
        renderMathInElement(explain1);
    } else {
        var m1 = (y2 - y1) / (x2 - x1);
        var m2 = (y4 - y3) / (x4 - x3);
        if (m1 * m2 == -1) {
            explain.innerHTML = "\\[Lines \\space y \\space - \\space " + y1 + " = " + " \\frac{" + y2 + "-" + y1 + "}{" + x2 + "-" + x1 + "}" + "( \\space x \\space - \\space " + x1 + ") \\space and \\space " + " y \\space - \\space " + y3 + " = " + "\\frac{" + y4 + "-" + y3 + "}{" + x4 + "-" + x3 + "}" + "( \\space x \\space - \\space " + x3 + ") \\space are \\space Perpendicular" + "\\] ";
            renderMathInElement(document.getElementById("line1"));
        }
        else {
            explain.innerHTML = "\\[Lines \\space y \\space - \\space" + y1 + " = " + " \\frac{" + y2 + "-" + y1 + "}{" + x2 + "-" + x1 + "}" + "( \\space x \\space - \\space " + x1 + ") \\space and \\space " + " y \\space - \\space " + y3 + " = " + "\\frac{" + y4 + "-" + y3 + "}{" + x4 + "-" + x3 + "}" + "( \\space x \\space - \\space " + x3 + ") \\space are \\space not \\space Perpendicular" + "\\] ";
            renderMathInElement(document.getElementById("line1"));
        }
    }
}
function parallelsolve() {
    var x1, y1, x2, y2, x3, y3, x4, y4;
    x1 = parseFloat(document.getElementById('xone').value);
    y1 = parseFloat(document.getElementById('yone').value);
    x2 = parseFloat(document.getElementById('xtwo').value);
    y2 = parseFloat(document.getElementById('ytwo').value);
    x3 = parseFloat(document.getElementById('xthree').value);
    y3 = parseFloat(document.getElementById('ythree').value);
    x4 = parseFloat(document.getElementById('xfour').value);
    y4 = parseFloat(document.getElementById('yfour').value);
    var explain = document.getElementById("line1");
    var explain1 = document.getElementById("line2");
    var m1 = (y2 - y1) / (x2 - x1);
    var m2 = (y4 - y3) / (x4 - x3);
    if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2) || isNaN(x3) || isNaN(y3) || isNaN(x4) || isNaN(y4)) {
        explain.innerHTML = "\\[ Please \\space enter \\space all \\space input \\]";
        renderMathInElement(document.getElementById("line1"));
        document.getElementById('line2').innerHTML = "";
    }
    else {
        if (m1 == m2) {
            explain.innerHTML = "\\[Lines \\space y \\space - \\space" + y1 + "=" + "\\frac{" + y2 + "-" + y1 + "}{" + x2 + "-" + x1 + "}" + "( \\space x \\space - \\space " + x1 + ") \\space and \\space " + "y \\space - \\space" + y3 + "=" + "\\frac{" + y4 + "-" + y3 + "}{" + x4 + "-" + x3 + "}" + "( \\space x \\space - \\space " + x3 + ") \\space are \\space Parallel" + "\\] ";
            renderMathInElement(document.getElementById("line1"));

        }
        else {
            explain.innerHTML = "\\[Lines \\space y \\space - \\space" + y1 + "=" + "\\frac{" + y2 + "-" + y1 + "}{" + x2 + "-" + x1 + "}" + "( \\space x \\space - \\space " + x1 + ") \\space and \\space " + "y \\space - \\space" + y3 + "=" + "\\frac{" + y4 + "-" + y3 + "}{" + x4 + "-" + x3 + "}" + "( \\space x \\space - \\space " + x3 + ") \\space are \\space not \\space Parallel" + "\\] ";
            renderMathInElement(document.getElementById("line1"));

        }
    }

}
function solvesection() {
    var x1, y1, x2, y2, m, n;
    x1 = parseFloat(document.getElementById('x1').value);
    y1 = parseFloat(document.getElementById('y1').value);
    x2 = parseFloat(document.getElementById('x2').value);
    y2 = parseFloat(document.getElementById('y2').value);
    m = parseFloat(document.getElementById('m').value);
    n = parseFloat(document.getElementById('n').value);
    var explain = document.getElementById("sec_formula");
    if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2) || isNaN(m) || isNaN(n)) {
        explain.innerHTML = "\\[ Please \\space enter \\space all \\space input \\]";
        renderMathInElement(document.getElementById("sec_formula"));
        document.getElementById('output').innerHTML = "";
    }
    else {
        explain.innerHTML = "\\[ \\space (x,\\space y) \\space = ( \\frac{mx2 \\space + \\space nx1}{m \\space + \\space n} , \\space \\frac{my2 \\space + \\space ny1}{m \\space + \\space n} ) \\space =" + " ( \\frac{" + m + "\\times" + x2 + "+" + n + "\\times" + x1 + "}{" + m + "+" + n + "}" + "," + "\\frac{" + m + "\\times" + y2 + "+" + n + "\\times" + y1 + "}{" + m + "+" + n + "} )" + "\\] ";
        renderMathInElement(document.getElementById("sec_formula"));
        var pt1 = (m * x2 + n * x1) / (m + n);
        var pt2 = (m * y2 + n * y1) / (m + n);
        document.getElementById('output').innerHTML = 'Point dividing (' + x1 + ',' + y1 + ') and (' + x2 + ',' + y2 + ') in the ratio ' + m + ':' + n + ' is (' + pt1 + ', ' + pt2 + ')';
    }
}

function directl() {
    var x1, y1, x2, y2, m, n;
    x1 = parseFloat(document.getElementById('ctx1').value);
    y1 = parseFloat(document.getElementById('cty1').value);
    x2 = parseFloat(document.getElementById('ctx2').value);
    y2 = parseFloat(document.getElementById('cty2').value);
    m = parseFloat(document.getElementById('ctm1').value);
    n = parseFloat(document.getElementById('ctm2').value);

    if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2) || isNaN(m) || isNaN(n)) {
        document.getElementById('comt2').innerHTML = "\\[ Please \\space enter \\space all \\space input \\]";
        renderMathInElement(document.getElementById("comt1"));
        document.getElementById('comt1').innerHTML = "";
    }
    else {
        document.getElementById('comt1').innerHTML = "\\[ Length \\space of \\space direct \\space common \\space tangent \\space = \\sqrt{(C1C2)^2 - (r1-r1)^2} \\] ";

        var answer = Math.sqrt((x1 - x2) ^ 2 + (y1 - y2) ^ 2 - (m - n) ^ 2);

        document.getElementById('comt2').innerHTML = "\\[ = " + answer + " \\] ";
        renderMathInElement(document.getElementById("comt1"));
        renderMathInElement(document.getElementById("comt2"));
    }
}

function transl() {
    var x1, y1, x2, y2, m, n;
    x1 = parseFloat(document.getElementById('ctx1').value);
    y1 = parseFloat(document.getElementById('cty1').value);
    x2 = parseFloat(document.getElementById('ctx2').value);
    y2 = parseFloat(document.getElementById('cty2').value);
    m = parseFloat(document.getElementById('ctm1').value);
    n = parseFloat(document.getElementById('ctm2').value);

    if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2) || isNaN(m) || isNaN(n)) {
        document.getElementById('comt2').innerHTML = "\\[ Please \\space enter \\space all \\space input \\]";
        renderMathInElement(document.getElementById("comt1"));
        document.getElementById('comt1').innerHTML = "";
    }
    else {
        document.getElementById('comt1').innerHTML = "\\[ Length \\space of \\space Transvers \\space common \\space tangent \\space = \\sqrt{(C1C2)^2 - (r1+r1)^2} \\] ";

        var answer = Math.sqrt((x1 - x2) ^ 2 + (y1 - y2) ^ 2 - (m + n) ^ 2);

        document.getElementById('comt2').innerHTML = "\\[ = " + answer + " \\] ";
        renderMathInElement(document.getElementById("comt1"));
        renderMathInElement(document.getElementById("comt2"));
    }
}

function vectorsection() {
    var x1, y1, x2, y2, m, n;
    x1 = parseFloat(document.getElementById('inp001').value);
    y1 = parseFloat(document.getElementById('inp002').value);
    z1 = parseFloat(document.getElementById('inp003').value);
    x2 = parseFloat(document.getElementById('inp004').value);
    y2 = parseFloat(document.getElementById('inp005').value);
    z2 = parseFloat(document.getElementById('inp006').value);
    m = parseFloat(document.getElementById('m1').value);
    n = parseFloat(document.getElementById('n11').value);
    var explain = document.getElementById("vectorsection1");
    var temp = "";
    if (!isNaN(x1) && !isNaN(y1) && !isNaN(z1) && !isNaN(x2) && !isNaN(y2) && !isNaN(z2) && !isNaN(m) && !isNaN(n)) {
        temp += "\\[The \\space Position \\space vector \\space of \\space point \\space dividing \\space the \\space line \\space segment \\space joining \\space two \\space points \\space P \\space and \\space Q \\space in \\space the \\space ratio \\space m:n \\space is \\space given \\space by \\]";
        temp += "\\[Internally : \\space \\frac{m \\space \\overrightarrow{b} \\space + \\space n \\space \\overrightarrow{a}}{m+n} \\]";
        temp += "\\[\\overrightarrow{OP} \\space = \\space " + x1 + "\\hat{i} + " + y1 + "\\hat{j} + " + z1 + "\\hat{k} \\space and \\space  \\overrightarrow{OQ} \\space = \\space " + x2 + "\\hat{i} + " + y2 + "\\hat{j} + " + z2 + "\\hat{k} \\]";
        temp += "\\[\\overrightarrow{OR} \\space = \\space \\frac{(" + m + " ( " + x2 + "\\hat{i} + " + y2 + "\\hat{j} + " + z2 + "\\hat{k} )) + (" + n + " ( " + x1 + "\\hat{i} + " + y1 + "\\hat{j} + " + z1 + "\\hat{k} )) }{" + m + "+" + n + "} \\space = \\space \\frac{ ( " + (m * x2) + "\\hat{i} + " + (m * y2) + "\\hat{j} + " + (m * z2) + "\\hat{k} ) + ( " + (n * x1) + "\\hat{i} + " + (n * y1) + "\\hat{j} + " + (n * z1) + "\\hat{k} ) }{" + (m + n) + "} \\]";
        temp += "\\[\\frac{" + ((m * x2) + (n * x1)) + "\\hat{i} + " + ((m * y2) + (n * y1)) + "\\hat{j} + " + ((m * z2) + (n * z1)) + "\\hat{k} }{" + (m + n) + "} \\space = \\space \\frac{" + ((m * x2) + (n * x1)) + "}{" + (m + n) + "} \\hat{i} + \\frac{" + ((m * y2) + (n * y1)) + "}{" + (m + n) + "} \\hat{j} + \\frac{" + ((m * z2) + (n * z1)) + "}{" + (m + n) + "} \\hat{k} \\]";
        explain.innerHTML = temp;
        renderMathInElement(explain);
    }
    else {
        temp += "\\[ Please \\space enter \\space all \\space input \\]";
        explain.innerHTML = temp;
        renderMathInElement(explain);
    }
}

function vectorsection2() {
    var x1, y1, x2, y2, m, n;
    x1 = parseFloat(document.getElementById('inp001').value);
    y1 = parseFloat(document.getElementById('inp002').value);
    z1 = parseFloat(document.getElementById('inp003').value);
    x2 = parseFloat(document.getElementById('inp004').value);
    y2 = parseFloat(document.getElementById('inp005').value);
    z2 = parseFloat(document.getElementById('inp006').value);
    m = parseFloat(document.getElementById('m1').value);
    n = parseFloat(document.getElementById('n11').value);
    var explain = document.getElementById("vectorsection1");
    var temp = "";
    if (!isNaN(x1) && !isNaN(y1) && !isNaN(z1) && !isNaN(x2) && !isNaN(y2) && !isNaN(z2) && !isNaN(m) && !isNaN(n)) {
        temp += "\\[The \\space Position \\space vector \\space of \\space point \\space dividing \\space the \\space line \\space segment \\space joining \\space two \\space points \\space P \\space and \\space Q \\space in \\space the \\space ratio \\space m:n \\space is \\space given \\space by \\]";
        temp += "\\[Externally : \\space \\frac{m \\space \\overrightarrow{b} \\space - \\space n \\space \\overrightarrow{a}}{m-n} \\]";
        temp += "\\[\\overrightarrow{OP} \\space = \\space " + x1 + "\\hat{i} + " + y1 + "\\hat{j} + " + z1 + "\\hat{k} \\space and \\space  \\overrightarrow{OQ} \\space = \\space " + x2 + "\\hat{i} + " + y2 + "\\hat{j} + " + z2 + "\\hat{k} \\]";
        temp += "\\[\\overrightarrow{OR} \\space = \\space \\frac{(" + m + " ( " + x2 + "\\hat{i} + " + y2 + "\\hat{j} + " + z2 + "\\hat{k} )) - (" + n + " ( " + x1 + "\\hat{i} + " + y1 + "\\hat{j} + " + z1 + "\\hat{k} )) }{" + m + "-" + n + "} \\space = \\space \\frac{ ( " + (m * x2) + "\\hat{i} + " + (m * y2) + "\\hat{j} + " + (m * z2) + "\\hat{k} ) - ( " + (n * x1) + "\\hat{i} + " + (n * y1) + "\\hat{j} + " + (n * z1) + "\\hat{k} ) }{" + (m - n) + "} \\]";
        temp += "\\[\\frac{" + ((m * x2) - (n * x1)) + "\\hat{i} + " + ((m * y2) - (n * y1)) + "\\hat{j} + " + ((m * z2) - (n * z1)) + "\\hat{k} }{" + (m - n) + "} \\space = \\space \\frac{" + ((m * x2) - (n * x1)) + "}{" + (m - n) + "} \\hat{i} + \\frac{" + ((m * y2) - (n * y1)) + "}{" + (m - n) + "} \\hat{j} + \\frac{" + ((m * z2) - (n * z1)) + "}{" + (m - n) + "} \\hat{k} \\]";
        explain.innerHTML = temp;
        renderMathInElement(explain);
    }
    else {
        temp += "\\[ Please \\space enter \\space all \\space input \\]";
        explain.innerHTML = temp;
        renderMathInElement(explain);
    }
}


function circumsolve() {
    var x1, y1, x2, y2, x3, y3, A, B, C;
    x1 = parseFloat(document.getElementById('X1st').value);
    y1 = parseFloat(document.getElementById('Y1st').value);
    x2 = parseFloat(document.getElementById('X2st').value);
    y2 = parseFloat(document.getElementById('Y2st').value);
    x3 = parseFloat(document.getElementById('X3st').value);
    y3 = parseFloat(document.getElementById('Y3st').value);
    A = parseFloat(document.getElementById('angleA').value);
    B = parseFloat(document.getElementById('angleB').value);
    C = parseFloat(document.getElementById('angleC').value);
    var circenterop = document.getElementById("cir_output");
    var temp = "";
    var c1 = (((x1 * Math.sin(2 * A * Math.PI / 180.0)) + (x2 * Math.sin(2 * B * Math.PI / 180.0)) + (x3 * Math.sin(2 * C * Math.PI / 180.0))) / (Math.sin(2 * A * Math.PI / 180.0) + Math.sin(2 * B * Math.PI / 180.0) + Math.sin(2 * C * Math.PI / 180.0))).toFixed(1)
    var c2 = (((y1 * Math.sin(2 * A * Math.PI / 180.0)) + (y2 * Math.sin(2 * B * Math.PI / 180.0)) + (y3 * Math.sin(2 * C * Math.PI / 180.0))) / (Math.sin(2 * A * Math.PI / 180.0) + Math.sin(2 * B * Math.PI / 180.0) + Math.sin(2 * C * Math.PI / 180.0))).toFixed(1)
    if (!isNaN(x1) && !isNaN(y1) && !isNaN(x2) && !isNaN(y2) && !isNaN(x3) && !isNaN(y3) && !isNaN(A) && !isNaN(B) && !isNaN(C)) {
        temp += "\\[Circumcenter \\space = \\space ( \\space \\frac{x1 \\times sin2A + x2 \\times sin2B + x3 \\times sin2C }{sin2A + sin2B + sin2C }, \\space \\frac{y1 \\times sin2A + y2 \\times sin2B + y3 \\times sin2C }{sin2A + sin2B + sin2C} )" + "\\] ";
        temp += "\\[( \\frac { (" + x1 + "\\times \\space Sin2(" + A + ")) + (" + x2 + "\\times \\space Sin2(" + B + ")) + (" + x3 + "\\times \\space Sin2(" + C + "))}{ (  Sin2(" + A + ") +  Sin2(" + B + ") +  Sin2(" + C + "))} \\space , \\space  \\frac { (" + y1 + "\\times \\space Sin2(" + A + ")) + (" + y2 + "\\times \\space Sin2(" + B + ")) + (" + y3 + "\\times \\space Sin2(" + C + "))}{ (  Sin2(" + A + ") +  Sin2(" + B + ") +  Sin2(" + C + "))}) \\]";
        temp += "\\[( \\frac { ((" + ((x1 * Math.sin(2 * A * Math.PI / 180.0)).toFixed(1)) + " ) + (" + ((x2 * Math.sin(2 * B * Math.PI / 180.0)).toFixed(1)) + ") + (" + ((x3 * Math.sin(2 * C * Math.PI / 180.0)).toFixed(1)) + "))}{ (" + ((Math.sin(2 * A * Math.PI / 180.0)).toFixed(1)) + ") + (" + ((Math.sin(2 * B * Math.PI / 180.0)).toFixed(1)) + ") + (" + ((Math.sin(2 * C * Math.PI / 180.0)).toFixed(1)) + ")} \\space , \\space  \\frac { ((" + ((y1 * Math.sin(2 * A * Math.PI / 180.0)).toFixed(1)) + ") + (" + ((y2 * Math.sin(2 * B * Math.PI / 180.0)).toFixed(1)) + ") + (" + ((y3 * Math.sin(2 * C * Math.PI / 180.0)).toFixed(1)) + "))}{ " + ((Math.sin(2 * A * Math.PI / 180.0)).toFixed(1)) + "+" + ((Math.sin(2 * B * Math.PI / 180.0)).toFixed(1)) + "+" + ((Math.sin(2 * C * Math.PI / 180.0)).toFixed(1)) + "}) \\]";
        temp += "\\[( \\frac { " + (((x1 * Math.sin(2 * A * Math.PI / 180.0)) + (x2 * Math.sin(2 * B * Math.PI / 180.0)) + (x3 * Math.sin(2 * C * Math.PI / 180.0))).toFixed(1)) + "}{" + (Math.sin(2 * A * Math.PI / 180.0) + Math.sin(2 * B * Math.PI / 180.0) + Math.sin(2 * C * Math.PI / 180.0)).toFixed(1) + "} \\space , \\space \\frac { " + (((y1 * Math.sin(2 * A * Math.PI / 180.0)) + (y2 * Math.sin(2 * B * Math.PI / 180.0)) + (y3 * Math.sin(2 * C * Math.PI / 180.0))).toFixed(1)) + "}{" + (Math.sin(2 * A * Math.PI / 180.0) + Math.sin(2 * B * Math.PI / 180.0) + Math.sin(2 * C * Math.PI / 180.0)).toFixed(1) + "} ) \\]";
        temp += "\\[Circumcenter \\space = \\space (" + eval(String(c1)) + "," + eval(String(c2)) + ")" + "\\]";
        circenterop.innerHTML = temp;
        renderMathInElement(circenterop);
    }
    else {
        temp += "\\[Please \\space enter \\space all \\space fields \\]";
        circenterop.innerHTML = temp;
        renderMathInElement(circenterop);
    }
}
function incentersolve() {
    var x1, y1, x2, y2, x3, y3, a, b, c;
    x1 = parseFloat(document.getElementById('X1').value);
    y1 = parseFloat(document.getElementById('Y1').value);
    x2 = parseFloat(document.getElementById('X2').value);
    y2 = parseFloat(document.getElementById('Y2').value);
    x3 = parseFloat(document.getElementById('X3').value);
    y3 = parseFloat(document.getElementById('Y3').value);
    a = parseFloat(document.getElementById('ina').value);
    b = parseFloat(document.getElementById('inb').value);
    c = parseFloat(document.getElementById('inc').value);
    var incenterop = document.getElementById("informula");
    var explain = document.getElementById("in_output");
    var temp = "";

    if ((!isNaN(x1)) && (!isNaN(y1)) && (!isNaN(x2)) && (!isNaN(y2)) && (!isNaN(x3)) && (!isNaN(y3)) && (!isNaN(a)) && (!isNaN(b)) && (!isNaN(c))) {
        explain.innerHTML = "\\[Incenter \\space  = \\space ( \\space \\frac{a \\times x1 + b \\times x2 + c \\times x3 }{a+b+c}, \\space \\frac{a \\times y1 + b \\times y2 + c \\times y3 }{a+b+c} )" + "\\] ";
        renderMathInElement(document.getElementById("in_output"));
        temp += "\\[( \\frac { (" + a + "\\times" + x1 + ") + (" + b + "\\times" + x2 + ") + (" + c + "\\times" + x3 + ")}{ ( (" + a + ")+ (" + b + ") + (" + c + "))} \\space , \\space ( \\frac { (" + a + "\\times" + y1 + ") + (" + b + "\\times" + y2 + ") + (" + c + "\\times" + y3 + ") }{ ((" + a + ") + (" + b + ") + (" + c + "))} ) \\]";
        temp += "\\[( \\frac { ((" + (a * x1) + " ) + (" + (b * x2) + ") + (" + (c * x3) + "))}{ " + (a + b + c) + "} \\space , \\space ( \\frac { ((" + (a * y1) + ") + (" + (b * y2) + ") + (" + (c * y3) + "))}{ " + (a + b + c) + "}) \\]";
        temp += "\\[( \\frac { " + ((a * x1) + (b * x2) + (c * x3)) + "}{" + (a + b + c) + "} \\space , \\space \\frac { " + ((a * y1) + (b * y2) + (c * y3)) + "}{" + (a + b + c) + "} ) \\]";
        temp += "\\[(" + (eval(String(((a * x1) + (b * x2) + (c * x3)) / (a + b + c)))).toFixed(3) + "," + (eval(String(((a * y1) + (b * y2) + (c * y3)) / (a + b + c)))).toFixed(3) + ")" + "\\]";
        incenterop.innerHTML = temp;
        renderMathInElement(incenterop);

    }
    else {
        temp += "\\[Please \\space enter \\space all \\space fields \\]";
        explain.innerHTML = " ";
        incenterop.innerHTML = temp;
        renderMathInElement(incenterop);
        renderMathInElement(document.getElementById("in_output"));
    }
}
function convexcheckfind() {
    let a = parseInt(document.getElementById("convexcheckin").value)
    let a1 = parseInt(document.getElementById("convexcheckin1").value)
    let a2 = parseInt(document.getElementById("convexcheckin2").value)
    let a3 = parseInt(document.getElementById("convexcheckin3").value)
    let a4 = parseInt(document.getElementById("convexcheckin4").value)
    let a5 = parseInt(document.getElementById("convexcheckin5").value)
    let a6 = parseInt(document.getElementById("convexcheckin6").value)
    let a7 = parseInt(document.getElementById("convexcheckin7").value)
    var points = [[a, a1], [a2, a3], [a4, a5], [a6, a7]]
    if (!isNaN(a) && !isNaN(a1) && !isNaN(a2) && !isNaN(a3) && !isNaN(a4) && !isNaN(a5) && !isNaN(a6) && !isNaN(a7)) {


        if (isConvex(points)) {
            document.getElementById("convexcheckexp").innerHTML = " \\[In a convex polygon, all interior angles are less than or equal to 180 degrees\\]"
            document.getElementById("convexcheckexp").innerHTML = " \\[Traverse the array and check if direction of cross product of any two Bitişik Kenars of the polygon are same or not.\\]"
            document.getElementById("convexcheckexp").innerHTML = " \\[If found to be true, then print “Yes”.\\]"
            document.getElementById("convexcheckexp").innerHTML = " \\[Otherwise, print “No”.\\]"
            renderMathInElement(document.getElementById("convexcheckexp"))
            document.getElementById("convexcheckans").innerHTML = "Yes"
        }
        else {
            document.getElementById("convexcheckexp").innerHTML = " \\[In a convex polygon, all interior angles are less than or equal to 180 degrees\\]"
            document.getElementById("convexcheckexp").innerHTML = " \\[Traverse the array and check if direction of cross product of any two Bitişik Kenars of the polygon are same or not.\\]"
            document.getElementById("convexcheckexp").innerHTML = " \\[If found to be true, then print “Yes”.\\]"
            document.getElementById("convexcheckexp").innerHTML = " \\[Otherwise, print “No”.\\]"
            renderMathInElement(document.getElementById("convexcheckexp"))
            document.getElementById("convexcheckans").innerHTML = "No"
        }
    }
    else {
        document.getElementById("convexcheckans").innerHTML = "Please enter valid input"
    }
}

function isConvex(points) {
    var N = points.length;
    var prev = 0;
    var curr = 0;
    for (i = 0; i < N; i++) {

        var temp = [points[i],
        points[(i + 1) % N],
        points[(i + 2) % N]];

        curr = CrossProduct(temp);
        if (curr != 0) {
            if (curr * prev < 0) {
                return false;
            }
            else {
                prev = curr;
            }
        }
    }
    return true;
}

function CrossProduct(A) {
    var X1 = (A[1][0] - A[0][0]);
    var Y1 = (A[1][1] - A[0][1]);
    var X2 = (A[2][0] - A[0][0]);
    var Y2 = (A[2][1] - A[0][1]);
    return (X1 * Y2 - Y1 * X2);
}
function sievefind() {
    let n = document.getElementById('sievein').value;
    var result = document.getElementById("sieveans");
    if (!isNaN(n)) {
        var temp = "";
        prime = Array.from({ length: n + 1 }, (_, i) => true);
        for (p = 2; p * p <= n; p++) {
            if (prime[p] == true) {
                for (i = p * p; i <= n; i += p)
                    prime[i] = false;
            }
        }
        for (i = 2; i <= n; i++) {
            if (prime[i] == true)
                temp += "&nbsp;" + i + "&nbsp;";
        }
        result.innerHTML = "Prime Numbers from 1 to " + n + " = " + temp;
    } else {
        result.innerHTML = "Please enter any valid natural number only";
    }
}
function excentersolve() {
    var x1, y1, x2, y2, x3, y3, a, b, c;
    x1 = parseFloat(document.getElementById('Xn1').value);
    y1 = parseFloat(document.getElementById('Yn1').value);
    x2 = parseFloat(document.getElementById('Xn2').value);
    y2 = parseFloat(document.getElementById('Yn2').value);
    x3 = parseFloat(document.getElementById('Xn3').value);
    y3 = parseFloat(document.getElementById('Yn3').value);
    a = parseFloat(document.getElementById('ena').value);
    b = parseFloat(document.getElementById('enb').value);
    c = parseFloat(document.getElementById('enc').value);
    var output1 = document.getElementById("ex_output1");
    var temp = "";
    var excenterop1 = (-a * x1 + b * x2 + c * x3) / (-a + b + c)
    var excenterop2 = (-a * y1 + b * y2 + c * y3) / (-a + b + c)
    var excenterop3 = (a * x1 - b * x2 + c * x3) / (a - b + c)
    var excenterop4 = (a * y1 - b * y2 + c * y3) / (a - b + c)
    var excenterop5 = (a * x1 + b * x2 - c * x3) / (a + b - c)
    var excenterop6 = (a * y1 + b * y2 - c * y3) / (a + b - c)
    if (!isNaN(x1) && !isNaN(y1) && !isNaN(x2) && !isNaN(y2) && !isNaN(x3) && !isNaN(y3) && !isNaN(a) && !isNaN(b) && !isNaN(c)) {
        temp += "\\[The \\space coordinates \\space of \\space Excenters \\space are \\space given \\space by \\]";
        temp += "\\[I1 \\space = \\space ( \\space \\frac{(-ax1)+(bx2)+(cx3)}{(-a)+(b)+(c)} \\space , \\space \\frac{(-ay1)+(by2)+(cy3)}{(-a)+(b)+(c)} \\space ) \\]";
        temp += "\\[I1 \\space = \\space ( \\space \\frac{( " + (-a) + "\\times" + x1 + ") + (" + b + " \\times " + x2 + ") + (" + c + "\\times" + x3 + ") }{(" + (-a) + ") + (" + b + ") + (" + c + ")} \\space , \\space \\frac{( " + (-a) + "\\times" + y1 + ") + (" + b + "\\times" + y2 + ") + (" + c + "\\times" + y3 + ") }{(" + (-a) + ") + (" + b + ") + (" + c + ")} ) \\]";
        temp += "\\[I1 \\space = \\space ( \\space \\frac{( " + ((-a) * x1) + ") + (" + (b * x2) + ") + (" + (c * x3) + ") }{(" + (-a) + ") + (" + b + ") + (" + c + ")} \\space , \\space \\frac{( " + ((-a) * y1) + ") + (" + (b * y2) + ") + (" + (c * y3) + ") }{(" + (-a) + ") + (" + b + ") + (" + c + ")} ) \\]";
        temp += "\\[I1 \\space = \\space ( \\space \\frac{ " + (((-a) * x1) + (b * x2) + (c * x3)) + " }{" + ((-a) + b + c) + "} \\space , \\space \\frac{ " + (((-a) * y1) + (b * y2) + (c * y3)) + " }{" + ((-a) + b + c) + "} ) \\]";
        temp += "\\[The \\space excenter \\space for \\space first \\space side \\space is \\space ( " + excenterop1.toFixed(2) + " , " + excenterop2.toFixed(2) + ") \\]";
        temp += "\\[I2 \\space = \\space ( \\space \\frac{(ax1)-(bx2)+(cx3)}{(a)-(b)+(c)} \\space , \\space \\frac{(ay1)-(by2)+(cy3)}{(a)-(b)+(c)} \\space ) \\]";
        temp += "\\[I2 \\space = \\space ( \\space \\frac{( " + (a) + "\\times" + x1 + ") - (" + (b) + " \\times " + x2 + ") + (" + c + "\\times" + x3 + ") }{(" + (a) + ") - (" + b + ") + (" + c + ")} \\space , \\space \\frac{( " + a + "\\times" + y1 + ") - (" + b + "\\times" + y2 + ") + (" + c + "\\times" + y3 + ") }{(" + (a) + ") - (" + b + ") + (" + c + ")} ) \\]";
        temp += "\\[I2 \\space = \\space ( \\space \\frac{( " + ((a) * x1) + ") - (" + (b * x2) + ") + (" + (c * x3) + ") }{(" + (a) + ") - (" + b + ") + (" + c + ")} \\space , \\space \\frac{( " + ((a) * y1) + ") - (" + (b * y2) + ") + (" + (c * y3) + ") }{(" + (a) + ") - (" + b + ") + (" + c + ")} ) \\]";
        temp += "\\[I2 \\space = \\space ( \\space \\frac{ " + (((a) * x1) - (b * x2) + (c * x3)) + " }{" + (a - b + c) + "} \\space , \\space \\frac{ " + (((a) * y1) - (b * y2) + (c * y3)) + " }{" + (a - b + c) + "} ) \\]";
        temp += "\\[The \\space excentre \\space for \\space second \\space side \\space is \\space ( " + excenterop3.toFixed(2) + " , " + excenterop4.toFixed(2) + ") \\]";
        temp += "\\[I3 \\space = \\space ( \\space \\frac{(ax1)+(bx2)-(cx3)}{(a)+(b)-(c)} \\space , \\space \\frac{(ay1)+(by2)-(cy3)}{(a)+(b)-(c)} \\space ) \\]";
        temp += "\\[I3 \\space = \\space ( \\space \\frac{( " + (a) + "\\times" + x1 + ") + (" + (b) + " \\times " + x2 + ") - (" + c + "\\times" + x3 + ") }{(" + (a) + ") + (" + b + ") - (" + c + ")} \\space , \\space \\frac{( " + a + "\\times" + y1 + ") + (" + b + "\\times" + y2 + ") - (" + c + "\\times" + y3 + ") }{(" + (a) + ") + (" + b + ") - (" + c + ")} ) \\]";
        temp += "\\[I3 \\space = \\space ( \\space \\frac{( " + ((a) * x1) + ") + (" + (b * x2) + ") - (" + (c * x3) + ") }{(" + (a) + ") + (" + b + ") - (" + c + ")} \\space , \\space \\frac{( " + ((a) * y1) + ") + (" + (b * y2) + ") - (" + (c * y3) + ") }{(" + (a) + ") + (" + b + ") - (" + c + ")} ) \\]";
        temp += "\\[I3 \\space = \\space ( \\space \\frac{ " + (((a) * x1) + (b * x2) - (c * x3)) + " }{" + (a + b - c) + "} \\space , \\space \\frac{ " + (((a) * y1) + (b * y2) - (c * y3)) + " }{" + (a + b - c) + "} ) \\]";
        temp += "\\[The \\space excentre \\space for \\space third \\space side \\space is \\space ( " + excenterop5.toFixed(2) + " , " + excenterop6.toFixed(2) + ") \\]";
        output1.innerHTML = temp;
        renderMathInElement(output1);
    }
    else {
        temp += "\\[Please \\space enter \\space all \\space fields \\]";
        output1.innerHTML = temp;
        renderMathInElement(output1);
    }
}
function collinearsolve() {
    var x1 = parseFloat(document.getElementById('a1').value);
    var y1 = parseFloat(document.getElementById('b1').value);
    var x2 = parseFloat(document.getElementById('a2').value);
    var y2 = parseFloat(document.getElementById('b2').value);
    var x3 = parseFloat(document.getElementById('a3').value);
    var y3 = parseFloat(document.getElementById('b3').value);

    if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2) || isNaN(x3) || isNaN(y3)) {
        document.getElementById('collop1').innerHTML = "\\[Please \\space enter \\space all \\space fields\\]";
        document.getElementById('collop2').innerHTML = "";
    } else {
        var mA = (y2 - y1) / (x2 - x1);
        var mB = (y3 - y2) / (x3 - x2);
        if (mA == mB) {
            document.getElementById('collop1').innerHTML = "\\[\\frac{y2 - y1}{x2 - x1} \\space = \\space \\frac{y3 - y2}{x3 - x2} \\space => \\space \\frac{" + y2 + " - " + y1 + "}{" + x2 + " - " + x1 + "} \\space = \\space \\frac{" + y3 + " - " + y2 + "}{" + x3 + " - " + x2 + "} \\space => \\space " + mA.toFixed(3) + " \\space = \\space " + mB.toFixed(3) + "\\]";
            document.getElementById('collop2').innerHTML = "\\[Hence, \\space Points \\space are \\space collinear \\] ";
        } else {
            document.getElementById('collop1').innerHTML = "\\[\\frac{y2 - y1}{x2 - x1} \\space != \\space \\frac{y3 - y2}{x3 - x2} \\space => \\space \\frac{" + y2 + " - " + y1 + "}{" + x2 + " - " + x1 + "} \\space != \\space \\frac{" + y3 + " - " + y2 + "}{" + x3 + " - " + x2 + "} \\space => \\space " + mA.toFixed(3) + " \\space != \\space " + mB.toFixed(3) + "\\]";
            document.getElementById('collop2').innerHTML = "\\[Hence, \\space Points \\space are \\space non-collinear" + "\\] ";
        }
    }
    renderMathInElement(document.getElementById("collop1"));
    renderMathInElement(document.getElementById("collop2"));
}
function displanesolve() {
    var a, b, c, d, mx, my, mz;
    a = parseFloat(document.getElementById('a1s').value);
    b = parseFloat(document.getElementById('b1s').value);
    c = parseFloat(document.getElementById('c1s').value);
    d = parseFloat(document.getElementById('d1s').value);
    mx = parseFloat(document.getElementById('mx1').value);
    my = parseFloat(document.getElementById('my1').value);
    mz = parseFloat(document.getElementById('mz1').value);
    var explain = document.getElementById("planept");

    if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(d) || isNaN(mx) || isNaN(my) || isNaN(mz)) {
        explain.innerHTML = "\\[Please \\space enter \\space all \\space fields \\]";
        renderMathInElement(explain);
        document.getElementById('displanept').innerHTML = "";
    } else {
        explain.innerHTML = "\\[Distance \\space from \\space point \\space to \\space plane \\space  =\\space  \\frac{Ax + By + Cz + D}{\\sqrt{A^2+B^2+C^2}} \\] ";
        renderMathInElement(explain);
        var dis = (Math.abs(a * mx + b * my + c * mz + d)) / (Math.sqrt(a * a + b * b + c * c));
        document.getElementById('displanept').innerHTML = 'The distance from (' + mx + ',' + my + ',' + mz + ') to ' + a + 'x + ' + b + 'y + ' + c + 'z + ' + d + '= 0 is ' + dis.toFixed(2);
    }

}
function solveocta() {
    var a = document.getElementById("inputoctside").value;
    var voloutput = document.getElementById("resultofoctvol");
    var tsaoutput = document.getElementById("resultofocttsa");
    var diagoutput = document.getElementById("resultofoctdiag");
    var voltemp = "";
    var tsatemp = "";
    var diagtemp = "";
    if (a != "") {
        voltemp += "\\[Volume \\space of \\space Octahedron \\space \\newline \\frac{\\sqrt{2}}{3} \\times" + a + "\\times" + a + "\\times" + a + "\\ = " + eval(String(0.471 * (a * a * a))).toFixed(3) + "\\]";
        voloutput.innerHTML = voltemp;

        tsatemp += "\\[Surface \\space Area \\space of \\space Octahedron \\space \\newline " + 2 + "\\times \\sqrt{3} " + "\\times" + a + "\\times" + a + "\\ = " + eval(String(3.464 * (a * a))).toFixed(3) + "\\]";
        tsaoutput.innerHTML = tsatemp;

        diagtemp += "\\[Diagonal \\space of \\space Octahedron \\space \\newline \\sqrt{2} \\times " + a + "\\ = " + eval(String(1.414 * a)).toFixed(3) + "\\]";
        diagoutput.innerHTML = diagtemp;

        renderMathInElement(voloutput);
        renderMathInElement(tsaoutput);
        renderMathInElement(diagoutput);

    } else {
        voloutput.innerHTML = "";
        tsaoutput.innerHTML = "";
        diagoutput.innerHTML = "";
    }

}
function circleinfind() {
    var n = parseInt(document.getElementById("circleinin").value)
    var a = parseInt(document.getElementById("circleinin1").value)
    var output = document.getElementById("circleinans");
    var temp = "";

    if (!isNaN(n) && !isNaN(a)) {

        var r = a / (2 * Math.tan((180 / n) * 3.14159 / 180));

        var Area = (3.14) * (r) * (r);
        temp += "\\[Area \\space of \\space largest \\space Circle \\space inscribe \\space in \\space N-sided \\space Regular \\space polygon \\space will \\space be,\\]"
        temp += "\\[First, \\space we \\space calculate \\space the \\space Radius \\space (r)\\]"
        temp += "\\[Radius \\space (r) \\space = \\space \\frac{(Side \\space length)}{2 \\times tan(\\frac{180}{(No. \\space of \\space sides)} \\times \\frac{3.14159}{180}) }\\]"
        temp += "\\[\\space = \\space \\frac{" + a + "}{2 \\times tan(\\frac{180}{" + n + "} \\times \\frac{3.14159}{180}) )}\\]"
        temp += "\\[\\space = \\space \\frac{" + a + "}{2 \\times tan(" + (180 / n).toFixed(2) + " \\times " + (3.14159 / 180).toFixed(2) + ") )}\\]"
        temp += "\\[\\space = \\space \\frac{" + a + "}{2 \\times tan(" + ((180 / n) * 3.14159 / 180).toFixed(2) + ")}\\]"
        temp += "\\[\\space = \\space \\frac{" + a + "}{2 \\times " + (Math.tan((180 / n) * 3.14159 / 180)).toFixed(2) + "}\\]"
        temp += "\\[\\space = \\space \\frac{" + a + "}{" + (2 * Math.tan((180 / n) * 3.14159 / 180)).toFixed(2) + "}\\]"
        temp += "\\[\\space = \\space " + r.toFixed(3) + "\\]"
        temp += "\\[Now,\\space the \\space area \\space of \\space the \\space circle \\space will \\space be,\\]"
        temp += "\\[Area \\space (A) \\space = \\space \\pi \\times " + r.toFixed(2) + " \\times " + r.toFixed(2) + " \\]"
        temp += "\\[\\space = \\space " + Area.toFixed(3) + " \\]"

        output.innerHTML = temp;
    }
    else {
        temp = "\\[Please \\space enter \\space valid \\space input\\]"

        output.innerHTML = temp;

    }

    renderMathInElement(output);
}

function solveheart() {
    var n = parseInt(document.getElementById("inputlenheart").value);
    if (!isNaN(n)) {
        var area = (1 + (math.pi) / 4) * n ** 2;
        var height = (3 / 4 * math.sqrt(2) + 1 / 2) * n;
        var peri = (2 + (math.pi)) * n;
        document.getElementById("resultofareaheart").innerHTML = "\\[Area \\space of \\space Heart \\space shape \\newline (1 + \\frac{\\pi}{4}) \\times (Length \\space square)^2 \\newline = \\space (1 + " + ((math.pi) / 4).toFixed(2) + ") \\times " + n + "^2 \\space = \\space" + area.toFixed(3) + "\\]";
        document.getElementById("resultofheightheart").innerHTML = "\\[Height \\space of \\space Heart \\space shape \\newline (\\frac{3}{4} \\times \\sqrt{2} + \\frac{1}{2}) \\times (Length \\space square) \\newline = \\space " + (3 / 4 * math.sqrt(2) + 1 / 2).toFixed(2) + " \\times " + n + " \\space = \\space " + height.toFixed(3) + "\\]";
        document.getElementById("resultofperiheart").innerHTML = "\\[Perimeter \\space of \\space Heart \\space shape \\newline (2 + \\pi) \\times (Length \\space square) \\newline = \\space " + (2 + (math.pi)).toFixed(2) + " \\times " + n + " \\space = \\space " + peri.toFixed(3) + "\\]";
    }
    renderMathInElement(document.getElementById("resultofareaheart"));
    renderMathInElement(document.getElementById("resultofheightheart"));
    renderMathInElement(document.getElementById("resultofperiheart"));
}

function solvepolycal() {
    var S = document.getElementById("inputareapolycal").value;
    var n = document.getElementById("inputsidepolycal").value;
    var side = math.sqrt(4 * S * math.tan(math.pi / n) / n);
    var peri = side * n;

    console.log(side);
    console.log(peri);
    if (S != "" && n != "") {
        if (n >= 3 && n <= 12) {

            document.getElementById('resultofsidepolycal1').innerHTML = "\\[Side \\space value \\space of \\space the \\space " + n + " \\space sided \\space polygon \\space will \\space be \\space \\]";
            document.getElementById('resultofsidepolycal2').innerHTML = "\\[ \\sqrt{\\frac{4 \\times " + S + " \\times \\tan(\\pi / " + n + " )}{" + n + "} } = \\space " + side.toFixed(3) + "\\]";
            renderMathInElement(document.getElementById('resultofsidepolycal1'));
            renderMathInElement(document.getElementById('resultofsidepolycal2'));
            document.getElementById('resultofperipolycal').innerHTML = "\\[ Perimeter (L)= " + side.toFixed(2) + " \\times " + n + " = " + peri.toFixed(2) + "\\]";
            renderMathInElement(document.getElementById('resultofperipolycal'));

        } else {
            document.getElementById('resultofsidepolycal1').innerHTML = "";
            document.getElementById('resultofsidepolycal2').innerHTML = "Please enter value of n ranging from 3 to 12";
            document.getElementById('resultofperipolycal').innerHTML = "";
        }
    } else {
        document.getElementById('resultofsidepolycal1').innerHTML = "";
        document.getElementById('resultofsidepolycal2').innerHTML = "";
        document.getElementById('resultofperipolycal').innerHTML = "";
    }
}

function solverhomtria() {
    var a = document.getElementById("inputrhotriaside").value;
    var areaoutput = document.getElementById("resultofrhotriaarea");
    var voloutput = document.getElementById("resultofrhotriavol");
    var mroutput = document.getElementById("resultofrhotriamr");
    var iroutput = document.getElementById("resultofrhotriair");
    var areatemp = "";
    var voltemp = "";
    var mrtemp = "";
    var irtemp = "";

    if (a != "") {
        areatemp += "\\[Surface \\space Area \\space of \\space Rhombic \\space \\newline Triacontahedron \\space \\newline " + 12 + "\\times " + a + "\\times" + a + "\\times \\sqrt{5}" + "\\ = " + eval(String(26.833 * a * a)).toFixed(3) + "\\]";
        areaoutput.innerHTML = areatemp;

        voltemp += "\\[Volume \\space of \\space Rhombic \\space Triacontahedron \\space \\newline 4 \\times \\sqrt{5 + 2 \\sqrt{5}} \\times " + a + "\\times" + a + "\\times" + a + "\\ = " + eval(String(12.311 * a * a * a)).toFixed(3) + "\\]";
        voloutput.innerHTML = voltemp;

        mrtemp += "\\[Midsphere \\space radius \\space of \\space Rhombic \\space \\newline Triacontahedron \\space \\newline \\frac{" + a + "}{5} \\times (5 + \\sqrt{5})" + "\\ = " + eval(String(1.447 * a)).toFixed(3) + "\\]";
        mroutput.innerHTML = mrtemp;

        irtemp += "\\[Insphere \\space radius \\space of \\space Rhombic \\space \\newline Triacontahedron \\space \\newline \\frac{3 \\times \\sqrt{5}}{\\sqrt{5 + 2 \\sqrt{5}} \\times" + a + "}" + "\\ = " + eval(String(1.376 * a)).toFixed(3) + "\\]";
        iroutput.innerHTML = irtemp;

        renderMathInElement(areaoutput);
        renderMathInElement(voloutput);
        renderMathInElement(mroutput);
        renderMathInElement(iroutput);

    } else {
        areaoutput.innerHTML = "";
        voloutput.innerHTML = "";
        mroutput.innerHTML = "";
        iroutput.innerHTML = "";
    }

}
function angletwoplanesolve() {
    var a, b, c, d, a1, b1, c1, d1;
    a = parseFloat(document.getElementById('pa1').value);
    b = parseFloat(document.getElementById('pb1').value);
    c = parseFloat(document.getElementById('pc1').value);
    d = parseFloat(document.getElementById('pd1').value);
    a1 = parseFloat(document.getElementById('pa2').value);
    b1 = parseFloat(document.getElementById('pb2').value);
    c1 = parseFloat(document.getElementById('pc2').value);
    d1 = parseFloat(document.getElementById('pd2').value);
    var explain = document.getElementById("angleplane");
    var temp = "";
    if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(d) || isNaN(a1) || isNaN(b1) || isNaN(c1) || isNaN(d1)) {
        temp = "\\[Please \\space enter \\space all \\space fields \\]";
    } else {
        var ang = (Math.abs(a * a1 + b * b1 + c * c1)) / (Math.sqrt((a * a + b * b + c * c) * (a1 * a1 + b1 * b1 + c1 * c1)));
        var ang1 = Math.acos(ang);
        temp += "\\[Formula: \\space cos\\alpha = \\frac{|A1.A2  + B1.B2 + C1.C2 |}{\\sqrt{A1^2+B1^2+C1^2} \\times \\sqrt{A2^2+B2^2+C2^2}} \\] ";
        temp += "\\[cos \\alpha = \\frac{| ( " + a + "\\times" + a1 + " ) + ( " + b + "\\times" + b1 + " ) + ( " + c + "\\times" + c1 + " ) | }{\\sqrt{ ( " + a + "^{2} ) + ( " + b + "^{2} ) + ( " + c + "^{2} ) } \\times \\sqrt{ ( " + a1 + "^{2} ) + ( " + b1 + "^{2} ) + ( " + c1 + "^{2} ) } } \\]";
        temp += "\\[cos \\alpha = \\frac {| ( " + (a * a1) + ") + ( " + (b * b1) + ") + (" + (c * c1) + " )) | }{\\sqrt{  " + a ** 2 + "  +  " + b ** 2 + " +  " + c ** 2 + "  } \\times \\sqrt{  " + a1 ** 2 + " +  " + b1 ** 2 + "  +  " + c1 ** 2 + "  } } \\]";
        temp += "\\[cos \\alpha = \\frac{| " + ((a * a1) + (b * b1) + (c * c1)) + "| }{\\sqrt{  " + (a ** 2 + b ** 2 + c ** 2) + "  } \\times \\sqrt{  " + (a1 ** 2 + b1 ** 2 + c1 ** 2) + "  } } \\]";
        temp += "\\[cos \\alpha = \\frac{ " + Math.abs(a * a1 + b * b1 + c * c1) + "}{ " + (Math.sqrt((a * a + b * b + c * c) * (a1 * a1 + b1 * b1 + c1 * c1))).toFixed(4) + "} \\]";
        temp += "\\[\\alpha = cos^{-1} (\\frac { " + Math.abs(a * a1 + b * b1 + c * c1) + "}{ " + (Math.sqrt((a * a + b * b + c * c) * (a1 * a1 + b1 * b1 + c1 * c1))).toFixed(4) + "}) \\]";
        temp += "\\[\\alpha = cos^{-1} ( " + ang.toFixed(5) + " ) \\]";
        temp += "\\[\\alpha = " + (ang1 * 180 / Math.PI).toFixed(2) + " \\degree \\]";
        document.getElementById('angleplaneop').innerHTML = 'Angle between plane 1 and 2 is ' + (ang1 * 180 / Math.PI).toFixed(2) + '&deg';
    }

    explain.innerHTML = temp;
    renderMathInElement(explain);


}

function vectoradd() {
    var a = parseFloat(document.getElementById('a1b').value);
    var b = parseFloat(document.getElementById('a2b').value);
    var c = parseFloat(document.getElementById('a3b').value);
    var d = parseFloat(document.getElementById('b1c').value);
    var e = parseFloat(document.getElementById('b2c').value);
    var f = parseFloat(document.getElementById('b3c').value);
    var add1 = (a + d);
    var add2 = (b + e);
    var add3 = (c + f);
    if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(d) || isNaN(e) || isNaN(f)) {
        document.getElementById("vectorsum1").style.display = "block";
        document.getElementById("vsumi").innerHTML = "Please enter all fields";
        document.getElementById("vsumj").innerHTML = "";
        document.getElementById("vsumk").innerHTML = "";
    } else {
        document.getElementById("vectorsum1").style.display = "block";
        document.getElementById("vsumi").innerHTML = 'Sum of Vectors (X+Y) =  ' + (add1);
        if (add2 < 0)
            document.getElementById("vsumj").innerHTML = (add2);
        else
            document.getElementById("vsumj").innerHTML = '+' + (add2);
        if (add3 < 0)
            document.getElementById("vsumk").innerHTML = (add3);
        else
            document.getElementById("vsumk").innerHTML = '+' + (add3);
    }
}

function vectorangle2() {
    var a = parseFloat(document.getElementById('vaa3').value);
    var b = parseFloat(document.getElementById('vab3').value);
    var c = parseFloat(document.getElementById('vaa4').value);
    var d = parseFloat(document.getElementById('vab4').value);

    var ang = Math.acos((a * b + c * d) / (Math.sqrt(a ** 2 + c ** 2) * Math.sqrt(b ** 2 + d ** 2)));
    var x = (a * b + c * d);
    var p = Math.sqrt(a ** 2 + c ** 2).toFixed(2);
    var q = Math.sqrt(b ** 2 + d ** 2).toFixed(2);

    if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(d)) {
        document.getElementById("var2").innerHTML = "\\[Please \\space enter \\space all \\space values \\]";
        renderMathInElement(document.getElementById("var2"));
        document.getElementById("vae2").innerHTML = "";
    } else {
        var mult = (Math.acos(x / (p * q))).toFixed(1);
        document.getElementById("var2").innerHTML = "\\[ \\theta=" + (mult) + "0^{\\circ} \\]";
        renderMathInElement(document.getElementById("var2"));

        document.getElementById("vae2").innerHTML = `\\[ Angle \\space Between \\space  \\space Vectors \\space (\\theta ) \\space  = cos^{-1}(\\frac{${x}}{\\sqrt{${p}} \\sqrt{${q}}})  \\space \\newline \\] `;
        renderMathInElement(document.getElementById("vae2"));
    }
}
function ktimes() {
    let A = parseInt(document.getElementById('aofeqn').value)
    let B = parseInt(document.getElementById('bofeqn').value)
    let C = parseInt(document.getElementById('cofeqn').value)
    let K = parseInt(document.getElementById('kofeqn').value)
    var res = document.getElementById("ktimesans");
    res.innerHTML += "Coefficient of x^2: " + A + "<br>";
    res.innerHTML += "Coefficient of x: " + B + "<br>";
    res.innerHTML += "Constant term: " + C + "<br>";
    res.innerHTML += "Number of times the equation is to be multiplied: " + K + "<br>";
    res.innerHTML += "The Quadratic equation whose roots are K times the roots of given equation: " + A + " " + K * B
        + " " + K * K * C

}

function vectpral() {
    var a, b, c, d, e, f, mul, mul1, mul2, mul3, mul4, mul5, ans, ans1, ans2;
    var a = parseFloat(document.getElementById('vpa1').value);
    var b = parseFloat(document.getElementById('vpb1').value);
    var c = parseFloat(document.getElementById('vpc1').value);
    var d = parseFloat(document.getElementById('vpa2').value);
    var e = parseFloat(document.getElementById('vpb2').value);
    var f = parseFloat(document.getElementById('vpc2').value);

    mul = (b * f);
    mul1 = (c * e);
    mul2 = (a * f);
    mul3 = (c * d);
    mul4 = (a * e);
    mul5 = (b * d);
    ans = (mul - mul1);
    ans1 = -(mul2 - mul3);
    ans2 = (mul4 - mul5);

    if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(d) || isNaN(e) || isNaN(f)) {
        document.getElementById("vpe").innerHTML = "\\[Please \\space enter \\space all \\space values \\]";
        renderMathInElement(document.getElementById("vpe"));
        document.getElementById("vpr").innerHTML = "";
    } else {
        if (ans1 < 0 && ans2 < 0) {
            document.getElementById("vpe").innerHTML = "\\[  \\overrightarrow{X} \\space \\times \\space \\overrightarrow{Y} \\space = \\space \\hat{i} \\space (" + mul + "- \\space (" + mul1 + ")\\space) \\space - \\space \\hat{j} (" + mul2 + "- \\space (" + mul3 + ")\\space)\\space + \\space \\hat{k} (" + mul4 + "- \\space (" + mul5 + ") \\space )    \\newline";
            document.getElementById("vpe").innerHTML += " Cross \\space Product \\space of \\space Vectors \\space (X \\times Y) \\space = " + ans + "\\hat{i} \\space " + ans1 + "\\hat{j} \\space " + ans2 + "\\hat{k} \\]";


        }
        else if (ans1 < 0) {
            document.getElementById("vpe").innerHTML = "\\[  \\overrightarrow{X} \\space \\times \\space \\overrightarrow{Y} \\space = \\space \\hat{i} \\space (" + mul + "- \\space (" + mul1 + ")\\space) \\space - \\space \\hat{j} (" + mul2 + "- \\space (" + mul3 + ")\\space)\\space + \\space \\hat{k} (" + mul4 + "- \\space (" + mul5 + ") \\space )    \\newline";
            document.getElementById("vpe").innerHTML += " Cross \\space Product \\space of \\space Vectors \\space (X \\times Y) \\space = " + ans + "\\hat{i} \\space " + ans1 + "\\hat{j} \\space +" + ans2 + "\\hat{k} \\]";

        }
        else if (ans2 < 0) {
            document.getElementById("vpe").innerHTML = "\\[  \\overrightarrow{X} \\space \\times \\space \\overrightarrow{Y} \\space = \\space \\hat{i} \\space (" + mul + "- \\space (" + mul1 + ")\\space) \\space - \\space \\hat{j} (" + mul2 + "- \\space (" + mul3 + ")\\space)\\space + \\space \\hat{k} (" + mul4 + "- \\space (" + mul5 + ") \\space )    \\newline";
            document.getElementById("vpe").innerHTML += " Cross \\space Product \\space of \\space Vectors \\space (X \\times Y) \\space = " + ans + "\\hat{i} \\space +" + ans1 + "\\hat{j} \\space " + ans2 + "\\hat{k} \\]";

        }
        else {
            document.getElementById("vpe").innerHTML = "\\[  \\overrightarrow{X} \\space \\times \\space \\overrightarrow{Y} \\space = \\space \\hat{i} \\space (" + mul + "- \\space (" + mul1 + ")\\space) \\space - \\space \\hat{j} (" + mul2 + "- \\space (" + mul3 + ")\\space)\\space + \\space \\hat{k} (" + mul4 + "- \\space (" + mul5 + ") \\space )    \\newline";
            document.getElementById("vpe").innerHTML += " Cross \\space Product \\space of \\space Vectors \\space (X \\times Y) \\space = " + ans + "\\hat{i} \\space +" + ans1 + "\\hat{j} \\space +" + ans2 + "\\hat{k} \\]";

        }
        renderMathInElement(document.getElementById("vpe"));
        if (ans == 0 && ans1 == 0 && ans2 == 0) {
            document.getElementById("vpr").innerHTML = "As cross Product is Zero so X is prallel to Y";
        }
        else {
            document.getElementById("vpr").innerHTML = "As cross Product is Not Zero so X is Not prallel to Y"
        }
    }
}


function vectorunit() {
    var a = parseFloat(document.getElementById('vma').value);
    var b = parseFloat(document.getElementById('vmb').value);
    var c = parseFloat(document.getElementById('vmc').value);

    var ans = (a * a) + (c * c) + (b * b);
    if (isNaN(a) || isNaN(b) || isNaN(c)) {
        document.getElementById("vme").innerHTML = "\\[Please \\space enter \\space all \\space field \\]";
        renderMathInElement(document.getElementById("vme"));
    }
    else {
        document.getElementById("vme").innerHTML = `\\[ Modulus \\space  of \\space Vectors \\space   = \\space \\sqrt{${a}^2+${b}^2+${c}^2} \\space   `;


        if (Number.isInteger(Math.sqrt(ans)))
            document.getElementById("vme").innerHTML += " =" + (Math.sqrt(ans)) + "\\]";
        else
            document.getElementById("vme").innerHTML += " =   \\space \\sqrt{" + (ans) + "} \\]";
        renderMathInElement(document.getElementById("vme"));


        document.getElementById("vmr").innerHTML = `\\[ Unit \\space Vector  \\space \\space (\\hat{a} )   = \\frac{( \\space ${a} \\hat{i} ) + ( \\space ${b} \\hat{j} ) + ( \\space ${c} \\hat{k} )} {  `;
        if (Number.isInteger(Math.sqrt(ans)))
            document.getElementById("vmr").innerHTML += " =" + (Math.sqrt(ans)) + " }\\]";
        else
            document.getElementById("vmr").innerHTML += " =   \\space \\sqrt{" + (ans) + "} } \\]";
        renderMathInElement(document.getElementById("vmr"));
    }
}

function projector() {
    let a = parseFloat(document.getElementById('inp09').value);
    let b = parseFloat(document.getElementById('inp08').value);
    let c = parseFloat(document.getElementById('inp07').value);
    let d = parseFloat(document.getElementById('inp06').value);
    let e = parseFloat(document.getElementById('inp05').value);
    let f = parseFloat(document.getElementById('inp04').value);
    let projoutput = document.getElementById("vectorscalar1");
    let projtemp = "";
    let dot1 = (a * d) + (b * e) + (c * f);
    let projy = (d ** 2 + e ** 2 + f ** 2);
    let proj = Math.sqrt(projy);
    let proj1 = (proj) ** 2;
    if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(d) || isNaN(e) || isNaN(f)) {
        projtemp += "\\[Please \\space enter \\space all \\space fields \\]";
        projoutput.innerHTML = projtemp;
        renderMathInElement(document.getElementById("vectorscalar1"));
    }
    else {
        projtemp += "\\[If \\space we \\space project \\space \\overrightarrow{a}  \\space on \\space \\overrightarrow{b} \\space then \\space Projected \\space Vector \\space will \\space be \\space -> \\]";
        projtemp += "\\[ proj_b a \\space = \\space \\frac { \\overrightarrow{a} . \\overrightarrow{b}}{|b|^2} \\overrightarrow{b} \\]";
        projtemp += "\\[  proj_b a \\space = \\space \\frac{" + dot1 + "}{" + (proj1).toFixed(2) + "}( \\space (" + d + ") \\hat{i} \\space + \\space (" + e + ") \\hat{j} \\space + \\space ( " + f + " ) \\hat{k} \\space ) \\]";
        projtemp += "\\[So \\space Projected \\space Vector \\space of \\space \\overrightarrow{X} \\space on \\overrightarrow{Y} \\space is \\space = \\space ( \\frac{" + (dot1 * d) + "}{" + (proj1.toFixed(2)) + "} ) \\hat{i} \\space + \\space ( \\frac{" + (dot1 * e) + "}{" + (proj1.toFixed(2)) + "} ) \\hat{j} \\space + \\space \\space ( \\frac{" + (dot1 * f) + "}{" + (proj1.toFixed(2)) + "} )\\hat{k} \\]";
        projoutput.innerHTML = projtemp;
        renderMathInElement(document.getElementById("vectorscalar1"));
    }
}


function vectordot() {
    var a = parseFloat(document.getElementById('d1e').value);
    var b = parseFloat(document.getElementById('d2e').value);
    var c = parseFloat(document.getElementById('d3e').value);
    var d = parseFloat(document.getElementById('e1d').value);
    var e = parseFloat(document.getElementById('e2d').value);
    var f = parseFloat(document.getElementById('e3d').value);
    var mult1 = (a * d);
    var mult2 = (b * e);
    var mult3 = (c * f);
    if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(d) || isNaN(e) || isNaN(f)) {
        document.getElementById("vectordot1").innerHTML = "\\[Please \\space enter \\space all \\space values \\]";
        renderMathInElement(document.getElementById("vectordot1"));
        document.getElementById("dotex").innerHTML = "";
    } else {
        var mult = mult1 + mult2 + mult3;
        document.getElementById("vectordot1").innerHTML = "\\[ =" + (mult) + "\\]";
        renderMathInElement(document.getElementById("vectordot1"));

        document.getElementById("dotex").innerHTML = "\\[ Dot \\space Product \\space of \\space Vectors \\space (X.Y) \\space = \\space ( " + (a) + " * " + (d) + " ) \\space + \\space ( " + (b) + " * " + (e) + " )  \\space + \\space ( " + (c) + " * " + (f) + " )  \\space \\newline \\] ";
        renderMathInElement(document.getElementById("dotex"));
    }
}

function vectorcross() {
    var a, b, c, d, e, f, mul, mul1, mul2, mul3, mul4, mul5, ans, ans1, ans2;
    var a = parseFloat(document.getElementById('d1e').value);
    var b = parseFloat(document.getElementById('d2e').value);
    var c = parseFloat(document.getElementById('d3e').value);
    var d = parseFloat(document.getElementById('e1d').value);
    var e = parseFloat(document.getElementById('e2d').value);
    var f = parseFloat(document.getElementById('e3d').value);
    mul = (b * f);
    mul1 = (c * e);
    mul2 = (a * f);
    mul3 = (c * d);
    mul4 = (a * e);
    mul5 = (b * d);
    ans = (mul - mul1);
    ans1 = -(mul2 - mul3);
    ans2 = (mul4 - mul5);

    if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(d) || isNaN(e) || isNaN(f)) {
        document.getElementById("dotex").innerHTML = "\\[Please \\space enter \\space all \\space fields \\]";
        renderMathInElement(document.getElementById("dotex"));
        document.getElementById("vectordot1").innerHTML = "";
    }
    else {
        if (ans1 < 0 && ans2 < 0) {
            document.getElementById("dotex").innerHTML = "\\[  \\overrightarrow{X} \\space \\times \\space \\overrightarrow{Y} \\space = \\space \\hat{i} \\space (" + mul + "- \\space (" + mul1 + ")\\space) \\space - \\space \\hat{j} (" + mul2 + "- \\space (" + mul3 + ")\\space)\\space + \\space \\hat{k} (" + mul4 + "- \\space (" + mul5 + ") \\space )    \\]";
            document.getElementById("vectordot1").innerHTML = "\\[ Cross \\space Product \\space of \\space Vectors \\space (X \\times Y) \\space = " + ans + "\\hat{i} \\space " + ans1 + "\\hat{j} \\space " + ans2 + "\\hat{k} \\]";
            renderMathInElement(document.getElementById("dotex"));
            renderMathInElement(document.getElementById("vectordot1"));
        }
        else if (ans1 < 0) {
            document.getElementById("dotex").innerHTML = "\\[  \\overrightarrow{X} \\space \\times \\space \\overrightarrow{Y} \\space = \\space \\hat{i} \\space (" + mul + "- \\space (" + mul1 + ")\\space) \\space - \\space \\hat{j} (" + mul2 + "- \\space (" + mul3 + ")\\space)\\space + \\space \\hat{k} (" + mul4 + "- \\space (" + mul5 + ") \\space )    \\]";
            document.getElementById("vectordot1").innerHTML = "\\[ Cross \\space Product \\space of \\space Vectors \\space (X \\times Y) \\space = " + ans + "\\hat{i} \\space " + ans1 + "\\hat{j} \\space +" + ans2 + "\\hat{k} \\]";
            renderMathInElement(document.getElementById("dotex"));
            renderMathInElement(document.getElementById("vectordot1"));
        }
        else if (ans2 < 0) {
            document.getElementById("dotex").innerHTML = "\\[  \\overrightarrow{X} \\space \\times \\space \\overrightarrow{Y} \\space = \\space \\hat{i} \\space (" + mul + "- \\space (" + mul1 + ")\\space) \\space - \\space \\hat{j} (" + mul2 + "- \\space (" + mul3 + ")\\space)\\space + \\space \\hat{k} (" + mul4 + "- \\space (" + mul5 + ") \\space )    \\]";
            document.getElementById("vectordot1").innerHTML = "\\[ Cross \\space Product \\space of \\space Vectors \\space (X \\times Y) \\space = " + ans + "\\hat{i} \\space +" + ans1 + "\\hat{j} \\space " + ans2 + "\\hat{k} \\]";
            renderMathInElement(document.getElementById("dotex"));
            renderMathInElement(document.getElementById("vectordot1"));
        }
        else {
            document.getElementById("dotex").innerHTML = "\\[  \\overrightarrow{X} \\space \\times \\space \\overrightarrow{Y} \\space = \\space \\hat{i} \\space (" + mul + "- \\space (" + mul1 + ")\\space) \\space - \\space \\hat{j} (" + mul2 + "- \\space (" + mul3 + ")\\space)\\space + \\space \\hat{k} (" + mul4 + "- \\space (" + mul5 + ") \\space )    \\]";
            document.getElementById("vectordot1").innerHTML = "\\[ Cross \\space Product \\space of \\space Vectors \\space (X \\times Y) \\space = " + ans + "\\hat{i} \\space +" + ans1 + "\\hat{j} \\space +" + ans2 + "\\hat{k} \\]";
            renderMathInElement(document.getElementById("dotex"));
            renderMathInElement(document.getElementById("vectordot1"));
        }
    }
}


function vectordistance() {
    var a, b, c, d, e, f, g, h, i;
    a = parseInt(document.getElementById("in11").value);
    b = parseInt(document.getElementById("in22").value);
    c = parseInt(document.getElementById("in33").value);
    d = parseInt(document.getElementById("in44").value);
    e = parseInt(document.getElementById("in55").value);
    f = parseInt(document.getElementById("in66").value);
    g = parseInt(document.getElementById("in77").value);
    h = parseInt(document.getElementById("in88").value);
    i = parseInt(document.getElementById("in99").value);
    var outputtria = document.getElementById("vectordist1");
    var tempoutput = "";
    var ans = (((h) * (f - c)) - ((i) * (e - b))); var ans1 = -(((g) * (f - c)) - ((i) * (d - a))); var ans2 = (((g) * (e - b)) - ((h) * (d - a)));
    var ans3 = Math.sqrt(g ** 2 + h ** 2 + i ** 2);
    if (!isNaN(a) && !isNaN(b) && !isNaN(c) && !isNaN(d) && !isNaN(e) && !isNaN(f) && !isNaN(g) && !isNaN(h) && !isNaN(i)) {
        tempoutput += "\\[ Shortest \\space Distance \\space = \\space \\frac{ | \\overrightarrow{b} \\times (\\overrightarrow{X2} - \\overrightarrow{X1} )} {| \\overrightarrow{b} |} \\]";
        tempoutput += "\\[ \\overrightarrow{X2} \\space - \\space \\overrightarrow{X1} \\space = \\space (" + (d - a) + "\\hat{i}) \\space + (" + (e - b) + "\\hat{j}) \\space + (" + (f - c) + "\\hat{k}) \\]";
        tempoutput += "\\[ \\frac{ | (" + ans + "\\hat{i}) + (" + ans1 + "\\hat{j}) + (" + ans2 + "\\hat{k}) | }{" + ans3 + "} \\]";
        tempoutput += "\\[ \\frac{ \\sqrt{" + ans ** 2 + "+" + ans1 ** 2 + "+" + ans2 ** 2 + "}}{ " + ans3 + "} \\]";
        tempoutput += "\\[ \\frac{ \\sqrt{" + (ans ** 2 + ans1 ** 2 + ans2 ** 2) + "}}{" + ans3 + "} \\]";
        outputtria.innerHTML = tempoutput;
        renderMathInElement(outputtria);
    }
    else {
        tempoutput += "\\[Please \\space enter \\space all \\space fields \\]";
        outputtria.innerHTML = tempoutput;
        renderMathInElement(outputtria);
    }
}


function vector_res() {
    var a = parseFloat(document.getElementById('abc').value);
    var b = parseFloat(document.getElementById('def').value);
    var c = parseFloat(document.getElementById('ang3').value);
    var resoutput = document.getElementById("vectorres1");
    var restemp = "";
    var res = Math.cos(c * Math.PI / 180).toFixed(3);
    var res1 = (2 * a * b * res);
    var res2 = eval(String((a * a) + (b * b)));
    var res3 = res2 + res1;
    var d = nerdamer.sqrt(res3).toString();
    if ((isNaN(a)) || (isNaN(b)) || (isNaN(c))) {
        restemp += "\\[Please \\space enter \\space valid \\space input \\]";
        resoutput.innerHTML = restemp;
        renderMathInElement(resoutput);
    }
    else if (a > 0 && b > 0) {
        restemp += "\\[R= \\sqrt{ a^2 + b^2 + 2*a*b*cosθ } \\]";
        restemp += "\\[R= \\sqrt{" + a + "^2+" + b + "^2+" + "2*" + a + "*" + b + "*" + "cos(" + c + ")} \\]";
        restemp += "\\[ \\sqrt{" + a + "^2+" + b + "^2+ (" + res1 + ") } \\]";
        restemp += "\\[ \\sqrt{" + res3 + "} \\]";
        restemp += "\\[ Resultant \\space of \\space Vector = " +
            eval(d).toFixed(3) +
            "\\]";
        resoutput.innerHTML = restemp;
        renderMathInElement(resoutput);
    }
    else {
        restemp += "\\[Magnitude \\space of \\space Vector \\space cannot \\space be \\space negative. \\space Please \\space enter \\space positive \\space value \\space only  \\]";
        resoutput.innerHTML = restemp;
        renderMathInElement(resoutput);
    }
}

function equationplanesolve() {
    var ax, ay, az, bx, by, bz, cx, cy, cz;
    ax = parseFloat(document.getElementById('va1').value);
    ay = parseFloat(document.getElementById('va2').value);
    az = parseFloat(document.getElementById('va3').value);
    bx = parseFloat(document.getElementById('vb1').value);
    by = parseFloat(document.getElementById('vb2').value);
    bz = parseFloat(document.getElementById('vb3').value);
    cx = parseFloat(document.getElementById('vc1').value);
    cy = parseFloat(document.getElementById('vc2').value);
    cz = parseFloat(document.getElementById('vc3').value);
    if (isNaN(ax) || isNaN(ay) || isNaN(az) || isNaN(bx) || isNaN(by) || isNaN(bz) || isNaN(cx) || isNaN(cy) || isNaN(cz)) {
        document.getElementById('eqop').innerHTML = "Please enter all fields";
    } else {
        var res1 = ((by - ay) * (cz - az)) - ((cy - ay) * (bz - az));
        var res2 = ((bz - az) * (cx - ax)) - ((cz - az) * (bx - ax));
        var res3 = ((bx - ax) * (cy - ay)) - ((cx - ax) * (by - ay));
        var res4 = -(res1 * ax + res2 * ay + res3 * az);
        document.getElementById('eqop').innerHTML = 'Plane Equation : ' + res1 + 'x + ' + res2 + 'y + ' + res3 + 'z + ' + res4 + ' = 0';
    }
}

function solveicosa() {
    var a = document.getElementById("inputicoside").value;
    var resultvolt = document.getElementById("resultoficovolt");
    var resulttsa = document.getElementById("resultoficotsa");
    var volttemp = "";
    var tsatemp = "";
    if (a != "") {
        volttemp += "\\[Volume \\space of \\space Icosahedron \\space \\newline \\frac{5}{12}" + "( \\space 3 \\space + \\space \\sqrt{5})" + a + "\\times" + a + "\\times" + a + "\\ = " + eval(2.18169 * (a * a * a)).toFixed(2) + "\\]";
        resultvolt.innerHTML = volttemp;

        tsatemp += "\\[Surface \\space Area \\space of \\space Icosahedron \\space \\newline " + 5 + "\\times \\sqrt{3} " + "\\times" + a + "\\times" + a + "\\ = " + eval(String(8.66025 * (a * a))).toFixed(2) + "\\]";
        resulttsa.innerHTML = tsatemp;

        renderMathInElement(resultvolt);
        renderMathInElement(resulttsa);

    } else {
        resultvolt.innerHTML = "";
        resulttsa.innerHTML = "";
    }

}

function pointrect() {
    var x1 = parseFloat(document.getElementById('checkrect1').value);
    var y1 = parseFloat(document.getElementById('checkrect2').value);
    var x2 = parseFloat(document.getElementById('checkrect3').value);
    var y2 = parseFloat(document.getElementById('checkrect4').value);
    var x = parseFloat(document.getElementById('checkrect5').value);
    var y = parseFloat(document.getElementById('checkrect6').value);
    var output = document.getElementById("pointrectans")
    var ans = "";
    ans += "\\[To \\space see \\space if \\space Point \\space lies \\space inside \\space a \\space Rectangle, \\space we \\space check \\space if \\space all \\space four \\space conditions \\space satisfy\\]";
    ans += "\\[\\space 1.\\space (x \\space coordinate \\space of \\space Point) \\space > \\space (x1 \\space coordinate \\space of \\space Rectangle) \\space i.e. \\space " + x + " > " + x1 + "\\]"
    ans += "\\[\\space 2. \\space (x \\space coordinate \\space of \\space Point) \\space < \\space (x2 \\space coordinate \\space of \\space Rectangle) \\space i.e. \\space" + x + " < " + x2 + "\\]"
    ans += "\\[\\space 3. \\space (y \\space coordinate \\space of \\space Point) \\space > \\space (y1 \\space coordinate \\space of \\space Rectangle) \\space  i.e. \\space" + y + " > " + y1 + "\\]"
    ans += "\\[\\space 4. \\space (y \\space coordinate \\space of \\space Point) \\space < \\space (y2 \\space coordinate \\space of \\space Rectangle) \\space i.e. \\space" + y + " < " + y2 + "\\]"
    if (!isNaN(x1) && !isNaN(y1) && !isNaN(x2) && !isNaN(y2) && !isNaN(x) && !isNaN(y)) {
        if (x > x1 && x < x2 && y > y1 && y < y2) {
            ans += "\\[As, \\space we \\space can  \\space see, \\space all \\space of \\space the \\space four \\space conditions \\space are \\space satified \\space for \\space this \\space input\\]";
            ans += "\\[The \\space given \\space points \\space lies \\space inside \\space a \\space Rectangle \\]"
            output.innerHTML = ans;
        }
        else {
            ans += "\\[Since, \\space all \\space of \\space the \\space four \\space conditions \\space are \\space not \\space satified \\space for \\space this \\space input\\]";
            ans += "\\[The \\space given \\space points \\space does \\space not \\space lie \\space inside \\space a \\space Rectangle \\]"
            output.innerHTML = ans;
        }
    }
    else {
        ans = "\\[Please \\space enter \\space all \\space fields \\]";
        output.innerHTML = ans;
    }
    renderMathInElement(output);
}

function pointsphere() {
    var x1 = parseFloat(document.getElementById('checksphere1').value);
    var y1 = parseFloat(document.getElementById('checksphere2').value);
    var z1 = parseFloat(document.getElementById('checksphere3').value);
    var r = parseFloat(document.getElementById('checksphere4').value);
    var x = parseFloat(document.getElementById('checksphere5').value);
    var y = parseFloat(document.getElementById('checksphere6').value);
    var z = parseFloat(document.getElementById('checksphere7').value);
    var output = document.getElementById("pointsphereans")
    var ans = "";
    let x11 = Math.pow((x - x1), 2);
    let y11 = Math.pow((y - y1), 2);
    let z11 = Math.pow((z - z1), 2);
    let pts = x11 + y11 + z11;
    if (!isNaN(x1) && !isNaN(y1) && !isNaN(z1) && !isNaN(r) && !isNaN(x) && !isNaN(y) && !isNaN(z)) {
        if (pts < (r ** 2)) {
            ans += "\\[A \\space Point \\space  (x, y, z) \\space  lies \\space  inside \\space  the \\space  sphere \\space  with \\space  center \\space  (x1, y1, z1) \\space  and \\space  radius \\space  r \\space  if \\]"
            ans += "\\[( x - x1 )^{2} + (y - y1)^{2} + (z - z1)^{2} \\space < \\space r^{2}  \\]"
            ans += "\\[(" + x + " - " + x1 + " )^{2} + ( " + y + " - " + y1 + ")^{2} + ( " + z + "-" + z1 + ")^{2} \\space < \\space " + r + "^{2}  \\]"
            ans += "\\[(" + (x - x1) + " )^{2} + ( " + (y - y1) + ")^{2} + ( " + (z - z1) + ")^{2} \\space < \\space " + r + "^{2}  \\]"
            ans += "\\[" + (x - x1) ** 2 + "  +  " + (y - y1) ** 2 + " +  " + (z - z1) ** 2 + " \\space < \\space " + r ** 2 + "  \\]"
            ans += "\\[" + ((x - x1) ** 2 + (y - y1) ** 2 + (z - z1) ** 2) + " \\space < \\space " + r ** 2 + "  \\]"
            ans += "\\[The \\space given \\space point \\space lies \\space inside \\space the \\space Sphere \\]"
            output.innerHTML = ans;
        }
        else if (pts == (r ** 2)) {
            ans += "\\[A \\space Point \\space  (x, y, z) \\space  lies \\space  on \\space  the \\space  sphere \\space  with \\space  center \\space  (x1, y1, z1) \\space  and \\space  radius \\space  r \\space  if \\]"
            ans += "\\[( x - x1 )^{2} + (y - y1)^{2} + (z - z1)^{2} \\space = \\space r^{2}  \\]"
            ans += "\\[(" + x + " - " + x1 + " )^{2} + ( " + y + " - " + y1 + ")^{2} + ( " + z + "-" + z1 + ")^{2} \\space = \\space " + r + "^{2}  \\]"
            ans += "\\[(" + (x - x1) + " )^{2} + ( " + (y - y1) + ")^{2} + ( " + (z - z1) + ")^{2} \\space = \\space " + r + "^{2}  \\]"
            ans += "\\[" + (x - x1) ** 2 + "  +  " + (y - y1) ** 2 + " +  " + (z - z1) ** 2 + " \\space = \\space " + r ** 2 + "  \\]"
            ans += "\\[" + ((x - x1) ** 2 + (y - y1) ** 2 + (z - z1) ** 2) + " \\space = \\space " + r ** 2 + "  \\]"
            ans += "\\[The \\space given \\space points \\space lies \\space on \\space the \\space Sphere \\]"
            output.innerHTML = ans;
        }
        else {
            ans += "\\[A \\space Point \\space  (x, y, z) \\space  lies \\space  inside \\space  the \\space  sphere \\space  with \\space  center \\space  (x1, y1, z1) \\space  and \\space  radius \\space  r \\space  if \\]"
            ans += "\\[( x - x1 )^{2} + (y - y1)^{2} + (z - z1)^{2} \\space > \\space r^{2}  \\]"
            ans += "\\[(" + x + " - " + x1 + " )^{2} + ( " + y + " - " + y1 + ")^{2} + ( " + z + "-" + z1 + ")^{2} \\space > \\space " + r + "^{2}  \\]"
            ans += "\\[(" + (x - x1) + " )^{2} + ( " + (y - y1) + ")^{2} + ( " + (z - z1) + ")^{2} \\space > \\space " + r + "^{2}  \\]"
            ans += "\\[" + (x - x1) ** 2 + "  +  " + (y - y1) ** 2 + " +  " + (z - z1) ** 2 + " \\space > \\space " + r ** 2 + "  \\]"
            ans += "\\[" + ((x - x1) ** 2 + (y - y1) ** 2 + (z - z1) ** 2) + " \\space > \\space " + r ** 2 + "  \\]"
            ans += "\\[The \\space given \\space points \\space lies \\space outside \\space the \\space Sphere \\]"
            output.innerHTML = ans;
        }
    }
    else {
        ans += "\\[Please \\space enter \\space all \\space fields \\]";
        output.innerHTML = ans;
    }
    renderMathInElement(output);
}

function pointring() {
    var r, R, x, y, r1;
    r = parseFloat(document.getElementById('checkring1').value);
    R = parseFloat(document.getElementById('checkring2').value);
    x = parseFloat(document.getElementById('checkring3').value);
    y = parseFloat(document.getElementById('checkring4').value);
    r1 = parseFloat(document.getElementById('checkring5').value);
    var output = document.getElementById("pointringans")
    var ans = "";
    if (!isNaN(r) && !isNaN(R) && !isNaN(x) && !isNaN(y) && !isNaN(r1)) {
        if (r < 0 || R < 0 || r1 < 0) {
            ans += "\\[Radius \\space cannot \\space be \\space negative\\]"
        }
        else {
            let dis = Math.sqrt(x * x + y * y);
            if (dis - r1 >= R && dis + r1 <= r) {
                ans += "\\[Yes, \\space circle \\space  lies \\space completely \\space inside \\space the \\space ring \\space of \\space concentric \\space circle\\]"
            }
            else {
                ans += "\\[No, \\space circle \\space does \\space not \\space lies \\space completely \\space inside \\space the \\space ring \\space of \\space concentric \\space circle\\]"
            }
        }
        output.innerHTML = ans;
    }
    else {
        ans += "\\[Please \\space enter \\space all \\space fields \\]";
        output.innerHTML = ans;
    }
    renderMathInElement(output);
}
function pointhyper() {
    var h, k, a, b, x, y;
    h = parseFloat(document.getElementById('checkhyper1').value);
    k = parseFloat(document.getElementById('checkhyper2').value);
    a = parseFloat(document.getElementById('checkhyper3').value);
    b = parseFloat(document.getElementById('checkhyper4').value);
    x = parseFloat(document.getElementById('checkhyper5').value);
    y = parseFloat(document.getElementById('checkhyper6').value);
    var output = document.getElementById("pointhyperans")
    var ans = "";
    var explain = "\\[Put \\space the \\space point(x,y) \\space in \\space eq. \\space of \\space Hyperbola, \\space p= \\frac{(x-h)^2}{a^2}-\\frac{(y-k)^2}{b^2}  \\newline if \\space p>1 \\space point \\space lies \\space outside \\space the \\space hyperbola \\newline if \\space p==1 \\space point \\space lies \\space on \\space the \\space hyperbola \\newline else \\space point \\space lies \\space inside \\space the \\space hyperbola \\]"
    if (!isNaN(h) && !isNaN(k) && !isNaN(a) && !isNaN(b) && !isNaN(x) && !isNaN(y)) {
        var p = ((Math.pow((x - h), 2) / Math.pow(a, 2)) - (Math.pow((y - k), 2) / Math.pow(b, 2)))
        explain += "\\[Put \\space the \\space value \\space p(" + x + "," + y + "): \\space p=\\frac{(" + x + "-" + h + ")^2}{" + a + "^2}-\\frac{(" + y + "-" + k + ")^2}{" + b + "^2}=" + p + "\\]";
        if (p > 1) {
            ans += "\\[The \\space given \\space point(" + x + "," + y + ") \\space lies \\space outside \\space the \\space Hyperbola \\]";
            explain += "\\[Hence " + p + ">1 \\space, So \\space point(" + x + "," + y + ") \\space lies \\space outside \\space the \\space Hyperbola  \\]"
        }
        else if (p == 1) {
            ans += "\\[The \\space given \\space point(" + x + "," + y + ") \\space lies \\space on \\space the \\space Hyperbola \\]";
            explain += "\\[Hence " + p + "==1 \\space, So \\space point(" + x + "," + y + ") \\space lies \\space on \\space the \\space Hyperbola  \\]"
        }
        else {
            ans += "\\[The \\space given \\space point(" + x + "," + y + ") \\space lies \\space inside \\space the \\space Hyperbola \\]";
            explain += "\\[Hence " + p + "<1 \\space, So \\space point(" + x + "," + y + ") \\space lies \\space inside \\space the \\space Hyperbola  \\]"
        }
        output.innerHTML = ans + explain;
    }
    else {
        ans += "\\[Please \\space enter \\space all \\space fields \\]";
        output.innerHTML = ans;
    }
    renderMathInElement(output);
}

function pointellip() {
    var h, k, a, b, x, y;
    h = parseFloat(document.getElementById('checkellip1').value);
    k = parseFloat(document.getElementById('checkellip2').value);
    a = parseFloat(document.getElementById('checkellip3').value);
    b = parseFloat(document.getElementById('checkellip4').value);
    x = parseFloat(document.getElementById('checkellip5').value);
    y = parseFloat(document.getElementById('checkellip6').value);
    var output = document.getElementById("pointellipans")
    var ans = "";
    var explain = "\\[Put \\space the \\space point(x,y) \\space in \\space eq. \\space of \\space Ellipse, \\space p= \\frac{(x-h)^2}{a^2}+\\frac{(y-k)^2}{b^2}  \\newline if \\space p>1 \\space point \\space lies \\space outside \\space the \\space ellipse \\newline if \\space p==1 \\space point \\space lies \\space on \\space the \\space ellipse \\newline else \\space point \\space lies \\space inside \\space the \\space ellipse \\]"

    if (!isNaN(h) && !isNaN(k) && !isNaN(a) && !isNaN(b) && !isNaN(x) && !isNaN(y)) {
        var p = (parseInt(Math.pow((x - h), 2)) / parseInt(Math.pow(a, 2))) + (parseInt(Math.pow((y - k), 2)) / parseInt(Math.pow(b, 2)));
        if (p > 1) {
            ans += "\\[The \\space given \\space point \\space lies \\space outside \\space the \\space Ellipse \\]";
            explain += "\\[Put \\space the \\space value \\space p(" + x + "," + y + "): \\space p=\\frac{(" + x + "-" + h + ")^2}{" + a + "^2}+\\frac{(" + y + "-" + k + ")^2}{" + b + "^2}=" + p + "\\]";
        }
        else if (p == 1) {
            ans += "\\[The \\space given \\space point \\space lies \\space on \\space the \\space Ellipse \\]";
            explain += "\\[Hence " + p + "==1 \\space, So \\space point(" + x + "," + y + ") \\space lies \\space on \\space the \\space Ellipse  \\]"
        }
        else {
            ans += "\\[The \\space given \\space point \\space lies \\space inside \\space the \\space Ellipse \\]";
            explain += "\\[Hence " + p + "<1 \\space, So \\space point(" + x + "," + y + ") \\space lies \\space inside \\space the \\space Ellipse  \\]"
        }
        output.innerHTML = ans;
    }
    else {
        ans += "\\[Please \\space enter \\space all \\space fields \\]";
        output.innerHTML = ans;
    }
    renderMathInElement(output);
}
function pointpara() {
    var h, k, a, x, y;
    h = parseFloat(document.getElementById('checkpara1').value);
    k = parseFloat(document.getElementById('checkpara2').value);
    a = parseFloat(document.getElementById('checkpara3').value);
    x = parseFloat(document.getElementById('checkpara4').value);
    y = parseFloat(document.getElementById('checkpara5').value);
    var output = document.getElementById("pointparaans")
    var ans = "";
    var explain = "\\[Put \\space the \\space point(x,y) \\space in \\space eq. \\space of \\space Parabola, \\space p= (y-k)^2 -4*a*(x-h)\\newline if \\space p>0 \\space point \\space lies \\space outside \\space the \\space parabola \\newline if \\space p==0 \\space point \\space lies \\space on \\space the \\space parabola \\newline else \\space point \\space lies \\space inside \\space the \\space parabola \\]"
    if (!isNaN(h) && !isNaN(k) && !isNaN(a) && !isNaN(x) && !isNaN(y)) {
        var p = parseInt(Math.pow((y - k), 2) - 4 * a * (x - h));
        explain += "\\[Put \\space the \\space value \\space p(" + x + "," + y + "): \\space p=(" + y + "-" + k + ")^2-4*" + a + "*(" + x + "-" + h + ")=" + p + "\\]";

        if (p > 0) {
            ans += "\\[The \\space given \\space point \\space lies \\space outside \\space the \\space Parabola \\]";
            explain += "\\[Hence \\space" + p + ">0 \\space, So \\space point(" + x + "," + y + ") \\space lies \\space outside \\space the \\space Parabola  \\]"
        }
        else if (p == 0) {
            ans += "\\[The \\space given \\space point \\space lies \\space on \\space the \\space Parabola \\]";
            explain += "\\[Hence \\space" + p + "==0 \\space, So \\space point(" + x + "," + y + ") \\space lies \\space on \\space the \\space Parabola  \\]"
        }
        else {
            ans += "\\[The \\space given \\space point \\space lies \\space inside \\space the \\space Parabola \\]";
            explain += "\\[Hence \\space " + p + "<0 \\space, So \\space point(" + x + "," + y + ") \\space lies \\space inside \\space the \\space Parabola  \\]"
        }
        output.innerHTML = ans + explain;
    }
    else {
        ans += "\\[Please \\space enter \\space all \\space fields \\]";
        output.innerHTML = ans;
    }
    renderMathInElement(output);
}
function pointri() {
    var x1, y1, x2, y2, x3, y3, p1, p2;
    x1 = parseFloat(document.getElementById('q1w').value);
    y1 = parseFloat(document.getElementById('q5w').value);
    x2 = parseFloat(document.getElementById('q2w').value);
    y2 = parseFloat(document.getElementById('q6w').value);
    x3 = parseFloat(document.getElementById('q3w').value);
    y3 = parseFloat(document.getElementById('q7w').value);
    p1 = parseFloat(document.getElementById('q4w').value);
    p2 = parseFloat(document.getElementById('q8w').value);
    var areaop = document.getElementById("pointoutput");
    var explaintemp = "";
    var area = Math.abs((x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2.0);
    var area1 = Math.abs((p1 * (y2 - y3) + x2 * (y3 - p2) + x3 * (p2 - y2)) / 2.0);
    var area2 = Math.abs((x1 * (p2 - y3) + p1 * (y3 - y1) + x3 * (y1 - p2)) / 2.0);
    var area3 = Math.abs((x1 * (y2 - p2) + x2 * (p2 - y1) + p1 * (y1 - y2)) / 2.0);
    var areatotal = area1 + area2 + area3;
    if (!isNaN(x1) && !isNaN(y1) && !isNaN(x2) && !isNaN(y2) && !isNaN(x3) && !isNaN(y3) && !isNaN(p1) && !isNaN(p2)) {
        if (area != 0) {
            explaintemp += "\\[Area \\space of \\space Triangle (ABC)  = \\space  \\frac{1}{2} | \\space x1(y2-y3) \\space + x2(y3-y1) + x3(y1-y2) | \\] ";
            explaintemp += "\\[ \\frac{1}{2} | \\space (" + x1 + ") ((" + y2 + ") - (" + y3 + ")) + (" + x2 + ") ((" + y3 + ") - (" + y1 + ")) + (" + x3 + ") ((" + y1 + ") - (" + y2 + ")) | \\]";
            explaintemp += "\\[ \\frac{1}{2} | \\space (" + x1 + ") \\times (" + (y2 - y3) + ") + (" + x2 + ") \\times (" + (y3 - y1) + ") + (" + x3 + ") \\times (" + (y1 - y2) + ") \\]";
            explaintemp += "\\[ \\frac{1}{2} | \\space (" + (x1 * (y2 - y3)) + ") + (" + (x2 * (y3 - y1)) + ") + (" + (x3 * (y1 - y2)) + ") | \\]";
            explaintemp += "\\[ \\frac{1}{2} | \\space (" + (area) + ") | \\]";
            explaintemp += "\\[Area \\space of \\space Triangle (PAB)  = \\space  \\frac{1}{2} | \\space p1(y2-y3) \\space + x2(y3-p2) + x3(p2-y2) | \\] ";
            explaintemp += "\\[ \\frac{1}{2} | \\space (" + p1 + ") ((" + y2 + ") - (" + y3 + ")) + (" + x2 + ") ((" + y3 + ") - (" + p2 + ")) + (" + x3 + ") ((" + p2 + ") - (" + y2 + ")) | \\]";
            explaintemp += "\\[ \\frac{1}{2} | \\space (" + p1 + ") \\times (" + (y2 - y3) + ") + (" + x2 + ") \\times (" + (y3 - p2) + ") + (" + x3 + ") \\times (" + (p2 - y2) + ") \\]";
            explaintemp += "\\[ \\frac{1}{2} | \\space (" + (p1 * (y2 - y3)) + ") + (" + (x2 * (y3 - p2)) + ") + (" + (x3 * (p2 - y2)) + ") | \\]";
            explaintemp += "\\[ \\frac{1}{2} | \\space (" + (area1) + ") | \\]";
            explaintemp += "\\[Area \\space of \\space Triangle (PBC)  = \\space  \\frac{1}{2} | \\space x1(p2-y3) \\space + p1(y3-y1) + x3(y1-y2) | \\] ";
            explaintemp += "\\[ \\frac{1}{2} | \\space (" + x1 + ") ((" + p2 + ") - (" + y3 + ")) + (" + p1 + ") ((" + y3 + ") - (" + y1 + ")) + (" + x3 + ") ((" + y1 + ") - (" + p2 + ")) | \\]";
            explaintemp += "\\[ \\frac{1}{2} | \\space (" + x1 + ") \\times (" + (p2 - y3) + ") + (" + p1 + ") \\times (" + (y3 - y1) + ") + (" + x3 + ") \\times (" + (y1 - p2) + ") \\]";
            explaintemp += "\\[ \\frac{1}{2} | \\space (" + (x1 * (p2 - y3)) + ") + (" + (p1 * (y3 - y1)) + ") + (" + (x3 * (y1 - p2)) + ") | \\]";
            explaintemp += "\\[ \\frac{1}{2} | \\space (" + (area2) + ") | \\]";
            explaintemp += "\\[Area \\space of \\space Triangle (PAC)  = \\space  \\frac{1}{2} | \\space x1(y2-p2) \\space + x2(p2-y1) + p1(y1-y2) | \\] ";
            explaintemp += "\\[ \\frac{1}{2} | \\space (" + x1 + ") ((" + y2 + ") - (" + p2 + ")) + (" + x2 + ") ((" + p2 + ") - (" + y1 + ")) + (" + p1 + ") ((" + y1 + ") - (" + y2 + ")) | \\]";
            explaintemp += "\\[ \\frac{1}{2} | \\space (" + x1 + ") \\times (" + (y2 - p2) + ") + (" + x2 + ") \\times (" + (p2 - y1) + ") + (" + p1 + ") \\times (" + (y1 - y2) + ") \\]";
            explaintemp += "\\[ \\frac{1}{2} | \\space (" + (x1 * (y2 - p2)) + ") + (" + (x2 * (p2 - y1)) + ") + (" + (p1 * (y1 - y2)) + ") | \\]";
            explaintemp += "\\[ \\frac{1}{2} | \\space (" + (area3) + ") | \\]";
            explaintemp += "\\[Area \\space of \\space Triangle (PAB) \\space + \\space Area \\space of \\space Triangle (PBC) \\space + \\space Area \\space of \\space Triangle (PAC) \\space = \\space " + areatotal + " \\]"

            areaop.innerHTML = explaintemp;
        }
        if (area == areatotal) {
            explaintemp += "\\[\\space Area \\space of \\space Triangle (ABC) \\space = Total \\space Area \\space (PAB + PAC + PBC) \\]"
            explaintemp += "\\[Point \\space is \\space Inside \\space the \\space Triangle \\]"
            areaop.innerHTML = explaintemp;
        }
        else {
            explaintemp += "\\[\\space Area \\space of \\space Triangle (ABC) \\space != Total \\space Area \\space (PAB + PAC + PBC) \\]"
            explaintemp += "\\[Point \\space is \\space NOT \\space Inside \\space the \\space Triangle \\]"
            areaop.innerHTML = explaintemp;
        }
    }
    else {
        explaintemp += "\\[Please \\space enter \\space all \\space fields \\]";
        areaop.innerHTML = explaintemp;

    }
    renderMathInElement(areaop);
}

function pointcir() {
    var x1, y1, r1, x2, y2, r2;
    x1 = parseFloat(document.getElementById('checkcir1').value);
    y1 = parseFloat(document.getElementById('checkcir2').value);
    r1 = parseInt(document.getElementById('checkcir3').value);
    x2 = parseFloat(document.getElementById('checkcir4').value);
    y2 = parseFloat(document.getElementById('checkcir5').value);
    r2 = parseInt(document.getElementById('checkcir6').value);
    var output = document.getElementById("pointcirans")
    var ans = "";

    if (!isNaN(x1) && !isNaN(x2) && !isNaN(r1) && !isNaN(x2) && !isNaN(y2) && !isNaN(r2)) {
        if (r1 < r2) {
            temp = x1;
            x1 = x2;
            x2 = temp;
            temp = y1;
            y1 = y2;
            y2 = temp;
            temp = r1;
            r1 = r2;
            r2 = temp;

        }

        var distSq = parseInt(Math.sqrt(((x1 - x2) * (x1 - x2)) + ((y1 - y2) * (y1 - y2))));

        if (distSq + r2 == r1) {
            ans = "\\[The \\space smaller \\space circle \\space of \\space radius(" + r2 + ") \\space lies \\space completely \\space inside \\space the \\space bigger \\space circle \\space of \\space radius(" + r1 + ") \\space with \\space touching \\space each \\space other \\space  at \\space  a \\space povar \\space  of \\space  circumference.\\]"
        }

        else if (distSq + r2 < r1) {
            ans = "\\[The \\space smaller \\space circle \\space of \\space radius(" + r2 + ") \\space lies \\space completely \\space inside \\space the \\space bigger \\space circle  \\space of \\space radius(" + r1 + ") \\space without \\space touching \\space each \\space other \\space  at \\space  a \\space povar \\space  of \\space  circumference.\\]"
        }

        else {
            ans = "\\[The \\space smaller \\space circle \\space of \\space radius(" + r2 + ") \\space does \\space not \\space lies  \\space inside \\space the \\space bigger \\space circle \\space of \\space radius(" + r1 + ") \\space completely.\\]"
        }

        output.innerHTML = ans;
    }
    else {
        ans += "\\[Please \\space enter \\space all \\space fields \\]";
        output.innerHTML = ans;
    }
    renderMathInElement(output);
}


function coordinatearea() {
    var x1, y1, x2, y2, x3, y3;
    x1 = parseFloat(document.getElementById('x1s').value);
    y1 = parseFloat(document.getElementById('y1s').value);
    x2 = parseFloat(document.getElementById('x2s').value);
    y2 = parseFloat(document.getElementById('y2s').value);
    x3 = parseFloat(document.getElementById('x3s').value);
    y3 = parseFloat(document.getElementById('y3s').value);
    var areaop = document.getElementById("areaoutput");
    var explain = document.getElementById("formula1");
    var areatemp = "";
    var explaintemp = "";


    var area = Math.abs(((x1 * y2) - (x1 * y3) + (x2 * y3) - (x2 * y1) + (x3 * y1) - (x3 * y2)));
    var area1 = (area / 2);
    if (!isNaN(x1) && !isNaN(y1) && !isNaN(x2) && !isNaN(y2) && !isNaN(x3) && !isNaN(y3)) {
        explaintemp += "\\[Area \\space of \\space Triangle  = \\space  \\frac{1}{2} | \\space x1(y2-y3) \\space + x2(y3-y1) + x3(y1-y2) | \\] ";
        explaintemp += "\\[ \\frac{1}{2} | \\space (" + x1 + ") ((" + y2 + ") - (" + y3 + ")) + (" + x2 + ") ((" + y3 + ") - (" + y1 + ")) + (" + x3 + ") ((" + y1 + ") - (" + y2 + ")) | \\]";
        explaintemp += "\\[ \\frac{1}{2} | \\space (" + x1 + ") \\times (" + (y2 - y3) + ") + (" + x2 + ") \\times (" + (y3 - y1) + ") + (" + x3 + ") \\times (" + (y1 - y2) + ") \\]";
        explaintemp += "\\[ \\frac{1}{2} | \\space (" + (x1 * (y2 - y3)) + ") + (" + (x2 * (y3 - y1)) + ") + (" + (x3 * (y1 - y2)) + ") | \\]";
        explaintemp += "\\[ \\frac{1}{2} | \\space (" + (area) + ") | \\]";
        explaintemp += "\\[ " + area1 + " \\]";
        areaop.innerHTML = explaintemp;
        renderMathInElement(areaoutput);
        areatemp += "\\[Area \\space = \\space " + area1 + "\\space sq. \\space units \\]";
        explain.innerHTML = areatemp;
        renderMathInElement(formula1);
    }
    else {
        explaintemp += "\\[Please \\space enter \\space all \\space fields \\]";
        areatemp += " ";
        areaop.innerHTML = explaintemp;
        explain.innerHTML = areatemp;
    }
    renderMathInElement(areaoutput);
    renderMathInElement(formula1);
}

function inmed() {
    var a;
    a = parseFloat(document.getElementById('inmed1').value);
    var output = document.getElementById("inmedans");
    var temp = " ";
    var r = (2 / 3) * a
    var d = Math.PI * r * r
    if (isNaN(a)) {
        temp += "\\[Please \\space enter \\space all \\space field \\]";
        output.innerHTML = temp;
        renderMathInElement(output);
    }
    else {
        temp += "\\[Radius \\space of \\space Circle \\space = \\space \\frac{2}{3} \\times M  \\]";
        temp += "\\[Area \\space of \\space Circle \\space = \\space  π \\times r^{2} \\space = \\space  π \\times (\\frac{2}{3} \\times M )^{2} \\space = \\space  π \\times (\\frac{2}{3} \\times " + a + ")^{2} \\space = \\space " + d.toFixed(3) + " \\]";
        output.innerHTML = temp;
        renderMathInElement(output);
    }
}

function centersolve() {
    var a, b, c, d, e, f;
    a = parseInt(document.getElementById("qcenterr").value);
    b = parseInt(document.getElementById("acenterr").value);
    c = parseInt(document.getElementById("bcenterr").value);
    d = parseInt(document.getElementById("ccenterr").value);
    e = b / (a * 2);
    f = c / (a * 2);

    if (isNaN(a) || isNaN(b) || isNaN(c)) {
        document.getElementById("centerer").innerHTML = "\\[Please \\space enter \\space all \\space fields \\]";
        document.getElementById("centerrr").innerHTML = "";
    } else {
        document.getElementById("centerer").innerHTML = "\\[Center \\space Of \\space circle \\space -> \\newline";
        document.getElementById("centerer").innerHTML += " g\\space = \\frac {" + b + "} { ( \\space " + a + " * \\space " + 2 + " ) } " + " \\space = " + e + "\\newline";
        document.getElementById("centerer").innerHTML += " h\\space = \\frac {" + c + "} { ( \\space " + a + " * \\space " + 2 + " ) } " + " \\space = " + f + "\\newline \\] ";

        document.getElementById("centerrr").innerHTML = "\\[Center \\space Of \\space circle \\space = ( \\space -g \\space -h \\space )  \\newline";
        document.getElementById("centerrr").innerHTML += " = \\space ( \\space " + -e + " \\space , \\space " + -f + " \\space ) \\space \\newline \\] ";
    }

    renderMathInElement(document.getElementById("centerer"));
    renderMathInElement(document.getElementById("centerrr"));

}

function centerrsolve() {
    var a, b, c, d, e, f;
    a = parseInt(document.getElementById("qcenterr").value);
    b = parseInt(document.getElementById("acenterr").value);
    c = parseInt(document.getElementById("bcenterr").value);
    d = parseInt(document.getElementById("ccenterr").value);
    e = b / (a * 2);
    f = c / (a * 2);
    var p = (e * e) + (f * f) - d;
    var q = Math.sqrt(p);
    if (isNaN(a) || isNaN(b) || isNaN(c)) {
        document.getElementById("centerer").innerHTML = "\\[Please \\space enter \\space all \\space fields \\]";
        document.getElementById("centerrr").innerHTML = "";
    } else {
        document.getElementById("centerer").innerHTML = "\\[Radius \\space Of \\space circle \\space -> \\newline";
        document.getElementById("centerer").innerHTML += " g\\space = \\frac {" + b + "} { ( \\space " + a + " * \\space " + 2 + " ) } " + " \\space = " + e + "\\newline";
        document.getElementById("centerer").innerHTML += " h\\space = \\frac {" + c + "} { ( \\space " + a + " * \\space " + 2 + " ) } " + " \\space = " + f + "\\newline \\] ";

        document.getElementById("centerrr").innerHTML = "\\[Center \\space Of \\space circle \\space = ( \\sqrt{ \\space g^2 \\space + \\space h^2 \\space - \\space c \\space ) }  \\newline";
        if (Number.isInteger(Math.sqrt(p)))
            document.getElementById("centerrr").innerHTML += " = \\space ( \\space " + q + " \\space ) \\space \\newline \\] ";
        else
            document.getElementById("centerrr").innerHTML += " = \\space ( \\space \\sqrt { " + p + " } \\space ) \\space \\newline \\] ";

    }

    renderMathInElement(document.getElementById("centerer"));
    renderMathInElement(document.getElementById("centerrr"));

}

function xintersept() {
    var a, b, c, d, e, f;
    a = parseInt(document.getElementById("qcenterr").value);
    b = -(parseInt(document.getElementById("acenterr").value));
    c = -(parseInt(document.getElementById("bcenterr").value));
    d = parseInt(document.getElementById("ccenterr").value);
    e = (b) / (a * 2);
    f = (c) / (a * 2);
    var p = (e * e) - d;
    var q = Math.sqrt(p);
    if (isNaN(a) || isNaN(b) || isNaN(c)) {
        document.getElementById("centerer").innerHTML = "\\[Please \\space enter \\space all \\space fields \\]";
        document.getElementById("centerrr").innerHTML = "";
    } else {
        document.getElementById("centerer").innerHTML = "\\[X \\space Intercept Of \\space circle \\space -> \\newline";
        document.getElementById("centerer").innerHTML += " g\\space = \\frac {" + b + "} { ( \\space " + a + " * \\space " + 2 + " ) } " + " \\space = " + e + "\\newline \\]";


        document.getElementById("centerrr").innerHTML = "\\[X \\space Intercept \\space Of \\space circle \\space = 2 ( \\sqrt{ \\space g^2 \\space  \\space - \\space c \\space ) }  \\newline";
        if (Number.isInteger(Math.sqrt(p)))
            document.getElementById("centerrr").innerHTML += " = \\space ( \\space " + q + " \\space ) \\space \\newline \\] ";
        else
            document.getElementById("centerrr").innerHTML += " = \\space ( \\space \\sqrt { " + p + " } \\space ) \\space \\newline \\] ";

    }
    renderMathInElement(document.getElementById("centerer"));
    renderMathInElement(document.getElementById("centerrr"));
}


function yintersept() {
    var a, b, c, d, e, f;
    a = parseInt(document.getElementById("qcenterr").value);
    b = -(parseInt(document.getElementById("acenterr").value));
    c = -(parseInt(document.getElementById("bcenterr").value));
    d = parseInt(document.getElementById("ccenterr").value);
    e = (b) / (a * 2);
    f = (c) / (a * 2);
    var p = (f * f) - d;
    var q = Math.sqrt(p);
    if (isNaN(a) || isNaN(b) || isNaN(c)) {
        document.getElementById("centerer").innerHTML = "\\[Please \\space enter \\space all \\space fields \\]";
        document.getElementById("centerrr").innerHTML = "";
    } else {
        document.getElementById("centerer").innerHTML = "\\[Y \\space Intercept Of \\space circle \\space -> \\newline";

        document.getElementById("centerer").innerHTML += " h\\space = \\frac {" + c + "} { ( \\space " + a + " * \\space " + 2 + " ) } " + " \\space = " + f + "\\newline \\] ";

        document.getElementById("centerrr").innerHTML = "\\[Y \\space Intercept \\space Of \\space circle \\space = 2 ( \\sqrt{ \\space h^2 \\space  \\space - \\space c \\space ) }  \\newline";
        if (Number.isInteger(Math.sqrt(p)))
            document.getElementById("centerrr").innerHTML += " = \\space ( \\space " + q + " \\space ) \\space \\newline \\] ";
        else
            document.getElementById("centerrr").innerHTML += " = \\space ( \\space \\sqrt { " + p + " } \\space ) \\space \\newline \\] ";

    }
    renderMathInElement(document.getElementById("centerer"));
    renderMathInElement(document.getElementById("centerrr"));
}
function director_c() {
    var a, b, c, d, e, f;
    a = parseInt(document.getElementById("qcenterr").value);
    b = parseInt(document.getElementById("acenterr").value);
    c = parseInt(document.getElementById("bcenterr").value);
    d = parseInt(document.getElementById("ccenterr").value);
    e = b / (a * 2);
    f = c / (a * 2);
    var p = d + d - (e * e) - (f * f);
    var q = -p;
    if (isNaN(a) || isNaN(b) || isNaN(c)) {
        document.getElementById("centerer").innerHTML = "\\[Please \\space enter \\space all \\space fields \\]";
        document.getElementById("centerrr").innerHTML = "";
    } else {
        document.getElementById("centerer").innerHTML = "\\[Radius \\space Of \\space circle \\space -> \\newline";
        document.getElementById("centerer").innerHTML += " g\\space = \\frac {" + b + "} { ( \\space " + a + " * \\space " + 2 + " ) } " + " \\space = " + e + "\\newline";
        document.getElementById("centerer").innerHTML += " h\\space = \\frac {" + c + "} { ( \\space " + a + " * \\space " + 2 + " ) } " + " \\space = " + f + "\\newline \\] ";

        document.getElementById("centerrr").innerHTML = "\\[ c' \\space Of \\space circle \\space = ( \\ \\space 2c \\space - \\space h^2 \\space - \\space g^2 \\space )   \\newline";

        document.getElementById("centerrr").innerHTML += " Diractor Circle = \\space " + a + "x^2 \\space + " + a + "y^2 \\space + " + b + "x  \\space + " + c + "y \\space =" + q + " \\newline \\] ";


    }

    renderMathInElement(document.getElementById("centerer"));
    renderMathInElement(document.getElementById("centerrr"));

}

function tanglenght() {
    var a, b, c, d, e, f;
    g = parseInt(document.getElementById("acenterrp").value);
    f = parseInt(document.getElementById("bcenterrp").value);
    c = parseInt(document.getElementById("ccenterrp").value);
    a = parseInt(document.getElementById("bcenterrpx").value);
    b = parseInt(document.getElementById("bcenterrpy").value);
    var x = g / 2;
    var y = f / 2;

    var answer = (a * a) + (b * b) + (g * a) + (f * b) + (c);


    document.getElementById("centererp").innerHTML = "\\[Length \\space Of tangent \\space of  \\space circle \\space -> \\newline";
    document.getElementById("centererp").innerHTML += " g\\space = \\frac {" + g + "} { ( \\space " + 2 + " ) } " + " \\space = " + x + "\\newline";
    document.getElementById("centererp").innerHTML += " h\\space = \\frac {" + f + "} { (  \\space " + 2 + " ) } " + " \\space = " + y + "\\newline";
    document.getElementById("centererp").innerHTML += " = \\space \\sqrt{ a^2 \\space + \\space b^2 \\space+ \\space  2ga \\space + \\space 2fb \\space + c \\space } \\newline \\] ";


    document.getElementById("centerrrp").innerHTML += " \\[ = " + answer + " \\newline \\] ";




    renderMathInElement(document.getElementById("centererp"));
    renderMathInElement(document.getElementById("centerrrp"));

}

function radeq() {
    var a, b, c, d, e, f;
    var g1 = parseInt(document.getElementById("acenterrpr1").value);
    var f1 = parseInt(document.getElementById("bcenterrpr1").value);
    var c1 = parseInt(document.getElementById("ccenterrpr1").value);
    var g2 = parseInt(document.getElementById("acenterrpr2").value);
    var f2 = parseInt(document.getElementById("bcenterrpr2").value);
    var c2 = parseInt(document.getElementById("ccenterrpr2").value);

    var x = g / 2;
    var y = f / 2;

    var one = g1 - g2;
    var two = f1 - f2;
    var three = c1 - c2;


    document.getElementById("centererpr").innerHTML = "\\[Radial  \\space Axis  \\space of  \\space circles \\space = \\space A \\space - \\space B  \\newline \\] ";


    document.getElementById("centerrrpr").innerHTML = " \\[  " + one + "x \\space + (" + two + ") y \\space +(" + three + ") \\space = \\space 0 \\newline \\] ";




    renderMathInElement(document.getElementById("centererpr"));
    renderMathInElement(document.getElementById("centerrrpr"));

}

function nodiagnolfind() {
    var n = parseInt(document.getElementById('nodiagnol').value);
    if (!isNaN(n)) {
        var ans = n * (n - 3) / 2;
        document.getElementById("nodiagnolans").innerHTML = "\\[The \\space number \\space of \\space diagnols \\space in \\space n-sided \\space convex \\space polygon \\space will \\space be \\newline \\frac{(No. \\space of \\space sides) \\times ((No. \\space of \\space sides)-3)}{2} \\]";
        document.getElementById("nodiagnolans1").innerHTML = "\\[\\frac{" + n + " \\times (" + n + "-3)}{2} \\space = \\space \\frac{" + (n * (n - 3)).toFixed(2) + "}{2} \\space = \\space " + ans.toFixed(3) + "\\]";
    } else {
        document.getElementById("nodiagnolans").innerHTML = "\\[Please \\space enter \\space valid \\space input\\]";
        document.getElementById("nodiagnolans1").innerHTML = "";
    }
    renderMathInElement(document.getElementById("nodiagnolans"));
    renderMathInElement(document.getElementById("nodiagnolans1"));
}
function orthosolve() {
    let x1 = parseInt(document.getElementById('orthox11').value)
    let y1 = parseInt(document.getElementById('orthoy1').value)
    let x2 = parseInt(document.getElementById('orthox21').value)
    let y2 = parseInt(document.getElementById('orthoy2').value)
    let x3 = parseInt(document.getElementById('orthox31').value)
    let y3 = parseInt(document.getElementById('orthoy3').value)
    var output1 = document.getElementById("ortho_output");
    var temp = "";
    let x = ((x2 * (x1 - x3) + y2 * (y1 - y3)) * (y3 - y2) - (y3 - y1) * (x1 * (x2 - x3) + y1 * (y2 - y3))) / ((x3 - x2) * (y3 - y1) - (y3 - y2) * (x3 - x1))
    let y = ((x2 * (x1 - x3) + y2 * (y1 - y3)) * (x3 - x2) - (x3 - x1) * (x1 * (x2 - x3) + y1 * (y2 - y3))) / ((y3 - y2) * (x3 - x1) - (x3 - x2) * (y3 - y1))
    if (!isNaN(x1) && !isNaN(y1) && !isNaN(x2) && !isNaN(y2) && !isNaN(x3) && !isNaN(y3)) {
        temp += "\\[The \\space coordinates \\space of \\space Orthocenter \\space are \\space given \\space by \\]";
        temp += "\\[x \\space = \\space  \\space \\frac{[x2(x1-x3) + y2(y1 - y3)][y3 - y2]-[y3-y1][x1(x2 - x3) + y1(y2-y3)]}{(x3-x2)(y3-y1)-(y3-y2)(x3-x1)} \\]";
        temp += "\\[x \\space = \\space  \\space \\frac{[" + x2 + " \\times  ( " + x1 + "-" + x3 + ") + " + y2 + " \\times  ( " + y1 + " - " + y3 + ")][ " + y3 + " - " + y2 + "]-[ " + y3 + "-" + y1 + "][ " + x1 + " \\times ( " + x2 + " - " + x3 + ") + " + y1 + " \\times (  " + y2 + "- " + y3 + ")]}{( " + x3 + "- " + x2 + ")( " + y3 + "- " + y1 + ")-( " + y3 + "- " + y2 + ")( " + x3 + "- " + x1 + ")} \\]";
        temp += "\\[x \\space = \\space  \\space \\frac{[" + x2 + " \\times " + (x1 - x3) + " + " + y2 + " \\times" + (y1 - y3) + "][" + (y3 - y2) + "]-[" + (y3 - y1) + "][" + x1 + " \\times " + (x2 - x3) + " + " + y1 + " \\times " + (y2 - y3) + "]}{( " + (x3 - x2) + ")( " + (y3 - y1) + ")-( " + (y3 - y2) + ")( " + (x3 - x1) + ")} \\]";
        temp += "\\[x \\space = \\space " + x + " \\]"
        temp += "\\[y \\space = \\space ( \\space \\frac{[x2(x1-x3) + y2(y1 - y3)][x3 - x2]-[x3-x1][x1(x2 - x3) + y1(y2-y3)]}{(y3-y2)(x3-x1)-(x3-x2)(y3-y1)} \\]";
        temp += "\\[y \\space = \\space ( \\space \\frac{[" + x2 + " \\times  ( " + x1 + "-" + x3 + ") + " + y2 + " \\times  ( " + y1 + " - " + y3 + ")][ " + x3 + " - " + x2 + "]-[ " + x3 + "-" + x1 + "][ " + x1 + " \\times ( " + x2 + " - " + x3 + ") + " + y1 + " \\times (  " + y2 + "- " + y3 + ")]}{( " + y3 + "- " + y2 + ")( " + x3 + "- " + x1 + ")-( " + x3 + "- " + x2 + ")( " + y3 + "- " + y1 + ")} \\]";
        temp += "\\[y \\space = \\space ( \\space \\frac{[" + x2 + " \\times" + (x1 - x3) + " + " + y2 + " \\times" + (y1 - y3) + "][ " + (x3 - x2) + "]-[ " + (x3 - x1) + "][" + x1 + " \\times  " + (x2 - x3) + " + " + y1 + " \\times   " + (y2 - y3) + "]}{( " + (y3 - y2) + ")( " + (x3 - x1) + ")-( " + (x3 - x2) + ")( " + (y3 - y1) + ")} \\]";
        temp += "\\[y \\space = \\space " + y + " \\]"
        temp += "\\[The \\space orthocenter \\space for \\space the \\space Triangle \\space is \\space ( " + x + " , " + y + ") \\]";
        output1.innerHTML = temp;
        renderMathInElement(output1);
    }
    else {
        temp += "\\[Please \\space enter \\space all \\space fields \\]";
        output1.innerHTML = temp;
        renderMathInElement(output1);
    }
}


function medtri() {
    var a, b, c;
    a = parseFloat(document.getElementById('inputsidea1').value);
    b = parseFloat(document.getElementById('inputsideb1').value);
    c = parseFloat(document.getElementById('inputsidec1').value);
    var output = document.getElementById("medtri1");
    var temp = " ";
    var ans = Math.sqrt((((2) * (c ** 2)) + ((2) * (b ** 2)) - (a ** 2)));
    var ans1 = Math.sqrt((((2) * (c ** 2)) + ((2) * (a ** 2)) - (b ** 2)));
    var ans2 = Math.sqrt((((2) * (a ** 2)) + ((2) * (b ** 2)) - (c ** 2)));
    if (isNaN(a) || isNaN(b) || isNaN(c)) {
        temp += "\\[Please \\space enter \\space all \\space field \\]";
        output.innerHTML = temp;
        renderMathInElement(output);
    }
    else {
        temp += "\\[Medians \\space of \\space Triangle \\space is: \\]";
        temp += "\\[m_a \\space = \\space \\frac{1}{2}\\sqrt{2c^{2}+2b^{2}-a^{2}} \\space = \\space \\frac{1}{2} \\times \\sqrt{ 2(" + c + "^{2}) + 2(" + b + "^{2}) - (" + a + "^{2})} \\space =  \\space \\frac{1}{2} \\times \\sqrt{ " + (2) * (c ** 2) + " + " + (2) * (b ** 2) + " - " + a ** 2 + "} \\space =  \\space \\frac{1}{2} \\times \\sqrt{ " + (((2) * (c ** 2)) + ((2) * (b ** 2)) - (a ** 2)) + "}  \\space =  \\space" + (0.5 * ans) + "\\]";
        temp += "\\[m_b \\space = \\space \\frac{1}{2}\\sqrt{2c^{2}+2a^{2}-b^{2}}  \\space = \\space \\frac{1}{2} \\times \\sqrt{ 2(" + c + "^{2}) + 2(" + a + "^{2}) - (" + b + "^{2})} \\space =  \\space \\frac{1}{2} \\times \\sqrt{ " + (2) * (c ** 2) + " + " + (2) * (a ** 2) + " - " + b ** 2 + "} \\space =  \\space \\frac{1}{2} \\times \\sqrt{ " + (((2) * (c ** 2)) + ((2) * (a ** 2)) - (b ** 2)) + "}  \\space =  \\space" + (0.5 * ans1) + "\\]";
        temp += "\\[m_c \\space = \\space \\frac{1}{2}\\sqrt{2a^{2}+2b^{2}-c^{2}}  \\space = \\space \\frac{1}{2} \\times \\sqrt{ 2(" + a + "^{2}) + 2(" + b + "^{2}) - (" + c + "^{2})} \\space =  \\space \\frac{1}{2} \\times \\sqrt{ " + (2) * (a ** 2) + " + " + (2) * (b ** 2) + " - " + c ** 2 + "} \\space =  \\space \\frac{1}{2} \\times \\sqrt{ " + (((2) * (a ** 2)) + ((2) * (b ** 2)) - (c ** 2)) + "}   \\space =  \\space" + (0.5 * ans2) + "\\]";
        output.innerHTML = temp;
        renderMathInElement(output);
    }
}
function circumtri() {
    var a, b, c;
    a = parseFloat(document.getElementById('inputsidea2').value);
    b = parseFloat(document.getElementById('inputsideb2').value);
    c = parseFloat(document.getElementById('inputsidec2').value);
    var output = document.getElementById("circumtri1");
    var temp = " ";
    var ans = (a * b * c);
    var ans1 = Math.sqrt((a + b + c) * (b + c - a) * (c + a - b) * (a + b - c));
    var ans2 = (ans / ans1);
    if (isNaN(a) || isNaN(b) || isNaN(c)) {
        temp += "\\[Please \\space enter \\space all \\space field \\]";
        output.innerHTML = temp;
        renderMathInElement(output);
    }
    else {
        temp += "\\[Circumradius \\space of \\space Triangle \\space is: \\]";
        temp += "\\[R \\space = \\space \\frac{abc}{\\sqrt{(a+b+c)(b+c-a)(c+a-b)(a+b-c)}} \\]";
        temp += "\\[R \\space = \\space \\frac{" + a + "\\times" + b + "\\times" + c + "}{\\sqrt{(" + a + "+" + b + "+" + c + ")\\times(" + b + "+" + c + "-" + a + ")\\times(" + c + "+" + a + "-" + b + ")\\times(" + a + "+" + b + "-" + c + ")}}  \\]";
        temp += "\\[R \\space = \\space \\frac{" + ans + "}{\\sqrt{(" + (a + b + c) + ")(" + (b + c - a) + ")(" + (c + a - b) + ")(" + (a + b - c) + ")}} \\space = \\space \\frac{" + ans + "}{\\sqrt{" + ((a + b + c) * (b + c - a) * (c + a - b) * (a + b - c)) + "}} \\space = \\space \\frac{" + ans + "}{" + ans1 + "} \\space = \\space " + ans2 + " \\]";
        output.innerHTML = temp;
        renderMathInElement(output);
    }
}
function intri() {
    var a, b, c;
    a = parseFloat(document.getElementById('inputsidea5').value);
    b = parseFloat(document.getElementById('inputsideb6').value);
    c = parseFloat(document.getElementById('inputsidec7').value);
    var output1 = document.getElementById("intri1");
    var temp = " ";
    var s = (a + b + c) / 2;
    var k = (s * (s - a) * (s - b) * (s - c));
    var k1 = Math.sqrt(k);
    var r = k1 / s;
    if (isNaN(a) || isNaN(b) || isNaN(c)) {
        temp += "\\[Please \\space enter \\space all \\space field \\]";
        output1.innerHTML = temp;
        renderMathInElement(output1);
    }
    else {
        temp += "\\[Semiperimeter \\space = \\space \\frac{a + b + c}{2} \\space = \\space \\frac{" + a + "+" + b + "+" + c + "}{2} \\space = \\space \\frac{" + (a + b + c) + "}{2}  \\]"
        temp += "\\[Semiperimeter \\space of \\space Triangle \\space is \\space " + s + " \\]"
        temp += "\\[By \\space Heron's \\space Formula \\space Area \\space of \\space a \\space Triangle \\space is \\]"
        temp += "\\[k \\space = \\space \\sqrt{s(s-a)(s-b)(s-c)}  \\space = \\space \\sqrt{" + s + "( " + s + "-" + a + ")(" + s + "-" + b + ")(" + s + "-" + c + ")} \\space = \\space  \\sqrt{" + k + "} \\] "
        temp += "\\[Area \\space of \\space Triangle \\space is \\space " + k1 + " \\]"
        temp += "\\[k \\space = \\space r \\times s \\space where \\space  r \\space  is \\space  Inradius \\space  of \\space  the \\space  Triangle \\]"
        temp += "\\[Inradius  \\space of \\space Triangle \\space = \\space \\frac{k}{s} \\space = \\space \\frac{ " + k1 + "}{" + s + "} \\]"
        temp += "\\[Inradius \\space of \\space Triangle \\space is: " + r + " \\]";
        output1.innerHTML = temp;
        renderMathInElement(output1);
    }
}

function incircum() {
    var a, b;
    a = parseFloat(document.getElementById('incircum1').value);
    b = parseFloat(document.getElementById('incircum2').value);
    var output = document.getElementById("incircumans");
    var temp = " ";
    var d1 = (b ** 2 - (2 * a * b))
    var d = Math.sqrt(d1)
    if (isNaN(a) || isNaN(b)) {
        temp += "\\[Please \\space enter \\space all \\space field \\]";
        output.innerHTML = temp;
        renderMathInElement(output);
    }
    else {
        temp += "\\[Distance \\space between \\space Incenter \\space and \\space Circumcenter \\space of \\space a \\space Triangle \\space is  \\]";
        temp += "\\[D \\space = \\space \\sqrt{R^{2} - 2 \\times r \\times R }  \\space = \\space \\sqrt { " + a + "^{2} - 2 \\times " + a + " \\times" + b + "} \\space = \\space \\sqrt{" + d1.toFixed(2) + "} \\space = \\space " + d.toFixed(2) + " \\]"
        output.innerHTML = temp;
        renderMathInElement(output);
    }
}

function solvetwoplane() {
    var a, b, c, d, a1, b1, c1, d1, work;
    a = parseFloat(document.getElementById('da1').value);
    b = parseFloat(document.getElementById('db1').value);
    c = parseFloat(document.getElementById('dc1').value);
    d = parseFloat(document.getElementById('dd1').value);
    a1 = parseFloat(document.getElementById('da2').value);
    b1 = parseFloat(document.getElementById('db2').value);
    c1 = parseFloat(document.getElementById('dc2').value);
    d1 = parseFloat(document.getElementById('dd2').value);
    work = document.getElementById('dplane_work');
    let print = "<h2 style='margin-top: 50px;'>Working Steps </h2> &emsp;"
    /*var explain = document.getElementById("angleplane");
    explain.innerHTML = "\\[Formula: \\space cos\\alpha = \\frac{|A1.A2  + B1.B2 + C1.C2 |}{\\sqrt{A1^2+B1^2+C1^2} \\times \\sqrt{A2^2+B2^2+C2^2}} \\] ";
    renderMathInElement(document.getElementById("angleplane"));*/
    if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(d) || isNaN(a1) || isNaN(b1) || isNaN(c1) || isNaN(d1)) {
        document.getElementById('dplane').innerHTML = "Please enter all fields";
    } else {
        if ((a == a1) && (b == b1) && (c == c1)) {
            var res = Math.abs(d1 - d) / Math.sqrt(a * a + b * b + c * c);
            document.getElementById('dplane').innerHTML = 'Distance between plane 1 and 2 is ' + res.toFixed(2);
            print += "\\[Equation \\space 1 \\space : \\space " + a + "x \\space + \\space " + b + "y \\space + \\space " + c + "z \\space + \\space " + d + " \\space = \\space 0\\]";
            print += "\\[Equation \\space 1 \\space : \\space " + a1 + "x \\space + \\space " + b1 + "y \\space + \\space " + c1 + "z \\space + \\space" + d1 + "\\space = \\space 0\\]";
            print += "\\[The \\space coefficients \\space of \\space x\\space y \\space and \\space z \\space are \\space same \\space for \\space both \\space the \\space planes. \\]";
            print += "\\[So, \\space these \\space two \\space planes \\space are \\space parallel \\space to \\space each \\space other \\]";
            print += "\\[Distance \\space between \\space two \\space parallel \\space planes \\space  \\]";
            print += "\\[= \\space \\frac{|D_2 - D_1|}{\\sqrt{A^2 + B^2 + C^2}}\\]";
            print += "\\[where, A \\space B \\space and \\space C \\space are \\space coefficients \\space of \\space x \\space y \\space and \\space z \\space respectively\\]";
            print += "\\[= \\space \\frac{|(" + d1 + ") - (" + d + ")|}{\\sqrt{(" + a + ")^2 + (" + b + ")^2 + (" + c + ")^2}}\\]";
            print += "\\[= \\space " + res + "\\]";
            print += "\\[So, \\space distance \\space between \\space plane \\space 1 \\space and \\space plane \\space 2 \\space = \\space " + res.toFixed(2) + " \\]";
        }
        else {
            document.getElementById('dplane').innerHTML = 'Planes are not parallel, so distance is 0';
            print += "\\[Equation \\space 1 \\space : \\space " + a + "x \\space + \\space " + b + "y \\space + \\space " + c + "z \\space + \\space " + d + " \\space = \\space 0\\]";
            print += "\\[Equation \\space 1 \\space : \\space " + a1 + "x \\space + \\space " + b1 + "y \\space + \\space " + c1 + "z \\space + \\space" + d1 + "\\space = \\space 0\\]";
            print += "\\[The \\space coefficients \\space of \\space x\\space y \\space and \\space z \\space are \\space not \\space same \\space for \\space both \\space the \\space planes. \\]";
            print += "\\[So, \\space these \\space two \\space planes \\space are \\space \\space not \\space parallel \\space to \\space each \\space other \\]";
            print += "\\[Distance \\space between \\space two \\space unparallel \\space planes \\space = \\space 0  \\]";
        }
    }
    work.innerHTML = print;
    renderMathInElement(work);

}
function threedissolve() {
    var x1 = parseFloat(document.getElementById('3dinputx1').value);
    var x2 = parseFloat(document.getElementById('3dinputx2').value);
    var y1 = parseFloat(document.getElementById('3dinputy1').value);
    var y2 = parseFloat(document.getElementById('3dinputy2').value);
    var z1 = parseFloat(document.getElementById('3dinputz1').value);
    var z2 = parseFloat(document.getElementById('3dinputz2').value);
    var dis = document.getElementById('opdis');
    var dis1 = document.getElementById('opdis1');
    var displaytemp = "";
    var displaytemp1 = "";
    if (isNaN(x1) || isNaN(x2) || isNaN(y1) || isNaN(y2) || isNaN(z1) || isNaN(z2)) {
        displaytemp += "\\[Please \\space enter \\space all \\space fields \\]";
        displaytemp1 = "";
        dis.innerHTML = displaytemp;
        dis1.innerHTML = displaytemp1;
        renderMathInElement(dis);
        renderMathInElement(dis1);
    } else {
        var res = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2));
        displaytemp += "\\[Formula = \\space \\sqrt{(x2-x1)^2 + (y2-y1)^2 + (z2-z1)^2 } \\]";
        displaytemp1 += "\\[Distance \\space between \\space A(" + x1 + "," + y1 + "," + z1 + ") \\space and \\space B(" + x2 + "," + y2 + "," + z2 + ") = " + "\\sqrt{(" + x2 + "-" + x1 + ")^2 + (" + y2 + "-" + y1 + ")^2 + (" + z2 + "-" + z1 + ")^2}" + " = " + res.toFixed(2) + "\\]";
        dis.innerHTML = displaytemp;
        dis1.innerHTML = displaytemp1;
        renderMathInElement(dis);
        renderMathInElement(dis1);
    }
}

function circularsegmentsolve() {
    var r = parseFloat(document.getElementById("circularsegment-r").value);
    var h = parseFloat(document.getElementById("circularsegment-h").value);
    var thetaField = document.getElementById("circularsegment-theta");
    var arcLenField = document.getElementById("circularsegment-l");
    var chordLenField = document.getElementById("circularsegment-s");
    var periField = document.getElementById("circularsegment-p");
    var areaField = document.getElementById("circularsegment-a");
    var theta = 2 * Math.acos(1 - h / r);
    var l = r * theta;
    var s = 2 * Math.sqrt(2 * r * h - Math.pow(h, 2));
    var p = l + s;
    var A = r * l / 2 - s * (r - h) / 2;
    if ((!isNaN(r)) && (!isNaN(h))) {
        thetaField.innerHTML = `Angle (Θ) = ${theta.toFixed(3)} rad`;
        arcLenField.innerHTML = `Arc length (l) = ${l.toFixed(3)}`;
        chordLenField.innerHTML = `Chord length (s) = ${s.toFixed(3)}`;
        periField.innerHTML = `Perimeter (p) = ${p.toFixed(3)}`;
        areaField.innerHTML = `Area (A) = ${A.toFixed(3)}`;
    }
}

function solvetetra() {
    var a = document.getElementById("inputsidetetra").value;
    var voloutput = document.getElementById("resultoftetravol");
    var heioutput = document.getElementById("resultoftetrahei");
    var croutput = document.getElementById("resultoftetracr");
    var inroutput = document.getElementById("resultoftetrainr");
    var areaoutput = document.getElementById("resultoftetraarea");
    var voltemp = "";
    var heitemp = "";
    var crtemp = "";
    var inrtemp = "";
    var areatemp = "";
    if (a != "") {
        voltemp += "\\[Volume \\space of \\space Tetrahedron \\space \\newline \\frac{1}{6 \\sqrt{2}} \\times" + a + "\\times" + a + "\\times" + a + "\\ = " + eval(String(0.11785113 * a * a * a)).toFixed(2) + "\\]";
        voloutput.innerHTML = voltemp;
        heitemp += "\\[Height \\space of \\space Tetrahedron \\space \\newline \\frac{\\sqrt{2}}{\\sqrt{3}} \\times" + a + "\\ = " + eval(String(0.81649658 * a)).toFixed(2) + "\\]";
        heioutput.innerHTML = heitemp;
        crtemp += "\\[Circumradius \\space of \\space Tetrahedron \\space \\newline \\frac{\\sqrt{6}}{4} \\times" + a + "\\ = " + eval(String(0.61237244 * a)).toFixed(2) + "\\]";
        croutput.innerHTML = crtemp;
        inrtemp += "\\[Inradius \\space of \\space Tetrahedron \\space \\newline \\frac{1}{\\sqrt{24}} \\times" + a + "\\ = " + eval(String(0.20412415 * a)).toFixed(2) + "\\]";
        inroutput.innerHTML = inrtemp;
        areatemp += "\\[Surface \\space Area \\space of \\space Tetrahedron \\space \\newline \\sqrt{3} \\times" + a + "\\times" + a + "\\ = " + eval(String(1.73205081 * a * a)).toFixed(2) + "\\]";
        areaoutput.innerHTML = areatemp;
        renderMathInElement(areaoutput);
        renderMathInElement(voloutput);
        renderMathInElement(croutput);
        renderMathInElement(inroutput);
        renderMathInElement(heioutput);
    } else {
        areaoutput.innerHTML = "";
        voloutput.innerHTML = "";
        croutput.innerHTML = "";
        inroutput.innerHTML = "";
        heioutput.innerHTML = "";
    }
}

function equilateraltrianglearea() {
    var side = document.getElementById("equilateraltriangleside").value;
    var areaoutput = document.getElementById("equilateraltrianglearea");
    var perimeteroutput = document.getElementById("equilateraltriangleperimeter");
    var areatemp = "";
    var perimetertemp = "";
    if (side != "") {
        perimetertemp += "\\[P=3 \\times " + side + "\\]";
        perimetertemp +=
            "\\[Perimeter \\space of \\space Triangle \\space is \\space" +
            eval(String(3 * side)) +
            "\\]";
        perimeteroutput.innerHTML = perimetertemp;

        areatemp += "\\[A = \\frac{\\sqrt{3}}{4} " + side + "^2 \\]";
        areatemp += "\\[A = \\frac{1.73}{4} (" + eval(String(side * side)) + ")\\]";
        areatemp += "\\[A=0.433 \\times " + eval(String(side * side)) + " \\]";
        var a = eval(String("0.433*" + String(side * side)));
        areatemp += "\\[A=" + a + " \\]";
        areatemp +=
            "\\[Area \\space of \\space Triangle \\space is \\space " + a + "\\]";
        areaoutput.innerHTML = areatemp;
        renderMathInElement(areaoutput);
        renderMathInElement(perimeteroutput);
    } else {
        areaoutput.innerHTML = "";
        perimeteroutput.innerHTML = "";
    }
}

function solverightangletriangle() {
    var base = document.getElementById("inputbaserighttriangle").value;
    var height = document.getElementById("inputheightrighttriangle").value;
    var areaoutput = document.getElementById("resultofarearat");
    var perimeteroutput = document.getElementById("resultofperirat");
    var hypooutput = document.getElementById("resultofhyporat");
    var areatemp = "";
    var perimetertemp = "";
    var hypotemp = "";
    if (base != "" && height != "") {
        var base2 = base * base;
        var height2 = height * height;
        var add2 = eval(String(base2 + height2));
        var add2sqrt = nerdamer.sqrt(add2).toString();

        hypotemp += "\\[h=\\sqrt{" + base + "^2" + "+" + height + "^2" + "}\\]";
        hypotemp += "\\[h= \\sqrt{" + base2 + "+" + height2 + "}\\]";
        hypotemp += "\\[h= \\sqrt{" + add2 + "}\\]";
        hypotemp += "\\[h=" + eval(add2sqrt).toFixed(3) + "\\]";
        hypotemp += "\\[Hypotenuse \\space of \\space Triangle \\space is \\space" +
            eval(add2sqrt).toFixed(3) + "\\]";
        hypooutput.innerHTML = hypotemp;

        var hypovar = eval(add2sqrt).toFixed(3);

        perimetertemp += "\\[P=" + base + "+" + height + "+" + hypovar + "\\]";
        perimetertemp +=
            "\\[Perimeter \\space of \\space Triangle \\space is \\space" +
            eval(String(base) + "+" + String(height) + "+" + String(hypovar)) +
            "\\]";
        perimeteroutput.innerHTML = perimetertemp;

        areatemp += "\\[A = \\frac{1}{2} \\times " + base + "\\times" + height + "\\]";
        areatemp += "\\[A = \\frac{1}{2} (" + eval(String(base * height)) + ")\\]";
        var a = eval(String("0.5*" + String(base * height)));
        areatemp += "\\[A=" + a + " \\]";
        areatemp +=
            "\\[Area \\space of \\space Triangle \\space is \\space " + a + "\\]";
        areaoutput.innerHTML = areatemp;
        renderMathInElement(areaoutput);
        renderMathInElement(perimeteroutput);
        renderMathInElement(hypooutput);

    } else {
        areaoutput.innerHTML = "";
        perimeteroutput.innerHTML = "";
        hypooutput.innerHTML = "";
    }
}

function solvescalenetriangle() {
    var sidea = document.getElementById("inputfirstside").value;
    var sideb = document.getElementById("inputsecondside").value;
    var sidec = document.getElementById("inputthirdside").value;
    var areaoutput = document.getElementById("resultofareast");
    var perimeteroutput = document.getElementById("resultofperist");
    var semiperioutput = document.getElementById("resultofsemiperist");
    var areatemp = "";
    var perimetertemp = "";
    var semiperitemp = "";
    if (sidea != "" && sideb != "" && sidec != "") {

        perimetertemp += "\\[P=" + sidea + "+" + sideb + "+" + sidec + "\\]";
        perimetertemp +=
            "\\[Perimeter \\space of \\space Triangle \\space is \\space" +
            eval(String(sidea) + "+" + String(sideb) + "+" + String(sidec)) +
            "\\]";
        perimeteroutput.innerHTML = perimetertemp;

        semiperitemp += "\\[P=\\frac{" + sidea + "+" + sideb + "+" + sidec + "}{2}" + "\\]";
        semiperitemp += "\\[P=\\frac{" + eval(String(sidea) + "+" + String(sideb) + "+" + String(sidec)) + "}{2} \\]";
        var sidesum = eval(String(sidea) + "+" + String(sideb) + "+" + String(sidec));

        semiperitemp += "\\[Semi-perimeter \\space of \\space Triangle \\space is \\space" +
            eval(String("0.5*" + String(sidesum))) +
            "\\]";
        semiperioutput.innerHTML = semiperitemp;


        var semiperimeter = eval(String("0.5*" + String(sidesum)));
        var a2 = semiperimeter - sidea;
        var b2 = semiperimeter - sideb;
        var c2 = semiperimeter - sidec;
        var ans = semiperimeter * a2 * b2 * c2;
        var anssqrt = nerdamer.sqrt(ans).toString();
        anssqrt = eval(anssqrt).toFixed(3);

        areatemp += "\\[A = \\sqrt{ " + semiperimeter + "\\times (" + semiperimeter + "-" + sidea +
            ") \\times (" + semiperimeter + "-" + sideb + ") \\times (" + semiperimeter + "-" + sidec + ")}" + "\\]";
        areatemp += "\\[A = \\sqrt{ " + semiperimeter + "\\times" + a2 + "\\times" + b2 + "\\times" + c2 + "}\\]";
        areatemp += "\\[A = \\sqrt{ " + semiperimeter + "\\times" + eval(String(a2 * b2 * c2)) + "}\\]";
        areatemp += "\\[A = \\sqrt{ " + ans + " }\\]";
        areatemp += "\\[A=" + anssqrt + " \\]";
        areatemp +=
            "\\[Area \\space of \\space Triangle \\space is \\space " + anssqrt + "\\]";
        areaoutput.innerHTML = areatemp;

        renderMathInElement(areaoutput);
        renderMathInElement(perimeteroutput);
        renderMathInElement(semiperioutput);

    } else {
        areaoutput.innerHTML = "";
        perimeteroutput.innerHTML = "";
        semiperioutput.innerHTML = "";
    }
}


function solvecirtriangle() {
    var r = document.getElementById("inputcirtrirad").value;
    var a = document.getElementById("inputcirtria").value;
    var areaoutput = document.getElementById("resultofareacirtri");
    var perimeteroutput = document.getElementById("resultofcirtriperi");
    var areatemp = "";
    var perimetertemp = "";
    var area = ((3.14 * r) / 3).toFixed(2);
    var peri = 3.14 * r;
    if ((r != "") && (a != "")) {

        perimetertemp += "\\[P= \\pi \\times" + r + "\\]";
        perimetertemp += "\\[Perimeter  \\space is \\space " + peri + "\\]";
        perimeteroutput.innerHTML = perimetertemp;
        areatemp += "\\[A= \\frac{ \\pi }{3} \\times" + r + "\\]";
        areatemp += "\\[Area  \\space is \\space " + area + "\\]";
        areaoutput.innerHTML = areatemp;

        renderMathInElement(areaoutput);
        renderMathInElement(perimeteroutput);


    } else {
        areaoutput.innerHTML = "";
        perimeteroutput.innerHTML = "";

    }
}
function isoscelestrianglearea() {
    var eqside = document.getElementById("inputeqitside").value;
    var side = document.getElementById("inputitside").value;
    var height = Math.sqrt((parseInt(eqside) * parseInt(eqside)) - ((parseInt(side) * parseInt(side)) / 4));
    var perimeter = (2 * parseInt(eqside) + parseInt(side));
    var area = 0.5 * side * height;
    if (side != "" && eqside != "") {
        document.getElementById('resultofheightit1').innerHTML = "\\[Height \\space of \\space the \\space Isosceles \\space triangle \\space is \\]";
        renderMathInElement(document.getElementById('resultofheightit1'));
        document.getElementById('resultofheightit2').innerHTML = "\\[\\sqrt{" + eval(eqside * eqside) + " \\space - \\frac{" + eval(side * side) + "}{4}} =" + height.toFixed(2) + "\\]";
        renderMathInElement(document.getElementById('resultofheightit2'));

        document.getElementById('resultofareait1').innerHTML = "\\[Area \\space of \\space the \\space Isosceles \\space triangle \\space is \\]";
        renderMathInElement(document.getElementById('resultofareait1'));
        document.getElementById('resultofareait2').innerHTML = "\\[\\frac{1}{2} \\times" + side + "\\times " + height.toFixed(2) + " = " + area.toFixed(2) + "\\]";
        renderMathInElement(document.getElementById('resultofareait2'));

        document.getElementById('resultofperiit1').innerHTML = "\\[Perimeter \\space of \\space the \\space Isosceles \\space triangle \\space is \\]";
        renderMathInElement(document.getElementById('resultofperiit1'));
        document.getElementById('resultofperiit2').innerHTML = "\\[2*(" + eqside + ") + " + side + "= " + perimeter + "\\]";
        renderMathInElement(document.getElementById('resultofperiit2'));
    }

}

function solvestriangle() {
    var s1 = document.getElementById("inputfirsts1").value;
    var s2 = document.getElementById("inputseconds2").value;
    var angle = document.getElementById("inputangledeg").value;
    var area = 0.5 * s1 * s2 * math.sin(angle);
    var height = s2 * math.sin(angle);
    var peri = parseInt(s1) + parseInt(s2) + math.sqrt(s1 ** 2 + s2 ** 2 - (2 * s1 * s2 * math.cos(angle)));

    if (height <= 0 && area <= 0 && s1 != "" && s2 != "" && angle != "") {
        document.getElementById("resultofper").innerHTML = ""
        document.getElementById("resultofarea").innerHTML = "\\[Please \\space enter \\space correct \\space angle\\]";
        document.getElementById("resultofheight").innerHTML = ""
        renderMathInElement(document.getElementById("resultofarea"));
        return;
    }
    if (s1 != "" && s2 != "" && angle != "") {
        document.getElementById("resultofper").innerHTML = "\\[The \\space Perimeter \\space of \\space the \\space triangle \\space (P) \\newline " + s1 + "+ " + s2 + " + \\sqrt{" + s1 + "^2 + " + s2 + "^2 -2 \\times " + s1 + "\\times " + s2 + " \\space cos (" + angle + ")} \\newline = " + peri.toFixed(3) + "\\]";
        document.getElementById("resultofarea").innerHTML = "\\[The \\space Area \\space of \\space the \\space triangle \\space (S) \\newline \\frac{1}{2} \\times " + s1 + "\\times " + s2 + " \\times sin (" + angle + ") \\newline = " + area.toFixed(3) + "\\]";
        document.getElementById("resultofheight").innerHTML = "\\[The \\space Height \\space of \\space the \\space traingle \\space (h) \\newline " + s2 + "\\times sin (" + angle + ") \\newline = " + height.toFixed(3) + "\\]";
        renderMathInElement(document.getElementById("resultofper"));
        renderMathInElement(document.getElementById("resultofarea"));
        renderMathInElement(document.getElementById("resultofheight"));
    }
}

function findeq() {
    var a1 = parseInt(document.getElementById("ther").value)
    var h1 = parseInt(document.getElementById("theh").value)
    document.getElementById("xeqn").innerHTML = "x &nbsp  =&nbsp; " + a1 + "√u/" + Math.sqrt(h1) + " cosv "
    document.getElementById("yeqn").innerHTML = "y &nbsp;  =&nbsp; " + a1 + " √u/ " + Math.sqrt(h1) + " sinv "
    document.getElementById("zeqn").innerHTML = "z &nbsp;  =&nbsp;  u"
}

function centv() {
    var h2 = parseInt(document.getElementById("theh2").value);
    var ans = document.getElementById("volf1");
    var temp = "";
    var ans1 = (2 / 3) * h2;
    if (!isNaN(h2)) {
        temp += "\\[\\frac{2}{3} \\times " + h2 + " \\]";
        temp += "\\[Centroid \\space of \\space Paraboloid \\space is \\space " + ans1 + "\\]";
        ans.innerHTML = temp;
        renderMathInElement(ans);
    }
    else {
        temp += "\\[Please \\space enter \\space all \\space input \\]";
        ans.innerHTML = temp;
        renderMathInElement(ans);
    }
}

function solveparallelogram() {
    var base = document.getElementById("inputbase").value;
    var height = document.getElementById("inputheight").value;
    var side = document.getElementById("inputsidep").value;
    var area = document.getElementById("resultofareap");
    var peri1 = document.getElementById("resultofperip1");
    var peri2 = document.getElementById("resultofperip2");
    var heightperi = document.getElementById("resultofheightp");
    area.innerHTML = "";
    peri1.innerHTML = "";
    peri2.innerHTML = "";
    heightperi.innerHTML = "";
    var a = base * height;
    var p = 2 * (parseInt(base) + parseInt(side));
    var h = a / base;
    console.log(a);
    console.log(p);
    console.log(h);
    if (base != "" && height != "") {
        document.getElementById("resultofareap").innerHTML = "\\[Area \\space of \\space  parallelogram \\space \\space" + base + "\\times" + height + "\\ = " + a + "\\]";
        renderMathInElement(document.getElementById("resultofareap"));
    }
    if (side != "" && base != "") {
        document.getElementById("resultofperip1").innerHTML = "\\[Perimeter \\space of \\space parallelogram\\]";
        renderMathInElement(document.getElementById("resultofperip1"));
        document.getElementById("resultofperip2").innerHTML = "\\[2 \\times (" + base + "+" + side + ")\\ = " + p + " \\]";
        renderMathInElement(document.getElementById("resultofperip2"));
    }
    if (base != "" && a != "") {
        document.getElementById("resultofheightp").innerHTML = "\\[Height \\space of \\space parallelogram  \\space \\frac{" + a + "}{" + base + "} = " + h + " \\]";
        renderMathInElement(document.getElementById("resultofheightp"));
    }

}

function rhombussolve() {
    var d1 = document.getElementById("inputd1").value;
    var d2 = document.getElementById("inputd2").value;
    var a = document.getElementById("inputside").value;
    var resultarea = document.getElementById("resultofarearec");
    var resultperi = document.getElementById("resultofperi");
    resultarea.innerHTML = "";
    resultperi.innerHTML = "";
    var area = 0.5 * (d1 * d2);
    var perimeter = 4 * a;
    if (d1 != "" && d2 != "") {
        document.getElementById("resultofareac").innerHTML = "\\[Area \\space of \\space Rhombus  \\space \\frac{1}{2} \\times" + d1 + "\\times" + d2 + "\\ = " + area + "\\]";
        renderMathInElement(document.getElementById("resultofareac"));
    }
    if (a != "") {
        document.getElementById("resultofperi").innerHTML = `\\[Perimeter \\space of \\space Rhombus \\ 4 \\times${a}\\ = ${perimeter}\\]`;
        renderMathInElement(document.getElementById("resultofperi"));
    } else if (a == "") {
        document.getElementById("resultofperi").innerHTML = "Enter side value to calculate perimeter";
    }
}

function mincubefind() {
    let n = parseInt(document.getElementById("mincube").value)
    var count = 0, ans = 1;
    if (!isNaN(n)) {
        while (n % 2 == 0) {
            count++;
            n /= 2;
        }
        if (count % 3 != 0)
            ans *= Math.pow(2, (count % 3));

        for (var i = 3; i <= Math.sqrt(n); i += 2) {
            count = 0;
            while (n % i == 0) {
                count++;
                n /= i;
            }
            if (count % 3 != 0)
                ans *= Math.pow(i, (count % 3));
        }
        if (n > 2)
            ans *= n;
        document.getElementById("mincubeans").innerHTML = ans
    }
    else {
        document.getElementById('mincubeans').innerHTML = 'Please enter all Input';
    }
}

function interiorsolve() {
    var n = parseInt(document.getElementById("polyside").value);
    var sub = n - 2;
    var interiorSum = sub * 180;
    var eachInterior = interiorSum / n;
    console.log(n);
    console.log(interiorSum);
    document.getElementById("suminterior").innerHTML = "\\[sum = (" + n + "-2)180=\\space" + sub + "\\times \\space 180\\]" + "\\[Sum \\space of \\space Interior \\space Angle =" + interiorSum + "\\]";

    renderMathInElement(document.getElementById("suminterior"));
    document.getElementById("each_interior").innerHTML = "\\[Each\\space Measure = \\frac{" + interiorSum + "}{" + n + "}\\]" + "\\[Mesaure \\space of \\space each \\space Interior \\space Angle =" + eachInterior + "\\]";

    renderMathInElement(document.getElementById("each_interior"));


}
function Kitesolve() {
    var p = document.getElementById("inputp").value;
    var q = document.getElementById("inputq").value;
    var a = document.getElementById("inputsidea1").value;
    var b = document.getElementById("inputsideb1").value;
    var resultareaKite = document.getElementById("resultofareaK");
    var resultperiKite = document.getElementById("resultofperiK");
    resultareaKite.innerHTML = "";
    resultperiKite.innerHTML = "";
    sum = parseInt(a) + parseInt(b);
    var area = 0.5 * (p * q);
    var perimeter = 2 * sum;
    if (p != "" && q != "") {
        document.getElementById("resultofareaK").innerHTML = "\\[Area \\space of \\space Kite  \\space \\space \\frac{1}{2} \\times" + p + "\\times" + q + "\\ = " + area + "\\]";
        renderMathInElement(document.getElementById("resultofareaK"));
    }
    if (a != "" && b != "") {
        document.getElementById("resultofperiK").innerHTML = "\\[Perimeter \\space of \\space Kite  \\space \\ 2 \\times (" + a + "+" + b + ")\\ = " + perimeter + " \\]";
        renderMathInElement(document.getElementById("resultofperiK"));
    } else if (a == "" || b == "") {
        document.getElementById("resultofperiK").innerHTML = "Enter side a and b both to calculate perimeter";
    }
}
function solvetricorn() {
    var r = document.getElementById("inputtricornrad").value;
    var perioutput = document.getElementById("resultoftricornperi");
    var areaoutput = document.getElementById("resultoftricornarea");
    var areatemp = "";
    var peritemp = "";
    if (r != "") {
        peritemp += "\\[Perimeter \\space of \\space Tricorn \\space \\newline \\pi \\times " + r + "\\ = " + eval(String(3.14 * r)).toFixed(2) + "\\]";
        perioutput.innerHTML = peritemp;
        areatemp += "\\[Area \\space of \\space Tricorn \\space  \\newline" + "(\\sqrt{\\frac{3}{4}}-\\frac{\\pi}{6})" + "\\times" + r + "^2" + "\\ = " + eval(String(0.343 * r * r)).toFixed(3) + "\\]";
        areaoutput.innerHTML = areatemp;
        renderMathInElement(perioutput);
        renderMathInElement(areaoutput);

    } else {
        perioutput.innerHTML = "";
        areaoutput.innerHTML = "";
    }

}

function rectanglesolve() {
    var length = document.getElementById("inputreclength").value;
    var breadth = document.getElementById("inputrecbreadth").value;
    var diagonal = document.getElementById("inputrecdiagonal").value;
    var resultarea = document.getElementById("resultofarearec");
    var resultperi = document.getElementById("resultofperirec");
    var resultdiagonal = document.getElementById("resultofdiagonalrec");
    var resultlength = document.getElementById("resultoflengthrec");
    var resultbreadth = document.getElementById("resultofbreadthrec");
    if (length != "" && breadth != "" && diagonal != "") {
        resultarea.innerHTML = "";
        resultperi.innerHTML = "";
        resultdiagonal.innerHTML = "";
        resultlength.innerHTML = "";
        resultbreadth.innerHTML = "";
        if (length < breadth) {
            resultarea.innerHTML = "Length Should be Greater";
        } else {
            resultarea.innerHTML =
                "\\[a=" +
                length +
                " \\times " +
                breadth +
                " = " +
                eval(String(length) + "*" + String(breadth)) +
                "\\]";
            resultarea.innerHTML +=
                "\\[Area \\space of \\space Rectangle \\space is \\space" +
                eval(String(length) + "*" + String(breadth)) +
                "\\]";

            resultperi.innerHTML =
                "\\[p=2( " +
                length +
                " + " +
                breadth +
                " ) = 2( " +
                eval(String(length) + "+" + String(breadth)) +
                " ) = " +
                eval("2*(" + String(length) + "+" + String(breadth) + ")") +
                "\\]";
            resultperi.innerHTML +=
                "\\[Perimeter \\space of \\space Rectangle \\space is \\space" +
                eval("2*(" + String(length) + "+" + String(breadth) + ")") +
                "\\]";
        }
    } else if (length != "" && breadth != "" && diagonal == "") {
        resultarea.innerHTML = "";
        resultperi.innerHTML = "";
        resultdiagonal.innerHTML = "";
        resultlength.innerHTML = "";
        resultbreadth.innerHTML = "";
        if (length < breadth) {
            resultarea.innerHTML = "Length Should be Greater";
        } else {
            resultarea.innerHTML =
                "\\[a=" +
                length +
                " \\times " +
                breadth +
                " = " +
                eval(String(length) + "*" + String(breadth)) +
                "\\]";
            resultarea.innerHTML +=
                "\\[Area \\space of \\space Rectangle \\space is \\space" +
                eval(String(length) + "*" + String(breadth)) +
                "\\]";

            resultperi.innerHTML =
                "\\[p=2( " +
                length +
                " + " +
                breadth +
                " ) = 2( " +
                eval(String(length) + "+" + String(breadth)) +
                " ) = " +
                eval("2*(" + String(length) + "+" + String(breadth) + ")") +
                "\\]";
            resultperi.innerHTML +=
                "\\[Perimeter \\space of \\space Rectangle \\space is \\space" +
                eval("2*(" + String(length) + "+" + String(breadth) + ")") +
                "\\]";

            var breadth2 = breadth * breadth;
            var length2 = length * length;
            var add2 = eval(String(breadth2 + length2));
            var add2sqrt = nerdamer.sqrt(add2).toString();
            resultdiagonal.innerHTML =
                "\\[d= \\sqrt{" +
                breadth +
                "^2+" +
                length +
                "^2}= \\sqrt{" +
                breadth2 +
                "+" +
                length2 +
                "}= \\sqrt{" +
                add2 +
                "}=" +
                eval(add2sqrt).toFixed(3) +
                "\\]";
            resultdiagonal.innerHTML +=
                "\\[Diagonal \\space of \\space Rectangle \\space is \\space" +
                eval(add2sqrt).toFixed(3) +
                "\\]";
        }
    } else if (length != "" && diagonal != "") {
        resultarea.innerHTML = "";
        resultperi.innerHTML = "";
        resultdiagonal.innerHTML = "";
        resultlength.innerHTML = "";
        resultbreadth.innerHTML = "";
        if (diagonal < length) {
            resultbreadth.innerHTML = "Diagonal Should be Greater";
        } else {
            var length22 = length * length;
            var diagonal22 = diagonal * diagonal;
            var bsub2 = eval(String(diagonal22 - length22));
            var bsub2sqrt = nerdamer.sqrt(bsub2).toString();
            bsub2sqrt = eval(bsub2sqrt).toFixed(3);
            resultbreadth.innerHTML =
                "\\[b= \\sqrt{" +
                diagonal +
                "^2-" +
                length +
                "^2}= \\sqrt{" +
                diagonal22 +
                "-" +
                length22 +
                "}= \\sqrt{" +
                bsub2 +
                "}=" +
                bsub2sqrt +
                "\\]";
            resultbreadth.innerHTML +=
                "\\[Breadth \\space of \\space Rectangle \\space is \\space" +
                bsub2sqrt +
                "\\]";

            resultarea.innerHTML =
                "\\[a=" +
                length +
                " \\times " +
                bsub2sqrt +
                " = " +
                eval(String(length) + "*" + String(bsub2sqrt)) +
                "\\]";
            resultarea.innerHTML +=
                "\\[Area \\space of \\space Rectangle \\space is \\space" +
                eval(String(length) + "*" + String(bsub2sqrt)) +
                "\\]";

            resultperi.innerHTML =
                "\\[p=2( " +
                length +
                " + " +
                bsub2sqrt +
                " ) = 2( " +
                eval(String(length) + "+" + String(bsub2sqrt)) +
                " ) = " +
                eval("2*(" + String(length) + "+" + String(bsub2sqrt) + ")") +
                "\\]";
            resultperi.innerHTML +=
                "\\[Perimeter \\space of \\space Rectangle \\space is \\space" +
                eval("2*(" + String(length) + "+" + String(bsub2sqrt) + ")") +
                "\\]";
        }
    } else if (diagonal != "" && breadth != "") {
        resultarea.innerHTML = "";
        resultperi.innerHTML = "";
        resultdiagonal.innerHTML = "";
        resultlength.innerHTML = "";
        resultbreadth.innerHTML = "";
        if (diagonal < breadth) {
            resultlength.innerHTML = "Length should be Greater";
        } else {
            var diagonal2 = diagonal * diagonal;
            var breadth22 = breadth * breadth;
            var sub2 = eval(String(diagonal2 - breadth22));
            var sub2sqrt = nerdamer.sqrt(sub2).toString();
            sub2sqrt = eval(sub2sqrt).toFixed(3);
            resultlength.innerHTML =
                "\\[l= \\sqrt{" +
                diagonal +
                "^2-" +
                breadth +
                "^2}= \\sqrt{" +
                diagonal2 +
                "-" +
                breadth22 +
                "}= \\sqrt{" +
                sub2 +
                "}=" +
                sub2sqrt +
                "\\]";
            resultlength.innerHTML +=
                "\\[Length \\space of \\space Rectangle \\space is \\space" +
                sub2sqrt +
                "\\]";

            resultarea.innerHTML =
                "\\[a=" +
                sub2sqrt +
                " \\times " +
                breadth +
                " = " +
                eval(String(sub2sqrt) + "*" + String(breadth)) +
                "\\]";
            resultarea.innerHTML +=
                "\\[Area \\space of \\space Rectangle \\space is \\space" +
                eval(String(sub2sqrt) + "*" + String(breadth)) +
                "\\]";

            resultperi.innerHTML =
                "\\[p=2( " +
                sub2sqrt +
                " + " +
                breadth +
                " ) = 2( " +
                eval(String(sub2sqrt) + "+" + String(breadth)) +
                " ) = " +
                eval("2*(" + String(sub2sqrt) + "+" + String(breadth) + ")") +
                "\\]";
            resultperi.innerHTML +=
                "\\[Perimeter \\space of \\space Rectangle \\space is \\space" +
                eval("2*(" + String(sub2sqrt) + "+" + String(breadth) + ")") +
                "\\]";
        }
    } else {
        resultarea.innerHTML = "";
        resultperi.innerHTML = "";
        resultdiagonal.innerHTML = "";
        resultlength.innerHTML = "";
        resultbreadth.innerHTML = "";
    }
    renderMathInElement(document.getElementById("resultofperirec"));
    renderMathInElement(document.getElementById("resultofarearec"));
    renderMathInElement(document.getElementById("resultofdiagonalrec"));
    renderMathInElement(document.getElementById("resultoflengthrec"));
    renderMathInElement(document.getElementById("resultofbreadthrec"));
}
function solvebulge() {
    var r = document.getElementById("inputbulgerad").value;
    var widthoutput = document.getElementById("resultofbulgewidth");
    var heightoutput = document.getElementById("resultofbulgeheight");
    var perioutput = document.getElementById("resultofbulgeperi");
    var areaoutput = document.getElementById("resultofbulgearea");
    var widthtemp = "";
    var heighttemp = "";
    var areatemp = "";
    var peritemp = "";
    if (r != "") {
        widthtemp += "\\[Width \\space of \\space Bulge \\space \\newline 4 \\times" + r + "\\ = " + eval(String(4 * r)).toFixed(2) + "\\]";
        widthoutput.innerHTML = widthtemp;
        heighttemp += "\\[Height \\space of \\space Bulge \\space \\newline 2 \\times" + r + "\\ = " + eval(String(2 * r)).toFixed(2) + "\\]";
        heightoutput.innerHTML = heighttemp;
        peritemp += "\\[Perimeter \\space of \\space Bulge \\space \\newline 2 \\times" + r + "(\\pi + 2) " + "\\ = " + eval(String(10.28 * r)).toFixed(2) + "\\]";
        perioutput.innerHTML = peritemp;
        areatemp += "\\[Area \\space of \\space Bulge \\space  \\newline" + "4 \\times" + r + "^2" + "\\ = " + eval(String(4 * r * r)).toFixed(2) + "\\]";
        areaoutput.innerHTML = areatemp;
        renderMathInElement(widthoutput);
        renderMathInElement(heightoutput);
        renderMathInElement(perioutput);
        renderMathInElement(areaoutput);

    } else {
        widthoutput.innerHTML = "";
        heightoutput.innerHTML = "";
        perioutput.innerHTML = "";
        areaoutput.innerHTML = "";
    }

}
function cutrectanglesolve() {
    var a = document.getElementById("inputreclongside").value;
    var b = document.getElementById("inputrecshortside").value;
    var c = document.getElementById("inputreclongcut").value;
    var d = document.getElementById("inputrecshortcut").value;

    var area = a * b - (a - c) * (b - d) / 2;
    var e = math.sqrt((a - c) ** 2 + (b - d) ** 2);
    var peri = parseInt(a) + parseInt(b) + parseInt(c) + parseInt(d) + e;

    if (a != "" && b != "" && c != "" && d != "") {
        document.getElementById("resultofslantcutrec").innerHTML = "\\[Slant \\space side \\space (e) \\space of \\space Cut \\space Rectangle \\space \\newline \\sqrt{(" + a + "-" + c + ")^2 + (" + b + "-" + d + ")^2} = " + e.toFixed(3) + "\\]";
        document.getElementById("resultofpericutrec").innerHTML = "\\[Perimeter \\space (P) \\space of \\space Cut \\space Rectangle \\space \\newline " + a + "+" + b + "+" + c + "+" + d + "+" + e + " = " + peri.toFixed(3) + "\\]";
        document.getElementById("resultofareacutrec").innerHTML = "\\[Area \\space (A) \\space of \\space Cut \\space Rectangle \\space \\newline  " + a + " \\times " + b + " - (" + a + " - " + c + ") \\times \\frac{(" + b + " -" + d + ")}{2}= " + area.toFixed(3) + "\\]"

        renderMathInElement(document.getElementById("resultofslantcutrec"));
        renderMathInElement(document.getElementById("resultofpericutrec"));
        renderMathInElement(document.getElementById("resultofareacutrec"));

    } else {
        document.getElementById("resultofslantcutrec").innerHTML = "";
        document.getElementById("resultofpericutrec").innerHTML = "";
        document.getElementById("resultofareacutrec").innerHTML = "";
    }
}
function solvecosine() {
    var sidea = document.getElementById("inputsidea").value;
    var sideb = document.getElementById("inputsideb").value;
    var sidec = document.getElementById("inputsidec").value;
    var angleaoutput = document.getElementById("resultofanglea");
    var angleboutput = document.getElementById("resultofangleb");
    var anglecoutput = document.getElementById("resultofanglec");
    let angleatemp = "";
    var anglebtemp = "";
    var anglectemp = "";
    if ((sidea != "") && (sideb != "") && (sidec != "")) {
        angleatemp += "\\[ cos^{-1} [ " + sideb + "\\times" + sideb + "+" + sidec + "\\times" + sidec + "-" + sidea + "\\times" + sidea + "\\div" + "(" + 2 + "\\times" + sideb + "\\times" + sidec + ")" + "]" + "\\]";
        angleatemp += "\\[Angle \\space A \\space is \\space " + eval(String((57.296 * Math.acos((sideb * sideb + sidec * sidec - sidea * sidea) / (2 * sideb * sidec))).toFixed(2))) + '\u00B0' + "\\]";
        angleaoutput.innerHTML = angleatemp;
        anglebtemp += "\\[ cos^{-1} [ " + sidea + "\\times" + sidea + "+" + sidec + "\\times" + sidec + "-" + sideb + "\\times" + sideb + "\\div" + "(" + 2 + "\\times" + sidea + "\\times" + sidec + ")" + "]" + "\\]";
        anglebtemp += "\\[Angle \\space B \\space is \\space " + eval(String((57.296 * Math.acos((sidea * sidea + sidec * sidec - sideb * sideb) / (2 * sidea * sidec))).toFixed(2))) + '\u00B0' + "\\]";
        angleboutput.innerHTML = anglebtemp;
        anglectemp += "\\[ cos^{-1} [ " + sideb + "\\times" + sideb + "+" + sidea + "\\times" + sidea + "-" + sidec + "\\times" + sidec + "\\div" + "(" + 2 + "\\times" + sidea + "\\times" + sideb + ")" + "]" + "\\]";
        anglectemp += "\\[Angle \\space C \\space is \\space " + eval(String((57.296 * Math.acos((sideb * sideb + sidea * sidea - sidec * sidec) / (2 * sideb * sidea))).toFixed(2))) + '\u00B0' + "\\]";
        anglecoutput.innerHTML = anglectemp;

        renderMathInElement(angleaoutput);
        renderMathInElement(angleboutput);
        renderMathInElement(anglecoutput);

    } else {
        angleaoutput.innerHTML = "";
        angleboutput.innerHTML = "";
        anglecoutput.innerHTML = "";

    }
}
function lawsine() {
    const f = document.getElementById("sformula").value;
    console.log(f)
    switch (f) {
        case "1":
            document.getElementById("sside1").placeholder = "Enter side a";
            document.getElementById("sside2").placeholder = "Enter side b";
            document.getElementById("sangle1").placeholder = "Enter Angle (in degrees) A";
            document.getElementById("sangle2").placeholder = "Enter Angle (in degrees) B";
            break;

        case "2":
            document.getElementById("sside1").placeholder = "Enter side b";
            document.getElementById("sside2").placeholder = "Enter side c";
            document.getElementById("sangle1").placeholder = "Enter Angle (in degrees) B";
            document.getElementById("sangle2").placeholder = "Enter Angle (in degrees) C";
            break;
        case "3":
            document.getElementById("sside1").placeholder = "Enter side a";
            document.getElementById("sside2").placeholder = "Enter side c";
            document.getElementById("sangle1").placeholder = "Enter Angle (in degrees) A";
            document.getElementById("sangle2").placeholder = "Enter Angle (in degrees) C";
            break;
    }
}
function solvesine() {
    var sside1 = document.getElementById("sside1").value;
    var sside2 = document.getElementById("sside2").value;
    var sangle1 = document.getElementById("sangle1").value;
    var sangle2 = document.getElementById("sangle2").value;

    var acts1 = document.getElementById("sside1").placeholder;
    acts1 = acts1[acts1.length - 1];
    var acts2 = document.getElementById("sside2").placeholder;
    acts2 = acts2[acts2.length - 1];
    var acta1 = document.getElementById("sangle1").placeholder;
    acta1 = acta1[acta1.length - 1];
    var acta2 = document.getElementById("sangle2").placeholder;
    acta2 = acta2[acta2.length - 1];

    let srangle1, srangle2, sineresult, sinexplain;

    if ((sside1 != "") && (sside2 != "") && (sangle1 != "")) {
        srangle1 = sangle1 * Math.PI / 180;
        sangle2 = Math.asin(sside2 * Math.sin(srangle1) / sside1);
        srangle2 = (sangle2 * 180 / Math.PI).toFixed(3);
        sineresult = "\\[∠" + acta2 + "=" + srangle2 + "°\\]";
        sinexplain = "\\[∠" + acta2 + "=sin^{-1}(\\frac{sin(" + acta1 + ")\\times " + acts2 + "}{" + acts1 + "})\\]" + "\\[∠" + acta2 + "=sin^{-1}(\\frac{sin(" + sangle1 + "°)\\times " + sside2 + "}{" + sside1 + "})\\]";

    }
    else if ((sside1 != "") && (sside2 != "") && (sangle2 != "")) {
        srangle2 = sangle2 * Math.PI / 180;
        sangle1 = Math.asin(sside1 * Math.sin(srangle2) / sside2);
        srangle1 = (sangle1 * 180 / Math.PI).toFixed(3);
        sineresult = "\\[∠" + acta1 + "=" + srangle1 + "°\\]";
        sinexplain = "\\[∠" + acta1 + "=sin^{-1}(\\frac{sin(" + acta2 + ")\\times " + acts1 + "}{" + acts2 + "})\\]" + "\\[∠" + acta1 + "=sin^{-1}(\\frac{sin(" + sangle2 + "°)\\times " + sside1 + "}{" + sside2 + "})\\]";

    }
    else if ((sside1 != "") && (sangle1 != "") && (sangle2 != "")) {
        srangle1 = sangle1 * Math.PI / 180;
        srangle2 = sangle2 * Math.PI / 180;
        sside2 = (sside1 * Math.sin(srangle2) / Math.sin(srangle1)).toFixed(3);
        sineresult = "\\[" + acts2 + "=" + sside2 + "\\]";
        sinexplain = "\\[" + acts2 + "=\\frac{sin(" + acta2 + ")\\times " + acts1 + "}{sin(" + acta1 + ")}\\]" + "\\[" + acta2 + "=\\frac{sin(" + sangle2 + "°)\\times " + sside1 + "}{sin(" + sangle1 + ")}\\]";

    }
    else if ((sside2 != "") && (sangle1 != "") && (sangle2 != "")) {
        srangle1 = sangle1 * Math.PI / 180;
        srangle2 = sangle2 * Math.PI / 180;
        sside1 = (sside2 * Math.sin(srangle1) / Math.sin(srangle2)).toFixed(3);
        sineresult = "\\[" + acts1 + "=" + sside1 + "\\]";
        sinexplain = "\\[" + acts1 + "=\\frac{sin(" + acta1 + ")\\times " + acts2 + "}{sin(" + acta2 + ")}\\]" + "\\[" + acta1 + "=\\frac{sin(" + sangle1 + "°)\\times " + sside2 + "}{sin(" + sangle2 + ")}\\]";

    }
    else {
        sineresult = "Enter Any 3 values";
        sinexplain = "";
    }
    document.getElementById("sineresult").innerHTML = sineresult;
    document.getElementById("sineexplain").innerHTML = sinexplain;
    renderMathInElement(document.getElementById("sineresult"));
    renderMathInElement(document.getElementById("sineexplain"));

}

function crossedrectsolve() {
    var baseLength = document.getElementById("crossrect-a").value;
    var rectSide = document.getElementById("crossrect-b").value;
    var legLengthField = document.getElementById("resultOfLegLength");
    var baseAngleField = document.getElementById("resultOfBaseAngle");
    var intersectAngleField = document.getElementById("resultOfIntersectionAngle");
    var apexAngleField = document.getElementById("resultOfApexAngle");
    var perimeterField = document.getElementById("resultOfPerimeterCrossedRect");
    var areaField = document.getElementById("resultOfAreaCrossedRect");

    var legLength = (Math.sqrt(Math.pow(baseLength, 2) + Math.pow(rectSide, 2)) / 2);
    var apexAngle = (Math.acos((2 * Math.pow(legLength, 2) - Math.pow(baseLength, 2)) / (2 * Math.pow(legLength, 2)))) * (180 / Math.PI);
    var intersectAngle = 180 - apexAngle;
    var baseAngle = (intersectAngle / 2);
    var perimeter = 2 * baseLength + 4 * legLength;
    var area = (baseLength * rectSide) / 2;

    if ((baseLength != "") && (rectSide != "")) {
        legLengthField.innerHTML = "\\[Leg \\space length (c) =\\frac{\\sqrt{" + baseLength + "^2 + " + rectSide + "^2}}{2} = " + legLength.toFixed(3) + " \\space units\\]";
        renderMathInElement(legLengthField);
        baseAngleField.innerHTML = "\\[Base \\space angle (\\alpha) =\\frac{" + intersectAngle + "}{2} = " + baseAngle.toFixed(3) + " \\degree \\]";
        renderMathInElement(baseAngleField);
        intersectAngleField.innerHTML = "\\[Intersection \\space angle (\\beta) = 180 \\degree - " + apexAngle.toFixed(3) + " = " + intersectAngle.toFixed(3) + " \\degree \\]";
        renderMathInElement(intersectAngleField);
        apexAngleField.innerHTML = "\\[Apex \\space angle (\\gamma) = \\arccos \\frac{2 \\times " + baseLength + "^2 - " + legLength + "^2}{2 \\times " + baseLength + "^2} = " + apexAngle.toFixed(3) + " \\degree \\]";
        renderMathInElement(apexAngleField);
        perimeterField.innerHTML = "\\[Perimeter (p) = 2 \\times " + baseLength + " + 4 \\times " + legLength + " = " + perimeter.toFixed(3) + " \\space units \\]";
        renderMathInElement(perimeterField);
        areaField.innerHTML = "\\[Area (A) = \\frac{" + baseLength + " \\times " + rectSide + "}{2} = " + area.toFixed(3) + " \\space sq.units \\]";
        renderMathInElement(areaField);
    }
}


function hshapesolve() {
    var height = parseFloat(document.getElementById("hshape-h").value);
    var thickness = parseFloat(document.getElementById("hshape-d").value);
    var barLength = parseFloat(document.getElementById("hshape-l").value);
    var perimeterField = document.getElementById("resultOfPerimeterHshape");
    var areaField = document.getElementById("resultOfAreaHshape");
    var temp1 = "";
    var temp2 = "";


    var perimeter = ((2 * height) + (4 * thickness) + 2 * (height - thickness) + 2 * barLength).toFixed(3);
    var area = 2 * height * thickness + thickness * barLength;

    if (!isNaN(perimeter) && !isNaN(area)) {
        temp1 += "\\[Perimeter \\space of \\space H - Shape \\space is \\]"
        temp1 += "\\[2 \\times " + height + "+ 4 \\times " + thickness + " + 2 \\times (" + height + "-" + thickness + ") + 2 \\times " + barLength + "\\]"
        temp1 += "\\[" + (2 * height) + "+" + (4 * thickness) + "+" + (2 * (height - thickness)) + "+" + 2 * barLength + "\\]"
        temp1 += "\\[" + perimeter + "\\space units \\]"
        perimeterField.innerHTML = temp1;
        temp2 += "\\[Area \\space of \\space H - Shape \\space is \\]"
        temp2 += "\\[2 \\times " + height + " \\times " + thickness + " + " + thickness + " \\times " + barLength + "\\]"
        temp2 += "\\[" + (2 * height * thickness) + "+" + (thickness * barLength) + "\\]"
        temp2 += "\\[" + area + "\\space units \\]"
        areaField.innerHTML = temp2;
    }
    else {
        temp1 += "\\[Please \\space enter \\space all \\space input \\]"
        temp2 += ""
        perimeterField.innerHTML = temp1;
        areaField.innerHTML = temp2;
    }
    renderMathInElement(perimeterField);
    renderMathInElement(areaField);
}


function gridshapesolve() {
    var m = parseFloat(document.getElementById("gridshape-m").value);
    var n = parseFloat(document.getElementById("gridshape-n").value);
    var a = parseFloat(document.getElementById("gridshape-a").value);
    var b = parseFloat(document.getElementById("gridshape-b").value);
    var rectLenfield = document.getElementById("gridshape-c");
    var rectWidfield = document.getElementById("gridshape-d");
    var perifield = document.getElementById("gridshape-p");
    var areafield = document.getElementById("gridshape-A");
    var c = m * a + (m + 1) * b;
    var d = n * a + (n + 1) * b;
    var p = c + d + 4 * m * n * a;
    var A = c * d - m * n * a * a;
    if ((!isNaN(m)) && (!isNaN(n)) && (!isNaN(a)) && (!isNaN(b))) {
        rectLenfield.innerHTML = "\\[Rectangle \\space length \\space (c) = " + m + " \\times " + a + " + \\left ( " + m + " + 1 \\right ) \\times " + b + " = " + c.toFixed(3) + "\\]";
        rectWidfield.innerHTML = "\\[Rectangle \\space width \\space (d) = " + n + " \\times " + a + " + \\left ( " + n + " + 1 \\right ) \\times " + b + " = " + d.toFixed(3) + "\\]";
        perifield.innerHTML = "\\[Perimeter \\space (p) = " + c + " + " + d + " + 4 \\times " + m + " \\times " + n + " \\times " + a + " = " + p.toFixed(3) + "\\]";
        areafield.innerHTML = "\\[Area \\space (A) = " + c + " \\times " + d + " - " + m + " \\times " + n + " \\times " + a + "^2 = " + A.toFixed(3) + "\\]";
        renderMathInElement(rectLenfield);
        renderMathInElement(rectWidfield);
        renderMathInElement(perifield);
        renderMathInElement(areafield);
    }

}


function tshapesolve() {
    var beamLength = parseFloat(document.getElementById("tshape-a").value);
    var beamThickness = parseFloat(document.getElementById("tshape-b").value);
    var shaftLength = parseFloat(document.getElementById("tshape-c").value);
    var shaftThickness = parseFloat(document.getElementById("tshape-d").value);
    var armLengthField = document.getElementById("resultOfArmLengthTshape");
    var heightField = document.getElementById("resultOfHeightTshape");
    var perimeterField = document.getElementById("resultOfPerimeterTshape");
    var areaField = document.getElementById("resultOfAreaTshape");
    var armLengthTshape = (beamLength - shaftThickness) / 2;
    var heightTshape = beamThickness + shaftLength;
    var perimeterTshape = 2 * (beamLength + beamThickness + shaftLength);
    var areaTshape = (beamLength * beamThickness) + (shaftLength * shaftThickness);
    if ((!isNaN(beamLength)) && (!isNaN(beamThickness)) && (!isNaN(shaftLength)) && (!isNaN(shaftThickness))) {
        armLengthField.innerHTML = "\\[Arm \\space length (a') =\\frac{" + beamLength + " - " + shaftThickness + "}{2} = " + armLengthTshape.toFixed(3) + " \\space units\\]";
        renderMathInElement(armLengthField);
        heightField.innerHTML = "\\[Height \\space (h) = " + beamThickness + " + " + shaftLength + " = " + heightTshape.toFixed(3) + " \\space units \\]";
        renderMathInElement(heightField);
        perimeterField.innerHTML = "\\[Perimeter \\space (p) = 2 \\times \\left ( " + beamLength + " + " + beamThickness + " + " + shaftLength + " \\right )  = " + perimeterTshape.toFixed(3) + " \\space units \\]";
        renderMathInElement(perimeterField);
        areaField.innerHTML = "\\[Area \\space (A) = \\left ( " + beamLength + " \\times " + beamThickness + " \\right ) + \\left ( " + shaftLength + " \\times " + shaftThickness + " \\right ) = " + areaTshape.toFixed(3) + " \\space sq.units\\]";
        renderMathInElement(areaField);
    }
}

function lshapesolve() {
    var a = parseFloat(document.getElementById("lshape-a").value);
    var b = parseFloat(document.getElementById("lshape-b").value);
    var c = parseFloat(document.getElementById("lshape-c").value);
    var longSideField = document.getElementById("resultOfLongSideLshape");
    var shortSideField = document.getElementById("resultOfShortSideLshape");
    var perimeterField = document.getElementById("resultOfPerimeterLshape");
    var areaField = document.getElementById("resultOfAreaLshape");
    var longSide = a - c;
    var shortSide = b - c;
    var perimeter = a + longSide + b + shortSide + 2 * c;
    var area = a * c + shortSide * c;
    if ((!isNaN(a)) && (!isNaN(b)) && (!isNaN(c))) {
        longSideField.innerHTML = "\\[Long \\space inner \\space side \\space (a') = " + a + " - " + c + " = " + longSide + " \\space units \\]";
        shortSideField.innerHTML = "\\[Short \\space inner \\space \\space side \\space (b') = " + b + " - " + c + " = " + shortSide + " \\space units \\]";
        perimeterField.innerHTML = "\\[Perimeter \\space (p) = " + a + " + " + longSide + " + " + b + " + " + shortSide + " + \\left ( 2 \\times " + c + " \\right ) = " + perimeter + " \\space units\\]";
        areaField.innerHTML = "\\[Area \\space (A) = " + a + " \\times " + c + " + " + shortSide + " \\times " + c + " = " + area + " \\space sq.units\\]";
        renderMathInElement(longSideField);
        renderMathInElement(shortSideField);
        renderMathInElement(perimeterField);
        renderMathInElement(areaField);
    }
}


function dropshapesolve() {
    var r = parseFloat(document.getElementById("dropshape-r").value);
    var hs = parseFloat(document.getElementById("dropshape-hs").value);
    var tangentAngleField = document.getElementById("tangentAngleDropshape");
    var arcLenField = document.getElementById("arcLenDropshape");
    var chordLenField = document.getElementById("chordLenDropshape");
    var triSideLenField = document.getElementById("triSideLenDropshape");
    var heightField = document.getElementById("heightDropshape");
    var perimeterField = document.getElementById("perimeterDropshape");
    var areaField = document.getElementById("areaDropshape");
    var alpha = 180 - Math.acos((1 - (hs / r))) * (180 / Math.PI);
    var l = r * 2 * Math.acos((1 - (hs / r))) * (180 / Math.PI);
    var c = 2 * Math.sqrt(2 * r * hs - (hs * hs));
    var a = (c / Math.sin((180 - 2 * alpha) * (Math.PI / 180)));
    var h = hs + Math.sqrt((4 * a * a - c * c) / 4);
    var p = l + 2 * a;
    var A = (r * l + c * (hs - r) + c * Math.sqrt((4 * a * a - c * c) / 4)) / 2;
    if (!(hs > r && hs < 2 * r)) {
        tangentAngleField.innerHTML = "The height must be between r and 2r.";
        arcLenField.innerHTML = "";
        chordLenField.innerHTML = "";
        triSideLenField.innerHTML = "";
        heightField.innerHTML = "";
        perimeterField.innerHTML = "";
        areaField.innerHTML = "";
    }
    if ((!isNaN(r)) && (!isNaN(hs))) {
        tangentAngleField.innerHTML = "\\[Tangent \\space angle (\\alpha) =  180\\degree - \\arccos \\left ( 1 - \\frac{" + hs.toFixed(3) + "}{" + r.toFixed(3) + "} \\right ) = " + alpha.toFixed(3) + "\\]";
        arcLenField.innerHTML = "\\[Arc \\space length \\space (l) =  " + r.toFixed(3) + " \\times 2 \\times \\arccos \\left ( 1 - \\frac{" + hs.toFixed(3) + "}{" + r.toFixed(3) + "} \\right ) = " + l.toFixed(3) + "\\]";
        chordLenField.innerHTML = "\\[Chord \\space length \\space (c) = 2 \\times \\sqrt{2 \\times " + r.toFixed(3) + " \\times " + hs.toFixed(3) + " - " + hs.toFixed(3) + "^{2}} = " + c.toFixed(3) + "\\]";
        triSideLenField.innerHTML = "\\[Triangle \\space side \\space length \\space (a) = \\frac{" + c.toFixed(3) + "}{\\sin\\left ( 180\\degree-2\\times " + alpha.toFixed(3) + " \\right )} \\times \\sin \\alpha = " + a.toFixed(3) + " \\]";
        heightField.innerHTML = "\\[Height \\space (h) = " + hs.toFixed(3) + " + \\sqrt {\\frac{\\left ( 4" + a.toFixed(3) + "^2 - " + c.toFixed(3) + "^2 \\right )}{4}} = " + h.toFixed(3) + "\\]";
        perimeterField.innerHTML = "\\[Perimeter \\space (p) = " + l.toFixed(3) + " + 2 \\times " + a.toFixed(3) + " = " + p.toFixed(3) + "\\]";
        areaField.innerHTML = "\\[Area \\space (A) =  \\frac {" + r.toFixed(3) + " \\times " + l.toFixed(3) + " + " + c.toFixed(3) + " \\times \\left ( " + hs.toFixed(3) + " - " + r.toFixed(3) + " \\right ) + " + c.toFixed(3) + " \\times \\sqrt {\\frac{\\left ( 4" + a.toFixed(3) + "^2 - " + c.toFixed(3) + "^2 \\right )}{4}}}{2} = " + A.toFixed(3) + "\\]";
        renderMathInElement(tangentAngleField);
        renderMathInElement(arcLenField);
        renderMathInElement(chordLenField);
        renderMathInElement(triSideLenField);
        renderMathInElement(heightField);
        renderMathInElement(perimeterField);
        renderMathInElement(areaField);
    }
}

function solvecircle() {
    let radius = document.getElementById("inputradius").value;
    let distance = document.getElementById("inputdistance").value;
    let area = 3.14 * radius * radius;
    let Circumference = 2 * 3.14 * radius;
    let diameter = 2 * radius;
    let a = (radius ** 2 - distance ** 2);
    let chord = 2 * Math.sqrt(a);
    console.log(radius);
    console.log(distance);
    area = area.toPrecision(3);
    Circumference = Circumference.toPrecision(3);
    diameter = diameter.toPrecision(3);
    chord = chord.toPrecision(3);

    document.getElementById("resultofareacir").innerHTML = "\\[Area \\space of \\space Circle \\ 3.14 r^2\\ = " + area + "\\space cm^2 \\]";
    document.getElementById("resultofcircumferencec1").innerHTML = "\\[ 2*3.14 r \\ = " + Circumference + "\\]";
    document.getElementById("resultofcircumferencec2").innerHTML = "\\[Circumference \\space of \\space Circle \\space is \\space" + Circumference + "\\space cm\\]";
    document.getElementById("resultofdiameterc").innerHTML = "\\[Diameter \\space of \\space Circle \\ = " + diameter + "\\space cm\\]";
    document.getElementById("resultofchord").innerHTML = "\\[Length \\space of \\space the \\space Chord \\space is \\ = " + chord + "\\space cm \\]";
    renderMathInElement(document.getElementById("resultofareacir"));
    renderMathInElement(document.getElementById("resultofcircumferencec1"));
    renderMathInElement(document.getElementById("resultofcircumferencec2"));
    renderMathInElement(document.getElementById("resultofdiameterc"));
    renderMathInElement(document.getElementById("resultofchord"));

}
function solvearch() {
    var r = document.getElementById("radiusarch").value;
    var angle = document.getElementById("anglearch").value;
    var area = 0.5 * r ** 2 * (angle - math.sin(angle));
    var chord = 2 * r * math.sin(angle / 2);
    var cirarc = r * angle;

    if (r != "" && angle != "") {

        if (chord <= 0) {
            document.getElementById("resultofareaarch1").innerHTML = "";
            document.getElementById("resultofareaarch2").innerHTML = "";
            document.getElementById("resultofarchchord1").innerHTML = "Please enter proper angle value in radian";
            document.getElementById("resultofarchchord2").innerHTML = "";
            document.getElementById("resultofcirarc").innerHTML = "";
            return;
        }
        document.getElementById("resultofareaarch1").innerHTML = "\\[Area \\space of \\space Arch \\space is \\]";
        document.getElementById("resultofareaarch2").innerHTML = "\\[\\frac{1}{2} \\times " + r + "^2 \\times ( " + angle + " - sin" + angle + " ) = " + area.toFixed(3) + "\\]";
        document.getElementById("resultofarchchord1").innerHTML = "\\[Chord \\space of \\space Arch \\space is \\]";
        document.getElementById("resultofarchchord2").innerHTML = "\\[ 2\\times " + r + " \\times sin (\\frac { " + angle + "}{2} ) = " + chord.toFixed(3) + "\\]";
        document.getElementById("resultofcirarc").innerHTML = "\\[Circular \\space arc \\space = " + r + " \\times " + angle + " = " + cirarc.toFixed(2) + " \\]";

        renderMathInElement(document.getElementById("resultofareaarch1"));
        renderMathInElement(document.getElementById("resultofareaarch2"));
        renderMathInElement(document.getElementById("resultofarchchord1"));
        renderMathInElement(document.getElementById("resultofarchchord2"));
        renderMathInElement(document.getElementById("resultofcirarc"));
    }
}

function solvesemicircle() {
    let radius = document.getElementById("semiradius").value;
    let area = (3.14 * radius * radius) / 2;
    let Circumference = 3.14 * radius + 2 * radius;
    let diameter = 2 * radius;
    console.log(radius);
    area = area.toPrecision(3);
    Circumference = Circumference.toPrecision(3);
    diameter = diameter.toPrecision(3);
    document.getElementById("resultofareasemi").innerHTML = "\\[Area \\space of \\space SemiCircle = \\frac{ 3.14r^2}{2}\\ = " + area + "\\]";
    document.getElementById("resultofcircumsemi").innerHTML = "\\[Circumference \\space of \\space Circle = \\ 3.14 r+2r \\ = " + Circumference + "\\]";
    document.getElementById("resultofdiasemi").innerHTML = "\\[Diameter\\space of \\space Circle = " + diameter + "\\]";
    renderMathInElement(document.getElementById("resultofareasemi"));
    renderMathInElement(document.getElementById("resultofcircumsemi"));
    renderMathInElement(document.getElementById("resultofdiasemi"));
}
function solvecirclecal() {

    let area = document.getElementById("circlearea").value;
    let r = math.sqrt(area / math.pi);
    let R = 2 * r;
    let circum = math.pi * R;
    console.log(r)
    console.log(R)
    console.log(circum)
    document.getElementById("resultofradcircal").innerHTML = "\\[Radius \\space of \\space Circle = \\sqrt{\\frac{" + area + "}{\\pi}}\\ = " + r.toFixed(3) + "\\]";
    document.getElementById("resultofcircumcirccal").innerHTML = "\\[Circumference = \\pi \\times 2 \\times " + r.toFixed(2) + " \\ = " + circum.toFixed(3) + "\\]";
    document.getElementById("resultofdiacircal").innerHTML = "\\[Diameter\\space of \\space Circle = " + R.toFixed(3) + "\\]";
    renderMathInElement(document.getElementById("resultofradcircal"));
    renderMathInElement(document.getElementById("resultofcircumcirccal"));
    renderMathInElement(document.getElementById("resultofdiacircal"));
}
function solveastroid() {
    var side = document.getElementById("inputsideastroid").value;
    var areaoutput = document.getElementById("resultofastroidarea");
    var lengthoutput = document.getElementById("resultofastroidlen");
    var areatemp = "";
    var lengthtemp = "";
    if ((side != "")) {
        areatemp += "\\[Area \\space of \\space Astroid \\space" + "\\]";
        areatemp += "\\[\\frac{3 \\pi \\times" + side + "\\times" + side + "}{8}" + "\\space" + "=" + eval(String(1.1775 * side * side)).toFixed(2) + "\\]";
        areaoutput.innerHTML = areatemp;

        lengthtemp += "\\[Length \\space of \\space Astroid \\space is \\space \\]";
        lengthtemp += "\\[" + 6 + "\\times" + side + "=" + eval(String(6 * side)) + "\\]";
        lengthoutput.innerHTML = lengthtemp;

        renderMathInElement(areaoutput);
        renderMathInElement(lengthoutput);

    } else {
        areaoutput.innerHTML = "";
        lengthoutput.innerHTML = "";

    }
}
function solvecardiod() {
    var radius = document.getElementById("inputradiuscardiod").value;
    var diaoutput = document.getElementById("resultofcardioddia");
    var areaoutput = document.getElementById("resultofcardiodarea");
    var perioutput = document.getElementById("resultofcardiodperi");
    var areatemp = "";
    var peritemp = "";
    var diatemp = "";
    var diameter = 2 * radius;
    if ((radius != "")) {
        areatemp += "\\[Area \\space of \\space Cardiod \\space" + "\\]";
        areatemp += "\\[\\frac{3 \\pi \\times" + diameter + "\\times" + diameter + "}{2}" + "\\space" + "=" + eval(String(diameter * diameter * 4.71)).toFixed(2) + "\\]";
        areaoutput.innerHTML = areatemp;

        diatemp += "\\[Diameter \\space of \\space Cardiod \\space" + "\\]";
        diatemp += "\\[2 \\times" + radius + "\\space" + "=" + eval(String(diameter)).toFixed(2) + "\\]";
        diaoutput.innerHTML = diatemp;

        peritemp += "\\[Length \\space of \\space Astroid \\space is \\space \\]";
        peritemp += "\\[" + 8 + "\\times" + diameter + "=" + eval(String(8 * diameter)) + "\\]";
        perioutput.innerHTML = peritemp;

        renderMathInElement(diaoutput);
        renderMathInElement(areaoutput);
        renderMathInElement(perioutput);

    } else {
        areaoutput.innerHTML = "";
        diaoutput.innerHTML = "";
        perioutput.innerHTML = "";

    }
}
function solvestadium() {
    var r = document.getElementById("inputcircrad").value;
    var a = document.getElementById("inputrectlen").value;
    var stalenoutput = document.getElementById("resultofstadlen");
    var perioutput = document.getElementById("resultofstadperi");
    var areaoutput = document.getElementById("resultofstadarea");
    var stalentemp = "";
    var peritemp = "";
    var areatemp = "";
    if (a != "" && r != "") {
        stalentemp += "\\[Stadium \\space length \\space \\newline" + a + "+ 2 \\space (" + r + ")" + "\\ = " + eval(String(parseFloat(a) + (2 * parseFloat(r)))).toFixed(2) + "\\]";
        stalenoutput.innerHTML = stalentemp;

        peritemp += "\\[Perimeter \\space \\newline 2 \\times ( 3.14 \\times" + r + "+" + a + ")" + "\\ = " + eval(String(2 * (3.141592653589 * parseFloat(r) + parseFloat(a)))).toFixed(2) + "\\]";
        perioutput.innerHTML = peritemp;

        areatemp += "\\[Area \\space \\newline" + r + "\\times ( 3.14 \\space" + r + "+ 2 \\space (" + a + " ) )" + "\\ = " + eval(String(parseFloat(r) * ((3.141592653589 * parseFloat(r)) + (2 * parseFloat(a))))).toFixed(2) + "\\]";
        areaoutput.innerHTML = areatemp;

        renderMathInElement(stalenoutput);
        renderMathInElement(perioutput);
        renderMathInElement(areaoutput);

    } else {
        stalenoutput.innerHTML = "";
        perioutput.innerHTML = "";
        areaoutput.innerHTML = "";
    }

}

function solvecross() {
    var a = (document.getElementById("inputcrossarmlen").value);
    var b = (document.getElementById("inputcrosswidth").value);
    var l = 2 * parseInt(a) + parseInt(b);
    var peri = 8 * parseInt(a) + 4 * parseInt(b);
    var area = 4 * parseInt(a) * parseInt(b) + parseInt(b) ** 2;
    var cirrad = math.sqrt((l / 2) ** 2 + (parseInt(b) / 2) ** 2);
    if (a != "" && b != "") {
        if (!isNaN(a) && !isNaN(b)) {
            document.getElementById("resultofcrossbarlen").innerHTML = "\\[Bar \\space length \\space (l) \\space of \\space Cross \\space shape \\newline 2 \\times (Arm \\space length) + Width \\newline = \\space " + (2 * a) + " + " + b + " \\space = \\space " + l.toFixed(3) + "\\]";
            document.getElementById("resultofcrossperi").innerHTML = "\\[Perimeter \\space (p) \\space of \\space Cross \\space shape \\newline 8 \\times (Arm \\space length) + 4 \\times Width \\newline = \\space " + (8 * a) + " \\times " + (4 * a) + " \\space = \\space " + peri.toFixed(3) + "\\]";
            document.getElementById("resultofcrossarea").innerHTML = "\\[Area \\space (A) \\space of \\space Cross \\space shape \\newline 4 \\times (Arm \\space length) \\times Width + (Width)^2 \\newline = \\space " + (4 * a * b) + " + " + (b ** 2) + " \\space = \\space" + area.toFixed(3) + "\\]";
            document.getElementById("resultofcrosscirrad").innerHTML = "\\[Circumcircle \\space radius \\space (r) \\space of \\space Cross \\space shape \\newline \\sqrt{ (\\frac{" + l + "}{2})^2 + (\\frac{" + b + "}{2})^2 } \\newline = \\space " + cirrad.toFixed(3) + "\\]";
        } else {
            document.getElementById("resultofcrossbarlen").innerHTML = "\\[Please \\space enter \\space valid \\space input\\]";
            document.getElementById("resultofcrossperi").innerHTML = "";
            document.getElementById("resultofcrossarea").innerHTML = "";
            document.getElementById("resultofcrosscirrad").innerHTML = "";
        }
    } else {
        document.getElementById("resultofcrossbarlen").innerHTML = "";
        document.getElementById("resultofcrossperi").innerHTML = "";
        document.getElementById("resultofcrossarea").innerHTML = "";
        document.getElementById("resultofcrosscirrad").innerHTML = "";
    }
    renderMathInElement(document.getElementById("resultofcrossbarlen"));
    renderMathInElement(document.getElementById("resultofcrossperi"));
    renderMathInElement(document.getElementById("resultofcrossarea"));
    renderMathInElement(document.getElementById("resultofcrosscirrad"));
}

function solveclaw() {
    var R = document.getElementById("inputlargerad").value;
    var r = document.getElementById("inputsmallrad").value;
    var linelenoutput = document.getElementById("resultoflinelen");
    var perioutput = document.getElementById("resultofclawperi");
    var areaoutput = document.getElementById("resultofclawarea");
    var linelentemp = "";
    var peritemp = "";
    var areatemp = "";
    if (R != "" && r != "") {
        if (R < r) {
            linelenoutput.innerHTML = "R should be greater than r";
        } else {
            linelentemp += "\\[Straight \\space line \\space length \\space \\newline 2 (" + R + "-" + r + ")" + "\\ = " + eval(String(2 * (parseFloat(R) - parseFloat(r)))).toFixed(2) + "\\]";
            linelenoutput.innerHTML = linelentemp;

            peritemp += "\\[Perimeter \\space \\newline 3.14 \\space (" + R + "+" + r + ")" + "+" + " 2 \\space (" + R + "-" + r + ")" + "\\ = " + eval(String((3.141592653589793 * (parseFloat(R) + parseFloat(r))) + (2 * (parseFloat(R) - parseFloat(r))))).toFixed(2) + "\\]";
            perioutput.innerHTML = peritemp;

            areatemp += "\\[Area \\space \\newline \\frac{1}{2} \\times 3.14 \\space (" + R + "^2 -" + r + "^2 )" + "\\ = " + eval(String((0.5 * 3.141592653589 * (parseFloat(R) * parseFloat(R))) - (0.5 * 3.141592653589 * (parseFloat(r) * parseFloat(r))))).toFixed(2) + "\\]";
            areaoutput.innerHTML = areatemp;

            renderMathInElement(linelenoutput);
            renderMathInElement(perioutput);
            renderMathInElement(areaoutput);
        }

    } else {
        linelenoutput.innerHTML = "";
        perioutput.innerHTML = "";
        areaoutput.innerHTML = "";
    }

}
function solveoctadeca() {
    var side = parseInt(document.getElementById("inputsideoctadeca").value);
    var area = 18 / 4 * side ** 2 * math.cot(math.pi / 18);
    var perimeter = 18 * side;
    document.getElementById("resultofareaoctadeca1").innerHTML = "\\[Area \\space of \\space Octadecagon \\space \\]";
    document.getElementById("resultofareaoctadeca2").innerHTML = "\\[\\frac{18}{4} \\times " + side + "^2 \\times \\cot(\\frac{\\pi}{18}) = " + area.toFixed(2) + "\\]";
    document.getElementById("resultofperimeteroctadeca").innerHTML = "\\[Perimeter \\space of \\space Octadecagon \\space \\space  18 \\times " + side + " = " + perimeter + "\\]";
    renderMathInElement(document.getElementById("resultofareaoctadeca1"));
    renderMathInElement(document.getElementById("resultofareaoctadeca2"));
    renderMathInElement(document.getElementById("resultofperimeteroctadeca"));
}

function solvepent() {
    let side = document.getElementById("inputsidepent").value;
    let area = 0.25 * math.sqrt(5 * (5 + 2 * math.sqrt(5))) * side * side;
    let diagonal = 0.5 * (1 + math.sqrt(5)) * side;
    let perimeter = 5 * side;
    document.getElementById("resultofareapent1").innerHTML = "";
    document.getElementById("resultofareapent2").innerHTML = "";
    document.getElementById("resultofdiagonalpent1").innerHTML = "";
    document.getElementById("resultofdiagonalpent2").innerHTML = "";
    document.getElementById("resultofperimeterpent").innerHTML = "";

    if (side != "") {
        document.getElementById("resultofareapent1").innerHTML = "\\[Area \\space of \\space Pentagon \\space \\]";
        document.getElementById("resultofareapent2").innerHTML = "\\[\\frac{1}{4} \\sqrt{5(5 + 2 \\sqrt{5})} \\times " + side + "^2 = " + area.toFixed(2) + "\\]";
        document.getElementById("resultofdiagonalpent1").innerHTML = "\\[Daigonal \\space of \\space Pentagon \\space (d) \\]";
        document.getElementById("resultofdiagonalpent2").innerHTML = "\\[\\frac{1 + \\sqrt{5}}{2} \\times " + side + "=" + diagonal.toFixed(2) + "\\]";
        document.getElementById("resultofperimeterpent").innerHTML = "\\[Perimeter \\space of \\space Pentagon \\space 5 \\times " + side + " = " + perimeter + "\\]";
        renderMathInElement(document.getElementById("resultofareapent1"));
        renderMathInElement(document.getElementById("resultofareapent2"));
        renderMathInElement(document.getElementById("resultofdiagonalpent1"));
        renderMathInElement(document.getElementById("resultofdiagonalpent2"));
        renderMathInElement(document.getElementById("resultofperimeterpent"));
    }

}
function solveconcavepent() {
    var a = document.getElementById("inputsquedge").value;
    var trileglenoutput = document.getElementById("resultoftrileglen");
    var perioutput = document.getElementById("resultofconcavepentperi");
    var areaoutput = document.getElementById("resultofconcavepentarea");
    var trileglentemp = "";
    var peritemp = "";
    var areatemp = "";
    if (a != "") {
        trileglentemp += "\\[Leg \\space length \\space of \\space triangle \\space \\newline \\frac{\\sqrt{2}}{2} \\times" + a + "\\ = " + eval(String(0.707107 * a)).toFixed(2) + "\\]";
        trileglenoutput.innerHTML = trileglentemp;
        peritemp += "\\[Perimeter \\space \\newline 3 \\space (" + a + ") + 2 \\space  ( \\frac{\\sqrt{2}}{2} \\times" + a + ")" + "\\ = " + eval(String((3 * a) + (math.sqrt(2) * a))).toFixed(2) + "\\]";
        perioutput.innerHTML = peritemp;
        areatemp += "\\[Area \\space \\newline \\frac{3}{4} \\space (" + a + ")^2" + "\\ = " + eval(String(0.75 * a * a)).toFixed(2) + "\\]";
        areaoutput.innerHTML = areatemp;
        renderMathInElement(trileglenoutput);
        renderMathInElement(perioutput);
        renderMathInElement(areaoutput);
    } else {
        trileglenoutput.innerHTML = "";
        perioutput.innerHTML = "";
        areaoutput.innerHTML = "";
    }
}

function solveconcaveregularpent() {
    var a = parseFloat(document.getElementById("regularpenta-a").value);
    var tipDistField = document.getElementById("regularpenta-b");
    var perimeterField = document.getElementById("regularpenta-p");
    var areaField = document.getElementById("regularpenta-A");
    var b = a / 2 * (1 + Math.sqrt(5));
    var p = 5 * a;
    var A = a * a / 4 * (Math.sqrt(25 + 10 * Math.sqrt(5)) - Math.sqrt(10 + 2 * Math.sqrt(5)));
    if (!isNaN(a)) {
        tipDistField.innerHTML = `Distance of the tips (b):	= ${b.toFixed(3)} units`;
        perimeterField.innerHTML = `Perimeter (p) = ${p.toFixed(3)} units`;
        areaField.innerHTML = `Area (A) = ${A.toFixed(3)} sq.units`;
    }
}

function solvedeca() {
    let side = document.getElementById("inputsidedeca").value;
    let area = 2.5 * side ** 2 * math.sqrt(5 + (2 * math.sqrt(5)));
    let perimeter = 10 * side;
    document.getElementById("resultofareadeca1").innerHTML = "\\[Area \\space of \\space Decagon \\space \\]";
    document.getElementById("resultofareadeca2").innerHTML = "\\[\\frac{5}{2} \\times" + side + "^2 \\sqrt(5 + 2\\sqrt{5}) = " + area.toFixed(2) + "\\]";
    document.getElementById("resultofperimeterdeca").innerHTML = "\\[Perimeter \\space of \\space Decagon \\space \\space  10 \\times " + side + " = " + perimeter + "\\]";
    renderMathInElement(document.getElementById("resultofareadeca1"));
    renderMathInElement(document.getElementById("resultofareadeca2"));
    renderMathInElement(document.getElementById("resultofperimeterdeca"));

}

function solvehex() {
    let side = document.getElementById("inputsidehex").value;
    let area = 0.5 * (3 * math.sqrt(3)) * side * side;
    let perimeter = 6 * side;
    document.getElementById("resultofareahex1").innerHTML = "\\[Area \\space of \\space Hexagon \\space \\]";
    document.getElementById("resultofareahex2").innerHTML = "\\[\\frac{3 \\sqrt{3}}{2} \\times " + side + "^2 = " + area.toFixed(2) + "\\]";
    document.getElementById("resultofperimeterhex").innerHTML = "\\[Perimeter \\space of \\space Hexagon \\space 6 \\times " + side + " = " + perimeter + "\\]";
    renderMathInElement(document.getElementById("resultofareahex1"));
    renderMathInElement(document.getElementById("resultofareahex2"));
    renderMathInElement(document.getElementById("resultofperimeterhex"));

}
function solveconcavehex() {
    let a = document.getElementById("inputconhexside").value;
    let breadthoutput = document.getElementById("resultofconhexbreadth");
    let heioutput = document.getElementById("resultofconhexhei");
    let perioutput = document.getElementById("resultofconhexperi");
    let areaoutput = document.getElementById("resultofconhexarea");
    var breadthtemp = "";
    var heitemp = "";
    var peritemp = "";
    var areatemp = "";
    if (a != "") {
        breadthtemp += "\\[Breadth \\space \\newline \\sqrt{3} \\times" + a + "\\ = " + eval(String(1.7320508 * a)).toFixed(2) + "\\]";
        breadthoutput.innerHTML = breadthtemp;
        heitemp += "\\[Height \\space \\newline \\frac{3}{2} \\times" + a + "\\ = " + eval(String(1.5 * a)).toFixed(2) + "\\]";
        heioutput.innerHTML = heitemp;
        peritemp += "\\[Perimeter \\space \\newline 6 \\times" + a + "\\ = " + eval(String(6 * a)).toFixed(2) + "\\]";
        perioutput.innerHTML = peritemp;
        areatemp += "\\[Area \\space \\newline \\sqrt{3} \\times (" + a + ")^2" + "\\ = " + eval(String(1.7320508 * a * a)).toFixed(2) + "\\]";
        areaoutput.innerHTML = areatemp;
        renderMathInElement(breadthoutput);
        renderMathInElement(heioutput);
        renderMathInElement(perioutput);
        renderMathInElement(areaoutput);
    } else {
        breadthoutput.innerHTML = "";
        heioutput.innerHTML = "";
        perioutput.innerHTML = "";
        areaoutput.innerHTML = "";
    }
}

function solvehept() {
    var side = document.getElementById("inputsidehept").value;
    var areaoutput = document.getElementById("resultofheptarea");
    var perioutput = document.getElementById("resultofheptperi");
    var areatemp = "";
    var peritemp = "";
    if ((side != "")) {
        areatemp += "\\[Area \\space of \\space Heptagon \\space" + "\\]";
        areatemp += "\\[\\frac{7}{4}" + "\\times" + side + "\\times" + side + "\\times" + "\\space cot(\\frac{180}{7} \\degree) \\space" + "=" + eval(String(3.63391 * side * side)).toFixed(2) + "\\]";
        areaoutput.innerHTML = areatemp;

        peritemp += "\\[Perimeter \\space of \\space Heptagon \\space is \\space \\]";
        peritemp += "\\[" + 7 + "\\times" + side + "=" + eval(String(7 * side)) + "\\]";
        perioutput.innerHTML = peritemp;

        renderMathInElement(areaoutput);
        renderMathInElement(perioutput);

    } else {
        areaoutput.innerHTML = "";
        perioutput.innerHTML = "";

    }
}

function solveoct() {
    let side = document.getElementById("inputsideoct").value;
    let area = 2 * (1 + math.sqrt(2)) * side ** 2;
    let perimeter = 8 * side;
    document.getElementById("resultofareaoct1").innerHTML = "\\[Area \\space of \\space Octagon \\space \\]";
    document.getElementById("resultofareaoct2").innerHTML = "\\[2 \\times (1 + \\sqrt{2}) \\times " + side + "^2 = " + area.toFixed(2) + "\\]";
    document.getElementById("resultofperimeteroct").innerHTML = "\\[Perimeter \\space of \\space Octagon \\space \\space  8 \\times " + side + " = " + perimeter + "\\]";
    renderMathInElement(document.getElementById("resultofareaoct1"));
    renderMathInElement(document.getElementById("resultofareaoct2"));
    renderMathInElement(document.getElementById("resultofperimeteroct"));

}

function solvenona() {
    var side = document.getElementById("inputsidenona").value;
    var areaoutput = document.getElementById("resultofnonaarea");
    var perioutput = document.getElementById("resultofnonaperi");
    var areatemp = "";
    var peritemp = "";
    if ((side != "")) {
        areatemp += "\\[Area \\space of \\space Nonagon \\space" + "\\]";
        areatemp += "\\[\\frac{9}{4}" + "\\times" + side + "\\times" + side + "\\times" + "\\space cot(\\frac{180}{9} \\degree) \\space" + "=" + eval(String(6.18182 * side * side)).toFixed(2) + "\\]";
        areaoutput.innerHTML = areatemp;

        peritemp += "\\[Perimeter \\space of \\space Nonagon \\space is \\space \\]";
        peritemp += "\\[" + 9 + "\\times" + side + "=" + eval(String(9 * side)) + "\\]";
        perioutput.innerHTML = peritemp;

        renderMathInElement(areaoutput);
        renderMathInElement(perioutput);

    } else {
        areaoutput.innerHTML = "";
        perioutput.innerHTML = "";

    }
}

function solvedoustar() {
    var b = document.getElementById("inputdoustarside").value;
    var l1 = document.getElementById("inputdoustarlonlen").value;
    var l2 = document.getElementById("inputdoustarsholen").value;
    var h1output = document.getElementById("resultofdoustarlonhei");
    var h2output = document.getElementById("resultofdoustarshohei");
    var diaoutput = document.getElementById("resultofdoustardia");
    var perioutput = document.getElementById("resultofdoustarperi");
    var areaoutput = document.getElementById("resultofdoustararea");
    var h1temp = "";
    var h2temp = "";
    var diatemp = "";
    var peritemp = "";
    var areatemp = "";
    if ((b != "") && (l1 != "") && (l2 != "")) {
        if (l1 < l2) {
            h1output.innerHTML = "l1 should be greater than l2";
        } else {
            h1temp += "\\[Height \\space long \\space point \\space \\newline \\sqrt{" + l1 + "^2 - \\frac{" + b + "^2}{4}}" + "\\ = " + eval(String(Math.sqrt((l1 * l1) - (b * b) / 4))).toFixed(2) + "\\]";
            h1output.innerHTML = h1temp;

            h2temp += "\\[Height \\space short \\space point \\space \\newline \\sqrt{" + l2 + "^2 - \\frac{" + b + "^2}{4}}" + "\\ = " + eval(String(Math.sqrt((l2 * l2) - (b * b) / 4))).toFixed(2) + "\\]";
            h2output.innerHTML = h2temp;

            diatemp += "\\[Star \\space Diameter \\space \\newline" + 2 + "\\times \\sqrt{" + l1 + "^2 - \\frac{" + b + "^2}{4}} +" + b + "\\times (1 + \\sqrt{2})" + "\\ = " + eval(String(2 * Math.sqrt((l1 * l1) - (b * b) / 4) + b * (1 + Math.sqrt(2)))).toFixed(2) + "\\]";
            diaoutput.innerHTML = diatemp;

            peritemp += "\\[Perimeter \\space \\newline" + 8 + "\\times (" + l1 + "+" + l2 + ")" + "\\ = " + eval(String((8 * l1) + (8 * l2))).toFixed(2) + "\\]";
            perioutput.innerHTML = peritemp;

            areatemp += "\\[Area \\space \\newline" + 2 + "\\times" + b + "\\space [" + b + "(1 + \\sqrt{2}) \\newline + (\\sqrt{" + l1 + "^2 - \\frac{" + b + "^2}{4}} + \\sqrt{" + l2 + "^2 - \\frac{" + b + "^2}{4}})]" + "\\ = " + eval(String(2 * b * [b * (1 + Math.sqrt(2)) + (Math.sqrt((l1 * l1) - (b * b) / 4) + Math.sqrt((l2 * l2) - (b * b) / 4))])).toFixed(2) + "\\]";
            areaoutput.innerHTML = areatemp;

            renderMathInElement(h1output);
            renderMathInElement(h2output);
            renderMathInElement(diaoutput);
            renderMathInElement(perioutput);
            renderMathInElement(areaoutput);
        }

    } else {
        h1output.innerHTML = "";
        h2output.innerHTML = "";
        diaoutput.innerHTML = "";
        perioutput.innerHTML = "";
        areaoutput.innerHTML = "";
    }

}


function solvetruncube() {
    var a = parseInt(document.getElementById("inputtruncubeside").value);
    var area = 2 * a ** 2 * (6 + 6 * math.sqrt(2) + math.sqrt(3));
    var vol = a ** 3 / 3 * (21 + 14 * math.sqrt(2));
    var rm = a / 2 * (2 + math.sqrt(2));
    var rc = a / 2 * math.sqrt(7 + 4 * math.sqrt(2));
    var areataroutput = document.getElementById("resultoftruncubearea");
    var voloctoutput = document.getElementById("resultoftruncubevol");
    var rmoutput = document.getElementById("resultoftruncuberm");
    var rcoutput = document.getElementById("resultoftruncuberc");
    var areastartemp = "";
    var volstartemp = "";
    var rmocttemp = "";
    var rctemp = "";
    if (a != "") {
        areastartemp += "\\[Area \\space of \\space Truncated \\space Cube \\space \\newline 2 \\times " + a + "^2 \\times (6+6 \\sqrt{2} + 3) \\space = \\space " + area.toFixed(3) + "\\]";
        areataroutput.innerHTML = areastartemp;

        volstartemp += "\\[Volume \\space of \\space Truncated \\space Cube \\space \\newline \\frac{" + a + "}{3} \\times (2 + 4 \\sqrt{2}) \\space = \\space " + vol.toFixed(3) + "\\]";
        voloctoutput.innerHTML = volstartemp;

        rmocttemp += "\\[Midsphere \\space radius \\space \\newline \\frac{" + a + "}{2} \\times (2 + \\sqrt{2}) \\space = \\space " + rm.toFixed(3) + "\\]";
        rmoutput.innerHTML = rmocttemp;

        rctemp += "\\[Circumsphere \\space radius \\space \\newline \\frac{" + a + "}{2} \\times \\sqrt{7 + 4 \\sqrt{2}} \\space = \\space " + rc.toFixed(3) + "\\]";
        rcoutput.innerHTML = rctemp;

        renderMathInElement(areataroutput);
        renderMathInElement(voloctoutput);
        renderMathInElement(rmoutput);
        renderMathInElement(rcoutput);
    } else {
        areastartemp.innerHTML = "";
        volstartemp.innerHTML = "";
        rmocttemp.innerHTML = "";
        rctemp.innerHTML = "";
    }
}

function solvedisphenocingulum() {
    let a = document.getElementById("inputdisphenoedge").value;
    let areaoutput = document.getElementById("resultofdisphenoarea");
    let voloutput = document.getElementById("resultofdisphenovol");
    var areatemp = "";
    var voltemp = "";
    if (a != "") {
        areatemp += "\\[Area \\space \\newline (4 + 5 \\sqrt{3}) \\space (" + a + ")^2" + "\\ = " + eval(String(12.6603 * a * a)).toFixed(2) + "\\]";
        areaoutput.innerHTML = areatemp;
        voltemp += "\\[Volume \\space \\newline 3.7776453418585752 \\space (" + a + ")^3" + "\\ = " + eval(String(3.7776 * a * a * a)).toFixed(2) + "\\]";
        voloutput.innerHTML = voltemp;
        renderMathInElement(areaoutput);
        renderMathInElement(voloutput);
    } else {
        areaoutput.innerHTML = "";
        voloutput.innerHTML = "";
    }
}


function solvelakstar() {
    var a = document.getElementById("inputlakstarside").value;
    var boutput = document.getElementById("resultoflakstaredoct");
    var coutput = document.getElementById("resultoflakstaredstar");
    var areastaroutput = document.getElementById("resultoflakstararea");
    var areaoctoutput = document.getElementById("resultoflakstarareaoct");
    var perioutput = document.getElementById("resultoflakstarperi");
    var chordoutput = document.getElementById("resultoflakstarchord");
    var btemp = "";
    var ctemp = "";
    var areastartemp = "";
    var areaocttemp = "";
    var peritemp = "";
    var chordtemp = "";
    if (a != "") {
        btemp += "\\[Edge \\space length \\space octagon \\space \\newline (" + "\\sqrt{2} - 1 ) \\times" + a + "\\ = " + eval(String(0.41421356 * a)).toFixed(2) + "\\]";
        boutput.innerHTML = btemp;

        ctemp += "\\[Edge \\space length \\space star \\space \\newline \\frac{(2 - \\sqrt{2})}{2} \\times" + a + "\\ = " + eval(String(0.29289322 * a)).toFixed(2) + "\\]";
        coutput.innerHTML = ctemp;

        areastartemp += "\\[Area \\space of \\space star \\space \\newline 2 \\times ( 2 - \\sqrt{2}) \\times" + a + "\\times" + a + "\\ = " + eval(String(1.17157288 * a * a)).toFixed(2) + "\\]";
        areastaroutput.innerHTML = areastartemp;

        areaocttemp += "\\[Area \\space of \\space octagon \\space \\newline 2 \\times ( \\sqrt{2} - 1) \\times" + a + "\\times" + a + "\\ = " + eval(String(0.82842712 * a * a)).toFixed(2) + "\\]";
        areaoctoutput.innerHTML = areaocttemp;

        peritemp += "\\[Perimeter \\space \\newline 8 \\times ( 2 - \\sqrt{2}) \\times" + a + "\\ = " + eval(String(4.6862915 * a)).toFixed(2) + "\\]";
        perioutput.innerHTML = peritemp;

        chordtemp += "\\[Chord \\space length \\space \\newline ( 2 - \\sqrt{2}) \\times" + a + "\\times 0.9238" + "\\ = " + eval(String(0.5411961 * a)).toFixed(2) + "\\]";
        chordoutput.innerHTML = chordtemp;

        renderMathInElement(boutput);
        renderMathInElement(coutput);
        renderMathInElement(areastaroutput);
        renderMathInElement(areaoctoutput);
        renderMathInElement(perioutput);
        renderMathInElement(chordoutput);

    } else {
        boutput.innerHTML = "";
        coutput.innerHTML = "";
        areastaroutput.innerHTML = "";
        areaoctoutput.innerHTML = "";
        perioutput.innerHTML = "";
        chordoutput.innerHTML = "";
    }

}

function solveannulus() {
    var radius1 = document.getElementById("inputradius1").value;
    var radius2 = document.getElementById("inputradius2").value;
    var area1output = document.getElementById("resultofarea1");
    var area2output = document.getElementById("resultofarea2");
    var circum1output = document.getElementById("resultofcircum1");
    var circum2output = document.getElementById("resultofcircum2");
    var areaoutput = document.getElementById("resultofarea");
    var area1temp = "";
    var area2temp = "";
    var circum1temp = "";
    var circum2temp = "";
    var areatemp = "";
    if ((radius1 != "") && (radius2 != "")) {
        area1temp += "\\[" + "\\pi" + "\\times" + radius1 + "\\times" + radius1 + "\\]";
        area1temp += "\\[Area \\space enclosed \\space by \\space Outer \\space circle \\space is \\space " + eval(String(3.14 * radius1 * radius1)) + "\\]";
        area1output.innerHTML = area1temp;
        area2temp += "\\[" + "\\pi" + "\\times" + radius2 + "\\times" + radius2 + "\\]";
        area2temp += "\\[Area \\space enclosed \\space by \\space Inner \\space circle \\space is \\space " + eval(String(3.14 * radius2 * radius2)) + "\\]";
        area2output.innerHTML = area2temp;
        areatemp += "\\[" + "\\pi" + "\\times" + '(' + radius1 + "\\times" + radius1 + '-' + radius2 + "\\times" + radius2 + ')' + "\\]";
        areatemp += "\\[Area \\space of \\space annulus \\space is \\space " + eval(String((3.14 * radius1 * radius1) - (3.14 * radius2 * radius2))) + "\\]";
        areaoutput.innerHTML = areatemp;
        circum1temp += "\\[" + 2 + "\\times" + "\\pi " + "\\times" + radius1 + "\\]";
        circum1temp += "\\[Outer \\space cicrumference \\space of \\space annulus \\space is \\space " + eval(String(3.14 * 2 * radius1)) + "\\]";
        circum1output.innerHTML = circum1temp;
        circum2temp += "\\[" + 2 + "\\times" + "\\pi " + "\\times" + radius2 + "\\]";
        circum2temp += "\\[Inner \\space cicrumference \\space of \\space annulus \\space is \\space " + eval(String(3.14 * 2 * radius2)) + "\\]";
        circum2output.innerHTML = circum2temp;
        renderMathInElement(area1output);
        renderMathInElement(area2output);
        renderMathInElement(areaoutput);
        renderMathInElement(circum1output);
        renderMathInElement(circum2output);
    } else {
        area1output.innerHTML = "";
        area2output.innerHTML = "";
        areaoutput.innerHTML = "";
        circum1output.innerHTML = "";
        circum2output.innerHTML = "";
    }
}
function solveyinyang() {
    var r = document.getElementById("inputhalfyinr").value;
    var perioutput = document.getElementById("resultofhalfyinperi");
    var areaoutput = document.getElementById("resultofhalfyinarea");
    var diaoutput = document.getElementById("resultofhalfyindia");
    var areatemp = "";
    var peritemp = "";
    var diatemp = "";
    if (r != "") {
        areatemp += "\\[Area \\space of \\space Half \\space Yin-Yang \\space  \\newline" + " \\frac{ \\pi \\times" + r + "^2}{2}" + "\\ = " + eval(String(0.5 * 3.14 * r * r)).toFixed(2) + "\\]";
        areaoutput.innerHTML = areatemp;
        peritemp += "\\[Perimeter \\space of \\space Half \\space Yin-Yang \\space  \\newline" + "2 \\times \\pi \\times " + r + "\\ = " + eval(String(2 * 3.14 * r)).toFixed(2) + "\\]";
        perioutput.innerHTML = peritemp;
        diatemp += "\\[Diameter \\space of \\space Half \\space Yin-Yang \\space  \\newline" + "2 \\times " + r + "\\ = " + eval(String(2 * r)).toFixed(2) + "\\]";
        diaoutput.innerHTML = diatemp;
        renderMathInElement(areaoutput);
        renderMathInElement(perioutput);
        renderMathInElement(diaoutput);

    } else {
        areaoutput.innerHTML = "";
        perioutput.innerHTML = "";
        diaoutput.innerHTML = "";
    }

}


function solveellipse() {
    var a = document.getElementById("inputfirstaxis").value;
    var b = document.getElementById("inputsecondaxis").value;
    var areaoutput = document.getElementById("resultofareae");
    var perimeteroutput = document.getElementById("resultofperimetere");
    var areatemp = "";
    var perimetertemp = "";
    if (a != "" && b != "") {
        var a2 = a * a;
        var b2 = b * b;
        var ans = a2 + b2;
        var anssqrt = nerdamer.sqrt(ans).toString();
        anssqrt = eval(anssqrt).toFixed(3);
        perimetertemp += "\\[P=\\sqrt{2}\\times \\pi \\sqrt{" + a + "^2" + "+" + b + "^2" + "}\\]";
        perimetertemp += "\\[P=\\sqrt{2}\\times \\pi \\sqrt{" + a2 + "+" + b2 + "}\\]";
        perimetertemp += "\\[P=\\sqrt{2}\\times \\pi \\sqrt{" + ans + "}\\]";
        perimetertemp += "\\[P=\\sqrt{2}\\times \\pi \\times" + anssqrt + "\\]";
        perimetertemp += "\\[P=1.414 \\times 3.14 \\times" + anssqrt + "\\]";
        var sol = 1.414 * 3.14 * anssqrt;
        perimetertemp +=
            "\\[Perimeter \\space of \\space Ellipse \\space is \\space" +
            sol +
            "\\]";
        perimeteroutput.innerHTML = perimetertemp;

        areatemp += "\\[A = \\pi \\times" + a + "\\times" + b + " \\]";
        areatemp += "\\[A = \\pi \\times" + eval(String(a * b)) + "\\]";
        areatemp += "\\[A=3.14 \\times " + eval(String(a * b)) + " \\]";
        var ar = eval(String("3.14*" + String(a * b)));
        areatemp += "\\[A=" + ar + " \\]";
        areatemp +=
            "\\[Area \\space of \\space Ellipse \\space is \\space " + ar + "\\]";
        areaoutput.innerHTML = areatemp;
        renderMathInElement(areaoutput);
        renderMathInElement(perimeteroutput);
    } else {
        areaoutput.innerHTML = "";
        perimeteroutput.innerHTML = "";
    }
}


function solvecube() {
    var side = document.getElementById("inputcuside").value;
    var voloutput = document.getElementById("resultofvolcu");
    var tsaoutput = document.getElementById("resultoftsacu");
    var diagoutput = document.getElementById("resultofdiagonalcu");
    var voltemp = "";
    var tsatemp = "";
    var diagtemp = "";
    if (side != "") {
        voltemp += "\\[" + side + "^3 \\]";
        voltemp += "\\[Volume \\space of \\space cube \\space is \\space " + eval(String(side * side * side)) + "\\]";
        voloutput.innerHTML = voltemp;
        tsatemp += "\\[ 6 \\times " + side + "^2 \\]";
        tsatemp += "\\[Total \\space Surface \\space Area \\space of \\space Cube \\space is \\space \\]";
        tsatemp += "\\[" + eval(String(6 * side * side)) + "\\]";
        tsaoutput.innerHTML = tsatemp;
        diagtemp += "\\[\\sqrt{3} \\times " + side + " \\]";
        diagtemp +=
            "\\[Body \\space Diagnol \\space of \\space Cube \\space is \\space  \\]";
        diagtemp += "\\[" + eval(String(1.732 * side)) + "\\]";
        diagoutput.innerHTML = diagtemp;
        renderMathInElement(voloutput);
        renderMathInElement(tsaoutput);
        renderMathInElement(diagoutput);
    } else {
        voloutput.innerHTML = "";
        tsaoutput.innerHTML = "";
        diagoutput.innerHTML = "";
    }
}
function solveanticube() {
    var side = document.getElementById("inputanticubeside").value;
    var voloutput = document.getElementById("resultofvolanticu");
    var tsaoutput = document.getElementById("resultoftsaanticu");
    var heightoutput = document.getElementById("resultofheightanticu");
    var voltemp = "";
    var tsatemp = "";
    var heighttemp = "";
    if (side != "") {
        voltemp += "\\[\\frac{1}{3} \\times \\sqrt{1+\\sqrt{2}} \\times \\sqrt{2+\\sqrt{2}} \\times" + side + "^3 \\]";
        voltemp += "\\[Volume \\space of \\space cube \\space is \\space " + eval(String(0.957 * side * side * side)) + "\\]";
        voloutput.innerHTML = voltemp;
        tsatemp += "\\[ 2 \\times (1+\\sqrt{3}) " + side + "^2 \\]";
        tsatemp += "\\[Surface \\space Area \\space of \\space Anticube \\space is \\space \\]";
        tsatemp += "\\[" + eval(String(5.464 * side * side)) + "\\]";
        tsaoutput.innerHTML = tsatemp;
        heighttemp += "\\[\\sqrt{1-\\frac{1}{2+\\sqrt{2}}} \\times " + side + " \\]";
        heighttemp +=
            "\\[Height \\space of \\space Anticube \\space is \\space  \\]";
        heighttemp += "\\[" + eval(String(0.841 * side)) + "\\]";
        heightoutput.innerHTML = heighttemp;
        renderMathInElement(voloutput);
        renderMathInElement(tsaoutput);
        renderMathInElement(heightoutput);
    } else {
        voloutput.innerHTML = "";
        tsaoutput.innerHTML = "";
        heightoutput.innerHTML = "";
    }
}

function solveflatcy() {
    var h = document.getElementById("inputflatcyh").value;
    var r = document.getElementById("inputflatcyr").value;
    var l = document.getElementById("inputflatcyl").value;
    var volumeoutput = document.getElementById("resultofflatcyvol");
    var laoutput = document.getElementById("resultofflatcyla");
    var taoutput = document.getElementById("resultofflatcyba");
    var angleoutput = document.getElementById("resultofflatcyangle");
    var voltemp = "";
    var latemp = "";
    var tatemp = "";
    var angletemp = "";
    var theta = 2 * Math.acos(((2 * l * l) - (4 * r * r)) / (2 * l * l));
    var lget = (2.28) * h * r;
    var f = 0.5 * theta * radius * radius - (radius - height) * Math.sqrt((2 * radius * height) - (height * height));
    if ((h != "") && (r != "") && (l != "")) {
        voltemp += "\\[V \\space = \\space ( \\pi - \\frac{4}{3})  \\times " + r + "\\times" + r + "\\times" + h + "\\]";
        voltemp += "\\[Volume \\space is \\space : \\space " + eval(String((1.81 * r * r * h).toFixed(2))) + "\\]";
        volumeoutput.innerHTML = voltemp;
        renderMathInElement(volumeoutput);
        latemp += "\\[L \\space = \\space (2 \\times \\pi - 4) \\times " + h + "\\times" + r + "\\]";
        latemp += "\\[Lateral \\space Area \\space is \\space = \\space " + (lget).toFixed(2) + "\\]";
        laoutput.innerHTML = latemp;
        renderMathInElement(laoutput);
        tatemp += "\\[A \\space = L + \\pi " + r + "\\times" + l + "\\pi" + r + "\\times" + r + "\\]";
        tatemp += "\\[Surface \\space Area \\space is \\space = \\space " + eval(String((lget + (3.14 * r * l) + (3.14 * r * r)).toFixed(2))) + "\\]";
        taoutput.innerHTML = tatemp;
        renderMathInElement(taoutput);
        angletemp += "\\[\\alpha \\space = cos^{-1} \\frac{2 \\times l^2 - 4 \\times r^2}{2 \\times l^2}" + width + "\\times" + "\\sqrt{" + height + "\\times" + "(2 \\times " + radius + "-" + height + "} )" + "\\]";
        angletemp += "\\[Top \\space Area \\space is \\space = \\space " + eval(String(theta)).toFixed(2) + "\\]";
        angleoutput.innerHTML = angletemp;
        renderMathInElement(angleoutput);
    }
    else {
        volumeoutput.innerHTML = "";
        laoutput.innerHTML = "";
        angleoutput.innerHTML = "";
        taoutput.innerHTML = "";
    }
}

function ellipsoidsolve() {

    var a = document.getElementById("inputellipa").value;
    var b = document.getElementById("inputellipb").value;
    var c = document.getElementById("inputellipc").value;

    var voloutput = document.getElementById("resultofvol");
    var tsaoutput = document.getElementById("resultoftsa");
    var voltemp = "";
    var tsatemp = "";
    var vol = 4.18 * a * b * c;
    var area = 6.343 * (((a ** 1.6 * b ** 1.6) + (b ** 1.6 * c ** 1.6) + (a ** 1.6 * c ** 1.6)) ** 0.625);

    if ((a != "") && (b != "") && (c != "")) {
        voltemp += "\\[\\frac{4}{3} \\times \\pi \\times " + a + "\\times" + b + "\\times" + c + "\\]";
        voltemp += "\\[Volume \\space of \\space Ellipsoid \\space is \\space " + vol.toFixed(3) + "\\]";
        voloutput.innerHTML = voltemp;
        tsatemp += "\\[" + 4 + "\\pi" + "(" + "\\frac{(" + a + "\\times" + b + ")^{1.6}" + "(" + b + "\\times" + c + ")^{1.6}" + "(" + a + "\\times" + c + ")^{1.6}}{3}" + " )^{\\frac{1}{1.6}}" + "\\]";
        tsatemp += "\\[Surface \\space area \\space of \\space Ellipsoid \\space is \\space  \\]";
        tsatemp += "\\[" + area.toFixed(3) + "\\]";
        tsaoutput.innerHTML = tsatemp;
        renderMathInElement(voloutput);
        renderMathInElement(tsaoutput);

    } else {
        voloutput.innerHTML = "";
        tsaoutput.innerHTML = "";
    }
}

function obelisksolve() {
    var a = document.getElementById("inputobebase").value;
    var b = document.getElementById("inputobetran").value;
    var i = document.getElementById("inputobefrus").value;
    var j = document.getElementById("inputobepy").value;
    var h = parseInt(i) + parseInt(j);

    var vol = (i * [(a ** 2 + b ** 2) + math.sqrt(a ** 2 * b ** 2)] + b ** 2 * j) / 3;
    var lsa = (parseInt(a) + parseInt(b)) * math.sqrt((parseInt(a) - parseInt(b)) ** 2 + (4 * i ** 2)) + b * math.sqrt(4 * j ** 2 + b ** 2);
    var sa = a ** 2 + lsa;

    if (a != "" && b != "" && i != "" && j != "") {

        document.getElementById("resultofobeheight").innerHTML = "\\[Obelisk \\space height \\space (h) \\space \\newline \\space = " + i + " + " + j + " = " + h + "\\]";
        renderMathInElement(document.getElementById("resultofobeheight"));

        document.getElementById("resultofobevol").innerHTML = "\\[Volume \\space (V) \\space \\newline \\frac{" + i + " \\times [ (" + a + "^2 + " + b + "^2) + \\sqrt{" + a + "^2 \\times " + b + "^2}] + " + b + "^2 \\times " + j + "}{3} \\newline = " + vol.toFixed(2) + "\\]";
        renderMathInElement(document.getElementById("resultofobevol"));

        document.getElementById("resultofobelsa").innerHTML = "\\[Lateral \\space Surface \\space area \\space (L) \\space \\newline  (" + a + "+" + b + ") \\times \\sqrt{(" + a + "-" + b + ")^2 + 4 \\times " + i + "^2 } \\newline + " + b + " \\times \\sqrt{4 \\times " + j + "^2 + " + b + "^2} \\newline \\space = " + lsa.toFixed(3) + "\\]";
        renderMathInElement(document.getElementById("resultofobelsa"));

        document.getElementById("resultofobesa").innerHTML = "\\[Surface \\space area \\space (A) \\space \\newline = \\space  " + a + "^2 + " + lsa.toFixed(2) + " = " + sa.toFixed(2) + "\\]";
        renderMathInElement(document.getElementById("resultofobesa"));
    } else {
        document.getElementById("resultofobeheight").innerHTML = "";
        document.getElementById("resultofobevol").innerHTML = "";
        document.getElementById("resultofobelsa").innerHTML = "";
        document.getElementById("resultofobesa").innerHTML = "";
    }
}
function frustumsolve() {
    var radius1 = document.getElementById("inputfrustumradius1").value;
    var radius2 = document.getElementById("inputfrustumradius2").value;
    var height = document.getElementById("inputfrustumheight").value;
    var voloutput = document.getElementById("resultofvolfrustum");
    var lsaoutput = document.getElementById("resultoflsafrustum");
    var tsaoutput = document.getElementById("resultoftsafrustum");
    var slantoutput = document.getElementById("resultofslantfrustum");
    var voltemp = "";
    var lsatemp = "";
    var tsatemp = "";
    var slanttemp = "";
    if ((radius1 != "") && (radius2 != "") && (height != "")) {
        slanttemp += "\\[ " + "\\sqrt" + "(" + "(" + radius1 + "-" + radius2 + ")" + "^2" + "+" + height + "^2" + ")" + "\\]";
        slanttemp += "\\[Slant \\space Height \\space of \\space Conical \\space Frustum \\space is \\space \\]";
        slanttemp += "\\[" + eval(String((Math.sqrt(((radius1 - radius2) * (radius1 - radius2)) + (height * height))))) + "\\]";
        slantoutput.innerHTML = slanttemp;
        lsatemp += "\\[ " + "\\pi" + "(" + radius1 + "+" + radius2 + ")" + "\\sqrt" + "(" + "(" + radius1 + "-" + radius2 + ")" + "^2" + "+" + height + "^2" + ")" + "\\]";
        lsatemp += "\\[Lateral \\space area \\space of \\space Conical \\space Frustum \\space is \\space \\]";
        lsatemp += "\\[" + eval(String((3.14 * radius1 + 3.14 * radius2 * Math.sqrt(((radius1 - radius2) * (radius1 - radius2)) + (height * height))))) + "\\]";
        lsaoutput.innerHTML = lsatemp;
        voltemp += "\\[ " + "\\frac{1}{3}" + "\\times" + "\\pi" + "\\times" + height + "(" + radius1 + "\\times" + radius1 + "+" + radius2 + "\\times" + radius2 + "+" + "(" + radius1 + "+" + radius2 + ")" + ")" + "\\]";
        voltemp += "\\[Volume \\space area \\space of \\space Conical \\space Frustum \\space is \\space \\]";
        voltemp += "\\[" + eval(String(0.33 * 3.14 * height * radius1 * radius1 + 0.33 * 3.14 * height * radius2 * radius2 + 0.33 * 3.14 * height * radius1 * radius2)) + "\\]";
        voloutput.innerHTML = voltemp;
        tsatemp += "\\[ " + "\\pi" + "(" + radius1 + "\\times" + radius1 + "+" + radius2 + "\\times" + radius2 + "+" + "(" + radius1 + "+" + radius2 + ")" + "\\times" + "\\sqrt" + "(" + "(" + radius1 + "-" + radius2 + ")" + "^2" + "+" + height + "^2" + ")" + ")" + "\\]";
        tsatemp += "\\[Total \\space surface \\space area \\space of \\space Conical \\space Frustum \\space is \\space \\]";
        tsatemp += "\\[" + eval(String(((3.14 * radius1 * radius1) + (3.14 * radius2 * radius2) + (3.14 * radius1) + (3.14 * radius2 * Math.sqrt(((radius1 - radius2) * (radius1 - radius2)) + (height * height)))))) + "\\]";
        tsaoutput.innerHTML = tsatemp;
        renderMathInElement(voloutput);
        renderMathInElement(lsaoutput);
        renderMathInElement(tsaoutput);
        renderMathInElement(slantoutput);
    } else {
        voloutput.innerHTML = "";
        lsaoutput.innerHTML = "";
        tsaoutput.innerHTML = "";
        slantoutput.innerHTML = "";
    }
}

findFactors = function () {
    var number = document.getElementById("numforfactorhcflcm").value;
    var integer = parseInt(number);
    var loopCount = integer / 2;
    for (var i = 1; i <= loopCount; i++) {
        if (integer % i == 0)
            document.getElementById("allfactor").innerHTML += i + ",";
    }
    document.getElementById("allfactor").innerHTML += number;
}

function pyramidsolve() {
    var side = document.getElementById("inputpyramidside").value;
    var height = document.getElementById("inputpyramidheight").value;
    var voloutput = document.getElementById("resultofvolpyramid");
    var lsaoutput = document.getElementById("resultoflsapyramid");
    var tsaoutput = document.getElementById("resultoftsapyramid");
    var hsfoutput = document.getElementById("resultofhsfpyramid");
    var voltemp = "";
    var lsatemp = "";
    var tsatemp = "";
    var hsftemp = "";
    if ((side != "") && (height != "")) {
        voltemp += "\\[ (" + side + "\\times" + side + "\\times" + height + ")" + "\\div" + 3 + "\\]";
        voltemp += "\\[Volume \\space of \\space Square \\space Pyramid \\space is \\space \\]";
        voltemp += "\\[" + eval(String((side * side * height) / 3)) + "\\]";
        voloutput.innerHTML = voltemp;

        lsatemp += "\\[ " + side + "\\sqrt" + "(" + "4" + "\\times" + height + "\\times" + height + "+" + side + "\\times" + side + ")" + "\\]";
        lsatemp += "\\[Lateral \\space area \\space of \\space Square \\space Pyramid \\space is \\space \\]";
        lsatemp += "\\[" + eval(String((side * Math.sqrt((4 * height * height) + (side * side))))) + "\\]";
        lsaoutput.innerHTML = lsatemp;

        tsatemp += "\\[ " + side + "\\sqrt" + "(" + "4" + "\\times" + height + "\\times" + height + "+" + side + "\\times" + side + ")" + "+" + side + "\\times" + side + "\\]";
        tsatemp += "\\[Total \\space Surface \\space area \\space of \\space Pyramid \\space is \\space \\]";
        tsatemp += "\\[" + eval(String((side * Math.sqrt((4 * height * height) + (side * side)) + (side * side)))) + "\\]";
        tsaoutput.innerHTML = tsatemp;

        hsftemp += "\\[" + "\\sqrt" + "(" + height + "\\times" + height + "+" + "(" + side + "\\div" + 2 + ")" + "^" + 2 + ")" + "\\]";
        hsftemp += "\\[Height \\space of \\space  side \\space face \\space is \\space \\]";
        hsftemp += "\\[" + eval(String(Math.sqrt((height * height) + ((side / 2) * (side / 2))))) + "\\]";
        hsfoutput.innerHTML = hsftemp;

        renderMathInElement(voloutput);
        renderMathInElement(lsaoutput);
        renderMathInElement(tsaoutput);
        renderMathInElement(hsfoutput);

    } else {
        voloutput.innerHTML = "";
        lsaoutput.innerHTML = "";
        tsaoutput.innerHTML = "";
        hsfoutput.innerHTML = "";


    }
}

function tripyramidsolve() {
    var side = document.getElementById("inputtripyramidside").value;
    var slant = document.getElementById("inputtripyramidslant").value;
    var height = document.getElementById("inputtripyramidheight").value;
    var voloutput = document.getElementById("resultoftrivolpyramid");
    var lsaoutput = document.getElementById("resultoftrilsapyramid");
    var tsaoutput = document.getElementById("resultoftritsapyramid");
    var baseoutput = document.getElementById("resultoftribasepyramid");
    var perioutput = document.getElementById("resultoftriperipyramid");
    var voltemp = "";
    var lsatemp = "";
    var tsatemp = "";
    var basetemp = "";
    var peritemp = "";
    if ((side != "") && (slant != "") && (height != "")) {
        voltemp += "\\[ (" + "\\sqrt" + 3 + "\\times" + side + "\\times" + side + "\\times" + height + ")" + "\\div" + "(" + 3 + "\\times" + 4 + ")" + "\\]";
        voltemp += "\\[Volume \\space of \\space Triangular \\space Pyramid \\space is \\space \\]";
        voltemp += "\\[" + eval(String((0.43 * side * side * height) / 3)) + "\\]";
        voloutput.innerHTML = voltemp;

        lsatemp += "\\[ (" + 3 + "\\times" + side + "\\times" + slant + ")" + "\\div" + 2 + "\\]";
        lsatemp += "\\[Lateral \\space \\space Surface \\space area  \\space is \\space" + eval(String((3 * side * slant) / 2)) + "\\]";
        lsaoutput.innerHTML = lsatemp;

        tsatemp += "\\[" + "\\frac{\\sqrt{3}}{4}" + "\\times" + side + "\\times" + side + "+" + "\\frac{1}{2}" + "\\times" + 3 + "\\times" + side + "\\times" + slant + "\\]";
        tsatemp += "\\[Total \\space Surface \\space area \\space is \\space \\]";
        tsatemp += "\\[" + eval(String((0.433 * side * side) + ((3 * side * slant) / 2))) + "\\]";
        tsaoutput.innerHTML = tsatemp;

        basetemp += "\\[" + "\\frac{\\sqrt{3}}{4}" + "\\times" + side + "\\times" + side + "\\]";
        basetemp += "\\[Base \\space Area \\space is \\space" + eval(String(0.433 * side * side)) + "\\]";
        baseoutput.innerHTML = basetemp;

        peritemp += "\\[" + 3 + "\\times" + side + "\\]";
        peritemp += "\\[Perimeter \\space of \\space Triangular \\space base \\space is \\space" + eval(String(3 * side)) + "\\]";
        perioutput.innerHTML = peritemp;

        renderMathInElement(voloutput);
        renderMathInElement(lsaoutput);
        renderMathInElement(tsaoutput);
        renderMathInElement(baseoutput);
        renderMathInElement(perioutput);

    } else {
        voloutput.innerHTML = "";
        lsaoutput.innerHTML = "";
        tsaoutput.innerHTML = "";
        baseoutput.innerHTML = "";
        perioutput.innerHTML = "";

    }
}

function solvetribipyramid() {
    let a = document.getElementById("inputtribipyedge").value;
    let heioutput = document.getElementById("resultoftribipyhei");
    let areaoutput = document.getElementById("resultoftribipyarea");
    let voloutput = document.getElementById("resultoftribipyvol");
    var areatemp = "";
    var heitemp = "";
    var voltemp = "";
    if (a != "") {
        areatemp += "\\[Area \\space \\newline \\frac{3}{2} \\space \\sqrt{3} \\space (" + a + ")^2" + "\\ = " + eval(String(2.5980762 * a * a)).toFixed(2) + "\\]";
        areaoutput.innerHTML = areatemp;
        heitemp += "\\[Height \\space \\newline \\frac{2}{3} \\space \\sqrt{6} \\space (" + a + ")" + "\\ = " + eval(String(1.6329932 * a)).toFixed(2) + "\\]";
        heioutput.innerHTML = heitemp;
        voltemp += "\\[Volume \\space \\newline \\frac{\\sqrt{2}}{6} \\space (" + a + ")^3" + "\\ = " + eval(String(0.2357023 * a * a * a)).toFixed(2) + "\\]";
        voloutput.innerHTML = voltemp;
        renderMathInElement(areaoutput);
        renderMathInElement(heioutput);
        renderMathInElement(voloutput);
    } else {
        areaoutput.innerHTML = "";
        heioutput.innerHTML = "";
        voloutput.innerHTML = "";
    }
}
function centsolve() {
    var x1 = parseInt(document.getElementById("x1st").value)
    var y1 = parseInt(document.getElementById("y1st").value)
    var x2 = parseInt(document.getElementById("x2nd").value)
    var y2 = parseInt(document.getElementById("y2nd").value)
    var x3 = parseInt(document.getElementById("x3rd").value)
    var y3 = parseInt(document.getElementById("y3rd").value)
    var xans = (x1 + x2 + x3) / 3
    var yans = (y1 + y2 + y3) / 3
    var centout1 = document.getElementById("apk");
    var centemp1 = "";
    if (!isNaN(x1) && !isNaN(y1) && !isNaN(x2) && !isNaN(y2) && !isNaN(x3) && !isNaN(y3)) {
        centemp1 += "\\[Centroid \\space of \\space a \\space Triangle \\ is \\space ( \\space \\frac{x_1+x_2+x_3}{3} \\space , \\space \\frac{y_1+y_2+y_3}{3} ) \\space \\]";
        centemp1 += "\\[( \\space \\frac{ (" + x1 + ") + (" + x2 + ") + (" + x3 + ") }{3} \\space , \\space \\frac{ (" + y1 + ") + (" + y2 + ") + (" + y3 + ") }{3} \\space ) \\]";
        centemp1 += "\\[( " + xans.toFixed(3) + "," + yans.toFixed(3) + " )\\]";
        centout1.innerHTML = centemp1;
        renderMathInElement(centout1);
    }
    else {
        centemp1 += "\\[Please \\space enter \\space all \\space fields \\]";
        centout1.innerHTML = centemp1;
        renderMathInElement(centout1);
    }
}

function pentbipyramidsolve() {
    var side = document.getElementById("inputpentbipyramidside").value;
    var voloutput = document.getElementById("resultofpentbipyrvol");
    var areaoutput = document.getElementById("resultofpentbipyrarea");
    var houtput = document.getElementById("resultofpentbipyrheight");
    var voltemp = "";
    var areatemp = "";
    var htemp = "";
    if (side != "") {
        voltemp += "\\[ (" + "\\frac{5+\\sqrt{5}}{12}" + ")" + "\\times" + side + "\\times" + side + "\\times" + side + "\\]";
        voltemp += "\\[Volume  \\space is \\space " + eval(String(0.6030057 * side * side * side)).toFixed(2) + " \\]";
        voloutput.innerHTML = voltemp;
        areatemp += "\\[ (" + "\\frac{5\\sqrt{3}}{2}" + ")" + "\\times" + side + "\\times" + side + "\\]";
        areatemp += "\\[Area \\space is \\space" + eval(String(4.330127 * side * side)).toFixed(2) + "\\]";
        areaoutput.innerHTML = areatemp;
        htemp += "\\[" + "2 \\times ( \\sqrt{\\frac{5 - \\sqrt{5}}{10}}) \\times" + side + "\\]";
        htemp += "\\[Height \\space is \\space " + eval(String(1.0514622 * side)).toFixed(2) + " \\]";
        houtput.innerHTML = htemp;
        renderMathInElement(voloutput);
        renderMathInElement(areaoutput);
        renderMathInElement(houtput);
    } else {
        voloutput.innerHTML = "";
        areaoutput.innerHTML = "";
        houtput.innerHTML = "";
    }
}

function solveroundcorner() {
    let a = document.getElementById("inputrndcrnradius").value;
    let arclenoutput = document.getElementById("resultofrndcrnarclen");
    let perioutput = document.getElementById("resultofrndcrnperi");
    let areacrnoutput = document.getElementById("resultofrndcrnarea");
    let areapieceoutput = document.getElementById("resultofrndcrnpiece");
    var arclentemp = "";
    var peritemp = "";
    var areacrntemp = "";
    var areapiecetemp = "";
    if (a != "") {
        arclentemp += "\\[Arc \\space length \\space \\newline \\frac{1}{2} \\space (3.14) \\space (" + a + ")" + "\\ = " + eval(String(1.5707963 * a)).toFixed(2) + "\\]";
        arclenoutput.innerHTML = arclentemp;
        peritemp += "\\[Perimeter \\space \\newline \\frac{1}{2} \\space (3.14) \\space (" + a + ")" + "+ 2 \\space (" + a + ")" + "\\ = " + eval(String((1.5707963 * a) + (2 * a))).toFixed(2) + "\\]";
        perioutput.innerHTML = peritemp;
        areacrntemp += "\\[Area \\space round \\space corner \\space \\newline \\frac{1}{4} \\space (3.14) \\space (" + a + ")^2" + "\\ = " + eval(String(0.7853982 * a * a)).toFixed(2) + "\\]";
        areacrnoutput.innerHTML = areacrntemp;
        areapiecetemp += "\\[Area \\space missing \\space piece \\space \\newline" + a + "^2 -" + "\\frac{1}{4} \\space (3.14) \\space (" + a + ")^2" + "\\ = " + eval(String((a * a) - (0.7853982 * a * a))).toFixed(2) + "\\]";
        areapieceoutput.innerHTML = areapiecetemp;
        renderMathInElement(arclenoutput);
        renderMathInElement(perioutput);
        renderMathInElement(areacrnoutput);
        renderMathInElement(areapieceoutput);
    } else {
        arclenoutput.innerHTML = "";
        perioutput.innerHTML = "";
        areacrnoutput.innerHTML = "";
        areapieceoutput.innerHTML = "";
    }
}
function wedgesolve() {
    var side = document.getElementById("inputwedgeside").value;
    var width = document.getElementById("inputwedgewidth").value;
    var topside = document.getElementById("inputwedgetopside").value;
    var height = document.getElementById("inputwedgeheight").value;
    var volume = (2 * side * width * height + width * height * topside) / 6;
    var temp = Math.sqrt((4 * height * height) + (width * width));
    var temp1 = Math.sqrt((height * height) + (side * side) + (topside * topside) - (2 * side * topside));
    var lsa = ((temp * side) + (temp * topside)) / 2 + width * temp1;
    var sa = lsa + side * width;
    if ((side != "") && (width != "") && (topside != "") && (height != "")) {
        document.getElementById('resofwedgevol1').innerHTML = "\\[Volume \\space of \\space Wedge \\space is \\]";
        renderMathInElement(document.getElementById('resofwedgevol1'));
        document.getElementById('resofwedgevol2').innerHTML = "\\[ \\frac{" + width + "\\times" + height + "}{6}(2 \\times" + side + "+" + topside + ") =" + volume + "\\]";
        renderMathInElement(document.getElementById('resofwedgevol2'));
        document.getElementById('resofwedgelsa1').innerHTML = "\\[Lateral \\space Surface \\space Area \\space (F) \\space of \\space Wedge \\space is \\]";
        renderMathInElement(document.getElementById('resofwedgelsa1'));
        document.getElementById('resofwedgelsa2').innerHTML = "\\[ \\frac{" + side + "\\times" + topside + "}{2} \\sqrt{4 \\times" + height + "\\times" + height + "+" + width + "\\times" + width + "} +" + width + "\\sqrt{" + height + "\\times" + height + "+(" + side + "-" + topside + ")^2} = " + lsa.toFixed(2) + "\\]";
        renderMathInElement(document.getElementById('resofwedgelsa2'));
        document.getElementById('resofwedgesa1').innerHTML = "\\[Surface \\space  Area \\space of \\space Wedge \\space is \\]";
        renderMathInElement(document.getElementById('resofwedgesa1'));
        document.getElementById('resofwedgesa2').innerHTML = "\\[F \\space + " + side + "\\times" + width + "=" + sa.toFixed(2) + "\\]";
        renderMathInElement(document.getElementById('resofwedgesa2'));

    }

}
function solverightwedge() {
    var a = document.getElementById("inputwedgea").value;
    var b = document.getElementById("inputwedgeb").value;
    var c = document.getElementById("inputwedgec").value;
    var heightoutput = document.getElementById("resultofrightwedgeheight");
    var voloutput = document.getElementById("resultofrightwedgevol");
    var areaoutput = document.getElementById("resultofrightwedgearea");
    var heighttemp = "";
    var areatemp = "";
    var voltemp = "";
    var h = Math.sqrt(((4 * c * c) - (b * b)) / 4).toFixed(2);
    if ((a != "") && (b != "") && (c != "")) {
        heighttemp += "\\[Height \\space of \\space Right \\space Wedge \\space \\newline \\sqrt{\\frac{4 \\times" + c + "^2 -" + b + "^2}{4}}" + "\\ = " + eval(String(h)) + "\\]";
        heightoutput.innerHTML = heighttemp;
        voltemp += "\\[Volume \\space of \\space Right \\space Wedge \\space \\newline \\frac{" + a + "\\times" + b + "\\times" + h + "}{2} " + "\\ = " + eval(String(a * b * h * 0.5)).toFixed(2) + "\\]";
        voloutput.innerHTML = voltemp;
        areatemp += "\\[Area \\space of \\space Right \\space Wedge \\space  \\newline" + a + "\\times" + b + "+2 \\times" + a + "\\times" + c + "+" + h + "\\times" + b + "\\ = " + eval(String((a * b) + (2 * a * c) + (h * b))).toFixed(2) + "\\]";
        areaoutput.innerHTML = areatemp;
        renderMathInElement(heightoutput);
        renderMathInElement(voloutput);
        renderMathInElement(areaoutput);

    } else {
        heightoutput.innerHTML = "";
        voloutput.innerHTML = "";
        areaoutput.innerHTML = "";
    }

}


function solveSphericalwedge() {
    var r = document.getElementById("inputsphericalr").value;
    var a = document.getElementById("inputsphericala").value;
    var voloutput = document.getElementById("resultofsphericalwedgevol");
    var areaoutput = document.getElementById("resultofsphericalwedgearea");
    var areatemp = "";
    var voltemp = "";
    var vol = (a * Math.PI * 0.67 * r * r * r) / 180;
    var area = (a * Math.PI * r * r) / 180 + (3.14 * r * r);
    if ((r != "") && (a != "")) {
        voltemp += "\\[Volume \\space of \\space Spherical \\space Wedge \\space \\newline" + a + "\\times \\frac{2}{3} \\times" + r + "\\times" + r + "\\times" + r + "\\ = " + eval(String(vol)).toFixed(2) + "\\]";
        voloutput.innerHTML = voltemp;
        areatemp += "\\[Area \\space of \\space Spherical \\space Wedge \\space  \\newline" + a + "\\times 2 \\times" + r + "+2 + \\pi \\times" + r + "^2" + "\\ = " + eval(String(area)).toFixed(2) + "\\]";
        areaoutput.innerHTML = areatemp;

        renderMathInElement(voloutput);
        renderMathInElement(areaoutput);

    } else {
        soutput.innerHTML = "";
        d1output.innerHTML = "";
        d2output.innerHTML = "";
        voloutput.innerHTML = "";
        areaoutput.innerHTML = "";
    }

}
function solvesphere() {
    var radius = document.getElementById("inputradiussph").value;

    var voloutput = document.getElementById("resultofvolsp");
    var tsaoutput = document.getElementById("resultoftsasp");
    var diaoutput = document.getElementById("resultofdimsp");
    var voltemp = "";
    var tsatemp = "";
    var diatemp = "";
    var a = eval(String((4 * 3.14159 * radius * radius * radius) / 3));
    var b = eval(String(4 * 3.14159 * radius * radius));
    if (radius != "") {
        voltemp += "\\[ \\frac{4}{3} \\times \\pi \\times " + radius + "^3 \\]";
        voltemp += "\\[Volume \\space of \\space Sphere \\space is \\space " + a.toFixed(3) + "\\space cm^3\\]";
        voloutput.innerHTML = voltemp;
        tsatemp += "\\[4 \\times \\pi \\times" + radius + "^2 \\]";
        tsatemp +=
            "\\[Total \\space Surface \\space Area \\space of \\space Sphere \\space is \\space  \\]";
        tsatemp += "\\[" + b.toFixed(3) + "\\space cm^2\\]";
        tsaoutput.innerHTML = tsatemp;
        diatemp += "\\[2 \\times" + radius + "\\]";
        diatemp += "\\[Diameter \\space of \\space a \\space Sphere \\space is \\space \\]";
        diatemp += "\\[" + eval(String(2 * radius)) + "\\space cm \\]";
        diaoutput.innerHTML = diatemp;
        renderMathInElement(voloutput);
        renderMathInElement(tsaoutput);
        renderMathInElement(diaoutput);
    } else {
        voloutput.innerHTML = "";
        tsaoutput.innerHTML = "";
        diaoutput.innerHTML = "";
    }
}
function solveSquircle() {
    var radius = document.getElementById("inputsquirclerad").value;

    var peri = 7.01769794356404 * radius;
    var d = 2 * radius;

    if (radius != "") {
        document.getElementById("resultofSquirclep").innerHTML = "\\[Perimeter \\space (P) \\space of \\space Squircle \\space \\newline 7.0177 \\times " + radius + " = " + peri.toFixed(3) + "\\]";
        document.getElementById("resultofSquircled").innerHTML = "\\[Diameter \\space (d) \\space of \\space Squircle \\space \\newline 2 \\times " + radius + " = " + d.toFixed(3) + "\\]";
        renderMathInElement(document.getElementById("resultofSquirclep"));
        renderMathInElement(document.getElementById("resultofSquircled"));
    } else {
        document.getElementById("resultofSquirclep").innerHTML = "";
        document.getElementById("resultofSquircled").innerHTML = "";
    }
}
function solvehollowsphere() {
    var radius1 = document.getElementById("inputradius1hollowsph").value;
    var radius2 = document.getElementById("inputradius2hollowsph").value;
    var voloutput = document.getElementById("resultofvolhollowsp");
    var tsaoutput = document.getElementById("resultoftsahollowsp");
    var voltemp = "";
    var tsatemp = "";
    if (radius1 != "" && radius2 != "") {
        if (radius1 <= radius2) {
            tsatemp = "Outer radius should be greater than inner radius";
        }
        else {
            voltemp += "\\[ \\frac{4}{3} \\times \\pi \\times (" + radius1 + "^3-" + radius2 + "^3) \\]";
            voltemp += "\\[Volume \\space of \\space Hollow \\space Sphere \\space is \\space " + eval(String(4 * 3.14159 * ((radius1 * radius1 * radius1) - (radius2 * radius2 * radius2)) / 3)) + "\\]";
            voloutput.innerHTML = voltemp;
            tsatemp += "\\[4 \\times \\pi \\times" + radius1 + "^2 -" + radius2 + "^2 \\]";
            tsatemp +=
                "\\[Total \\space Surface \\space Area \\space of \\space Hollow \\space Sphere \\space is \\space  \\]";
            tsatemp += "\\[" + eval(String(4 * 3.14159 * ((radius1 * radius1) - (radius2 * radius2)))) + "\\]";
        }
        tsaoutput.innerHTML = tsatemp;
        renderMathInElement(voloutput);
        renderMathInElement(tsaoutput);
    } else {
        voloutput.innerHTML = "";
        tsaoutput.innerHTML = "";
    }
}
function solvepartialsphere() {
    var height = document.getElementById("parsphh").value;
    var radius = document.getElementById("parsphr").value;
    var volumeoutput = document.getElementById("resultofparspvol");
    var radoutput = document.getElementById("resultofparsprad");
    var baoutput = document.getElementById("resultofparspba");
    var saoutput = document.getElementById("resultofparspsa");
    var voltemp = "";
    var radtemp = "";
    var batemp = "";
    var satemp = "";
    var c = Math.sqrt((2 * radius * height) - (height * height));
    if ((height != "") && (radius != "")) {
        radtemp += "\\[ c = \\sqrt{" + height + "\\times(2\\times" + radius + "-" + height + ")}" + "\\]";
        radtemp += "\\[Radius \\space of \\space bottom \\space is \\space = \\space " + (c).toFixed(2) + "\\]";
        radoutput.innerHTML = radtemp;
        renderMathInElement(radoutput);
        voltemp += "\\[ V = \\frac{\\pi}{6}" + "\\times" + height + "\\times(3 \\times c^2 +" + height + "\\times" + height + ")" + "\\]";
        voltemp += "\\[Volume \\space is \\space = \\space " + ((0.52 * height * 3 * c * c) + (0.52 * height * height * height)).toFixed(2) + "\\]";
        volumeoutput.innerHTML = voltemp;
        renderMathInElement(volumeoutput);
        batemp += "\\[ B = \\pi \\times (\\sqrt{" + height + "\\times(2\\times" + radius + "-" + height + ")})^2" + "\\]";
        batemp += "\\[Bottom \\space Area \\space is \\space " + eval(String(3.14 * c * c)) + "\\]";
        baoutput.innerHTML = batemp;
        renderMathInElement(baoutput);
        satemp += "\\[ S = 2 \\times \\pi \\times" + radius + "\\times" + height + "\\]";
        satemp += "\\[Surface \\space Area \\space is \\space " + eval(String(2 * 3.14 * radius * height)) + "\\]";
        saoutput.innerHTML = satemp;
        renderMathInElement(saoutput);


    }
    else {
        radoutput.innerHTML = "";
        volumeoutput.innerHTML = "";
        baoutput.innerHTML = "";
        saoutput.innerHTML = "";
    }
}

function solveSalinon() {
    var r = document.getElementById("inputsalinonr").value;
    var R = document.getElementById("inputsalinonR").value;
    var perioutput = document.getElementById("resultofsalinonperi");
    var areaoutput = document.getElementById("resultofsalinonarea");
    var peritemp = "";
    var areatemp = "";
    var area = 0.785 * ((r * r) + (R * R) + (2 * R * r));
    if ((r != "") && (R != "")) {
        peritemp += "\\[Perimeter \\space of \\space Salinon \\space \\newline 2 \\times \\pi \\times" + R + "\\ = " + eval(String(2 * 3.14 * R)) + "\\]";
        perioutput.innerHTML = peritemp;
        areatemp += "\\[Area \\space of \\space Salinon \\space  \\newline \\frac{1}{4} \\times \\pi (" + R + "+" + r + ")^2" + "\\ = " + eval(String(area)).toFixed(2) + "\\]";
        areaoutput.innerHTML = areatemp;
        renderMathInElement(perioutput);
        renderMathInElement(areaoutput);

    } else {
        perioutput.innerHTML = "";
        areaoutput.innerHTML = "";
    }

}

function sphericalTriangleSolve() {
    var r = parseFloat(document.getElementById("sphericaltri-r").value);
    var alpha = parseFloat(document.getElementById("sphericaltri-a").value);
    var beta = parseFloat(document.getElementById("sphericaltri-b").value);
    var gamma = parseFloat(document.getElementById("sphericaltri-y").value);
    var sphericalExcessField = document.getElementById("resultSphericalExcessSphereTri");
    var areaField = document.getElementById("resultAreaSphereTri");
    var sphericalExcess = alpha + beta + gamma - 180;
    var area = sphericalExcess * r * r;
    if (sphericalExcess < 0) {
        sphericalExcessField.innerHTML = "Angular sum must be > 180!";
        areaField.innerHTML = "";
    }
    else if ((!isNaN(r)) && (!isNaN(alpha)) && (!isNaN(beta)) && (!isNaN(gamma))) {
        sphericalExcessField.innerHTML = "\\[Spherical \\space excess \\space (\\epsilon) = " + alpha + " \\degree + " + beta + " \\degree + " + gamma + " \\degree - 180 \\degree = " + sphericalExcess + " \\degree \\]";
        areaField.innerHTML = "\\[Area \\space (A) = \\epsilon \\times " + r + "^2 = " + area + " \\space sq.units\\]";
        renderMathInElement(sphericalExcessField);
        renderMathInElement(areaField);
    }
}

function solvehemisphere() {
    var radius = document.getElementById("inputradiushemisph").value;

    var voloutput = document.getElementById("resultofvolhemisp");
    var tsaoutput = document.getElementById("resultoftsahemisp");
    var voltemp = "";
    var tsatemp = "";
    if (radius != "") {
        voltemp += "\\[ \\frac{2}{3} \\times \\pi \\times " + radius + "^3 \\]";
        voltemp += "\\[Volume \\space of \\space HemiSphere \\space is \\space " + eval(String((2 * 3.14159 * radius * radius * radius) / 3)) + "\\]";
        voloutput.innerHTML = voltemp;
        tsatemp += "\\[3 \\times \\pi \\times" + radius + "^2 \\]";
        tsatemp +=
            "\\[Total \\space Surface \\space Area \\space of \\space HemiSphere \\space is \\space  \\]";
        tsatemp += "\\[" + eval(String(3 * 3.14159 * radius * radius)) + "\\]";
        tsaoutput.innerHTML = tsatemp;
        renderMathInElement(voloutput);
        renderMathInElement(tsaoutput);
    } else {
        voloutput.innerHTML = "";
        tsaoutput.innerHTML = "";
    }
}

function heightdist1() {
    var distance = parseFloat(document.getElementById("height22").value);
    var degree = parseFloat(document.getElementById("height33").value);
    var output = document.getElementById("printheight1");
    var temp = "";
    var deg1 = Math.tan(degree * Math.PI / 180).toFixed(3)
    if (!isNaN(distance) && !isNaN(degree)) {
        temp += "\\[Uzunluk(AC) \\space = \\space " + distance + "m \\]";
        temp += "\\[Yükseklik \\space Açısı(∠BAC) \\space = \\space " + degree + "\\degree \\]";
        temp += "\\[tan θ \\space = \\space \\frac{Karşı Kenar}{Bitişik Kenar} \\]";
        temp += "\\[tan " + degree + "\\degree \\space = \\space \\frac{AB}{BC} \\]";
        temp += "\\[" + deg1 + "\\space = \\space \\frac{AB}{" + distance + "} \\]";
        temp += "\\[AB \\space = \\space " + distance + "\\times" + deg1 + " \\space = \\space " + (distance * deg1) + " \\]";
        temp += "\\[Yükseklik \\space  \\space " + (distance * deg1) + "m \\]";
        output.innerHTML = temp;
        renderMathInElement(output);
    }
    else {
        temp += "\\[Lütfen \\space boş \\space alan \\space bırakmayın \\]";
        output.innerHTML = temp;
        renderMathInElement(output);
    }

}


function heightdist9() {
    var distance = parseFloat(document.getElementById("height92").value);
    var degree = parseFloat(document.getElementById("height93").value);
    var output = document.getElementById("printheight9");
    var temp = "";
    var deg1 = Math.tan(degree * Math.PI / 180).toFixed(3)
    if (!isNaN(distance) && !isNaN(degree)) {
        temp += "\\[Uzunluk(AC) \\space = \\space " + distance + "m \\]";
        temp += "\\[Düşey \\space açı(∠BAC) \\space = \\space " + degree + "\\degree \\]";
        temp += "\\[tan θ \\space = \\space \\frac{Karşı Kenar}{Bitişik Kenar} \\]";
        temp += "\\[tan " + degree + "\\degree \\space = \\space \\frac{AB}{BC} \\]";
        temp += "\\[" + deg1 + "\\space = \\space \\frac{AB}{" + distance + "} \\]";
        temp += "\\[AB \\space = \\space " + distance + "\\times" + deg1 + " \\space = \\space " + (distance * deg1) + " \\]";
        temp += "\\[Yükseklik \\space  \\space " + (distance * deg1) + "m \\]";
        output.innerHTML = temp;
        renderMathInElement(output);
    }
    else {
        temp += "\\[Lütfen \\space boş \\space alan \\space bırakmayın \\]";
        output.innerHTML = temp;
        renderMathInElement(output);
    }

}


function heightdist5() {
    var height = parseFloat(document.getElementById("height51").value);
    var degree = parseFloat(document.getElementById("height52").value);
    var output = document.getElementById("printheight5");
    var temp = "";
    var deg1 = Math.tan(degree * Math.PI / 180).toFixed(3)
    if (!isNaN(height) && !isNaN(degree)) {
        temp += "\\[Yükseklik(AB) \\space = \\space " + height + "m \\]";
        temp += "\\[Yükseklik \\space açısı(∠BAC) \\space = \\space " + degree + "\\degree \\]";
        temp += "\\[tan θ \\space = \\space \\frac{Karşı Kenar}{Bitişik Kenar} \\]";
        temp += "\\[tan " + degree + "\\degree \\space = \\space \\frac{AB}{BC} \\]";
        temp += "\\[" + deg1 + "\\space = \\space \\frac{" + height + "}{BC} \\]";
        temp += "\\[BC \\space = \\space \\frac {" + height + "}{" + deg1 + "} \\space = \\space " + (height / deg1).toFixed(3) + " \\]";
        temp += "\\[Uzunluk \\space  \\space " + (height / deg1).toFixed(3) + "m \\]";
    }
    else {
        temp += "\\[Lütfen \\space boş \\space alan \\space bırakmayın \\]";
    }
    output.innerHTML = temp;
    renderMathInElement(output);
}

function heightdist8() {
    var height = parseFloat(document.getElementById("height81").value);
    var degree = parseFloat(document.getElementById("height82").value);
    var output = document.getElementById("printheight8");
    var temp = "";
    var deg1 = Math.tan(degree * Math.PI / 180).toFixed(3)
    if (!isNaN(height) && !isNaN(degree)) {
        temp += "\\[Yükseklik(AB) \\space = \\space " + height + "m \\]";
        temp += "\\[Düşey \\space Açı \\space (∠BAC) \\space = \\space " + degree + "\\degree \\]";
        temp += "\\[tan θ \\space = \\space \\frac{Karşı Kenar}{Bitişik Kenar} \\]";
        temp += "\\[tan " + degree + "\\degree \\space = \\space \\frac{AB}{BC} \\]";
        temp += "\\[" + deg1 + "\\space = \\space \\frac{" + height + "}{BC} \\]";
        temp += "\\[BC \\space = \\space \\frac {" + height + "}{" + deg1 + "} \\space = \\space " + (height / deg1).toFixed(3) + " \\]";
        temp += "\\[Uzunluk \\space  \\space " + (height / deg1).toFixed(3) + "m \\]";
    }
    else {
        temp += "\\[Lütfen \\space boş \\space alan \\space bırakmayın \\]";
    }
    output.innerHTML = temp;
    renderMathInElement(output);
}

function heightdist2() {
    var distance = parseFloat(document.getElementById("height21").value);
    var height = parseFloat(document.getElementById("height31").value);
    var output = document.getElementById("printheight2");
    var temp = "";
    var height1 = (height / distance).toFixed(3)
    var deg1 = Math.atan(height1).toFixed(3)
    var deg2 = (deg1 * 180 / Math.PI).toFixed(3)
    if (!isNaN(distance) && !isNaN(height)) {
        temp += "\\[Uzunluk(AC) \\space = \\space " + distance + "m \\]";
        temp += "\\[Yükseklik(AB) \\space = \\space " + height + "m \\]";
        temp += "\\[tan θ \\space = \\space \\frac{Karşı Kenar}{Bitişik Kenar}  \\space = \\space \\frac{AB}{BC} \\]";
        temp += "\\[tan θ " + "\\space = \\space \\frac{ " + height + "}{" + distance + "} \\]";
        temp += "\\[ θ \\space = \\space tan^{-1}  \\frac{ " + height + "}{" + distance + "} \\]";
        temp += "\\[ θ \\space = \\space  tan^{-1} (" + height1 + ") \\space = \\space " + deg2 + " \\degree \\]";
        temp += "\\[Yükseklik \\space açısı \\space \\space = " + (deg2) + "\\degree \\]";
        output.innerHTML = temp;
        renderMathInElement(output);
    }
    else {
        temp += "\\[Lütfen \\space boş \\space alan \\space bırakmayın \\]";
        output.innerHTML = temp;
        renderMathInElement(output);
    }

}

function heightdist3() {
    var distance = parseFloat(document.getElementById("height511").value);
    var height = parseFloat(document.getElementById("height41").value);
    var output = document.getElementById("printheight3");
    var temp = "";
    var height1 = (height / distance).toFixed(3)
    var deg1 = Math.atan(height1).toFixed(3)
    var deg2 = (deg1 * 180 / Math.PI).toFixed(3)
    if (!isNaN(distance) && !isNaN(height)) {
        temp += "\\[Uzunluk(AC) \\space = \\space " + distance + "m \\]";
        temp += "\\[Yükseklik(AB) \\space = \\space " + height + "m \\]";
        temp += "\\[tan θ \\space = \\space \\frac{Karşı Kenar}{Bitişik Kenar}  \\space = \\space \\frac{AB}{BC} \\]";
        temp += "\\[tan θ " + "\\space = \\space \\frac{ " + height + "}{" + distance + "} \\]";
        temp += "\\[ θ \\space = \\space tan^{-1}  \\frac{ " + height + "}{" + distance + "} \\]";
        temp += "\\[ θ \\space = \\space  tan^{-1} (" + height1 + ") \\space = \\space " + deg2 + " \\degree \\]";
        temp += "\\[Düşey \\space açı \\space \\space = " + (deg2) + "\\degree \\]";
        output.innerHTML = temp;
        renderMathInElement(output);
    }
    else {
        temp += "\\[Lütfen \\space boş \\space alan \\space bırakmayın \\]";
        output.innerHTML = temp;
        renderMathInElement(output);
    }

}
function solveCone() {
    var height = document.getElementById("inputhcone").value;
    var radius = document.getElementById("inputrcone").value;

    var voloutput = document.getElementById("resultofvolcone");
    var tsaoutput = document.getElementById("resultoftsacone");
    var csaoutput = document.getElementById("resultofcsacone");
    var shoutput = document.getElementById("resultofshcone");
    var add2 = eval(String(radius ** 2 + height ** 2));
    var l = math.sqrt(radius ** 2 + height ** 2)
    var vol = ((3.1415 * radius * radius * height) / 3).toFixed(3);
    var voltemp = "";
    var tsatemp = "";
    var csatemp = "";
    var ltemp = "";
    if ((radius != "") && (height != "")) {
        voltemp += "\\[ \\frac{1}{3} \\times \\pi \\times " + radius + "^2 \\times " + height + "\\]";
        voltemp += "\\[Volume \\space of \\space Cone \\space is \\space " + eval(String(vol)) + "\\]";
        voloutput.innerHTML = voltemp;
        csatemp += "\\[ \\pi \\times" + radius + "\\times" + l.toFixed(3) + " \\]";
        csatemp += "\\[Curved \\space Surface \\space Area \\space of \\space Cone \\space is \\space \\]";
        csatemp += "\\[" + eval(String(3.14159 * radius * eval(l).toFixed(3))) + "\\]";
        csaoutput.innerHTML = csatemp;
        tsatemp += "\\[ \\pi \\times" + radius + "(" + radius + "+" + l + ")\\]";
        tsatemp +=
            "\\[Total \\space Surface \\space Area \\space of \\space Cone \\space is \\space  \\]";
        tsatemp += "\\[" + eval(String((3.14159 * radius * eval(l).toFixed(3)) + (3.14159 * radius * radius))) + "\\]";
        tsaoutput.innerHTML = tsatemp;
        ltemp += "\\[l= \\sqrt{" + radius + "^2+" + height + "^2} \\]";
        ltemp += "\\[ \\sqrt{" + radius ** 2 + "+" + height ** 2 + "} \\]";
        ltemp += "\\[ \\sqrt{" + add2 + "} \\]";
        ltemp += "\\[" +
            eval(l).toFixed(3) +
            "\\]";
        shoutput.innerHTML = ltemp;
        renderMathInElement(voloutput);
        renderMathInElement(tsaoutput);
        renderMathInElement(csaoutput);
        renderMathInElement(shoutput);
    } else {
        voloutput.innerHTML = "";
        tsaoutput.innerHTML = "";
        csaoutput.innerHTML = "";
        shoutput.innerHTML = "";
    }
}
function solveBicone() {
    var r = document.getElementById("inputbiconerad").value;
    var h = document.getElementById("inputbiconeheight").value;
    var diaoutput = document.getElementById("resultofbiconedia");
    var heightoutput = document.getElementById("resultofbiconeheight");
    var voloutput = document.getElementById("resultofbiconevol");
    var areaoutput = document.getElementById("resultofbiconearea");
    var diatemp = "";
    var heighttemp = "";
    var areatemp = "";
    var voltemp = "";
    if ((r != "") && (h != "")) {
        diatemp += "\\[Diameter \\space of \\space Bicone \\space \\newline 2 \\times" + r + "\\ = " + eval(String(2 * r)).toFixed(2) + "\\]";
        diaoutput.innerHTML = diatemp;
        heighttemp += "\\[Height \\space of \\space Bicone \\space \\newline 2 \\times" + h + "\\ = " + eval(String(2 * h)).toFixed(2) + "\\]";
        heightoutput.innerHTML = heighttemp;
        voltemp += "\\[Volume \\space of \\space Bicone \\space \\newline \\frac{2}{3} \\times" + r + " \\times" + "\\pi \\times" + h + "\\ = " + eval(String(0.67 * r * r * 3.14 * h)).toFixed(2) + "\\]";
        voloutput.innerHTML = voltemp;
        areatemp += "\\[Area \\space of \\space Bicone \\space  \\newline" + "2 \\times" + r + "\\times \\sqrt{" + h + "^2 +" + r + "^2}" + "\\times \\pi" + "\\ = " + eval(String(2 * 3.14 * r * Math.sqrt(h * h + r * r))).toFixed(2) + "\\]";
        areaoutput.innerHTML = areatemp;
        renderMathInElement(diaoutput);
        renderMathInElement(heightoutput);
        renderMathInElement(voloutput);
        renderMathInElement(areaoutput);

    } else {
        diaoutput.innerHTML = "";
        heightoutput.innerHTML = "";
        voloutput.innerHTML = "";
        areaoutput.innerHTML = "";
    }

}


function solveanticone() {
    var r = document.getElementById("inputanticonerad").value;
    var h = document.getElementById("inputanticoneheight").value;
    var i = document.getElementById("inputanticonei").value;
    var voloutput = document.getElementById("resultofanticonevol");
    var areaoutput = document.getElementById("resultofanticonearea");
    var areatemp = "";
    var voltemp = "";
    var vol = 3.14 * r * r * (h - (0.33 * i));
    var area = (3.14 * r * (2 * h)) + (3.14 * r * r) + (3.14 * r * Math.sqrt((i * i) + (r * r)));
    if ((r != "") && (h != "") && (i != "")) {
        voltemp += "\\[Volume \\space of \\space Anticone \\space \\newline" + "\\pi \\times" + r + "^2" + "\\times (" + h + "-" + "\\frac{" + i + "}{3})" + "\\ = " + eval(String(vol)).toFixed(2) + "\\]";
        voloutput.innerHTML = voltemp;
        areatemp += "\\[Area \\space of \\space Anticone \\space  \\newline" + "\\pi \\times" + r + "(2 \\times" + h + "+" + r + "\\times \\sqrt(" + i + "^2+" + r + "^2))" + "\\ = " + eval(String(area)).toFixed(2) + "\\]";
        areaoutput.innerHTML = areatemp;
        renderMathInElement(voloutput);
        renderMathInElement(areaoutput);

    } else {
        voloutput.innerHTML = "";
        areaoutput.innerHTML = "";
    }

}

function solvetrunanticone() {
    var r = document.getElementById("inputtrunanticonerad").value;
    var h = document.getElementById("inputtrunanticoneheight").value;
    var i = document.getElementById("inputtrunanticonei").value;
    var voloutput = document.getElementById("resultoftrunanticonevol");
    var areaoutput = document.getElementById("resultoftrunanticonearea");
    var radoutput = document.getElementById("resultoftrunanticonerad");
    var thickoutput = document.getElementById("resultoftrunanticonethick");
    var areatemp = "";
    var voltemp = "";
    var radtemp = "";
    var thicktemp = "";
    var w = (r) / (i) * h;
    var s = r - w;
    var area = 3.14 * [(2 * r * h) + ((r + s) * Math.sqrt(h ^ 2 + w ^ 2)) + (r * r) - (s * s)];
    var vol = 3.14 * h * [(r * r) - ((r * r) + (r * s) + (s * s)) / 3];
    if ((r != "") && (h != "") && (i != "")) {
        voltemp += "\\[Volume \\space is \\space \\newline" + "\\pi \\times" + h + "[" + r + "^2" + "-(" + r + "^2+" + r + "\\times" + s + "+" + s + "^2)/3]" + "\\ = " + eval(String(vol)).toFixed(2) + "\\]";
        voloutput.innerHTML = voltemp;
        areatemp += "\\[Surface \\space Area \\space is \\space  \\newline" + "\\pi \\times [2\\times" + r + "\\times" + h + "+(" + r + "+" + s + ") * \\sqrt{" + h + "^2 +" + w + "^2} + " + r + "^2-" + s + "^2]" + "\\ = " + eval(String(area)).toFixed(2) + "\\]";
        areaoutput.innerHTML = areatemp;
        radtemp += "\\[Radius \\space bottom \\space opening \\space is \\space  \\newline" + r + "-" + "\\frac{" + r + "}{" + i + "}\\times" + h + "\\ = " + eval(String(s)).toFixed(2) + "\\]";
        radoutput.innerHTML = radtemp;
        thicktemp += "\\[Wall \\space bottom \\space thickness \\space is  \\newline" + "\\frac{" + r + "}{" + i + "}\\times" + h + "\\ = " + eval(String(w)).toFixed(2) + "\\]";
        thickoutput.innerHTML = thicktemp;
        renderMathInElement(voloutput);
        renderMathInElement(areaoutput);
        renderMathInElement(radoutput);
        renderMathInElement(thickoutput);

    } else {
        voloutput.innerHTML = "";
        areaoutput.innerHTML = "";
        radoutput.innerHTML = "";
        thickoutput.innerHTML = "";
    }

}

function solvehollowcone() {
    var R = parseInt(document.getElementById("inputhollowconeoutrad").value);
    var r = parseInt(document.getElementById("inputhollowconeinrad").value);
    var H = parseInt(document.getElementById("inputhollowconeoutheight").value);
    var h = (H / R) * r;
    var area = (R * math.sqrt(H ** 2 + R ** 2) + r * math.sqrt(h ** 2 + r ** 2) + R ** 2 - r ** 2) * math.pi;
    var vol = (math.pi) / 3 * (R ** 2 * H - r ** 2 * h);
    var wt = R - r;
    var out1 = document.getElementById("resultofhollowconeinheight");
    var out2 = document.getElementById("resultofhollowconevol");
    var out3 = document.getElementById("resultofhollowconearea");
    var out4 = document.getElementById("resultofhollowconewall");
    var temp1 = "";
    var temp2 = "";
    var temp3 = "";
    var temp4 = "";
    if (!isNaN(R) && !isNaN(r) && !isNaN(H) && R != "" && r != "" && H != "") {
        temp1 += "\\[The \\space Height \\space inner \\space cone \\space (h) \\]";
        temp1 += "\\[\\space = \\space \\frac{" + H + "}{" + R + "} \\times " + r + " \\]";
        temp1 += "\\[\\space = \\space " + h.toFixed(3) + "\\]";
        out1.innerHTML = temp1;

        temp2 += "\\[The \\space Surface \\space area \\space (A)\\]";
        temp2 += "\\[\\space = \\space ( " + R + " \\sqrt{" + H + "^2 + " + R + "^2} + " + r + " \\sqrt{ " + h + "^2 + " + r + "^2} + " + R + "^2 - " + r + "^2 ) \\times \\pi \\]";
        temp2 += "\\[\\space = \\space " + area.toFixed(3) + "\\]";
        out2.innerHTML = temp2;

        temp3 += "\\[The \\space Volume \\space (V)\\]";
        temp3 += "\\[\\space = \\space \\frac{\\pi}{3} ( " + R + "^2 \\times " + H + " - " + r + "^2 \\times " + h + " ) \\]";
        temp3 += "\\[\\space = \\space " + vol.toFixed(3) + "\\]";
        out3.innerHTML = temp3;

        temp4 += "\\[The \\space  Wall \\space thickness \\space (a)\\]";
        temp4 += "\\[\\space = \\space  " + R + " - " + r + "\\]";
        temp4 += "\\[\\space = \\space " + wt.toFixed(3) + "\\]";
        out4.innerHTML = temp4;

    } else {
        out1.innerHTML = "";
        out2.innerHTML = "";
        out3.innerHTML = "";
        out4.innerHTML = "";
    }
    renderMathInElement(out1);
    renderMathInElement(out2);
    renderMathInElement(out3);
    renderMathInElement(out);
}

function solveellipCone() {
    var a = document.getElementById("inputaellicone").value;
    var b = document.getElementById("inputbellicone").value;
    var h = document.getElementById("inputhellicone").value;
    var voloutput = document.getElementById("resultofvolellicone");
    var laoutput = document.getElementById("resultoflaellicone");
    var saoutput = document.getElementById("resultofsaellicone");
    var la = 0.5 * 3.14 * ((a * Math.sqrt(b * b + h * h)) + (b * Math.sqrt(a * a + h * h)));
    var sa = la + (3.14 * a * b);
    var vol = (1.046 * a * b).toFixed(3);
    var voltemp = "";
    var latemp = "";
    var satemp = "";
    if ((a != "") && (b != "") && (h != "")) {
        voltemp += "\\[ \\frac{1}{3} \\times \\pi \\times " + a + "\\times " + b + "\\times" + h + "\\]";
        voltemp += "\\[Volume \\space of \\space Elliptic \\space Cone \\space is \\space " + eval(String(vol)) + "\\]";
        voloutput.innerHTML = voltemp;
        latemp += "\\[L = \\frac{1}{2} \\times \\pi \\times (" + a + "\\times" + "\\sqrt{" + b + " \\times" + b + "+" + h + "\\times" + h + "} + (" + b + "\\times" + "\\sqrt{" + a + " \\times" + a + "+" + h + "\\times" + h + "})" + "\\]";
        latemp += "\\[Lateral \\space Surface \\space Area \\space is \\space \\]";
        latemp += "\\[" + eval(String(la.toFixed(3))) + "\\]";
        laoutput.innerHTML = latemp;
        satemp += "\\[L + 3.14 \\times" + a + "\\times" + b + "\\]";
        satemp += "\\[Total \\space Surface \\space Area \\space  is \\space  \\]";
        satemp += "\\[" + eval(String(sa.toFixed(3))) + "\\]";
        saoutput.innerHTML = satemp;
        renderMathInElement(voloutput);
        renderMathInElement(saoutput);
        renderMathInElement(laoutput);
    } else {
        voloutput.innerHTML = "";
        saoutput.innerHTML = "";
        laoutput.innerHTML = "";
    }
}


function solvetruncone() {
    var R = parseFloat(document.getElementById("truncone-R").value);
    var r = parseFloat(document.getElementById("truncone-r").value);
    var h = parseFloat(document.getElementById("truncone-h").value);

    var slanttemp = "";
    var latsurtemp = "";
    var areatemp = "";
    var voltemp = "";
    var avtemp = ""

    var slantHeightField = document.getElementById("truncone-s");
    var latSurfaceField = document.getElementById("truncone-L");
    var areaField = document.getElementById("truncone-A");
    var volField = document.getElementById("truncone-V");
    var avField = document.getElementById("truncone-AV");

    var s = Math.sqrt(Math.pow((R - r), 2) + Math.pow(h, 2));
    var L = (R + r) * Math.PI * s;
    var A = L + Math.PI * r * r + Math.PI * R * R;
    var V = h * Math.PI / 3 * (R * R + R * r + r * r);
    if ((!isNaN(R)) && (!isNaN(r)) && (!isNaN(h))) {

        slanttemp += "\\[Slant \\space Height \\space (s) \\space = \\space \\sqrt {\\left ( " + R + " - " + r + " \\right )^2 + " + h + "^2}\\]"
        slanttemp += "\\[Slant \\space Height \\space (s) \\space = \\space " + s.toFixed(3) + "\\]"
        slantHeightField.innerHTML = slanttemp;

        latsurtemp += "\\[Lateral \\space Surface \\space (L)\\space = \\space \\left ( " + R + " + " + r + " \\right ) \\times \\pi \\times " + s + "\\]"
        latsurtemp += "\\[Lateral \\space Surface \\space (L)\\space = \\space " + L.toFixed(3) + "\\]"
        areaField.innerHTML = latsurtemp;

        areatemp += "\\[Surface \\space Area \\space (A) \\space = \\space " + L + " + \\pi " + r + "^2 + \\pi " + R + "^2\\]"
        areatemp += "\\[Surface \\space Area \\space (A) \\space = \\space " + A.toFixed(3) + "\\]"
        latSurfaceField.innerHTML = areatemp;

        voltemp += "\\[Volume \\space (V) \\space = \\space " + h + " \\times \\frac{\pi}{3} \\times \\left ( " + R + "^2 + " + R + " \\times " + r + "+ " + r + "^2 \\right )\\]"
        voltemp += "\\[Volume \\space (V) \\space = \\space " + h + " \\times " + V.toFixed(3) + " \\]"
        volField.innerHTML = voltemp;

        avtemp += "\\[A/V \\space Ratio \\space = \\space \\frac{" + A + "}{" + V + "}\\]"
        avtemp += "\\[A/V \\space Ratio \\space = \\space " + (A / V).toFixed(3) + "\\]"
        avField.innerHTML = avtemp;
    } else {
        slantHeightField.innerHTML = "\\[Please \\space enter \\space valid \\space input\\]"
        areaField.innerHTML = "";
        latSurfaceField.innerHTML = "";
        volField.innerHTML = "";
        avField.innerHTML = "";
    }
    renderMathInElement(slantHeightField);
    renderMathInElement(areaField);
    renderMathInElement(latSurfaceField);
    renderMathInElement(volField);
    renderMathInElement(avField);
}

function solvetrunBicone() {
    var r = document.getElementById("inputtrunbiconerad").value;
    var R = document.getElementById("inputtrunbiconebigr").value;
    var h = document.getElementById("inputtrunbiconeh").value;
    var laoutput = document.getElementById("resultoftrunbiconela");
    var voloutput = document.getElementById("resultoftrunbiconevol");
    var areaoutput = document.getElementById("resultoftrunbiconearea");
    var latemp = "";
    var areatemp = "";
    var voltemp = "";
    var vol = h * 3.14 * ((R * R) + (R * r) + (r * r));
    var l = 2 * (R + r) * 3.14 * Math.sqrt(((R - r) * (R - r)) + 0.25 * h * h);
    var a = l + (2 * 3.14 * r * r);
    if ((r != "") && (h != "") && (R != "")) {
        latemp += "\\[Lateral \\space Area \\space of \\space Truncated \\space Bicone \\space \\newline 2 \\times ( " + R + "+" + r + ")\\times \\pi \\times \\sqrt{(" + R + "-" + r + ")^2 + " + "\\frac{" + h + "^2}{4}}" + "\\ = " + eval(String(l)).toFixed(2) + "\\]";
        laoutput.innerHTML = latemp;
        voltemp += "\\[Volume \\space of \\space Truncated \\space Bicone \\space \\newline \\frac{" + h + "\\times 3.14 \\times(" + R + "^2+" + R + "\\times" + r + "+" + r + "^2)}{3}" + "\\ = " + eval(String(vol)).toFixed(2) + "\\]";
        voloutput.innerHTML = voltemp;
        areatemp += "\\[surface \\space Area \\space of \\space Truncated \\space Bicone \\space  \\newline" + "2 \\times" + r + "\\times \\sqrt{" + h + "^2 +" + r + "^2}" + "\\times \\pi" + "\\ = " + eval(String(l + 2 * 3.14 * r * r)).toFixed(2) + "\\]";
        areaoutput.innerHTML = areatemp;
        renderMathInElement(laoutput);
        renderMathInElement(voloutput);
        renderMathInElement(areaoutput);

    } else {
        laoutput.innerHTML = "";
        voloutput.innerHTML = "";
        areaoutput.innerHTML = "";
    }

}
function torussolve() {
    var radius1 = document.getElementById("inputmajorradiustorus").value;
    var radius2 = document.getElementById("inputminorradiustorus").value;
    var voloutput = document.getElementById("resultofvoltorus");
    var tsaoutput = document.getElementById("resultoftsatorus");
    var voltemp = "";
    var tsatemp = "";
    var area = (2 * math.pi * radius1) * (2 * math.pi * radius2);
    var vol = (math.pi * radius2 * radius2) * (2 * math.pi * radius1);
    if (radius1 != "" && radius2 != "") {
        voltemp += "\\[ ( \\pi \\times" + radius2 + "^2 ) \\times ( 2 \\times \\pi \\times " + radius1 + " ) \\]";
        voltemp += "\\[Volume \\space of \\space Torus  \\space is \\space " + vol.toFixed(3) + "\\]";
        voloutput.innerHTML = voltemp;
        tsatemp += "\\[(2 \\times \\pi \\times " + radius1 + ")(2 \\times \\pi  \\times " + radius2 + ")\\]";
        tsatemp +=
            "\\[Total \\space Surface \\space Area \\space of  \\space Torus \\space is \\space  \\]";
        tsatemp += "\\[" + area.toFixed(3) + "\\]";
        tsaoutput.innerHTML = tsatemp;
        renderMathInElement(voloutput);
        renderMathInElement(tsaoutput);
    } else {
        voloutput.innerHTML = "";
        tsaoutput.innerHTML = "";
    }
}


function solvetesseract() {
    var edge = document.getElementById("inputtessedge").value;
    var areaoutput = document.getElementById("resultoftessarea");
    var voloutput = document.getElementById("resultoftessvol");
    var hypvoloutput = document.getElementById("resultoftesshypvol");
    var areatemp = "";
    var voltemp = "";
    var hypvoltemp = "";
    if (edge != "") {
        areatemp += "\\[Area \\space of \\space tesseract \\space \\newline 24 \\times (" + edge + ")^2" + "\\ = " + eval(String(24 * edge * edge)).toFixed(2) + "\\]";
        areaoutput.innerHTML = areatemp;

        voltemp += "\\[Volume \\space of \\space tesseract \\space \\newline 8 \\times (" + edge + ")^3" + "\\ = " + eval(String(8 * edge * edge * edge)).toFixed(2) + "\\]";
        voloutput.innerHTML = voltemp;

        hypvoltemp += "\\[Hypervolume \\space of \\space tesseract \\space \\newline (" + edge + ")^4" + "\\ = " + eval(String(edge * edge * edge * edge)).toFixed(2) + "\\]";
        hypvoloutput.innerHTML = hypvoltemp;

        renderMathInElement(areaoutput);
        renderMathInElement(voloutput);
        renderMathInElement(hypvoloutput);

    } else {
        areaoutput.innerHTML = "";
        voloutput.innerHTML = "";
        hypvoloutput.innerHTML = "";

    }
}

function solvendimsphere() {
    var g = 7;
    var C = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];

    function gamma(z) {

        if (z < 0.5) return Math.PI / (Math.sin(Math.PI * z) * gamma(1 - z));
        else {
            z -= 1;

            var x = C[0];
            for (var i = 1; i < g + 2; i++)
                x += C[i] / (z + i);

            var t = z + g + 0.5;
            return Math.sqrt(2 * Math.PI) * Math.pow(t, (z + 0.5)) * Math.exp(-t) * x;
        }
    }
    var radius = document.getElementById("inputndimsphereradius").value;
    var dim = document.getElementById("inputndimspheredimension").value;
    var volOutputTitle = document.getElementById("resultofndimspherevol1");
    var volOutputMain = document.getElementById("resultofndimspherevol2");
    var areaOutputTitle = document.getElementById("resultofndimspherearea1");
    var areaOutputMain = document.getElementById("resultofndimspherearea2");
    var ansVol = (Math.pow(Math.PI, (dim / 2)) * Math.pow(radius, dim)) / (gamma((dim / 2) + 1));
    var ansArea = (2 * Math.pow(Math.PI, (dim / 2)) * Math.pow(radius, dim - 1)) / (gamma(dim / 2));
    console.log("vol");
    console.log(ansVol);
    console.log("area");
    console.log(ansArea);
    if ((dim != "") && (radius != "")) {
        volOutputTitle.innerHTML = "\\[Volume \\space of \\space Sphere \\space in \\space n \\space dimension \\space is \\]";
        volOutputMain.innerHTML = "\\[\\frac{\\pi ^{\\frac{" + dim + "}{2}}" + radius + "^{" + dim + "}}{\\Gamma \\left ( \\frac{" + dim + "}{2}+1 \\right )} = " + ansVol.toFixed(3) + "\\]";
        renderMathInElement(volOutputTitle);
        renderMathInElement(volOutputMain);
        areaOutputTitle.innerHTML = "\\[Surface \\space Area \\space of \\space Sphere \\space in \\space n \\space dimension \\space is \\]";
        areaOutputMain.innerHTML = "\\[\\frac{2\\pi ^{\\frac{" + dim + "}{2}}" + radius + "^{" + dim + "-1}}{\\Gamma \\left ( \\frac{n}{2} \\right )} = " + ansArea.toFixed(3) + "\\]";
        renderMathInElement(areaOutputTitle);
        renderMathInElement(areaOutputMain);
    }
}

function dequation() {
    var val = document.getElementById("inputequation").value;
    val = nerdamer(val).toTeX();
    katex.render(val, document.getElementById("displayequation"), {
        throwOnError: false,
    });
}


function ssimplifyequation(input, output) {
    var val = document.getElementById(input).value;
    var sol = nerdamer("simplify(" + String(val) + ")");
    sol = nerdamer(sol).toTeX();
    katex.render("Simplified:\\newline " + sol, document.getElementById(output), {
        throwOnError: false,
    });
}


function sequationexpand(input, output) {
    var val = document.getElementById(input).value;
    var sol;
    var x = nerdamer(val);
    sol = x.expand().toString();
    sol = nerdamer(sol).toTeX();
    katex.render("Expanded:\\newline " + sol, document.getElementById(output), {
        throwOnError: false,
    });
}


function generateinputfields(value) {
    removeall("equationsmany");
    for (var i = 0; i < value; i++) {
        var inp = document.createElement("input");
        inp.id = "eq" + eval(String(i + 1));
        inp.placeholder = "Equation " + eval(String(i + 1));
        inp.className = "form__field";
        inp.type = "text";
        document.getElementById("equationsmany").appendChild(inp);
    }
}

function sequationsolver(output) {
    var sol;
    var ar = [];
    for (
        var i = 0;
        i < document.getElementById("numberofequationfields").value;
        i++
    ) {
        ar[i] = document.getElementById("eq" + eval(String(i + 1))).value;
    }
    nerdamer.set("SOLUTIONS_AS_OBJECT", false);
    ar = ar.join(",");
    try {
        sol = nerdamer("solveEquations([" + ar + "])");
        sol = sol.toString();
        sol = sol.slice(0, -1);
        sol = sol.slice(1, sol.length);
        sol = sol.split(",");
        var temp = "";
        for (var i = 0; i <= sol.length / 2 + 1; i += 2) {
            temp += "\\[" + sol[i] + "=" + sol[i + 1] + "\\]";
        }
        document.getElementById(output).innerHTML = temp;
        renderMathInElement(document.getElementById(output));
    } catch (e) {
        document.getElementById(output).innerHTML =
            "Sorry! cannot Compute for these values.";
    }
}


function equationmagic() {
    var input = "inputequation";
    ssimplifyequation(input, "resultsimplifyequation");
    sequationexpand(input, "resultexpandequation");
}


function plotit(input, output, funcname) {
    var val = funcname;
    document.getElementById(output).innerHTML = "";

    function draw() {
        try {


            const expression = val;
            const expr = math.compile(expression);

            const xValues = math.range(-10, 10, 0.5).toArray();
            const yValues = xValues.map(function (x) {
                return expr.evaluate({ x: x });
            });

            const trace1 = {
                x: xValues,
                y: yValues,
                type: "scatter",
            };
            const data = [trace1];
            Plotly.newPlot(output, data);
        } catch (err) {
            document.getElementById(output).innerHTML =
                "<span style='color:red;'>Çizim için X bilinmeyeni olmak zorundadır 'x'</span><br>";
            document.getElementById(output).innerHTML += "Çizim yapılamadı :  ";
            document.getElementById(output).innerHTML += "<b><u>" + err + "</u></b>";
        }
    }

    draw();
}


function dploteq() {
    var value = document.getElementById("inputplotequation").value;
    value = nerdamer(value).toTeX();
    katex.render(value, document.getElementById("plotgrapheqdisplay"), {
        throwOnError: false,
    });
}


function dint() {
    var lowerli = document.getElementById("lowerlimit").value;
    var upperli = document.getElementById("upperlimit").value;
    if (integralvar == "") {
        integralvar = "x";
    }
    var value = document.getElementById("inputintegral").value;
    var x = nerdamer(value);
    var value = x.toTeX();
    if (checkit == "" || checkit == "notok") {
        lowerli = "";
        upperli = "";
    } else {
        if (lowerli == "" && upperli == "") {
            lowerli = "-\\infty";
            upperli = "\\infty";
        } else if (lowerli != "" && upperli == "") {
            upperli = "\\infty";
        } else if (lowerli == "" && upperli != "") {
            lowerli = "-\\infty";
        }
    }
    katex.render(
        "\\int_{" + lowerli + "}^{" + upperli + "}" + value + "d" + integralvar,
        document.getElementById("resultintegration"),
        {
            throwOnError: false,
        }
    );
}


function sint() {
    var lowerli = document.getElementById("lowerlimit").value;
    var upperli = document.getElementById("upperlimit").value;
    if (integralvar == "") {
        integralvar = "x";
    }
    if (checkit == "" || checkit == "notok") {
        var t = nerdamer.integrate(
            document.getElementById("inputintegral").value,
            integralvar
        );
        convertkatex(document.getElementById("resultintegration"), t);
        return t.toString();
    } else {
        var t = nerdamer.defint(
            document.getElementById("inputintegral").value,
            lowerli,
            upperli,
            integralvar
        );
        if (lowerli == "") {
            lowerli = "-Infinity";
        }
        if (upperli == "") {
            upperli = "Infinity";
        }
        convertkatex(document.getElementById("resultintegration"), t);
        return t.toString();
    }
}


function ddiff() {
    var value = document.getElementById("inputdifferentiatequation").value;
    var x = nerdamer(value);
    var value = x.toTeX();
    var o = "";
    if (difforder == "") {
        difforder = "1";
    }
    if (diffvariable == "") {
        diffvariable = "x";
    }
    if (diffvariable == "" && difforder == "") {
        o = "\\dfrac{d}{dx}";
    } else if (diffvariable == "" && difforder != "") {
        o = "\\dfrac{d^" + difforder + "}{dx" + difforder + "}";
    } else {
        o = "\\dfrac{d^" + difforder + "}{d" + diffvariable + "^" + difforder + "}";
    }
    katex.render(o + value, document.getElementById("resultdiff"), {
        throwOnError: false,
    });
}


function sdiff() {
    var t = String(
        nerdamer.diff(
            document.getElementById("inputdifferentiatequation").value,
            diffvariable,
            difforder
        )
    );
    convertkatex(document.getElementById("resultdiff"), t);
    return t;
}


function dpardiff() {
    var value = document.getElementById("inputpartialdiff").value;
    getparorder(document.getElementById("inputpartialorder").value);
    var sum = 0;
    var or = pardifforder.match(/\d+/g);
    var po = "";
    if (or == null) {
        if (pardifforder == "") {
            po = "\\frac{\\partial }{\\partial x}";
        } else if (pardifforder != "") {
            var sp = pardifforder.split(",");
            var v;
            var temp = "";
            for (var v of sp) {
                temp += "\\partial " + v;
            }
            po = "\\frac{\\partial }{" + temp + "}";
        }
    } else {
        for (var i of or) {
            sum += parseInt(i);
        }
        if (pardifforder == "") {
            po = "\\frac{\\partial^" + sum + "}{\\partial x}";
        } else if (pardifforder != "") {
            var sp = pardifforder.split(",");
            var v;
            var temp = "";
            for (var v of sp) {
                temp += "\\partial " + v;
            }
            po = "\\frac{\\partial^" + sum + "}{" + temp + "}";
        }
    }

    var x = nerdamer(value);
    value = x.toTeX();
    katex.render(po + value, document.getElementById("resultpardiff"), {
        throwOnError: false,
    });
}


function dlap() {
    var value = document.getElementById("inputlaplace").value;
    value = nerdamer(value).toTeX();
    var b = "\\mathcal{L}(";
    a = ")";
    katex.render(b + value + a, document.getElementById("resultlaplace"), {
        throwOnError: false,
    });
}


function slap() {
    var value = nerdamer.laplace(
        document.getElementById("inputlaplace").value,
        "t",
        "s"
    );
    var t = value;
    value = nerdamer(value).toTeX();
    katex.render(value, document.getElementById("resultlaplace"), {
        throwOnError: false,
    });

    var ar = t.toString().split("");
    for (var i = 0; i < ar.length; i++) {
        if (ar[i] == "s" && ar[i + 1] == "i") {

        } else if (ar[i] == "s" && ar[i - 1] == "o" && ar[i - 2] == "c") {

        } else if (ar[i] == "s" && ar[i + 1] == "e" && ar[i + 2] == "c") {

        } else if (ar[i] == "s" && ar[i - 1] == "c" && ar[i + 1] == "c") {

        } else if (ar[i] == "s") {
            ar[i] = "x";
        }
    }
    ar = ar.join("");
    return ar.toString();
}


function orderas() {
    document.getElementById("orderresult").innerHTML = "";
    var val = document.getElementById("ordergetval").value;
    val = val.trim()
    val = val.match(/(^([-]{0,1}\d{1,}[\.]{0,1}\d{0,}[ ]?)*$)/g);

    if (val == null) {
        document.getElementById("orderresult").innerHTML = `Proper input is required`;
        return;
    }

    val = JSON.stringify(val)

    val = val.substring(2, val.length - 2)

    val = val.split(" ");
    val = val.filter(function (str) {
        return /\S/.test(str);
    });
    var len = parseInt(val.length);
    for (var i = 0; i <= len - 1; i++) {
        for (var j = 0; j <= len - 1 - i; j++) {
            if (parseFloat(val[j]) > parseFloat(val[j + 1])) {
                temp = parseFloat(val[j]);
                val[j] = parseFloat(val[j + 1]);
                val[j + 1] = temp;
            }
        }
    }
    val = val.join("<");
    if (val.length == 0) {
        document.getElementById("orderresult").innerHTML += "";
    } else {
        document.getElementById("orderresult").innerHTML +=
            "\\[Ascending \\space Order\\]";
        document.getElementById("orderresult").innerHTML += "\\[" + val + "\\]";
        renderMathInElement(document.getElementById("orderresult"));
    }
}


function orderde() {
    document.getElementById("orderresult").innerHTML = "";
    var val = document.getElementById("ordergetval").value;
    val = val.trim()
    val = val.match(/(^([-]{0,1}\d{1,}[\.]{0,1}\d{0,}[ ]?)*$)/g);

    if (val == null) {
        document.getElementById("orderresult").innerHTML = `Proper input is required`;
        return;
    }

    val = JSON.stringify(val)

    val = val.substring(2, val.length - 2)

    val = val.split(" ");
    val = val.filter(function (str) {
        return /\S/.test(str);
    });
    var len = parseInt(val.length);
    for (var i = 0; i <= len - 1; i++) {
        for (var j = 0; j <= len - 1 - i; j++) {
            if (parseFloat(val[j]) < parseFloat(val[j + 1])) {
                temp = parseFloat(val[j]);
                val[j] = parseFloat(val[j + 1]);
                val[j + 1] = temp;
            }
        }
    }

    val = val.join(">");
    if (val.length == 0) {
        document.getElementById("orderresult").innerHTML = "";
    } else {
        document.getElementById("orderresult").innerHTML +=
            "\\[ Descending \\space Order \\]";
        document.getElementById("orderresult").innerHTML += "\\[" + val + "\\]";
        renderMathInElement(document.getElementById("orderresult"));
    }
}


function count(s) {
    var id = document.getElementById("interval");
    var count = 0;
    for (var i in s) {
        count++;
    }
    return count;
}


function multiplywithsteps(numm, withnum) {
    var num = document.getElementById(numm).value.toString();
    var numwith = document.getElementById(withnum).value.toString();
    if (num % 1 == 0 && numwith % 1 != 0) {
        var sw = numwith;
        numwith = num;
        num = sw;
        document.getElementById(withnum).value = numwith;
        document.getElementById(numm).value = num;
    }
    var flag = 0;
    if (num % 1 != 0) flag = 1;
    var countdot = 0;
    var countdotwith = 0;

    if (flag == 1) {
        for (var i = num.length - 1; i >= 0; i--) {
            if (num[i] == ".") {
                break;
            }
            countdot++;
        }
        for (var j = numwith.length - 1; j >= 0; j--) {
            if (numwith[j] == ".") {
                break;
            }
            countdotwith++;
        }
        var v = 0;
        if (countdotwith > countdot && numwith % 1 != 0) {
            var sw = numwith;
            numwith = num;
            num = sw;
            document.getElementById(withnum).value = numwith;
            document.getElementById(numm).value = num;
            v = 1;
        }
    }
    var r = document.getElementById("resultmulsol");
    var temp = "";
    var m = "";
    var line = "";
    var mulsol = eval(
        nerdamer(String(numwith) + "*" + String(num))
            .evaluate()
            .toString()
    );
    if (numwith.length > 1) {
        numwith = numwith.split("");
        for (var i = numwith.length - 1; i >= 0; i--) {
            if (numwith[i] == ".") continue;
            if (numwith.length == m.length + 1) {
                var vm = eval(
                    nerdamer(String(numwith[i]) + "*" + String(num))
                        .evaluate()
                        .toString()
                );
                temp += "+ " + String(vm).replace(".", "") + m;
            } else {
                var vm = eval(
                    nerdamer(String(numwith[i]) + "*" + String(num))
                        .evaluate()
                        .toString()
                );
                temp += String(vm).replace(".", "") + m;
            }
            temp += "<br>";
            m += "&times;";
        }
        for (var i = 0; i < String(mulsol).length; i++) {
            line += "_";
        }
    } else {

        var mulsol = eval(
            nerdamer(String(numwith) + "*" + String(num))
                .evaluate()
                .toString()
        );
        for (var i = 0; i < String(mulsol).length; i++) {
            line += "_";
        }
    }
    if (numwith.length == 1) {
        r.innerHTML = "";
        r.innerHTML += num + "<br>";
        r.innerHTML += "× " + numwith + "<br>";
        r.innerHTML += line + "<br>";
        r.innerHTML += mulsol + "<br>";
        r.innerHTML += line + "<br>";
    } else {
        r.innerHTML = "";
        r.innerHTML += num + "<br>";
        r.innerHTML += "× " + numwith.join("") + "<br>";
        r.innerHTML += line + "<br>";
        r.innerHTML += temp;
        r.innerHTML += line + "<br>";
        r.innerHTML += mulsol + "<br>";
        r.innerHTML += line + "<br>";
    }
}
function solveBarrel() {
    var r = (document.getElementById("inputbarrelrad").value);
    var R = (document.getElementById("inputbarrelbigr").value);
    var h = (document.getElementById("inputbarrelheight").value);
    var vol = 1.046 * ((2 * h * R * R) + (r * r * h));
    var dia = Math.sqrt((h * h) + ((2 * r) * (2 * r)));
    if (r != "" && R != "" && h != "") {
        document.getElementById("resultofbarreldia").innerHTML = "\\[Volume \\space diagonal \\space of \\space Barrel \\space \\newline \\sqrt{" + h + "^2 +(2 \\times" + r + ")^2}" + "\\ = " + eval(String(dia)).toFixed(2) + "\\]";
        document.getElementById("resultofbarrelvol").innerHTML = "\\[Volume \\space of \\space Barrel \\space \\newline \\frac{\\pi \\times" + h + "(2 \\times" + R + "^2 +" + r + "^2)}{3}" + "\\ = " + eval(String(vol)).toFixed(2) + "\\]";
    } else {
        document.getElementById("resultofbarreldia").innerHTML = "";
        document.getElementById("resultofbarrelvol").innerHTML = "";
    }
    renderMathInElement(document.getElementById("resultofbarreldia"));
    renderMathInElement(document.getElementById("resultofbarrelvol"));
}


function rootquadratic() {
    var a = parseInt(document.getElementById("coffa").value);
    var b = parseInt(document.getElementById("coffb").value);
    var c = parseInt(document.getElementById("coffc").value);
    var eq = document.getElementById("quadraticequation");
    if (
        a.toString() == NaN.toString() ||
        b.toString() == NaN.toString() ||
        c.toString() == NaN.toString()
    ) {
        var eqval = "";
        if (
            a.toString() != NaN.toString() &&
            b.toString() == NaN.toString() &&
            c.toString() == NaN.toString()
        ) {
            eqval = "\\[f(x)=" + a + "x^2+bx+c\\]";
        }
        if (
            a.toString() == NaN.toString() &&
            b.toString() != NaN.toString() &&
            c.toString() == NaN.toString()
        ) {
            eqval = "\\[f(x)=ax^2+" + b + "x+c\\]";
        }
        if (
            a.toString() == NaN.toString() &&
            b.toString() == NaN.toString() &&
            c.toString() != NaN.toString()
        ) {
            eqval = "\\[f(x)=ax^2+bx+" + c + "\\]";
        }
        if (
            a.toString() != NaN.toString() &&
            b.toString() != NaN.toString() &&
            c.toString() == NaN.toString()
        ) {
            eqval = "\\[f(x)=" + a + "x^2+" + b + "x+c\\]";
        }
        if (
            a.toString() == NaN.toString() &&
            b.toString() != NaN.toString() &&
            c.toString() != NaN.toString()
        ) {
            eqval = "\\[f(x)=ax^2+" + b + "x+" + c + "\\]";
        }
        if (
            a.toString() != NaN.toString() &&
            b.toString() == NaN.toString() &&
            c.toString() != NaN.toString()
        ) {
            eqval = "\\[f(x)=" + a + "x^2+bx+" + c + "\\]";
        }
        if (
            a.toString() == NaN.toString() &&
            b.toString() == NaN.toString() &&
            c.toString() == NaN.toString()
        ) {
            eqval = "\\[f(x)=ax^2+bx+c\\]";
        }
        eq.innerHTML = eqval;
        document.getElementById("rootsquadraticresult").innerHTML = "";
        renderMathInElement(eq);
    } else {
        var eq = document.getElementById("quadraticequation");
        var eqval = "\\[f(x)=" + a + "x^2+" + b + "x+" + c + "\\]";
        eq.innerHTML = eqval;
        renderMathInElement(eq);
        var negativeb = -b;
        var bsquare = b * b;
        var temp = "\\[D= b^2-4ac\\]";
        temp += "\\[D=" + bsquare + "-(4 \\times " + a + " \\times " + c + ") \\]";
        var fourac = 4 * a * c;
        temp += "\\[D=" + bsquare + "-" + fourac + " \\]";
        var bsquareminusfourac = bsquare - fourac;
        temp += "\\[D=" + bsquareminusfourac + " \\]";

        var twoa = 2 * a;
        if (bsquareminusfourac < 0) {
            temp += "\\[D=" + bsquareminusfourac + " < 0\\]";
            temp += "\\[Denklemin \\space Reel \\space kökü \\space yoktur \\space  \\]";
            temp += "<div class='dropdown-divider'></div>";
            temp += "\\[x=\\frac{-b \\pm \\sqrt{b^2-4   ac}}{2a}\\]";
            temp += "\\[x=\\frac{-b \\pm \\sqrt{D}}{2a}\\]";

            temp +=
                "\\[x=\\frac{" +
                negativeb +
                " \\pm \\sqrt{" +
                bsquareminusfourac +
                "}}{2 \\times" +
                a +
                "}\\]";
            temp +=
                "\\[x=\\frac{" +
                negativeb +
                " \\pm \\sqrt{" +
                -bsquareminusfourac +
                "}i}{" +
                twoa +
                "}\\]";
            var sqrtofdiscriminant = nerdamer.sqrt(-bsquareminusfourac).toString();
            temp +=
                "\\[x=\\frac{" +
                negativeb +
                " \\pm " +
                sqrtofdiscriminant +
                "i}{" +
                twoa +
                "}\\]";
            temp +=
                "\\[x=\\frac{" +
                negativeb +
                " \\pm " +
                eval(sqrtofdiscriminant).toFixed(4) +
                " i}{" +
                twoa +
                "}\\]";
            temp +=
                "<div class='row'>" +
                "<div class='col-6'>" +
                "\\[x=\\frac{" +
                negativeb +
                " + " +
                eval(sqrtofdiscriminant).toFixed(4) +
                " i}{" +
                twoa +
                "}\\]" +
                "</div>" +
                "<div class='col-6'>" +
                "\\[x=\\frac{" +
                negativeb +
                " - " +
                eval(sqrtofdiscriminant).toFixed(4) +
                " i}{" +
                twoa +
                "}\\]" +
                "</div>" +
                "</div>";
        } else if (bsquareminusfourac == 0) {
            temp += "\\[Denkelmin \\space Reel \\space kökleri \\space tektir \\space  \\]";
            temp += "<div class='dropdown-divider'></div>";
            temp += "\\[x=\\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}\\]";
            temp += "\\[x=\\frac{-b \\pm \\sqrt{D}}{2a}\\]";
            temp +=
                "\\[x=\\frac{" + negativeb + " \\pm \\sqrt{0}}{2 \\times " + a + "}\\]";
            temp += "\\[x=\\frac{" + negativeb + "}{" + twoa + "}\\]";
            var sol = nerdamer(negativeb / twoa)
                .evaluate()
                .toString();
            temp += "\\[x=" + sol + "\\]";
            if ((negativeb / twoa) % 2 != 0) {
                temp += "\\[x=" + eval(sol) + "\\]";
            }
        } else {
            var sqrtofdiscriminant = nerdamer.sqrt(bsquareminusfourac).toString();
            temp += "\\[D=" + bsquareminusfourac + " > 0\\]";
            sqrtofdiscriminant = eval(sqrtofdiscriminant.toString()).toFixed(4);

            temp += "\\[Denklemin \\space 2 \\space Reel \\space kökü \\space vardır \\]";
            temp += "<div class='dropdown-divider'></div>";
            temp += "\\[x=\\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}\\]";
            temp += "\\[x=\\frac{-b \\pm \\sqrt{D}}{2a}\\]";
            temp += "\\[x=\\frac{-b \\pm \\sqrt{" + bsquareminusfourac + "}}{2a}\\]";
            temp +=
                "\\[x=\\frac{" +
                negativeb +
                " \\pm " +
                sqrtofdiscriminant +
                "}{2\\times" +
                a +
                "}\\]";
            temp +=
                "\\[x=\\frac{" +
                negativeb +
                " \\pm " +
                sqrtofdiscriminant +
                "}{" +
                twoa +
                "}\\]";
            temp += "<div class='row'>";

            temp += "<div class='col-6'>";
            temp +=
                "\\[x=\\frac{" +
                negativeb +
                " + " +
                sqrtofdiscriminant +
                "}{" +
                twoa +
                "}\\]";
            var addthem = eval(
                (negativeb + "+" + sqrtofdiscriminant).toString()
            ).toFixed(4);
            temp += "\\[x=\\frac{" + addthem + "}{" + twoa + "}\\]";
            addthem = eval((addthem + "/" + twoa).toString()).toFixed(4);
            temp += "\\[x=" + eval(addthem) + "\\]";
            temp += "</div>";

            temp += "<div class='col-6'>";
            temp +=
                "\\[x=\\frac{" +
                negativeb +
                " - " +
                sqrtofdiscriminant +
                "}{" +
                twoa +
                "}\\]";
            var subtractthem = eval(
                (negativeb + "-" + sqrtofdiscriminant).toString()
            ).toFixed(4);
            temp += "\\[x=\\frac{" + subtractthem + "}{" + twoa + "}\\]";
            subtractthem = eval((subtractthem + "/" + twoa).toString()).toFixed(4);
            temp += "\\[x=" + eval(subtractthem) + "\\]";
            temp += "</div>";
            temp += "</div>";
        }

        document.getElementById("rootsquadraticresult").innerHTML = temp;
        renderMathInElement(document.getElementById("rootsquadraticresult"));
    }
}





function lenu(a) {
    switch (a) {
        case "1":
            return 0.001;
        case "2":
            return 0.01;
        case "3":
            return 1;
        case "4":
            return 1000;
        case "5":
            return 0.0254;
        case "6":
            return 0.3048;
        case "7":
            return 0.9144;
        case "8":
            return 1609.34;
        case "9":
            return 1852;
    }
}

function spicon() {
    const f = lenu(document.getElementById("spicon-1").value);
    const t = lenu(document.getElementById("spicon-2").value);
    const i = parseFloat(document.getElementById("spiconin").value);

    if (f == 0.001 && t == 0.001) {
        if (i > 10) {
            document.getElementById("spiconou").innerHTML = "SPI must be <= 10";
        } else {
            document.getElementById("spiconou").innerHTML = `${i}`;
        }
    } else if (f == 0.01 && t == 0.01) {
        if (i > 100) {
            document.getElementById("spiconou").innerHTML = "Percentage must be <=100";
        } else {
            document.getElementById("spiconou").innerHTML = `${i}`;
        }
    } else if (f == 0.001) {
        if (i > 10) {
            document.getElementById("spiconou").innerHTML = "SPI must be <= 10";
        } else {
            document.getElementById("spiconou").innerHTML = `${(i * 9.5)}`;
        }
    } else {
        if (i > 100) {
            document.getElementById("spiconou").innerHTML = "Percentage must be <=100";
        } else if (i < 95) {
            document.getElementById("spiconou").innerHTML = `${i / 9.5}`;
        } else if (i >= 95 && i <= 100) {
            document.getElementById("spiconou").innerHTML = `${10}`;
        }
    }
}


function areau(a) {
    switch (a) {
        case "1":
            return 4046.86;
        case "2":
            return 100;
        case "3":
            return 10000;
        case "4":
            return 0.0001;
        case "5":
            return 0.092903;
        case "6":
            return 0.00064516;
        case "7":
            return 1;
    }
}

function areacon() {
    const f = areau(document.getElementById("areacon-1").value);
    const t = areau(document.getElementById("areacon-2").value);
    const i = parseInt(document.getElementById("areaconin").value);
    const a = (i * f) / t;
    document.getElementById("areaconou").innerHTML = `${a}`;
}

function volnu(a) {
    switch (a) {
        case "1":
            return 3.78541;
        case "2":
            return 4.54609;
        case "3":
            return 1;
        case "4":
            return 0.001;
        case "5":
            return 0.001;
        case "6":
            return 1000;
        case "7":
            return 0.0163871;
        case "8":
            return 28.3168;
    }
}

function volcon() {
    const f = volnu(document.getElementById("volcon-1").value);
    const t = volnu(document.getElementById("volcon-2").value);
    const i = parseInt(document.getElementById("volconin").value);
    const a = (i * f) / t;
    document.getElementById("volconou").innerHTML = `${a}`;
}

function massu(a) {
    switch (a) {
        case "1":
            return 1000;
        case "2":
            return 1016.05;
        case "3":
            return 907.185;
        case "4":
            return 0.45359250018101;
        case "5":
            return 0.0283495;
        case "6":
            return 1;
        case "7":
            return 0.001;
    }
}

function masscon() {
    const f = massu(document.getElementById("masscon-1").value);
    const t = massu(document.getElementById("masscon-2").value);
    const i = parseInt(document.getElementById("massconin").value);
    if (i >= 0) {
        const a = (i * f) / t;
        document.getElementById("massconou").innerHTML = `${a}`;
    }
    else if (i < 0) {
        document.getElementById("massconou").innerHTML = "Mass cannot be negative. Kindly enter a positive value.";
    }
}

function angleu(a) {
    switch (a) {
        case "1":
            return 1;
        case "2":
            return 57.29578;
        case "3":
            return 0.01667;
        case "4":
            return 0.0002778;
        case "5":
            return 30;
        case "6":
            return 45;
        case "7":
            return 60;
        case "8":
            return 90;
        case "9":
            return 360;
    }
}

function anglecon() {
    const f = angleu(document.getElementById("anglecon-1").value);
    const t = angleu(document.getElementById("anglecon-2").value);
    const i = parseInt(document.getElementById("angleconin").value);
    const a = (i * f) / t;
    document.getElementById("angleconou").innerHTML = `${a}`;
}

function tempau(a) {
    switch (a) {
        case "1":
            return 100;
        case "2":
            return 180;
        case "3":
            return 100;
        case "4":
            return 80;
    }
}

function presu(a) {
    switch (a) {
        case "1":
            return 1;
        case "2":
            return 0.986923;
        case "3":
            return 9.8692e-6;
        case "4":
            return 0.00131579;
        case "5":
            return 0.068046;
    }
}
function prescon() {
    const f = presu(document.getElementById("prescon-1").value);
    const t = presu(document.getElementById("prescon-2").value);
    const i = parseInt(document.getElementById("presconin").value);
    const a = (i * f) / t;
    document.getElementById("presconou").innerHTML = `${a}`;
}

function powu(a) {
    switch (a) {
        case "1":
            return 1;
        case "2":
            return (10 ** (-7));
        case "3":
            return 0.2930;
        case "4":
            return 1.356;
        case "5":
            return 745.7;
        case "6":
            return 4.186;
    }
}

function powercon() {
    const f = powu(document.getElementById("powercon-1").value);
    const t = powu(document.getElementById("powercon-2").value);
    const i = parseInt(document.getElementById("powerconin").value);
    const a = (i * f) / t;
    var ans = Number(parseFloat(a).toFixed(3));
    document.getElementById("powerconou").innerHTML = `${ans}`;
}

function datau(a) {
    switch (a) {
        case "1":
            return 0.125;
        case "2":
            return 1;
        case "3":
            return 1024;
        case "4":
            return 1024 * 1024;
        case "5":
            return 1024 * 1024 * 1024;
        case "6":
            return 1024 * 1024 * 1024 * 1024;
        case "7":
            return 1024 * 1024 * 1024 * 1024 * 1024;

    }
}

function datacon() {
    const f = datau(document.getElementById("datacon-1").value);
    const t = datau(document.getElementById("datacon-2").value);
    const i = parseInt(document.getElementById("dataconin").value);

    if (i >= 0) {
        const a = (i * f) / t;
        document.getElementById("dataconou").innerHTML = `${a}`;
    }
    else if (i < 0) {
        document.getElementById("dataconou").innerHTML = "Data size cannot be negative. Kindly enter a positive value.";
    }

}

function simple_interest() {
    var p, t, r, si, ci;
    p = document.getElementById("first").value;
    t = document.getElementById("second").value;
    r = document.getElementById("third").value;
    var sitemp1 = document.getElementById("simpleinterstoutput1");
    var sitemp2 = document.getElementById("simpleinterstoutput2");
    sitemp1.innerHTML = "";
    sitemp2.innerHTML = "";
    if (p == "" || t == "" || r == "") {
        document.getElementById("simpleinterstoutput1").innerHTML = "All the fields are required";
        document.getElementById("compoundinterestoutput1").innerHTML = "";
    }
    else {
        si = parseFloat((p * t * r) / 100);
        if (si < 0) {
            document.getElementById("simpleinterstoutput1").innerHTML = "Negative values not allowed";
            document.getElementById("compoundinterestoutpu1t").innerHTML = "";
        }
        else {

            document.getElementById("simpleinterstoutput1").innerHTML = "\\[Simple \\space Interest = \\space \\frac{1}{100} \\times p \\times t \\times r \\]";
            document.getElementById("simpleinterstoutput2").innerHTML = "\\[\\frac{1}{100} \\times " + p + "\\times " + t + " \\times " + r + " = ₹" + si.toFixed(5) + "\\]<br>\\[Amount \\space = \\space " + p + "\\space + \\space " + si.toFixed(5) + "\\space = \\space " + (parseFloat(p) + parseFloat(si.toFixed(5))) + "\\]";

            renderMathInElement(document.getElementById("simpleinterstoutput1"));
            renderMathInElement(document.getElementById("simpleinterstoutput2"));
            val = document.getElementById("comp").value;

            n = 1;
            if (val == "Compounded Annually") {
                n = 1;
            }
            else if (val == "Compounded Half-yearly") {
                n = 2;
            }
            else if (val == "Compounded Quaterly") {
                n = 4;
            }
            else if (val == "Compounded Monthly") {
                n = 12;
            }

            amount = p * Math.pow(1 + (r / (n * 100)), n * t);
            ci = amount - p;
            document.getElementById("compoundinterestoutput1").innerHTML = "\\[Compound \\space Interest =P\\left(1+\\frac{r}{n}\\right)^{n t}\\]"
            document.getElementById("compoundinterestoutput2").innerHTML = "\\[" + p + "\\left(1+\\frac{" + r + "}{" + n + "}\\right)^{" + n + "\\times" + t + "} = ₹" + ci.toFixed(5) + "\\]<br>\\[Amount \\space = \\space " + p + "\\space + \\space " + ci.toFixed(5) + "\\space = \\space " + (parseFloat(p) + parseFloat(ci.toFixed(5))) + "\\]";
            renderMathInElement(document.getElementById("compoundinterestoutput1"));
            renderMathInElement(document.getElementById("compoundinterestoutput2"));
        }
    }
}

function emical() {
    var p, t, r, emi;
    p = parseInt(document.getElementById("first1").value);
    r = parseFloat(document.getElementById("third3").value) / 100;
    t1 = document.getElementById("second2").value;
    t = parseFloat(t1) * 12;
    emi = ((p * r * Math.pow((1 + r), t)) / (Math.pow((1 + r), t) - 1));
    if (!isNaN(p) && !isNaN(t) && !isNaN(r)) {
        document.getElementById("emio1").innerHTML = "\\[\\mathrm{EMI}=\\frac{\\mathrm{P} \\times \\mathrm{r} \\times(1+\\mathrm{r})^{\\mathrm{t}}}{(1+\\mathrm{r})^{t}-1}\\]";
        document.getElementById("emio4").innerHTML = "\\[(\\mathrm{" + t1 + "} \\space \\mathrm{Year} = \\mathrm{" + t.toFixed(3) + "} \\space \\mathrm{Months} = \\mathrm{t})\\]";
        document.getElementById("emio2").innerHTML = "\\[\\mathrm{EMI}=\\frac{\\mathrm{" + p + "} \\times \\mathrm{" + r.toFixed(2) + "} \\times(1+\\mathrm{" + r.toFixed(2) + "})^{\\mathrm{" + t.toFixed(2) + "}}}{(1+\\mathrm{" + r.toFixed(2) + "})^{" + t.toFixed(2) + "}-1}\\]";
        document.getElementById("emio3").innerHTML = "\\[\\mathrm{EMI}= \\space" + emi.toFixed(2) + "\\space Per\\space month\\]";
    }
    else {
        document.getElementById("emio1").innerHTML = "\\[Please \\space enter \\space all \\space input \\]";
        document.getElementById("emio4").innerHTML = " ";
        document.getElementById("emio2").innerHTML = " ";
        document.getElementById("emio3").innerHTML = " ";
    }
    renderMathInElement(document.getElementById("emio1"));
    renderMathInElement(document.getElementById("emio4"));
    renderMathInElement(document.getElementById("emio2"));
    renderMathInElement(document.getElementById("emio3"));
}

function gstcal() {
    var p, r, final, gst, cgst;
    p = parseInt(document.getElementById("O_Price").value);
    r = parseFloat(document.getElementById("GST").value) / 100;
    gst = p * r;
    final = p + gst;
    cgst = gst / 2;
    if (isNaN(p) || isNaN(r)) {
        document.getElementById("gst1").innerHTML = "Enter integer value";
        document.getElementById("gst0").innerHTML = "";
        document.getElementById("gst2").innerHTML = "";
        document.getElementById("gst3").innerHTML = "";
    }
    else if (p < 0 || r < 0) {
        document.getElementById("gst1").innerHTML = "Enter a positive integer value";
        document.getElementById("gst0").innerHTML = "";
        document.getElementById("gst2").innerHTML = "";
        document.getElementById("gst3").innerHTML = "";
    }
    else {
        document.getElementById("gst0").innerHTML = "Working"
        document.getElementById("gst2").innerHTML = "Results"
        var gst_work = "", gst_result = "";
        gst_work += "\\[\\mathrm{GST}=\\frac{\\mathrm{Original}\\space\\mathrm{Cost}\\times\\mathrm{GST}\\%}{100}\\]" + "\\[\\mathrm{GST}=\\space" + p + "\\times" + r + "\\]" + "\\[\\mathrm{GST}= \\space" + gst.toFixed(2) + "\\]";
        gst_work += "\\[\\mathrm{CGST/SGST}=\\frac{\\mathrm{GST}}{2}\\]" + "\\[\\mathrm{CGST/SGST}= \\space" + cgst.toFixed(2) + "\\]";
        gst_work += "\\[\\mathrm{Final}\\space\\mathrm{Cost}=\\space\\mathrm{Original}\\space\\mathrm{Cost}+\\mathrm{GST}\\]" + "\\[\\mathrm{Final}\\space\\mathrm{Cost}=\\space" + p + "+\\space" + gst.toFixed(2) + "\\]";
        gst_result += "\\[\\mathrm{GST}= \\space" + gst.toFixed(2) + "\\]" + "\\[\\mathrm{CGST/SGST}= \\space" + cgst.toFixed(2) + "\\]" + "\\[\\mathrm{Final}\\space\\mathrm{Cost}= \\space" + final.toFixed(2) + "\\]";
        document.getElementById("gst1").innerHTML = gst_work;
        document.getElementById("gst3").innerHTML = gst_result;
        renderMathInElement(document.getElementById("gst1"));
        renderMathInElement(document.getElementById("gst3"));

    }

}


function degcal() {
    var expression = document.getElementById("exp").value;
    var ans = document.getElementById("deg");
    var print;
    exp = expression.replace(/ /g, '')
    var x = nerdamer(`deg(${exp})`);
    print = "\\[Answer \\space -> \\space " + x + "\\]"
    print += "\\[The \\space degree \\space of \\space an \\space individual \\space term \\space of \\space a \\space polynomial \\space is \\]";
    print += "\\[ the \\space exponent \\space of \\space its \\space variable\\]";
    print += "\\[ the \\space exponents \\space of \\space the \\space terms \\space of \\space this \\space polynomial \\space are, \\space in \\space order \\space :- \\space " + exp + "\\]";
    print += "\\[The \\space degree \\space of \\space the \\space polynomial \\space is \\space the \\space highest \\space degree \\space of \\space any \\space of \\space the \\space terms\\]";
    print += "\\[ in \\space  this \\space case, \\space it \\space is \\space " + x + ".\\]";
    ans.innerText = x;

    ans.innerHTML = print;
    renderMathInElement(ans);

}


function curcon() {
    fetch("https://api.exchangerate-api.com/v4/latest/USD")
        .then((cur) => {
            return cur.json();
        })
        .then(
            (curout = function (c) {
                const f = c.rates[document.getElementById("curcon-1").value];
                const t = c.rates[document.getElementById("curcon-2").value];
                const i = parseInt(document.getElementById("curconin").value);
                if (i < 0) {
                    document.getElementById("curconou").innerHTML = "Enter <strong>only</strong> positive amount values";
                }
                else {
                    document.getElementById("curconou").innerHTML = `${(i * t) / f}`;
                }
            })
        );
}

function timeu(a) {
    switch (a) {
        case "1":
            return 86400;
        case "2":
            return 3600;
        case "3":
            return 60;
        case "4":
            return 1;
        case "5":
            return 0.001;
        case "6":
            return 0.000001;
    }
}

function leap() {
    const i = parseInt(document.getElementById("leapin").value);
    var out = document.getElementById("leapresult");
    var today = new Date();//to get current year
    var curryr = parseInt(today.getFullYear());
    var ans = 0;
    document.getElementById("leapresult1").innerHTML = "";
    document.getElementById("leapresult3").innerHTML = "";
    if (i < 0) {
        out.innerHTML = "Please enter a valid year to check if it's a leap year";
    } else if (i >= 0 && i < 1000) {
        out.innerHTML = "Too SMALL!! Enter a valid year to check if it's a leap year";
    } else if (i > 9999) {
        out.innerHTML = "Too BIG!! Enter a valid year to check if its a leap year";
    } else {
        if (i % 4 == 0) {
            document.getElementById("leapresult1").innerHTML = "\\[The \\space Year \\space " + i + " \\space is \\space completely \\space divisible \\space by \\space 4 \\newline " + i + "\\space \\% \\space 4 \\space equal \\space to \\space zero\\]";
            renderMathInElement(document.getElementById("leapresult1"));
            ans = 1;
        }
        if (i % 100 == 0) {
            ans = 0;
            if (i % 4 == 0) {
                document.getElementById("leapresult3").innerHTML = "\\[The \\space Year \\space " + i + " \\space is \\space completely \\space divisible \\space by \\space 100 \\newline" + i + " \\space \\% \\space 100 \\space equal \\space to \\space Zero \\newline Hence,\\]";
                renderMathInElement(document.getElementById("leapresult3"));
            } else {
                document.getElementById("leapresult1").innerHTML = "\\[The \\space Year \\space " + i + " \\space is \\space completely \\space divisible \\space by \\space 100 \\newline" + i + "\\space \\% \\space 100 \\space equal \\space to \\space Zero \\newline Hence,\\]";
                document.getElementById("leapresult3").innerHTML = "";
                renderMathInElement(document.getElementById("leapresult1"));
            }
            if (i % 400 == 0) {
                ans = 1;
                document.getElementById("leapresult3").innerHTML = "\\[The \\space Year \\space " + i + " \\space is \\space completely \\space divisible \\space by \\space 400 \\newline" + i + "\\space \\% \\space 400 \\space equal \\space to \\space Zero \\newline Hence,\\]";
                renderMathInElement(document.getElementById("leapresult3"));
            }
        }
        if (i % 100 != 0 && i % 4 != 0) {
            document.getElementById("leapresult1").innerHTML = "\\[The \\space Year \\space " + i + " \\space is \\space neither \\space divible \\space by \\space 4 \\space or \\space 100 \\newline Hence,\\]";
            renderMathInElement(document.getElementById("leapresult1"));
            document.getElementById("leapresult3").innerHTML = "";
        }
        if (ans) {
            if (i > curryr) {
                out.innerHTML = `${i} will be a Leap Year`;
            } else if (i == curryr) {
                out.innerHTML = `${i} is a Leap Year`;
            } else {
                out.innerHTML = `${i} was a Leap Year`;
            }
        }
        else {
            if (i > curryr) {
                out.innerHTML = `${i} will not be a Leap Year`;
            } else if (i == curryr) {
                out.innerHTML = `${i} is not a Leap Year`;
            } else {
                out.innerHTML = `${i} was not a Leap Year`;
            }
        }
    }
}

function timecon() {
    const f = timeu(document.getElementById("timecon-1").value);
    const t = timeu(document.getElementById("timecon-2").value);
    const i = parseInt(document.getElementById("timeconin").value);
    if (i >= 0) {
        const a = (i * f) / t;
        document.getElementById("timeconou").innerHTML = `${a}`;
    }
    else if (i < 0) {
        document.getElementById("timeconou").innerHTML = "Time cannot be negative. Kindly enter a positive value.";
    }
}

function speedu(a) {
    switch (a) {
        case "1":
            return 1.60934;
        case "2":
            return 1;
        case "3":
            return 3.6;
    }
}

function speedcon() {
    const f = speedu(document.getElementById("speedcon-1").value);
    const t = speedu(document.getElementById("speedcon-2").value);
    const i = parseInt(document.getElementById("speedconin").value);
    const a = (i * f) / t;
    document.getElementById("speedconou").innerHTML = `${a}`;
}


function factorialsol(factorialval) {
    var num = document.getElementById(factorialval).value;
    var num1 = parseInt(num);
    var ans = document.getElementById("factorialsolprint");
    var desc = document.getElementById("explain_fact");
    if (isNaN(num1)) {
        desc.innerHTML = "Enter a number.";
        ans.innerHTML = "";
    }
    else if (num1 < 0) {
        desc.innerHTML = "Factorial is not defined for negative integer since, gamma function is not defined for negative integer";
        ans.innerHTML = "";
    }
    else if (num1 == 0 || num1 == 1) {
        ans.innerHTML = "";
        desc.innerHTML = `Factorial Formula of ${num1} ! = 1`;
    } else if (num1 <= 15 && num1 > 0) {
        desc.innerHTML = `Factorial Formula of ${num1} ! = 1  `;
        let calc = 1;
        for (var i = 2; i <= num1; i++) {
            desc.innerHTML += ` x ${i}`;
            calc *= i;
        }
        ans.innerHTML = num1;
        ans.innerHTML += " !";
        ans.innerHTML += " =";
        ans.innerHTML += " ";
        ans.innerHTML += calc;
    } else {
        desc.innerHTML = `Factorial Formula is ${num1} ! = 1 x 2 x 3 x ..... x ${num1} `;
        let calc = 1;
        for (var i = 1; i <= num1; i++) {
            calc *= i;
        }
        ans.innerHTML = num1;
        ans.innerHTML += " !";
        ans.innerHTML += " =";
        ans.innerHTML += " ";
        ans.innerHTML += calc;
    }
}

function binomialsolve(valn, valk) {
    document.getElementById("bino_div").style.display = "block";
    var inputval1 = document.getElementById(valn).value;
    var inputval2 = document.getElementById(valk).value;
    var regex = /^[\-]*[\d]+$/
    var textVal1 = regex.test(inputval1);
    var testVal2 = regex.test(inputval2);
    if (!textVal1 || !testVal2) {
        document.getElementById("bino_wrong").innerHTML = "Enter Integer values only";
        document.getElementById("bino_div_div2").style.display = "none";
        document.getElementById("bino_div_div1").style.display = "block";
        return;
    }
    var val3 = parseInt(inputval1);
    var val4 = parseInt(inputval2);
    if (isNaN(val3) || isNaN(val4)) {
        document.getElementById("bino_div_div2").style.display = "none";
        document.getElementById("bino_div_div1").style.display = "none";
    } else if (val3 < 0 || val4 < 0) {
        document.getElementById("bino_wrong").innerHTML =
            "n and r must be positive integers";
        document.getElementById("bino_div_div2").style.display = "none";
        document.getElementById("bino_div_div1").style.display = "block";

    } else if (val3 < val4) {
        document.getElementById("bino_wrong").innerHTML =
            "n must be greater than k.";
        document.getElementById("bino_div_div2").style.display = "none";
        document.getElementById("bino_div_div1").style.display = "block";

    } else {
        let ans1 = 1,
            ans2 = 1,
            ans3 = 1;
        let ans4 = 0;
        if (val3 - val4 == 0) {
            document.getElementById(
                "bino_ans"
            ).innerHTML = `(${val3}) ! / ( (${val4})! x (${val3} - ${val4}) ! ) = 1`;
            document.getElementById("bino_div_div1").style.display = "none";
            document.getElementById("bino_div_div2").style.display = "block";
        } else {
            for (i = 1; i <= val3; i++) {
                ans1 *= i;
            }
            for (i = 1; i <= val4; i++) {
                ans2 *= i;
            }
            for (i = 1; i <= val3 - val4; i++) {
                ans3 *= i;
            }
            console.log(ans1);
            console.log(ans2);
            console.log(ans3);
            ans4 = ans1 / (ans2 * ans3);
            document.getElementById(
                "bino_ans"
            ).innerHTML = `(${val3}) ! / ( (${val4}) ! x (${val3} - ${val4}) ! ) = ${ans4}`;
            document.getElementById("bino_div_div1").style.display = "none";
            document.getElementById("bino_div_div2").style.display = "block";
        }
    }
}

function profitloss() {
    var cp = parseFloat(document.getElementById("cp").value);
    var sp = parseFloat(document.getElementById("sp").value);
    document.getElementById("pol2").innerHTML = "";
    document.getElementById("percent1").innerHTML = "";
    document.getElementById("pol1").innerHTML = "";
    document.getElementById("percent2").innerHTML = "";
    if (cp < 0 || sp < 0) {
        document.getElementById("pol1").innerHTML = "<strong>Only</strong> positive values are accepted";
    }
    else if (cp > sp) {
        var loss = cp - sp;
        var perl = (loss * 100) / cp;
        document.getElementById("pol1").innerHTML = "\\[Loss = Cost\\space Price - Selling\\space Price\\]";
        document.getElementById("pol2").innerHTML = "\\[Loss = " + cp + " - " + sp + " \\space =  " + loss + "\\]";
        renderMathInElement(document.getElementById("pol1"));
        renderMathInElement(document.getElementById("pol2"));
        document.getElementById("percent1").innerHTML = "\\[Loss\\space Percentage = \\frac{loss}{cost\\space price} \\times 100 \\%\\]";
        document.getElementById("percent2").innerHTML = "\\[Loss\\space Percentage =\\frac{" + loss + "}{" + cp + "} \\times 100 = " + perl.toFixed(3) + "\\% \\]";
        renderMathInElement(document.getElementById("percent1"));
        renderMathInElement(document.getElementById("percent2"));
    } else {
        var profit = sp - cp;
        var perp = (profit * 100) / sp;
        document.getElementById("pol1").innerHTML = "\\[Profit = Selling\\space Price - Cost\\space Price\\]";
        document.getElementById("pol2").innerHTML = "\\[Profit = " + sp + " - " + cp + " \\space =  " + profit + "\\]";
        renderMathInElement(document.getElementById("pol1"));
        renderMathInElement(document.getElementById("pol2"));
        document.getElementById("percent1").innerHTML = "\\[Profit\\space Percentage = \\frac{Profit}{Selling\\space price} \\times 100 \\%\\]";
        document.getElementById("percent2").innerHTML = "\\[Profit\\space Percentage =\\frac{" + profit + "}{" + sp + "} \\times 100 = " + perp.toFixed(3) + "\\% \\]";
        renderMathInElement(document.getElementById("percent1"));
        renderMathInElement(document.getElementById("percent2"));
    }
}


function countinfind() {
    let x1 = parseInt(document.getElementById("countin1").value)
    let y1 = parseInt(document.getElementById("countin2").value)
    let x2 = parseInt(document.getElementById("countin3").value)
    let y2 = parseInt(document.getElementById("countin4").value)
    if (!isNaN(x1) && !isNaN(y1) && !isNaN(x2) && !isNaN(y2)) {
        let c = (y2 - y1 - 1) * (x2 - x1 - 1)
        document.getElementById("countinans").innerHTML = c;
    }
    else {
        document.getElementById("countinans").innerHTML = "Please enter all the fields";
    }

}

function innercir() {
    let R = parseInt(document.getElementById("innercir1").value)
    let output = document.getElementById("innercirans")
    let ans = "";
    if (isNaN(R)) {
        ans = "\\[Enter \\space the \\space radius\\]"
    }
    else if (radius < 0) {
        ans += "\\[Radius \\space cannot \\space be \\space negative\\]";
    }
    else {
        let r = R / 2;
        let Area = (3.14 * Math.pow(r, 2));
        ans += "\\[Area \\space of \\space inner \\space circle=" + Area + "\\]";
    }
    output.innerHTML = ans;
    renderMathInElement(output);
}

function shtfind() {
    let a = parseInt(document.getElementById("shtin").value)
    if (!isNaN(a)) {
        document.getElementById("shtans1").innerHTML = "\\[Side \\space length \\space of \\space a \\space hexagon \\space inscribed \\space within \\space an \\space equilateral \\space triangle \\space is \\space h \\space = \\space \\frac{a}{3} \\newline Side \\space length \\space of \\space the \\space square \\space that \\space can \\space be \\space inscribed \\space within \\space a \\space hexagon \\space is \\space x \\space = \\space 1.268 \\times h \\newline So, \\space Side \\space length \\space of \\space the \\space square \\space inscribed \\space within \\space a \\space hexagon \\space which \\space in \\space turn \\space is \\space inscribed \\space within \\space an \\space equilateral \\space triangle, \\newline x \\space = \\space 1.268 \\times \\frac{a}{3} \\space = \\space 0.423 \\times a\\]";
        renderMathInElement(document.getElementById("shtans1"));
        var x = (0.423 * a);
        document.getElementById("shtans").innerHTML = "\\[Ans: \\space 0.423 \\times (Side \\space length) \\space = \\space 0.433 \\times " + a + " \\space = \\space " + x.toFixed(3) + "\\]";
    }
    else {
        document.getElementById("shtans").innerHTML = "\\[Please \\space enter \\space valid \\space input\\]";
        document.getElementById("shtans1").innerHTML = "";
    }
    renderMathInElement(document.getElementById("shtans"));
}

function htfind() {
    let a = parseInt(document.getElementById("htin").value);
    if (!isNaN(a)) {
        var x = a / 3;
        document.getElementById("htans").innerHTML = "\\[Largest \\space hexagon \\space that \\space can \\space be \\space inscribed \\space within \\space an \\space equilateral \\space triangle \\space will \\space be, \\newline \\frac{(Side \\space length)}{3} \\space = \\space {" + a + "}{3} \\space = \\space " + x.toFixed(3) + "\\]";
    }
    else {
        document.getElementById("htans").innerHTML = "\\\[Please \\space enter \\space valid \\space input\\]";
    }
    renderMathInElement(document.getElementById("htans"));
}
function gamma_fact(num) {
    var f = 1;
    for (var i = 1; i <= num; i++) {
        f = (f * i);
    }
    return f;
}
function gammafind() {

    let inpu = document.getElementById("gammain").value
    if (inpu == "") { document.getElementById("gammafindans").innerHTML = "Please enter a number" }
    else {
        num1 = parseInt(inpu)
        var num2 = num1 - 1;
        var num3 = gamma_fact(num2);
        let ans = math.gamma(num1)
        var gamma = "";
        gamma += "\\[\\Gamma \\left( x \\right)=\\space \\int_{0}^{\\infty} t^{x-1}e^{-t} dt\\]"
        gamma += "\\[\\Gamma \\left( " + num1 + " \\right) =(" + num1 + "-1)!\\]"
        gamma += "\\[" + num2 + "!\\]"
        gamma += "\\[" + num3.toFixed(4) + "\\]"
        gamma += "\\[The \\space result \\space is: " + ans.toFixed(4) + "\\]"
        document.getElementById("gammafindans").innerHTML = gamma;
        renderMathInElement(document.getElementById("gammafindans"))
    }
}

function nrec() {
    var n = parseInt(document.getElementById("nrec1").value)
    var output = document.getElementById("nrecans")
    var ans = "";
    if (n < 0) {
        ans += "\\[Dimension \\space cannot \\space be \\space negative \\]"
        output.innerHTML = ans;
    }
    else if (!isNaN(length)) {
        let a = 0;
        for (let length = 1; length <= parseInt(Math.sqrt(n), 10); ++length)
            for (let height = length; height * length <= n; ++height)
                a++;


        ans += "\\[Number \\space of \\space unique \\space rectangles \\space formed \\space using \\space " + n + " \\space unit \\space squares= \\space " + a + " \\]"
        output.innerHTML = ans;
    }
    else {
        ans += "\\[Please \\space enter \\space all \\space input \\]"
        output.innerHTML = ans;
    }
    renderMathInElement(output);
}

function catalan(n) {
    c = binomialCoeff(2 * (n), n);
    return Math.floor(c / (n + 1));
}

function binomialCoeff(n, k) {
    let res = 1;
    if (k > n - k)
        k = n - k;
    for (let i = 0; i < k; ++i) {
        res *= (n - i);
        res = Math.floor(res / (i + 1));
    }

    return res;
}

function discount() {
    var dis = parseFloat(document.getElementById("dis").value);
    var cpsp = parseFloat(document.getElementById("cpsp").value);


    var perprice = document.getElementById("perprice").value;
    var costsell = document.getElementById("costsell").value;
    if (dis < 0 || cpsp < 0 || dis == NaN || cpsp == NaN) {
        document.getElementById("discountresult").innerHTML = "<strong>Only</strong> positive values are accepted. Refrain from blank inputs and negative values.";
    }
    else {
        var cp = 0;
        var sp = 0;
        var discount = ""
        var print = "";
        if (costsell == "Cost Price") {
            if (perprice == "Percentage") {
                cp = cpsp;
                sp = cpsp - (cpsp * (dis / 100));
                discount = dis + "%";
            }
            else {
                cp = cpsp;
                sp = cpsp - dis;
                discount = "Rs " + dis;
            }
        }
        else {
            if (perprice == "Percentage") {
                sp = cpsp;
                cp = (100 * cpsp) / (100 - dis);
                discount = dis + "%";
            }
            else {
                sp = cpsp;
                cp = cpsp + dis;
                discount = "Rs " + dis;
            }
        }

        if (cp < 0 || sp < 0) {
            print = "The the entered data is resulting in a negative Cost/Selling Price.";
        }
        else if (cp > sp) {
            var loss = cp - sp;
            var perl = (loss * 100) / cp;
            print = "Cost Price: Rs " + cp + "<br>Selling Price: Rs " + sp + "<br>Discount: " + discount + "<br>Loss: Rs " + loss + "<br>Loss Percentage: " + perl + "%";
        } else {
            print = "Cost Price: Rs " + cp + "<br>Selling Price: Rs " + sp + "<br>Discount: " + discount;
            var profit = sp - cp;
            var perp = (profit * 100) / sp;
            print = "Cost Price: Rs " + cp + "<br>Selling Price: Rs " + sp + "<br>Discount: " + discount + "<br>Loss: Rs " + profit + "<br>Loss Percentage: " + perp + "%";
        }

        document.getElementById("discountresult").innerHTML = print;
    }

}
function solvepera() {
    var x1 = parseFloat(document.getElementById('perX1').value);
    var y1 = parseFloat(document.getElementById('perY1').value);
    if (!isNaN(x1) || !isNaN(y1)) {
        var n = (y1 * 100) / x1;

        document.getElementById('perAns2').innerHTML = "\\[\\frac{" + y1 + "\\times 100}{" + x1 + "} \\space = \\space " + n.toFixed(3) + " \\space \\%\\]";
        renderMathInElement(document.getElementById('perAns1'));
        renderMathInElement(document.getElementById('perAns2'));
    }
    else {
        document.getElementById('perAns1').innerHTML = "\\[Tüm boşlukları doldurun\\]";
        renderMathInElement(document.getElementById('perAns1'));
    }
}

function retfind() {
    let r = parseFloat(document.getElementById("retin").value)
    var height = ((2 * r) / (Math.sqrt(5)));
    var height1 = Math.pow(height, 2);
    var area = 0.70477 * height1;
    var output = document.getElementById("retans");
    var ans = "";
    if (r < 0) {
        ans += "\\[Radius \\space cannot \\space be \\space negative \\]"
        output.innerHTML = ans;
    }
    else if (!isNaN(r)) {
        ans += "\\[Side \\space of \\space the \\space Square \\space inscribed \\space in \\space a \\space Semicircle (a) \\space is \\]"
        ans += "\\[a \\space = \\space \\frac{2r}{\\sqrt{5}} \\]"
        ans += "\\[Height \\space of \\space the \\space Reuleaux \\space Triangle \\space is \\space same \\space as \\space a  \\space so, \\space a \\space = \\space h \\]"
        ans += "\\[Area \\space of \\space the \\space Reuleaux \\space Triangle (A) \\space is \\]"
        ans += "\\[A \\space = \\space \\frac{(π - \\sqrt{3}) \\times (\\frac{2r}{\\sqrt{5}})^{2}}{2} \\space = \\space \\frac{(π - \\sqrt{3}) \\times (\\frac{2 \\times" + r + " }{\\sqrt{5}})^{2}}{2} \\space = \\space \\frac{(π - \\sqrt{3})}{2} \\times(" + height.toFixed(4) + ")^{2} \\space = \\space 0.70477 \\times " + height1.toFixed(4) + " \\space = \\space " + area.toFixed(4) + "\\]"
        output.innerHTML = ans;
    }
    else {
        ans += "\\[Please \\space enter \\space valid \\space input \\]"
        output.innerHTML = ans;
    }
    renderMathInElement(output);
}

function exposol() {
    var x = parseFloat(document.getElementById("xval").value);
    var y = parseFloat(document.getElementById("yval").value);
    var n = document.getElementById("res");
    var explainop = document.getElementById("steps1");
    var ntemp = "";
    var explain = "";
    if (isNaN(x) || isNaN(y)) {
        n.innerHTML = "";
        explain += "Lütfen boş alan bırakmayın";
        explainop.innerHTML = explain;
        renderMathInElement(explainop);
    } else {
        if (x == 1) {
            n.innerHTML = '';
            explain += "x 1 iken n değeri ne olursa olsun eşitlik sağlanamaz";
            explainop.innerHTML = explain;
            renderMathInElement(explainop);
        } else {
            ntemp += "n değeri:" + eval(String(Math.log(y) / Math.log(x))) + "<br>";
            n.innerHTML = ntemp;
            renderMathInElement(n);
            explain += "\\[\\space" + x + "^{n} \\space = \\space " + y + "\\space : için" + "\\]";
            explain += "\\[ İki \\space tarafın da \\space log \\space değeri \\space alınır \\space : \\space log" + x + "^{n} \\space = \\space log" + y + "\\] ";
            explain += "\\[ \\space nlog" + x + "= \\space log" + y + "\\]";
            explain += "\\[İki \\space taraf da \\space değere \\space bölünür \\space log" + x + "\\space :" + "n \\space = \\frac{log" + y + "}{log" + x + "}" + "\\]";
            explainop.innerHTML = explain;
            renderMathInElement(explainop);
        }
    }
}
function solvepercal() {
    var x2 = document.getElementById('perX2').value;
    var y2 = document.getElementById('perY2').value;
    if (x2 != "" && y2 != "") {
        var s = ((y2 * 100) / x2).toFixed(2);
        document.getElementById('s').innerHTML = "\\[\\frac{" + y2 + " \\times 100}{" + x2 + "} \\space = \\space " + s + "\\]";
        document.getElementById('s1').innerHTML = "\\[Hence, \\space " + y2 + " \\space out \\space of \\space" + s + " \\space is \\space" + x2 + " \\space \\% \\]";
    } else {
        document.getElementById('s').innerHTML = "\\[Please \\space enter \\space all \\space Input\\]";
        document.getElementById('s1').innerHTML = "";
    }
    renderMathInElement(document.getElementById('s'));
    renderMathInElement(document.getElementById('s1'));
}
function solvepercent() {
    var x3 = (document.getElementById('x3').value);
    var y3 = (document.getElementById('y3').value);
    if (x3 != "" && y3 != "") {
        var r = (parseFloat(x3) + (parseFloat(y3) * parseFloat(x3)) / 100).toFixed(2);
        document.getElementById('r').innerHTML = "\\[" + x3 + " \\space + \\space \\frac{" + y3 + " \\times " + x3 + "}{100} \\space = \\space " + r + "\\]";
        document.getElementById('r1').innerHTML = "\\[\\space " + y3 + " \\space + \\space" + x3 + " \\space \\%  \\space = \\space " + r + "\\]";
    } else {
        document.getElementById('r').innerHTML = "\\[Tüm boşlukları doldurun\\]";
        document.getElementById('r1').innerHTML = "";
    }
    renderMathInElement(document.getElementById('r'));
    renderMathInElement(document.getElementById('r1'));
}
function solveperc() {
    var x4 = (document.getElementById('x4').value);
    var y4 = (document.getElementById('y4').value);
    if (x4 != "" && y4 != "") {
        var t = parseFloat(x4) - (parseFloat(y4) * parseFloat(x4)) / 100;
        document.getElementById('t').innerHTML = "\\[ " + x4 + " \\space - \\space \\frac{" + y4 + " \\times " + x4 + "}{100} \\space = \\space " + t.toFixed(3) + "\\]";
        document.getElementById('t1').innerHTML = "\\[Hence, \\space " + x4 + " \\space minus \\space " + y4 + " \\space \\% \\space is \\space " + t.toFixed(3) + "\\]";
    } else {
        document.getElementById('t').innerHTML = "\\[Please \\space enter \\space all \\space Input\\]";
        document.getElementById('t1').innerHTML = "";
    }
    renderMathInElement(document.getElementById('t'));
    renderMathInElement(document.getElementById('t1'));
}
function solveperper() {
    var x5 = (document.getElementById('x5').value);
    var y5 = (document.getElementById('y5').value);
    var ansexp = "";
    if (x5 != "" && y5 != "") {
        var ans = parseFloat(x5) * parseFloat(y5) / 100;
        ansexp += "\\[ " + x5 + " \\space \\times \\space " + y5 + "\\]";
        ansexp += "\\[= " + ans + " %\\]";
        document.getElementById('perans1').innerHTML = ansexp;
    } else {
        document.getElementById('perans1').innerHTML = "\\[Tüm boşlukları doldurun\\]";
        document.getElementById('perans2').innerHTML = "";
    }
    renderMathInElement(document.getElementById('perans1'));
}


function typenum2find() {

    let n = document.getElementById("typenum2").value;
    var ans = "\\[";
    var explain = "\\[Hardy \\space Ramanujam \\space theorem \\space return \\space number \\space of \\space distict \\space prime \\space factors \\space of \\space n \\]" + "\\[Distinct \\space prime \\space factors \\space of \\space" + n + ":";
    if (n == "") {
        console.log(n);
        ans += "Please \\space enter \\space number \\space to \\space find \\space answer\\]";
        document.getElementById("typenum2ans").innerHTML = ans;
        renderMathInElement(document.getElementById("typenum2ans"));
    }
    else {
        let n = parseInt(document.getElementById("typenum2").value)
        let count = 0;

        if (n % 2 == 0) {
            count++;
            explain += "2 \\space";
            while (n % 2 == 0)
                n = n / 2;
        }
        for (let i = 3; i <= Math.sqrt(n); i = i + 2) {
            if (n % i == 0) {
                count++;
                explain += i + "\\space";
                while (n % i == 0)
                    n = n / i;
            }
        }
        if (n > 2) {
            explain += n + "\\space";
            count++;
        }

        ans += count + "\\]";
        explain += "\\]";
        document.getElementById("typenum2ans").innerHTML = ans + explain;
        renderMathInElement(document.getElementById("typenum2ans"));
    }
}
function divSums(n) {
    let result = 0;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i == 0) {
            if (i == (n / i)) {
                result += i;
            }

            else {
                result += (i + n / i);
            }
        }
    }
    return (result + 1);
}


function primeFactors(n) {
    var res = [];
    if (n % 2 == 0) {
        while (n % 2 == 0)
            n = parseInt(n / 2);
        res.push(2);
    }
    for (var i = 3; i <= Math.sqrt(n); i = i + 2) {
        if (n % i == 0) {
            while (n % i == 0)
                n = parseInt(n / i);
            res.push(i);
        }
    }
    if (n > 2)
        res.push(n);
    return res;
}

let arr = Array(1001).fill(true);

function simpleSieve() {
    for (let p = 2; p * p < 1001; p++) {
        if (arr[p]) {
            for (let i = p * 2; i < 1001; i = i + p)
                arr[i] = false;
        }
    }
}

function find_sphene(N) {
    var arr1 = Array(8).fill(0);
    var count = 0;
    var j = 0;
    for (let i = 1; i <= N; i++) {
        if (N % i == 0 && count < 8) {
            count++;
            arr1[j++] = i;
        }
    }
    if (count == 8 && (arr[arr1[1]] && arr[arr1[2]] && arr[arr1[3]]))
        return 1;

    return 0;
}

function findCombinationsUtil(arr, index, num, reducedNum) {
    if (reducedNum < 0)
        return;
    if (reducedNum == 0) {
        for (let i = 0; i < index; i++)
            document.getElementById("typenum5ans").innerHTML += arr[i] + " ";
        document.getElementById("typenum5ans").innerHTML += "<br/>";
        return;
    }
    let prev = (index == 0) ? 1 : arr[index - 1];
    for (let k = prev; k <= num; k++) {
        arr[index] = k;
        findCombinationsUtil(arr, index + 1, num, reducedNum - k);
    }
}

function divSum(n) {
    let result = 0;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i == 0) {
            if (i == (n / i)) {
                result += i;
                document.getElementById("typenum3ex").innerHTML += i + ", \\space";
            }

            else {
                result += (i + n / i);
                document.getElementById("typenum3ex").innerHTML += i + ", \\space" + (n / i) + ", \\space";
            }
        }
    }
    document.getElementById("typenum3ex").innerHTML += " \\]";
    document.getElementById("typenum3ex").innerHTML += "\\[Sum \\space of \\space divisors=" + (result + 1) + "\\]" + "\\[" + (result + 1);
    return (result + 1);

}

function findTriangularNumber(n) {
    return (n * (n + 1)) / 2;
}

function findTetrahedralNumber(n) {
    return ((n * (n + 1) * (n + 2)) / 6);
}

function reverse(x) {
    var rev = 0;
    while (x > 0) {
        rev = (rev * 10) + x % 10;
        x = parseInt(x / 10);
    }
    return rev;
}


function cal_func_stats() {
    var num = document.getElementById('num_list').value;

    valid = /^([-]{0,1}\d{1,}[\.]{0,1}\d{0,}[ ]?)*$/


    if (num == "") {
        document.getElementById('result_cal_func_stats').innerHTML = "";
    }
    else if (!valid.test(num)) {
        document.getElementById('result_cal_func_stats').innerHTML = "Enter space separated numbers.<br>Example -> 1  2  2.1  -2  -2.6 <br> Use of alphabets and special character is not allowed for calculation purpose";
    }
    else {
        var print = "";
        var s = 0;
        num = num.trim();
        num = num.split(" ");
        var len = parseInt(num.length);

        var number = []
        for (i = 0; i < len; i++) {
            number[i] = parseFloat(num[i].trim());
        }

        number.sort(function (a, b) {
            return a - b;
        });
        console.log(number)
        console.log(typeof (number))
        console.log(typeof (number[0]))

        for (i = 0; i < len; i++) {
            s = s + number[i];
        }

        mean = s / len




        var median = 0
        if (len % 2 == 0) {
            median = ((number[parseInt(len / 2) - 1]) + (number[parseInt((len / 2))])) / 2;
        }
        else {
            median = (number[parseInt(len / 2)]);
        }


        const frequencyTable = {};
        number.forEach((elem) => (frequencyTable[elem] = frequencyTable[elem] + 1 || 1));

        let mode = [];
        let maxFrequency = 0;
        for (const key in frequencyTable) {
            if (frequencyTable[key] > maxFrequency) {
                mode = [Number(key)];
                maxFrequency = frequencyTable[key];
            } else if (frequencyTable[key] === maxFrequency) {
                mode.push(Number(key));
            }
        }

        if (mode.length === number.length) mode = number[0];
        if (number.length != 0) {
            if (mode.length === 0) {
                mode = number;
            } else {
                mode = `${mode}`;
            }
        }

        var variance = 0;
        for (i = 0; i < len; i++) {
            variance = variance + ((number[i]) - mean) * ((number[i]) - mean);
        }

        variance = variance / len;

        var standarddev = Math.sqrt(variance);

        var large = (number[len - 1]);
        var small = (number[0]);

        console.log(large);
        console.log(small);

        var range = large - small;
        var coffrange = (large - small) / (large + small);
        var coffvariation = (standarddev / mean) * 100;

        var mdmean = 0;
        for (i = 0; i < len; i++) {
            mdmean = mdmean + Math.abs((number[i]) - mean);
        }
        mdmean = mdmean / len;

        var mdmedian = 0;
        for (i = 0; i < len; i++) {
            mdmedian = mdmedian + Math.abs((number[i]) - median);
        }
        mdmedian = mdmedian / len;

        var mdmode = 0;
        for (i = 0; i < len; i++) {
            mdmode = mdmode + Math.abs((number[i]) - mode);
        }
        mdmode = mdmode / len;

        print += "Mean: " + mean + "<br>";
        print += "Median: " + median + "<br>";
        print += "Mode: " + mode + "<br>";
        print += "Variance: " + variance + "<br>";
        print += "Standard Deviation: " + standarddev + "<br>";
        print += "Range: " + range + "<br>";
        print += "Coefficient of Range: " + coffrange + "<br>";
        print += "Coefficient of Variation: " + coffvariation + "<br>";
        print += "Mean deviation about Mean: " + mdmean + "<br>";
        print += "Mean deviation about Median: " + mdmedian + "<br>";
        print += "Mean deviation about Mode: " + mdmode + "<br>";



        document.getElementById('result_cal_func_stats').innerHTML = print;
    }
}

function amsol() {
    var a = parseInt(document.getElementById("aval").value)
    var c = parseInt(document.getElementById("cval").value)
    var amadd = (a + c)
    var res = parseFloat(amadd / 2)
    var explain = document.getElementById("am_formula");
    var result = document.getElementById("am");
    var temp = " "; var temp1 = " ";
    if ((!isNaN(a)) && (!isNaN(c))) {
        temp += "Formül: \\[Aritmetik \\space Ortalama=\\space \\frac{a+c}{2} =\\space \\frac{" + a + "+" + c + "}{2}\\] ";
        temp1 += "Sonuç: " + res;
        explain.innerHTML = temp;
        result.innerHTML = temp1;
    }
    else {
        temp += "\\[Lütfen \\space tüm \\space alanları \\space doldurun\\]"
        temp1 += " ";
        explain.innerHTML = temp;
        result.innerHTML = temp1;
    }
    renderMathInElement(explain);
    renderMathInElement(result);
}

function hmgm() {
    var am = parseFloat(document.getElementById("am11").value)
    var gm = parseFloat(document.getElementById("gm11").value)
    var hm = (gm * gm) / am;
    var result = document.getElementById("hmgmans");
    var temp1 = " ";
    if ((!isNaN(am)) && (!isNaN(gm))) {
        temp1 += "\\[Harmonik \\space Ortalama=\\space \\frac{GM \\times GM}{AM} =\\space \\frac{" + gm + "\\times" + gm + "}{" + am + "}\\] ";
        temp1 += "\\[Sonuç: " + hm.toFixed(3) + "\\]";
        result.innerHTML = temp1;
    }
    else {
        temp1 += "\\[Lütfen \\space tüm \\space alanları \\space doldurun\\]"
        temp1 += " ";
        result.innerHTML = temp1;
    }
    renderMathInElement(result);
}


function gmsol() {
    var a = parseInt(document.getElementById("aval1").value)
    var c = parseInt(document.getElementById("cval1").value)
    var gmmul = (a * c)
    var explain = document.getElementById("gm_formula");
    if (!isNaN(a) && !isNaN(c)) {
        if (a < 0 && c < 0) {
            var res1 = -(Math.sqrt(gmmul))
            explain.innerHTML = "Formül: \\[\\space Geometrik \\space Ortalama=\\space\\ - \\sqrt{a \\times c} = \\space\\ - \\sqrt{" + a + "\\times" + c + "}\\] ";
            document.getElementById("gm").innerHTML = "Sonuç: " + res1
        }

        else if (a < 0 || c < 0) {
            explain.innerHTML = "Lütfen iki değer de pozitif veya negatif olacak şekilde değiştirin";
            document.getElementById("gm").innerHTML = "";
        }

        else {
            var res = Math.sqrt(gmmul)
            explain.innerHTML = "Formül: \\[\\space Geometrik \\space Ortalama=\\space \\sqrt{a \\times c} = \\space \\sqrt{" + a + "\\times" + c + "}\\] ";
            document.getElementById("gm").innerHTML = "Sonuç: " + res
        }
    }
    else {
        explain.innerHTML = "\\[Lütfen \\space tüm \\space alanları \\space doldurun\\]"
        document.getElementById("gm").innerHTML = "";
    }
    renderMathInElement(document.getElementById("gm_formula"));
}


var array = Array();
function add_element_to_array() {
    var x = 0;
    array[x] = document.getElementById("text1").value;
    alert("Element: " + array[x] + " Added at index " + x);
    x++;
    document.getElementById("text1").value = "";
}

let prime = new Uint8Array(1000001);
function seiveOfEratosthenes() {

    for (let i = 2; i < 1000001;
        i++) {
        prime[i] = 1;
    }

    for (let i = 2; i * i < 1000001; i++) {
        if (prime[i] == 1) {
            for (let j = i * i;
                j < 1000001; j += i) {
                prime[j] = 0;
            }
        }
    }
}

function arccos(degrees) {
    var radians = (degrees * Math.PI) / 180;
    return Math.arccos(radians);
}

function hmsol() {
    var a = parseInt(document.getElementById("aval2").value)
    var c = parseInt(document.getElementById("cval2").value)
    var hmmul = (2 * a * c)
    var hmadd = (a + c)
    var res = (hmmul / hmadd)
    var explain = document.getElementById("hm_formula");
    if (!isNaN(a) && !isNaN(c)) {
        explain.innerHTML = "Formül: \\[Harmonik \\space Ortalama=\\space \\frac{2ac}{a+c} = \\space \\frac{2\\times" + a + "\\times" + c + "}{" + a + "+" + c + "}\\] ";
        document.getElementById("hm").innerHTML = "Sonuç: " + res
    }
    else {
        explain.innerHTML = "\\[Lütfen \\space tüm \\space alanları \\space doldurun\\]"
        document.getElementById("hm").innerHTML = " ";

    }
    renderMathInElement(document.getElementById("hm_formula"));
}
function check_prime(isprime) {
    var num = document.getElementById(isprime).value;
    var num1 = parseInt(num);
    var ans = document.getElementById("isprimesol");
    var flag = true;
    if (!isNaN(num1)) {
        if (num1 >= 0) {
            ans.innerHTML = num1;
            ans.innerHTML += " is ";
            if (num1 == 1 || num1 == 0) {
                ans.innerHTML += "neither Prime nor Composite number.";
            } else {
                for (i = 2; i <= Math.sqrt(num1); i++) {
                    if (num1 % i == 0) {
                        flag = false;
                        break;
                    }
                }
                if (flag == true) {
                    ans.innerHTML += "a Prime number.";
                } else {
                    ans.innerHTML += "a Composite number.";
                }
            }
        }
        else {
            ans.innerHTML = "There are no negative prime numbers. Enter positive numbers to check for Primality."
        }
    } else
        ans.innerHTML = "Enter an integer!"
}


function lacubefind() {
    let n = parseInt(document.getElementById("lacube").value)
    let steps = 0;
    if (!isNaN(n)) {
        while (n) {
            let largest = Math.floor(Math.cbrt(n));
            n -= (largest * largest * largest);
            steps++;
        }
        document.getElementById("lacubeans").innerHTML = steps;
    }
    else {
        document.getElementById('lacubeans').innerHTML = 'Please enter all Input';
    }
}
function car_polar() {
    let x = parseInt(document.getElementById("car_x").value);
    let y = parseInt(document.getElementById("car_y").value);
    var resul = document.getElementById("car_polar_res");
    if (!isNaN(parseInt(x)) || !isNaN(parseInt(y))) {
        var r = Math.sqrt((x * x) + (y * y));
        var theta = Math.atan(y / x);
        resul.innerHTML = "Polar coordinate is: r = " + r + " and theta = " + theta + " in degree";
    }
    else {
        resul.innerHTML = "Enter valid numbers";
    }


}

function cylin_car() {
    let p = parseInt(document.getElementById("cylcar_p").value);
    let theta = parseInt(document.getElementById("cylcar_the").value);
    let z = parseInt(document.getElementById("cylcar_z").value);
    var resul = document.getElementById("cylcar_res");
    if (!isNaN(parseInt(p)) || !isNaN(parseInt(theta)) || !isNaN(parseInt(z))) {
        var x = p * cos(theta);
        var y = p * sin(theta);
        var z1 = z;
        resul.innerHTML = "Cartesian coordinate is: x = " + x + ", y = " + y + " and z = " + z1;
    }
    else {
        resul.innerHTML = "Enter valid values";
    }

}


function isPerfectCube(x) {
    var cr = Math.round(Math.cbrt(x));

    return (cr * cr * cr == x);
}
function cubefreefind() {
    let n = parseInt(document.getElementById("cubefree").value)
    if (!isNaN(n)) {
        for (let i = 2; i <= n; i++) {
            if (isCubeFree(i)) {
                document.getElementById("cubefreeans").innerHTML = "(" + i + " )"
            }
        }
    }
    else {
        document.getElementById('cubefreeans').innerHTML = 'Please enter all Input';
    }
}

function isCubeFree(n) {
    if (n == 1)
        return false;

    for (let i = 2; i * i * i <= n; i++)
        if (n % (i * i * i) == 0)
            return false;

    return true;
}

function gp() {
    var a = document.getElementById("firstterm").value
    var r = document.getElementById("ratio").value
    var n = document.getElementById("number").value
    var explain = document.getElementById("sumGP_formula");
    var printseries = document.getElementById("printGPseries");
    var explaintemp = "";
    var explain1temp = "";
    var ans;
    var ans1;



    if (!isNaN(parseInt(n)) && !isNaN(parseInt(a)) && !isNaN(parseInt(r))) {
        for (var i = 0, series = "", num = 0; i <= n - 1; i++) {
            num = parseInt(a) * Math.pow(r, i);
            series += (num.toString() + ", ");
        }

        explaintemp += "\\[Geometric \\space Progression : \\space a, \\space ar, \\space ar^2,....., \\space ar^{n-1} \\]";
        explaintemp += "\\[Geometric \\space Progression : " + series.substring(0, series.length - 2) + "\\]";
        printseries.innerHTML = explaintemp;
        renderMathInElement(printseries);
    }
    else {
        printseries.innerHTML = "\\[Enter \\space numbers \\space only. \\space Blank \\space inputs \\space are \\space not \\space allowed \\]";
        explain.innerHTML = "";
        renderMathInElement(printseries);
        return;
    }


    var power = parseFloat(Math.pow(r, n))
    if (r > 1) {
        ans1 = parseFloat(a * (power - 1))
        ans = parseFloat(ans1 / (r - 1))
        explain1temp += "\\[Formula : \\]";
        explain1temp += "\\[S_n=\\frac{a(r^n - 1)}{r - 1}\\]";
        explain1temp += "\\[S_n \\space = \\space \\frac{" + a + "(" + r + "^{" + n + "} - 1)}{" + r + "- 1}\\]";
        explain1temp += "\\[S_n \\space = \\space \\frac{" + a + "\\times" + ((power) - 1) + "}{" + (r - 1) + "}\\]";
        explain1temp += "\\[S_n \\space = " + ans + "\\]";
        explain.innerHTML = explain1temp;
        renderMathInElement(explain);
        cal = (a * (r ^ n - 1)) / (r - 1);
    } else if (r < 1) {
        ans1 = parseFloat(a * (1 - power))
        ans = parseFloat(ans1 / (1 - r))
        explain1temp += "\\[Formula : \\]";
        explain1temp += "\\[S_n=\\frac{a(r^n - 1)}{1 - r}\\]";
        explain1temp += "\\[S_n \\space = \\space \\frac{" + a + "(" + r + "^{" + n + "} - 1)}{1 -(" + r + ")}\\]";
        explain1temp += "\\[S_n \\space = \\space \\frac{" + a + "\\times" + ((power) - 1) + "}{" + (1 - r) + "}\\]";
        explain1temp += "\\[S_n \\space = " + ans + "\\]";
        explain.innerHTML = explain1temp;
        renderMathInElement(explain);
        cal = (a * (r ^ n - 1)) / (1 - r);
    } else if (r == 1) {
        ans = parseInt(a * n)
        explain1temp += "\\[Formula : \\]";
        explain1temp += "\\[S_n = an\\]";
        explain1temp += "\\[S_n \\space = \\space " + a + "\\times" + n + "\\]";
        explain1temp += "\\[S_n \\space = " + ans + "\\]";
        explain.innerHTML = explain1temp;
        renderMathInElement(explain);
        cal = a * n;
    }
}

function permutationcal(nval, rval) {
    document.getElementById("permutation_div").style.display = "block";
    document.getElementById("combination_div").style.display = "none";
    var val1 = document.getElementById(nval).value;
    var val2 = document.getElementById(rval).value;
    var regex = /^[\-]*[\d]+$/
    var textVal1 = regex.test(val1);
    var testVal2 = regex.test(val2);
    if (!textVal1 || !testVal2) {
        document.getElementById("permutation_wrong").innerHTML = "sadece tam sayı değerleri girin";
        document.getElementById("premutation_div_div2").style.display = "none";
        document.getElementById("permutation_div_div1").style.display = "block";
        return;
    }
    var val3 = parseInt(val1);
    var val4 = parseInt(val2);
    if (isNaN(val3) || isNaN(val4)) {

        document.getElementById("premutation_div_div2").style.display = "none";
        document.getElementById("permutation_div_div1").style.display = "none";
    } else if (val3 < 0 || val4 < 0) {
        document.getElementById("permutation_wrong").innerHTML =
            "n ve r değerleri pozitif olmak zorundadır";
        document.getElementById("premutation_div_div2").style.display = "none";
        document.getElementById("permutation_div_div1").style.display = "block";
    } else if (val3 < val4) {
        document.getElementById("permutation_wrong").innerHTML =
            "n değeri r değerinden büyük olmak zorundadır";
        document.getElementById("premutation_div_div2").style.display = "none";
        document.getElementById("permutation_div_div1").style.display = "block";

    } else {
        let ans1 = 1,
            ans2 = 1,
            ans3 = 0;
        if (val3 - val4 == 0) {
            for (i = 1; i <= val3; i++) {
                ans1 *= i;
            }
            document.getElementById(
                "permutation_ans"
            ).innerHTML = `(${val3}) ! / (${val3} - ${val4}) ! = ${ans1}`;
            document.getElementById("permutation_div_div1").style.display = "none";
            document.getElementById("premutation_div_div2").style.display = "block";
        } else {
            for (i = 1; i <= val3; i++) {
                ans1 *= i;
            }
            for (i = 1; i <= val3 - val4; i++) {
                ans2 *= i;
            }
            ans3 = ans1 / ans2;
            document.getElementById(
                "permutation_ans"
            ).innerHTML = `(${val3}) ! / (${val3} - ${val4}) ! = ${ans3}`;
            document.getElementById("permutation_div_div1").style.display = "none";
            document.getElementById("premutation_div_div2").style.display = "block";
        }
    }
}
function combinationcal(nval, rval) {
    document.getElementById("combination_div").style.display = "block";
    document.getElementById("permutation_div").style.display = "none";
    var val1 = document.getElementById(nval).value;
    var val2 = document.getElementById(rval).value;
    var regex = /^[\-]*[\d]+$/
    var textVal1 = regex.test(val1);
    var testVal2 = regex.test(val2);
    if (!textVal1 || !testVal2) {
        document.getElementById("combination_wrong").innerHTML = "sadece tam sayı değerleri girin";
        document.getElementById("combination_div_div2").style.display = "none";
        document.getElementById("combination_div_div1").style.display = "block";
        return;
    }
    var val3 = parseInt(val1);
    var val4 = parseInt(val2);
    if (isNaN(val3) || isNaN(val4)) {
        document.getElementById("combination_div_div2").style.display = "none";
        document.getElementById("combination_div_div1").style.display = "none";
    } else if (val3 < 0 || val4 < 0) {
        document.getElementById("combination_wrong").innerHTML =
            "n ve r değerleri pozitif olmak zorundadır";
        document.getElementById("combination_div_div2").style.display = "none";
        document.getElementById("combination_div_div1").style.display = "block";

    } else if (val3 < val4) {
        document.getElementById("combination_wrong").innerHTML =
            "n değeri r değerinden büyük olmak zorundadır";
        document.getElementById("combination_div_div2").style.display = "none";
        document.getElementById("combination_div_div1").style.display = "block";

    } else {
        let ans1 = 1,
            ans2 = 1,
            ans3 = 1;
        let ans4 = 0;
        if (val3 - val4 == 0) {
            document.getElementById(
                "combination_ans"
            ).innerHTML = `(${val3}) ! / ( (${val4})! x (${val3} - ${val4}) ! ) = 1`;
            document.getElementById("combination_div_div1").style.display = "none";
            document.getElementById("combination_div_div2").style.display = "block";
        } else {
            for (i = 1; i <= val3; i++) {
                ans1 *= i;
            }
            for (i = 1; i <= val4; i++) {
                ans2 *= i;
            }
            for (i = 1; i <= val3 - val4; i++) {
                ans3 *= i;
            }
            console.log(ans1);
            console.log(ans2);
            console.log(ans3);
            ans4 = ans1 / (ans2 * ans3);
            document.getElementById(
                "combination_ans"
            ).innerHTML = `(${val3}) ! / ( (${val4}) ! x (${val3} - ${val4}) ! ) = ${ans4}`;
            document.getElementById("combination_div_div1").style.display = "none";
            document.getElementById("combination_div_div2").style.display = "block";
        }
    }
}

function sensiCal() {
    var tp = parseInt(document.getElementById("tp").value);
    var tn = parseInt(document.getElementById("tn").value);
    var fp = parseInt(document.getElementById("fp").value);
    var fn = parseInt(document.getElementById("fn").value);
    document.getElementById("sensiAns").innerHTML = "";
    document.getElementById("speciAns").innerHTML = "";

    if (isNaN(tp) || isNaN(tn) || isNaN(fp) || isNaN(fn)) {
        document.getElementById("sensiAns").innerHTML = "Proper input is required";
        document.getElementById("speciAns").innerHTML = "";

    }
    else {
        var sensi = (tp / (tp + fn)).toFixed(3) * 100;
        var speci = tn / (fp + tn).toFixed(3) * 100;
        var ans = "\\[Sensitivity:\\space" + sensi.toFixed(3) + "\\space \\%\\]" + "\\[Specificity:\\space" + speci.toFixed(3) + "\\space \\%\\]" + "\\[Sensitivity=\\frac{TP}{(TP+FN)}\\times 100 \\space \\%\\]" + "\\[\\space =\\frac{" + tp + "}{(" + tp + "+" + fn + ")}\\times 100 \\space \\%=" + sensi.toFixed(3) + "\\space \\%\\]"
        ans += "\\[Specificity=\\frac{TN}{(FP+TN)}\\times 100 \\space \\%\\]" + "\\[\\space =\\frac{" + tn + "}{(" + fp + "+" + tn + ")}\\times 100 \\space \\%=" + speci.toFixed(3) + "\\space \\%\\]"

        document.getElementById("sensiAns").innerHTML = ans;
        renderMathInElement(document.getElementById("sensiAns"))
    }
}


function cube() {
    let h = parseFloat(document.getElementById("cube1").value)
    var output = document.getElementById("cubeans")
    var ans = ""
    var v = Math.pow(h, 3);
    if (!isNaN(h)) {
        if (h < 0) {
            ans += "\\[Height \\space of \\space the \\space Cylinder \\space cannot \\space be \\space negative.\\]"
            output.innerHTML = ans
        } else {
            ans += "\\[Side \\space of \\space the \\space Cube \\space = \\space Height \\space of \\space the \\space Cylinder \\]"
            ans += "\\[Volume \\space = \\space (height)^{3} \\space = \\space " + h + "^{3} \\]"
            ans += "\\[Volume \\space of \\space the \\space biggest \\space cube \\space that \\space can \\space be \\space inscribed \\space in \\space cylinder \\space = \\space " + v + " \\]"
            output.innerHTML = ans
        }
    }
    else {
        ans += "\\[Please \\space enter \\space valid \\space input \\]"
        output.innerHTML = ans
    }
    renderMathInElement(output)
}


function Median() {
    document.getElementById("Meanresult").innerHTML = "";
    var arr = document.getElementById("getNum").value;
    arr = arr.trim()
    arr = arr.match(/(^([-]{0,1}\d{1,}[\.]{0,1}\d{0,}[ ]?)*$)/g);

    if (arr == null) {
        document.getElementById("Meanresult").innerHTML = `Proper input is required`;
        return;
    }

    arr = JSON.stringify(arr)

    arr = arr.substring(2, arr.length - 2)
    arr = arr.split(" ");
    arr = arr.filter(function (str) {
        return /\S/.test(str);
    });
    var len = parseInt(arr.length);
    arr = arr.sort();
    let mid = Math.floor(len / 2);
    if (arr.length === 0) {
        document.getElementById("Meanresult").innerHTML = `No Number Added`;
    } else {
        let median =
            len % 2 === 0
                ? (parseFloat(arr[mid]) + parseFloat(arr[mid - 1])) / 2
                : parseInt(arr[mid]);
        document.getElementById(
            "Meanresult"
        ).innerHTML = `After Sorting: ${arr}</br>`;
        var med = median.toFixed(5);
        document.getElementById("Meanresult").innerHTML += `Median: `;
        document.getElementById("Meanresult").innerHTML += med;
        renderMathInElement(document.getElementById("Meanresult"));
    }
}

function Mode() {
    document.getElementById("Meanresult").innerHTML = "";
    var arr = document.getElementById("getNum").value;
    arr = arr.trim()
    arr = arr.match(/(^([-]{0,1}\d{1,}[\.]{0,1}\d{0,}[ ]?)*$)/g);

    if (arr == null) {
        document.getElementById("Meanresult").innerHTML = `Proper input is required`;
        return;
    }

    arr = JSON.stringify(arr)


    arr = arr.substring(2, arr.length - 2)
    arr = arr.split(" ");
    arr = arr.filter(function (str) {
        return /\S/.test(str);
    });
    const frequencyTable = {};
    arr.forEach((elem) => (frequencyTable[elem] = frequencyTable[elem] + 1 || 1));

    let modes = [];
    let maxFrequency = 0;
    for (const key in frequencyTable) {
        if (frequencyTable[key] > maxFrequency) {
            modes = [Number(key)];
            maxFrequency = frequencyTable[key];
        } else if (frequencyTable[key] === maxFrequency) {
            modes.push(Number(key));
        }
    }

    if (modes.length === arr.length) modes = [];
    if (arr.length === 0) {
        document.getElementById("Meanresult").innerHTML = `No Number Added`;
    } else {
        if (modes.length === 0) {
            document.getElementById(
                "Meanresult"
            ).innerHTML += `All Number appeared Just Once`;
        } else {
            document.getElementById("Meanresult").innerHTML += `Mode is: ${modes}`;
        }
    }
}

function solvesphere_shell() {
    var R = document.getElementById("inputsphere_shellR").value;
    var r = document.getElementById("inputsphere_shellr").value;
    var aoutput = document.getElementById("resultofsphereshella");
    var voloutput = document.getElementById("resultofsphereshellvol");
    var areaoutput = document.getElementById("resultofsphereshellarea");
    var atemp = "";
    var areatemp = "";
    var voltemp = "";
    var th = (R - r)
    var vol = 1.33 * 3.14 * ((R * R * R) - (r * r * r));
    var area = 4 * 3.14 * ((R * R) + (r * r));
    if ((R != "") && (r != "")) {
        atemp += "\\[Shell \\space thickness \\space of \\space Spherical \\space shell \\space \\newline " + R + "-" + r + "\\ = " + eval(String(th)) + "\\]";
        aoutput.innerHTML = atemp;
        voltemp += "\\[Volume \\space of \\space Spherical \\space shell \\space \\newline \\frac{4}{3} \\times \\pi (" + R + "^3-" + r + "^3 )" + "\\ = " + eval(String(vol)).toFixed(2) + "\\]";
        voloutput.innerHTML = voltemp;
        areatemp += "\\[Area \\space of \\space Spherical \\space shell \\space  \\newline" + "4 \\times \\pi (" + R + "^2+" + r + "^2) " + "\\ = " + eval(String(area)).toFixed(2) + "\\]";
        areaoutput.innerHTML = areatemp;
        renderMathInElement(aoutput);
        renderMathInElement(voloutput);
        renderMathInElement(areaoutput);

    } else {
        aoutput.innerHTML = "";
        voloutput.innerHTML = "";
        areaoutput.innerHTML = "";
    }

}

function solvedoublept() {
    var r = document.getElementById("inputdoubleptr").value;
    var a = document.getElementById("inputdoublepta").value;
    var b = document.getElementById("inputdoubleptb").value;
    var c = document.getElementById("inputdoubleptc").value;
    var voloutput = document.getElementById("resultofdoubleptvol");
    var areaoutput = document.getElementById("resultofdoubleptarea");
    var areatemp = "";
    var voltemp = "";
    var vol = 3.14 * r * r * (a + (0.33 * b) + (0.33 * c));
    var area = 3.14 * r * (2 * a + Math.sqrt((b * b) + (r * r)) + Math.sqrt((c * c) + (r * r)));
    if ((a != "") && (r != "") && (b != "") && (c != "")) {
        voltemp += "\\[Volume \\space of \\space Double \\space Point \\space \\newline  \\pi \\times" + r + "\\times" + r + "\\times (" + a + "+ \\frac{" + b + "}{3} + \\frac{" + c + "}{3})" + "\\sqrt{" + c + "^2 + " + r + "^2 }" + "\\ = " + eval(String(vol)).toFixed(2) + "\\]";
        voloutput.innerHTML = voltemp;
        areatemp += "\\[Area \\space of \\space Double \\space Point \\space  \\newline" + "\\pi \\times" + r + "\\times(2" + a + "+" + "\\sqrt{" + b + "^2+" + r + "^2}" + "\\sqrt{" + c + "^2+" + r + "^2})" + "\\ = " + eval(String(area)).toFixed(2) + "\\]";
        areaoutput.innerHTML = areatemp;
        renderMathInElement(voloutput);
        renderMathInElement(areaoutput);

    } else {
        voloutput.innerHTML = "";
        areaoutput.innerHTML = "";
    }

}

function Variance() {
    var s = 0, ans = 0;
    document.getElementById("Meanresult").innerHTML = "";
    var val = document.getElementById("getNum").value;

    val = val.trim()
    val = val.match(/(^([-]{0,1}\d{1,}[\.]{0,1}\d{0,}[ ]?)*$)/g);

    if (val == null) {
        document.getElementById("Meanresult").innerHTML = `Proper input is required`;
        return;
    }

    val = JSON.stringify(val)


    val = val.substring(2, val.length - 2)

    val = val.split(" ");
    val = val.filter(function (str) {
        return /\S/.test(str);
    });
    var len = parseInt(val.length);
    for (i = 0; i < len; i++) {
        s = s + parseFloat(val[i]);
    }
    if (val.length === 0) {
        document.getElementById("Meanresult").innerHTML = `No Number Added`;
    } else {
        document.getElementById("Meanresult").innerHTML = `Variance is => <br>`;
        var mean = s / len;
        for (i = 0; i < len; i++) {
            num = parseFloat(val[i]);
            ans = ans + Math.pow(num - mean, 2);
            if (i == 0) {
                document.getElementById("Meanresult").innerHTML += `(${String(Math.pow(num - mean, 2))}`;
            } else {
                document.getElementById("Meanresult").innerHTML += ` + ${String(Math.pow(num - mean, 2))}`;
            }
        }
        document.getElementById("Meanresult").innerHTML += `)/${val.length} &nbsp; =  &nbsp;`;
        document.getElementById("Meanresult").innerHTML += ans.toFixed(5);
        document.getElementById("Meanresult").innerHTML += `/${val.length} &nbsp;= <br>`;
        ans = ans / len;
        document.getElementById("Meanresult").innerHTML += ans.toFixed(5);
    }


    renderMathInElement(document.getElementById("Meanresult"));
}

function gcd(a, b) {

    if (a == 0 || b == 0)
        return 0;


    if (a == b)
        return a;


    if (a > b)
        return gcd(a - b, b);
    return gcd(a, b - a);
}

function std() {
    var s = 0, ans = 0;
    document.getElementById("Meanresult").innerHTML = "";
    var val = document.getElementById("getNum").value;

    val = val.trim()
    val = val.match(/(^([-]{0,1}\d{1,}[\.]{0,1}\d{0,}[ ]?)*$)/g);

    if (val == null) {
        document.getElementById("Meanresult").innerHTML = `Proper input is required`;
        return;
    }

    val = JSON.stringify(val)


    val = val.substring(2, val.length - 2)

    val = val.split(" ");
    val = val.filter(function (str) {
        return /\S/.test(str);
    });
    var len = parseInt(val.length);
    for (i = 0; i < len; i++) {
        s = s + parseFloat(val[i]);
    }
    if (val.length === 0) {
        document.getElementById("Meanresult").innerHTML = `No Number Added`;
    } else {
        document.getElementById("Meanresult").innerHTML = `Standard Deviation is => <br>`;
        var mean = s / len;
        for (i = 0; i < len; i++) {
            num = parseFloat(val[i]);
            ans = ans + Math.pow(num - mean, 2);
            if (i == 0) {
                document.getElementById("Meanresult").innerHTML += `&#8730; (${String(Math.pow(num - mean, 2))}`;
            } else {
                document.getElementById("Meanresult").innerHTML += ` + ${String(Math.pow(num - mean, 2))}`;
            }
        }
        document.getElementById("Meanresult").innerHTML += `)/&#8730; ${val.length} &nbsp; =  &nbsp;`;
        document.getElementById("Meanresult").innerHTML += `&#8730; ${ans}`;
        document.getElementById("Meanresult").innerHTML += `/ &#8730;${val.length} &nbsp;= <br>`;
        ans = ans / len;
        document.getElementById("Meanresult").innerHTML += `&#8730; ${ans} &nbsp; = &nbsp`;
        ans = Math.sqrt(ans);
        document.getElementById("Meanresult").innerHTML += ans.toFixed(5);
    }


    renderMathInElement(document.getElementById("Meanresult"));
}


function smallestPrimeDivisor(num) {
    var res = 0;
    if (num % 2 == 0 || num == "") {
        if (num == "") {
            document.getElementById("smPrimeResult1").innerHTML = "\\[Please \\space enter \\space the \\space value\\]";
            renderMathInElement(document.getElementById("smPrimeResult1"));
        } else if ((num % 2 == 0) && num != "") {
            res = 2;
            document.getElementById("smPrimeResult1").innerHTML = "\\[The \\space entered \\space number, \\space " + num + " \\space is \\space an \\space EVEN \\space number \\newline Hence, \\space the \\space smallest \\space prime \\space factor \\space will \\space be \\newline \\space = \\space " + res + "\\]";
            renderMathInElement(document.getElementById("smPrimeResult1"));
        }
        document.getElementById("smPrimeResult2").innerHTML = ""; document.getElementById("smPrimeResult3").innerHTML = "";
        document.getElementById("smPrimeResult4").innerHTML = ""; document.getElementById("smPrimeResult5").innerHTML = ""; return;
    } else {
        document.getElementById("smPrimeResult1").innerHTML = "";
        document.getElementById("smPrimeResult5").innerHTML = "";
        document.getElementById("smPrimeResult2").innerHTML = "\\[The \\space entered \\space number, \\space " + num + " \\space is \\space an \\space ODD \\space number\\]";
        renderMathInElement(document.getElementById("smPrimeResult2"));
        for (let i = 3; i * i <= num; i += 2) {
            document.getElementById("smPrimeResult3").innerHTML = "\\[First \\space we \\space take \\space a \\space loop \\space where \\space number \\space ranges \\space from \\space 3^2 \\space to \\space " + num + " \\space with \\space  difference \\space of \\space 2 \\newline And, \\space check \\space if \\space any \\space number \\space completely \\space divides \\space " + num + "\\]";
            renderMathInElement(document.getElementById("smPrimeResult3"));
            if (num % i == 0) {
                document.getElementById("smPrimeResult4").innerHTML = "\\[" + num + " \\space is \\space completely \\space divisible \\space by \\space " + i + " \\newline Hence, \\space the \\space smallest \\space prime \\space factor \\space will \\space be \\newline \\space = \\space " + i + "\\]";
                renderMathInElement(document.getElementById("smPrimeResult4")); res = i; break;
            }
        }
    } if (!res) {
        document.getElementById("smPrimeResult5").innerHTML = "\\[" + num + " \\space is \\space niether \\space even \\space or \\space any \\space number \\space from \\space 3^2 \\space to \\space " + num + " \\space completely \\space divides \\space it \\newline Hence , \\space the \\space smallest \\space prime \\space factor \\space will \\space be \\space the \\space number \\space itself \\newline \\space = \\space " + num + "\\]";
        renderMathInElement(document.getElementById("smPrimeResult5"));
        document.getElementById("smPrimeResult2").innerHTML = ""; document.getElementById("smPrimeResult3").innerHTML = "";
        document.getElementById("smPrimeResult4").innerHTML = ""; document.getElementById("smPrimeResult1").innerHTML = "";
    }
}


function cubeinconefind() {
    let h = parseFloat(document.getElementById("cubeincone").value)
    let r = parseFloat(document.getElementById("cubeincone1").value)
    var a1 = (h * r * Math.sqrt(2));
    var a2 = (h + Math.sqrt(2) * r);
    var a11 = a1 / a2;
    let result = document.getElementById("cubeinconeans")
    let ans = ""
    if (h < 0 || r < 0) {
        ans += "\\[Height \\space and \\space Radius \\space cannot \\space be \\space negative \\]"
        result.innerHTML = ans
    }
    else if (!isNaN(r) && !isNaN(h)) {
        ans += "\\[Side \\space of \\space the \\space cube (a) \\space is  \\]"
        ans += "\\[\\frac{h \\times r \\sqrt{2}}{(h + \\sqrt{2}) \\times r} \\]"
        ans += "\\[\\frac{" + h + " \\times " + r + " \\sqrt{2}}{(" + h + " + \\sqrt{2}) \\times " + r + "} \\]"
        ans += "\\[\\frac{" + a1.toFixed(4) + "}{" + a2.toFixed(4) + "} \\space = \\space " + a11.toFixed(4) + " \\]"
        result.innerHTML = ans
    }
    else {
        ans += "\\[Please \\space enter \\space valid \\space input \\]"
        result.innerHTML = ans
    }
    renderMathInElement(result)

}

function cylinderincubefind() {
    let a = parseInt(document.getElementById("cylinderincube").value)
    var r = a / 2;
    var h = a;
    var V = (3.1416 * Math.pow(r, 2) * h);
    var output = document.getElementById("cylinderincubeans")
    var ans = "";
    if (!isNaN(a)) {
        ans += "\\[Height \\space of \\space the \\space cylinder (h) \\space = \\space Side \\space of \\space the \\space cube (a) \\]"
        ans += "\\[Radius \\space of \\space the \\space cylinder (r) \\space = \\space \\frac{Side \\space of \\space the \\space cube (a)}{2} \\]"
        ans += "\\[Volume \\space of \\space the \\space cylinder (v) \\space = \\space π \\times r^{2} \\times h \\space = \\space π \\times (\\frac{a}{2})^{2} \\times a \\]"
        ans += "\\[Volume \\space of \\space the \\space cylinder \\space Inscribed \\space in \\space a \\space cube (v) \\space = \\space π \\times \\frac{a^{2}}{4} \\times a \\space = \\space " + (Math.PI).toFixed(4) + " \\times \\frac{" + a ** 2 + "}{4} \\times " + a + " \\space = \\space " + (Math.PI).toFixed(4) + "\\times " + (a ** 2 / 4) + " \\times " + a + " \\space = \\space " + V.toFixed(4) + " \\]"
        output.innerHTML = ans;
    }
    else {
        ans += "\\[Please \\space enter \\space the \\space value \\]";
        output.innerHTML = ans;
    }
    renderMathInElement(output);
}

function cylinderinspherefind() {
    var r = parseInt(document.getElementById("cylinderinsphere").value)
    var output = document.getElementById("cylinderinsphereans");
    var ans = "";
    a = r * r * r;
    var ans = (4 * math.pi * a);
    var v = ans / (3 * math.sqrt(3));

    if (!isNaN(a)) {
        ans += "\\[Volume \\space of \\space Largest \\space cylinder \\space that \\space can \\space be \\space inscribed \\space within \\space a \\space sphere, \\]"
        ans += "\\[\\space = \\space \\frac{4 \\times \\pi \\times (Side \\space length \\space of \\space sphere)^3}{3 \\times \\sqrt{3}}\\]"
        ans += "\\[\\space = \\space \\frac{4 \\times \\pi \\times (" + r + ")^3}{3 \\times \\sqrt{3}}\\]"
        ans += "\\[\\space = \\space \\frac{4 \\times \\pi \\times " + a + "}{3 \\times \\sqrt{3}} \\]"
        ans += "\\[\\space = \\space \\frac{4 \\times " + (math.pi * a) + "}{3 \\times \\sqrt{3}} \\]"
        ans += "\\[\\space = \\space \\frac{4 \\times " + (math.pi * a) + "}{3 \\times " + (math.sqrt(3)) + "} \\]"
        ans += "\\[\\space = \\space \\frac{4 \\times " + (math.pi * a) + "}{" + (3 * math.sqrt(3)) + "} \\]"
        ans += "\\[\\space = \\space \\frac{" + (4 * math.pi * a) + "}{" + (3 * math.sqrt(3)) + "} \\]"
        ans += "\\[\\space = \\space " + v.toFixed(3) + "\\]"
        ans += "\\[Hence, \\space the \\space volume \\space is,\\]"
        ans += "\\[\\space = \\space " + v.toFixed(3) + "\\]"

        output.innerHTML = ans;
    }
    else {
        ans += "\\[Please \\space enter \\space the \\space value \\]";
        output.innerHTML = ans;
    }
    renderMathInElement(output);
}

function cubeincylinderfind() {
    let r = parseInt(document.getElementById("cubeincylinder").value)
    let h = parseInt(document.getElementById("cubeincylinder1").value)
    var output = document.getElementById("cubeincylinderans")
    var ans = ""
    var a = Math.pow(h, 3);
    if (h < 0 || r < 0) {
        ans += "\\[Height \\space and \\space Radius \\space of \\space the \\space Cylinder \\space cannot \\space be \\space negative.\\]"
        output.innerHTML = ans
    }
    else if (!isNaN(h)) {
        ans += "\\[Side \\space of \\space the \\space Cube \\space = \\space Height \\space of \\space the \\space Cylinder \\]"
        ans += "\\[Volume \\space = \\space (height)^{3} \\space = \\space " + h + "^{3} \\]"
        ans += "\\[Volume \\space of \\space the \\space cube \\space that \\space can \\space be \\space inscribed \\space in \\space cylinder \\space = \\space " + a + " \\]"
        output.innerHTML = ans
    }
    else {
        ans += "\\[Please \\space enter \\space valid \\space input \\]"
        output.innerHTML = ans
    }
    renderMathInElement(output)

}

function coneincubefind() {
    let a = parseInt(document.getElementById("shapeinscribedin").value)
    var output = document.getElementById("coneincubeans")
    var ans = ""
    let r = (a / Math.sqrt(2));
    r = r.toFixed(5)
    let h = a
    if (a < 0) {
        ans += "\\[side \\space length \\space cannot \\space be \\space negative \\]"
        output.innerHTML = ans
    }
    else if (!isNaN(a)) {
        ans += "\\[Radius \\space of \\space the \\space cone (r) \\space = \\space \\frac{a}{\\sqrt{2}} \\space = \\space \\frac{" + a + "}{\\sqrt{2}} \\space = \\space " + r + " \\]"
        ans += "\\[Height \\space of \\space the \\space cone (h) \\space = \\space a \\space = \\space " + h + "  \\]"
        output.innerHTML = ans
    }
    else {
        ans += "\\[Please \\space enter \\space valid \\space input \\]"
        output.innerHTML = ans
    }
    renderMathInElement(output)
}


function polymaxfind() {
    var n = (document.getElementById("polymax").value);
    if (n != "") {
        if (parseInt(n) < 4) {
            document.getElementById("polymaxans").innerHTML = "\\[Since \\space number \\space of \\space sides \\space is \\space " + n + " \\space and \\space minimum \\space side \\space for \\space the \\space polygon \\space to \\space be \\space escribed \\space is \\space 4 \\newline Hence, \\space No \\space Polygon \\space can \\space be \\space escribed\\]";
        } else if (parseInt(n) % 2 === 0) {
            document.getElementById("polymaxans").innerHTML = "\\[Since \\space number \\space of \\space sides \\space is \\space " + n + " \\space and \\space " + n + " \\space is \\space completely \\space divisible \\space by \\space 2 \\newline Hence, \\space Number \\space of \\space Polygon \\space that \\space can \\space be \\space escribed \\space is \\newline \\frac{" + n + "}{2} \\space = \\space " + (n / 2).toFixed(3) + "\\]";
        } else {
            document.getElementById("polymaxans").innerHTML = "\\[No \\space Polygon \\space can \\space be \\space escribed\\]";
        }
    } else {
        document.getElementById("polymaxans").innerHTML = "\\[Please \\space enter \\space the \\space value\\]";
    }
    renderMathInElement(document.getElementById("polymaxans"));
}
function recifind() {
    let A = parseInt(document.getElementById("aofeqn1").value)
    let B = parseInt(document.getElementById("bofeqn1").value)
    let C = parseInt(document.getElementById("cofeqn1").value)
    var output = document.getElementById("recians")
    var ans = "";
    if (!isNaN(A) && !isNaN(B) && !isNaN(C)) {
        ans += "\\[For \\space the \\space Quadratic \\space Equation \\space aX^{2}+bX+c \\space = \\space 0 \\space consider \\space the \\space roots \\space are \\space given \\space p,q \\]"
        ans += "\\[Sum \\space and \\space Product \\space of \\space roots \\space is \\space given \\space by, \\] "
        ans += "\\[p \\space + \\space q \\space = \\space \\frac{-b}{a} and \\space p \\space \\times \\space q \\space = \\space \\frac{c}{a} \\]"
        ans += "\\[The \\space reciprocal \\space of \\space the \\space roots \\space are \\space \\frac{1}{p} \\space , \\space \\frac{1}{q}  \\]"
        ans += "\\[\\frac{1}{p} \\space + \\space \\frac{1}{q} \\space = \\space \\frac{-b}{c} and \\space \\frac{1}{p} \\space \\times \\space \\frac{1}{q} \\space = \\space \\frac{a}{c} \\]"
        ans += "\\[Solving \\space roots \\space the \\space Quadratic \\space Equation \\space becomes \\space cX^{2}+bX+a \\space = 0 \\]"
        ans += "\\[The \\space Quadratic \\space Equation \\space with \\space these \\space reciprocal \\space roots \\space is (" + C + ")  X^2 + (" + B + ") X + (" + A + ") = 0 \\]"
        output.innerHTML = ans;
    }
    else {
        ans += "\\[Please \\space enter \\space the \\space value\\]";
        output.innerHTML = ans;
    }
    renderMathInElement(output);
}

function isPrime(n) {
    if (n <= 1)
        return false;
    if (n <= 3)
        return true;
    if (n % 2 == 0 || n % 3 == 0)
        return false;

    for (let i = 5; i * i <= n; i = i + 6) {
        if (n % i == 0 || n % (i + 2) == 0)
            return false;
    }

    return true;
}

function nextPrime(num) {
    var ans = document.getElementById("nextPrimeResult");
    if (num <= 1)
        nextPrimeResult.innerHTML += "The next prime number of " + num + " is: " + 2 + " since it is the first prime number";
    else {
        let res = num;
        let isFound = false;
        nextPrimeResult.innerHTML += "Check whether the next number is prime or not<br>";
        while (!isFound) {
            res++;
            nextPrimeResult.innerHTML += "The next number is " + res + "<br>";
            if (isPrime(res)) {
                isFound = true;
                nextPrimeResult.innerHTML += res + " is prime number<br>";
            }
        }
        nextPrimeResult.innerHTML += "Therefore next prime number of " + num + " is: " + res;
    }
}


function cos(degrees) {
    var radians = (degrees * Math.PI) / 180;
    return Math.cos(radians);
}

function external_radius() {
    var R1 = (document.getElementById("radius1").value);
    var re = 2 * R1;
    cirout = document.getElementById("externradius");
    cirtemp = "";
    if (!isNaN(R1) && R1 != "") {
        cirtemp += "\\[Circumradius \\space of \\space External \\space Triangle \\space \\]";
        cirtemp += "\\[\\space =  \\space 2 \\times (External \\space radius) \\]";
        cirtemp += "\\[\\space = \\space 2 \\times " + R1 + "\\]";
        cirtemp += "\\[\\space = \\space " + re.toFixed(3) + " \\space\\]";

        cirout.innerHTML = cirtemp;
    } else {
        cirtemp = "\\[Please \\space enter \\space valid \\space output\\]";
        cirout.innerHTML = cirtemp;
    }
    renderMathInElement(cirout);

}

function dfact(num) {
    if (num == 0 || num == 1)
        return 1;
    return num * dfact(num - 2);
}

function doubleFactorial(num) {
    var result = document.getElementById("dblFactResult");
    if (num % 2 == 0) {
        result.innerHTML += "<h2 style='margin-top: 50px;'>Working Steps </h2> &emsp;";
        result.innerHTML += num + "&nbsp; is EVEN <br>";
        result.innerHTML += "So,Double Factorial for even numbers <br>";
        result.innerHTML += "= &nbsp; n*(n-2)*(n-4).....6*4*2 <br>";
        result.innerHTML += "So, Double Factorial of " + num + "&nbsp; = &nbsp;";
        for (var i = num; i > 0; i = i - 2) {
            result.innerHTML += "&nbsp;" + i + "&nbsp; * &nbsp;";
        }
        result.innerHTML += "<br>";
        result.innerHTML += num + "!! &nbsp; = &nbsp;" + dfact(num) + "<br>";
    } else if (num % 2 == 1) {
        result.innerHTML += "<h2 style='margin-top: 50px;'>Working Steps </h2> &emsp;";
        result.innerHTML += num + "&nbsp; is ODD <br>";
        result.innerHTML += "So,Double Factorial for odd numbers <br>";
        result.innerHTML += "= &nbsp; n*(n-2)*(n-4).....5*3*1 <br>";
        result.innerHTML += "So, Double Factorial of " + num + "&nbsp; = &nbsp;";
        for (var i = num; i > 0; i = i - 2) {
            result.innerHTML += "&nbsp;" + i + "&nbsp; * &nbsp;";
        }
        result.innerHTML += "<br>";
        result.innerHTML += num + "!! &nbsp; = &nbsp;" + dfact(num) + "<br>";
    } else if (num == 0) {
        result.innerHTML += "The Double Factorial of " + num + " is: " + dfact(num);
    } else if (num == -1) {
        result.innerHTML += "The Double Factorial of " + num + " is: &nbsp; 1";
    }
}

function catalanNumbers(num) {
    if (num == "") {
        document.getElementById("catNumResult").innerHTML = "Enter the number to find answer";
    }
    else {
        let res = "";
        for (let i = 0; i < num; i++) {
            res += catalan(i);
            res += " ";
        }
        document.getElementById("catNumResult").innerHTML = "The Catalan Numbers are: " + res;
    }
}

function dist_incenex() {
    var r = parseInt(document.getElementById("ex_rad").value);
    var ang = parseInt(document.getElementById("angle_1").value);
    var ans = 4 * r * (sin(ang / 2));
    var excirout = document.getElementById("dist_inex");
    var excirtemp = "";
    if (isNaN(r) || isNaN(ang)) {
        excirtemp += "\\[Please \\space enter \\space valid \\space input\\]";

        excirout.innerHTML = excirtemp;
    } else {
        excirtemp += "\\[ \\space = \\space 4 \\times ( Dış \\space yarıçap) \\times sin(\\frac{(A \\space açısı)}{2}) \\space \\]";
        excirtemp += "\\[ \\space = \\space 4 \\times " + r + " \\times sin(\\frac{(" + ang + ")}{2}) \\space \\]";
        excirtemp += "\\[ \\space = \\space 4  \\times " + r + " \\times (" + (sin(ang / 2)).toFixed(2) + ") \\space \\]";
        excirtemp += "\\[\\space = \\space " + ans.toFixed(3) + " \\space \\]";

        excirout.innerHTML = excirtemp;
    }
    renderMathInElement(excirout);
}

function sin(degrees) {
    var radians = (degrees * Math.PI) / 180;
    return Math.sin(radians);
}

function sin(degrees) {
    var radians = (degrees * Math.PI) / 180;
    return Math.sin(radians);
}

function gcd(a, b) {
    if (a % b != 0)
        return gcd(b, a % b);
    else
        return b;
}

function regang() {
    var a1 = parseInt(document.getElementById("regang1").value)
    var a2 = parseInt(document.getElementById("regang2").value)
    var a3 = parseInt(document.getElementById("regang3").value)
    var n = parseInt(document.getElementById("regang4").value)
    var output = document.getElementById("regangans")
    var temp = "";
    if (!isNaN(a1) && !isNaN(a2) && !isNaN(a3) && !isNaN(n)) {
        if (a1 < a2) {
            var x = (a2 - a1);
            temp += "\\[Since, \\space 1st \\space vertex \\space is \\space lesser \\space than \\space the \\space 2nd \\space vertex\\]"
            temp += "\\[\\space x \\space = \\space (" + a2 + " -  " + a1 + ")\\]"
            temp += "\\[\\space x \\space = \\space " + x + "\\]"
        }
        else {
            var x = a2 + n - a1;
            temp += "\\[Since, \\space 1st \\space vertex \\space is \\space greater \\space than \\space the \\space 2nd \\space vertex\\]"
            temp += "\\[\\space x \\space = \\space (" + a2 + " + " + n + " - " + a1 + ")\\]"
            temp += "\\[\\space x \\space = \\space " + x + "\\]"
        }
        if (a2 < a3) {
            var y = (a3 - a2);
            temp += "\\[Since, \\space 2nd \\space vertex \\space is \\space lesser \\space than \\space the \\space 3rd \\space vertex\\]"
            temp += "\\[\\space y \\space = \\space (" + a3 + " -  " + a2 + ")\\]"
            temp += "\\[\\space y \\space = \\space " + x + "\\]"
        }
        else {
            var y = a3 + n - a2;
            temp += "\\[Since, \\space  2nd \\space vertex \\space is \\space greater \\space than \\space the \\space 3rd \\space vertex\\]"
            temp += "\\[\\space y \\space = \\space (" + a3 + " + " + n + " - " + a2 + ")\\]"
            temp += "\\[\\space y \\space = \\space " + x + "\\]"
        }
        var angle1 = (180 * x) / n;
        var angle2 = (180 * y) / n;
        var angle = 180 - angle1 - angle2;
        temp += "\\[Angle \\space between \\space 3 \\space vertices \\space  is \\space\\]";
        temp += "\\[\\space = \\space 180 - (\\frac{180 \\times " + x + "}{" + n + "}) - (\\frac{180 \\times " + y + "}{n}) \\]";
        temp += "\\[\\space = \\space 180 - (" + ((180 * x) / n).toFixed(2) + ") - (" + ((180 * y) / n).toFixed(2) + ")\\]";
        temp += "\\[\\space = \\space " + angle.toFixed(3) + " \\]"
        output.innerHTML = temp;
    } else {
        temp += "\\[Please \\space enter \\space all \\space fields \\]";
        output.innerHTML = temp;
    }
    renderMathInElement(output);
}


function calculatefrac(value, base = 2) {
    var [integer, fraction = ''] = value.toString().split('.');

    return parseInt(integer, base) + (integer[0] !== '-' || -1) * fraction.split('').reduceRight((r, a) => (r + parseInt(a, base)) / base, 0);
}

function fracDectoBinHexOct(value, base) {
    var i = 1;
    var s = "";
    var n;
    var [integer, fraction = ''] = value.toString().split('.');
    fraction = Math.pow(10, -1 * fraction.length) * fraction;

    while (i <= 7) {
        fraction = base * fraction;
        s = s + parseInt(fraction).toString(base);
        fraction = "0" + fraction.toString().substring(fraction.toString().indexOf("."));
        n = Math.abs(fraction);
        if (n - Math.floor(n) == 0) {
            break;
        }
        i++;
    }
    return (parseInt(integer, 10).toString(base) + "." + s);
}




function clearInputs() {
    document.getElementById("bitwise-first-number").value = 0;
    document.getElementById("bitwise-second-number").value = 0;
    document.getElementById("bitwise-result").innerHTML = 0;
}

function bitwiseCalc() {

    addEventListener("change", x => {
        if (operation == "NOT")
            document.getElementById("bitwise-second-number").style = "display:none";
        else
            document.getElementById("bitwise-second-number").style = "display:inline-block";
    })
    const operation = document.getElementById("bitwise-operation").value;
    const numberSystem = document.getElementById("bitwise-numbers-system").value;
    let result;
    let firstOperand =
        document.getElementById("bitwise-first-number").value;
    let secondOperand =
        document.getElementById("bitwise-second-number").value;
    var x = 0;
    var str = " invalid input  use only ";
    if (numberSystem === "Binary") {
        firstOperand = parseInt(firstOperand, 2);
        secondOperand = parseInt(secondOperand, 2);
        if (isNaN(firstOperand) || isNaN(secondOperand)) {
            x = 1;
            str += "Binary number";
        }
    }

    if (numberSystem === "Octal") {

        firstOperand = parseInt(firstOperand, 8);
        secondOperand = parseInt(secondOperand, 8);

        if (isNaN(firstOperand) || isNaN(secondOperand)) {
            x = 1;
            str += "Octal number";
        }
    }

    if (numberSystem === "Hexadecimal") {
        firstOperand = parseInt(firstOperand, 16);
        secondOperand = parseInt(secondOperand, 16);

        if (isNaN(firstOperand) || isNaN(secondOperand)) {

            str += "Hexadecimal number";
        }
    }

    if (isNaN(firstOperand) || isNaN(secondOperand)) {
        document.getElementById("bitwise-result").innerHTML = str;
    } else {
        switch (operation) {
            case "NOT":
                result = ~firstOperand;
                break;
            case "AND":
                result = firstOperand & secondOperand;
                break;
            case "OR":
                result = firstOperand | secondOperand;
                break;
            case "XOR":
                result = firstOperand ^ secondOperand;
                break;
            case "Left Shift":
                result = firstOperand << secondOperand;
                break;
            case "Right Shift":
                result = firstOperand >> secondOperand;
        }
        if (numberSystem === "Binary")
            document.getElementById("bitwise-result").innerHTML = parseInt(
                result
            ).toString(2);
        else if (numberSystem === "Octal")
            document.getElementById("bitwise-result").innerHTML = parseInt(
                result
            ).toString(8);
        else if (numberSystem === "Hexadecimal")
            document.getElementById("bitwise-result").innerHTML = parseInt(
                result
            ).toString(16);
        else document.getElementById("bitwise-result").innerHTML = result;
    }
}

function convertAnyBaseToAnyBase() {
    const fromBase = document.getElementById("anyBase-select1").value;
    const toBase = document.getElementById("anyBase-select2").value;
    const input = document.getElementById("anyBase-input").value;
    let result = document.getElementById("anyBase-result");

    let from = 2;
    let to = 2;

    if (fromBase === "2(Binary)") from = 2;
    else if (fromBase === "3") from = 3;
    else if (fromBase === "4") from = 4;
    else if (fromBase === "5") from = 5;
    else if (fromBase === "6") from = 6;
    else if (fromBase === "7") from = 7;
    else if (fromBase === "8(Octal)") from = 8;
    else if (fromBase === "9") from = 9;
    else if (fromBase === "10(Decimal)") from = 10;
    else if (fromBase === "11") from = 11;
    else if (fromBase === "12") from = 12;
    else if (fromBase === "13") from = 13;
    else if (fromBase === "14") from = 14;
    else if (fromBase === "15") from = 15;
    else if (fromBase === "16") from = 16;
    else if (fromBase === "17") from = 17;
    else if (fromBase === "18") from = 18;
    else if (fromBase === "19") from = 19;
    else if (fromBase === "20") from = 20;
    else if (fromBase === "21") from = 21;
    else if (fromBase === "22") from = 22;
    else if (fromBase === "23") from = 23;
    else if (fromBase === "24") from = 24;
    else if (fromBase === "25") from = 25;
    else if (fromBase === "26") from = 26;
    else if (fromBase === "27") from = 27;
    else if (fromBase === "28") from = 28;
    else if (fromBase === "29") from = 29;
    else if (fromBase === "30") from = 30;
    else if (fromBase === "31") from = 31;
    else if (fromBase === "32") from = 32;
    else if (fromBase === "33") from = 33;
    else if (fromBase === "34") from = 34;
    else if (fromBase === "35") from = 35;
    else if (fromBase === "36") from = 36;

    if (toBase === "2(Binary)") to = 2;
    else if (toBase === "3") to = 3;
    else if (toBase === "4") to = 4;
    else if (toBase === "5") to = 5;
    else if (toBase === "6") to = 6;
    else if (toBase === "7") to = 7;
    else if (toBase === "8(Octal)") to = 8;
    else if (toBase === "9") to = 9;
    else if (toBase === "10(Decimal)") to = 10;
    else if (toBase === "11") to = 11;
    else if (toBase === "12") to = 12;
    else if (toBase === "13") to = 13;
    else if (toBase === "14") to = 14;
    else if (toBase === "15") to = 15;
    else if (toBase === "16") to = 16;
    else if (toBase === "17") to = 17;
    else if (toBase === "18") to = 18;
    else if (toBase === "19") to = 19;
    else if (toBase === "20") to = 20;
    else if (toBase === "21") to = 21;
    else if (toBase === "22") to = 22;
    else if (toBase === "23") to = 23;
    else if (toBase === "24") to = 24;
    else if (toBase === "25") to = 25;
    else if (toBase === "26") to = 26;
    else if (toBase === "27") to = 27;
    else if (toBase === "28") to = 28;
    else if (toBase === "29") to = 29;
    else if (toBase === "30") to = 30;
    else if (toBase === "31") to = 31;
    else if (toBase === "32") to = 32;
    else if (toBase === "33") to = 33;
    else if (toBase === "34") to = 34;
    else if (toBase === "35") to = 35;
    else if (toBase === "36") to = 36;

    result.innerHTML = fracDectoBinHexOct(calculatefrac(input, from), to);
    if (input == "") {
        result.innerHTML = "";
    } else if (from == 2) {
        if (input.search(/^[-.10]+$/) == -1)
            result.innerHTML = "Binary sistem sayılar yalnızca 0 ve 1 lerden oluşur";
    }
    else if (fracDectoBinHexOct(calculatefrac(input, from), to) == "NaN.0") {
        result.innerHTML = `Geçersiz sayı, lütfen ${fromBase} tabana göre giriş yaptığınızdan emin olun`;
    }


}

function gcdfind() {

    let a = parseInt(document.getElementById("gcdin1").value)
    let b = parseInt(document.getElementById("gcdin2").value)
    if (a == "" || b == "" || isNaN(a) || isNaN(b)) {
        document.getElementById("gcdans").innerHTML = "Lütfen uygun sayısal değer girin";
    }
    else {
        let a = parseInt(document.getElementById("gcdin1").value)
        let b = parseInt(document.getElementById("gcdin2").value)
        if (a == 0)
            return b;
        document.getElementById("gcdans").innerHTML = gcd(b % a, a);
    }
}

function getCount(d, n) {
    let no = Math.floor(n / d);
    let result = no;
    for (let p = 2; p * p <= no; ++p) {
        if (no % p == 0) {
            while (no % p == 0)
                no = Math.floor(no / p);
            result = Math.floor(result - result / p);
        }
    }
    if (no > 1)
        result = Math.floor(result - result / no);
    return result;
}


function calculateTwoComplement(x) {
    var ar = x.split("");
    var two = new Array(ar.length);

    for (var i = ar.length - 1; i >= 0; i--) {
        two[i] = ar[i];
        if (ar[i] == 1)
            break;

    }
    if (i == -1) {
        var twoc = '1' + two.join('');
    } else {
        for (var k = i - 1; k >= 0; k--) {
            if (ar[k] == 0) {
                two[k] = 1;

            } else {
                two[k] = 0;
            }
        }
        var twoc = two.join('');
    }
    return twoc;
}

function calculateEightComplement(x) {
    if (x.search(8) == 0 || x.search(9) == 0) {
        return "Invalid";
    } else {
        var sev = "";
        var eig = "";
        for (var i = 0; i < x.length; i++) {
            sev += '7' - x[i];
        }
        eig = (parseInt(sev, 8) + 1).toString(8);
        return eig;
    }
}

function calculateSixteenComplement(x) {
    var fiftn1 = "";
    var sixtn1 = "";
    for (var i = 0; i < x.length; i++) {
        fiftn1 += ('15' - parseInt(x[i], 16)).toString(16);
    }
    sixtn1 = (parseInt(fiftn1, 16) + 1).toString(16);
    return sixtn1;
}

function calculateTenComplement(x) {
    var ninec = "";
    var tenc = "";
    for (var i = 0; i < x.length; i++) {
        ninec += '9' - x[i];
    }
    tenc = (parseInt(ninec) + 1).toString();
    return tenc;
}


function hammingCalc() {
    const input = document.getElementById("hamming-input").value;
    const type1 = document.getElementById("hamming-select1").value;
    const type2 = document.getElementById("hamming-select2").value;
    let result = document.getElementById("hamming-result");

    if (type1 === "Left-To-Right" && type2 === "Even") {
        result.innerHTML = hammingCodeLtoREven(input);
    } else if (type1 === "Right-To-Left" && type2 === "Even") {
        result.innerHTML = hammingCodeRtoLEven(input);
    } else if (type1 === "Left-To-Right" && type2 === "Odd") {
        result.innerHTML = hammingCodeLtoROdd(input);
    } else if (type1 === "Right-To-Left" && type2 === "Odd") {
        result.innerHTML = hammingCodeRtoLOdd(input);
    }
}

function hammingCodeLtoREven(x) {
    let n = x.length;
    let p = 0, t = 0, c = 0;
    let k = 0, l = 0, s = 0;
    let res = "", res1 = "";
    var par = 0;

    while (p == 0) {
        if (Math.pow(2, s) >= n + s + 1) {
            p = s;
        }
        s += 1;
    }
    t = p + n;
    for (var j = 0; j < t; j++) {
        if ((j + 1) == Math.pow(2, k)) {
            res = res + "?";
            k += 1;
        } else {
            res = res + x[l];
            l += 1;
        }
    }
    for (var i = 0; i < res.length; i++) {
        if (res[i] == "?") {
            c = i + 2;
            while (c <= t) {
                if (((i + 1) & c) == (i + 1)) {
                    par += parseInt(res[c - 1]);
                }
                c += 1;
            }
            if (par % 2 == 0) {
                res1 += "0";
            } else {
                res1 += "1";
            }
            par = 0;
        } else {
            res1 += res[i];
        }
    }
    console.log(res);
    return res1;
}

function hammingCodeRtoLEven(x) {
    let n = x.length;
    let p = 0, t = 0, c = 0;
    let k = 0, l = 0, s = 0;
    let res = "", res1 = "";
    let par = 0;
    x = x.split("").reverse().join("");//reverse the input for R to L

    while (p == 0) {
        if (Math.pow(2, s) >= n + s + 1) {
            p = s;
        }
        s += 1;
    }
    t = p + n;
    for (var j = 0; j < t; j++) {
        if ((j + 1) == Math.pow(2, k)) {
            res = res + "?";
            k += 1;
        } else {
            res = res + x[l];
            l += 1;
        }
    }
    for (var i = 0; i < res.length; i++) {
        if (res[i] == "?") {
            c = i + 2;
            while (c <= t) {
                if (((i + 1) & c) == (i + 1)) {
                    par += parseInt(res[c - 1]);
                }
                c += 1;
            }
            if (par % 2 == 0) {
                res1 += "0";
            } else {
                res1 += "1";
            }
            par = 0;
        } else {
            res1 += res[i];
        }
    }
    console.log(res);
    return res1.split("").reverse().join("");
}

function hammingCodeLtoROdd(x) {
    let n = x.length;
    let p = 0, t = 0, c = 0;
    let k = 0, l = 0, s = 0;
    let res = "", res1 = "";
    var par = 0;

    while (p == 0) {
        if (Math.pow(2, s) >= n + s + 1) {
            p = s;
        }
        s += 1;
    }
    t = p + n;
    for (var j = 0; j < t; j++) {
        if ((j + 1) == Math.pow(2, k)) {
            res = res + "?";
            k += 1;
        } else {
            res = res + x[l];
            l += 1;
        }
    }
    for (var i = 0; i < res.length; i++) {
        if (res[i] == "?") {
            c = i + 2;
            while (c <= t) {
                if (((i + 1) & c) == (i + 1)) {
                    par += parseInt(res[c - 1]);
                }
                c += 1;
            }
            if (par % 2 == 0) {
                res1 += "1";
            } else {
                res1 += "0";
            }
            par = 0;
        } else {
            res1 += res[i];
        }
    }
    console.log(res);
    return res1;
}

function commonrootsfind() {
    let a1 = parseInt(document.getElementById("a1cr").value)
    let b1 = parseInt(document.getElementById("b1cr").value)
    let c1 = parseInt(document.getElementById("c1cr").value)
    let a2 = parseInt(document.getElementById("a2cr").value)
    let b2 = parseInt(document.getElementById("b2cr").value)
    let c2 = parseInt(document.getElementById("c2cr").value)
    if (!isNaN(a1) || !isNaN(a2) || !isNaN(b1) || !isNaN(b2) || !isNaN(c1) || !isNaN(c2)) {
        document.getElementById("commonrootsexp").innerHTML = "\\[Let the two quadratic equations are a_{1}x^{2} + b_{1}x + c_{1} = 0   and a_{2}x^{2} + b_{2}x + c_{2} = 0   \\]"
        document.getElementById("commonrootsexp").innerHTML = "\\[As we know that \\text{Sum of roots = } -\\frac{b}{a}   and \\text{Product of roots = } \\frac{c}{a}   \\]"
        document.getElementById("commonrootsexp").innerHTML = "\\[Now since both the roots are common, \\]"
        document.getElementById("commonrootsexp").innerHTML = "\\[\\alpha + \\beta = -\\frac{b_{1}}{a_{1}} = -\\frac{b_{2}}{a_{2}}   \\Rightarrow \\frac{a_{1}}{a_{2}} = \\frac{b_{1}}{b_{2}}   \\]"
        document.getElementById("commonrootsexp").innerHTML = "\\[\\alpha \\beta = \\frac{c_{1}}{a_{1}} = \\frac{c_{2}}{a_{2}}   \\Rightarrow \\frac{c_{1}}{c_{2}} = \\frac{a_{1}}{a_{2}}   \\]"
        document.getElementById("commonrootsexp").innerHTML = "\\[\\frac{a_{1}}{a_{2}} = \\frac{b_{1}}{b_{2}} = \\frac{c_{1}}{c_{2}} \\]"
        if ((a1 / a2) == (b1 / b2) && (b1 / b2) == (c1 / c2)) {
            document.getElementById("commonrootsans").innerHTML = "Common roots exist"
        }
        else {
            document.getElementById("commonrootsans").innerHTML = "No Common roots exist"
        }
        renderMathInElement(document.getElementById("commonrootsexp"))
    }
    else
        document.getElementById("commonrootsans").innerHTML = "Please Enter valid input"
}

function hammingCodeRtoLOdd(x) {
    let n = x.length;
    let p = 0, t = 0, c = 0;
    let k = 0, l = 0, s = 0;
    let res = "", res1 = "";
    let par = 0;
    x = x.split("").reverse().join("");//reverse the input for R to L

    while (p == 0) {
        if (Math.pow(2, s) >= n + s + 1) {
            p = s;
        }
        s += 1;
    }
    t = p + n;
    for (var j = 0; j < t; j++) {
        if ((j + 1) == Math.pow(2, k)) {
            res = res + "?";
            k += 1;
        } else {
            res = res + x[l];
            l += 1;
        }
    }
    for (var i = 0; i < res.length; i++) {
        if (res[i] == "?") {
            c = i + 2;
            while (c <= t) {
                if (((i + 1) & c) == (i + 1)) {
                    par += parseInt(res[c - 1]);
                }
                c += 1;
            }
            if (par % 2 == 0) {
                res1 += "1";
            } else {
                res1 += "0";
            }
            par = 0;
        } else {
            res1 += res[i];
        }
    }
    console.log(res);
    return res1.split("").reverse().join("");
}

function polyincirclefind() {
    var n = parseInt(document.getElementById("polyincirclen").value);
    var r = parseInt(document.getElementById("polyincircler").value);
    var polyside = 2 * r * math.sin(math.pi / n);
    var polyarea = 0.5 * n * r ** 2 * math.sin(2 * math.pi / n);
    var circlearea = math.pi * r * r;
    document.getElementById("polyincircleans1").innerHTML = "Polygon side: " + polyside.toFixed(2)
    document.getElementById("polyincircleans2").innerHTML = "Polygon area: " + polyarea.toFixed(2)
    document.getElementById("polyincircleans3").innerHTML = "Circle area: " + circlearea.toFixed(2)
}


function separator(str, n) {
    var val = [];
    var i, l;
    for (i = 0, l = str.length; i < l; i += n) {
        val.push(parseInt(str.substr(i, n), 2));
    }

    return val;
}
function bcdTOdecimal(x) {
    var y = x.length;
    var input1 = "";
    var inv = ["I", "N", "V", "A", "L", "I", "D"];
    if (y % 4 == 1 || y == 1)
        input1 = "000" + x;
    else if (y % 4 == 2 || y == 2)
        input1 = "00" + x;
    else if (y % 4 == 3 || y == 3)
        input1 = "0" + x;
    else
        input1 = x;
    const minVal = (currentValue) => currentValue <= 9;
    w = separator(input1, 4);
    if (w.every(minVal) == true)
        return w;
    else
        return inv;
}
function decimalTObcd(z = "") {
    var x = "_";

    for (var i = 0; i < z.length; i++) {
        var y = parseInt(z[i]).toString(2)
        if (y.length == 1) {
            x = x + "000" + y + "_   ";
        }
        if (y.length == 2) {
            x = x + "00" + y + "_   ";
        }
        if (y.length == 3) {
            x = x + "0" + y + "_   ";
        }
        if (y.length == 4) {
            x = x + +y + "_   ";
        }

    }
    return x;

}


function bcdadd() {
    var input1 = document.getElementById("bcdadd-input1").value;
    var input2 = document.getElementById("bcdadd-input2").value;
    let result = document.getElementById("bcdadd-result");

    var s1 = bcdTOdecimal(input1).join('');
    var s2 = bcdTOdecimal(input2).join('');
    var decimalresult;
    var bcdresult;
    if (s1 == "INVALID" || s2 == "INVALID")
        result.innerHTML = "INVALID BCD";
    else {
        decimalresult = parseInt(s1) + parseInt(s2);
        bcdresult = decimalTObcd(decimalresult.toString());
        result.innerHTML = "BCD Result=" + bcdresult + "<br>";
        result.innerHTML += "Decimal Result=" + decimalresult + "<br>";

    }
    if (input1 == "" && input2 == "") {
        result.innerHTML = "";
    } else if (input1.search(/^[10]+$/) == -1 || input2.search(/^[10]+$/) == -1)
        result.innerHTML = "BCD Code can only have 0's and 1's";

}
function convertex3() {
    var input = document.getElementById("ex3-input").value;
    let result = document.getElementById("ex3-result");
    const fromBase = document.getElementById("ex3-select1").value;
    const toBase = document.getElementById("ex3-select2").value;
    var work = document.getElementById("ex3-work");
    var print = "\\[\\underline{Working \\space Steps}\\]";
    var x = "_";

    if (fromBase === "Decimal" && toBase === "Excess-3") {
        print += "\\[\\textbf{Converting \\space Decimal \\space Code \\space to \\space Excess-3 \\space Code}\\]"
        print += "\\[STEP \\space 1 \\space : Add \\space 3 \\space to \\space each \\space digit \\space and \\space then \\]"
        print += "\\[\\space Convert \\space each \\space decimal \\space digits \\space into \\space nibbles \\]";
        var x = "_", y = ""; temp = "";
        for (var i = 0; i < input.length; i++) {
            var y = (parseInt(input[i]) + 3).toString(2);
            if (y.length == 1) {
                temp = "000" + y + "_   ";
                print += "\\[\\rightarrow \\space  " + input[i] + " \\space + \\space 3 \\space \\rightarrow " + (parseInt(input[i]) + 3) + " \\space becomes \\space " + temp + "\\space \\]";
                x = x + temp;
            }
            if (y.length == 2) {
                temp = "00" + y + "_   ";
                print += "\\[\\rightarrow \\space  " + input[i] + " \\space + \\space 3 \\space \\rightarrow " + (parseInt(input[i]) + 3) + " \\space becomes \\space " + temp + "\\space \\]";
                x = x + temp;
            }
            if (y.length == 3) {
                temp = "0" + y + "_   ";
                print += "\\[\\rightarrow \\space  " + input[i] + " \\space + \\space 3 \\space \\rightarrow " + (parseInt(input[i]) + 3) + " \\space becomes \\space " + temp + "\\space \\]";
                x = x + temp;
            }
            if (y.length == 4) {
                temp = y + "_   ";
                print += "\\[\\rightarrow \\space  " + input[i] + " \\space + \\space 3 \\space \\rightarrow " + (parseInt(input[i]) + 3) + " \\space becomes \\space " + temp + "\\space \\]";
                x = x + +temp;
            }
        }
        print += "\\[STEP \\space 2 \\space : \\space Combine \\space the \\space nibbles \\space to \\]"
        print += "\\[\\space get \\space your \\space result \\space in \\space Excess-3 \\space Code \\]";
        print += "\\[Result \\space in \\space Excess-3 \\space Code \\rightarrow \\space " + x.replace(/_/g, "") + " \\space \\]";
        result.innerHTML = "Answer -> " + x;
        work.innerHTML = print;
        renderMathInElement(work);
    } else if (fromBase === "Binary" && toBase === "Excess-3") {
        print += "\\[\\textbf{Converting \\space Binary \\space Code \\space to \\space Excess-3 \\space Code}\\]"
        print += "\\[STEP \\space 1 \\space : \\space Convert \\space input \\space from \\space binary \\space to \\space decimal \\]";
        print += "\\[" + input + " \\space \\rightarrow \\space " + parseInt(input, 2).toString() + "\\]";
        input = parseInt(input, 2).toString();
        print += "\\[STEP \\space 2 \\space : Add \\space 3 \\space to \\space each \\space digit \\space and \\space then \\]"
        print += "\\[\\space Convert \\space each \\space decimal \\space digits \\space into \\space nibbles \\]";
        var x = "_", y = ""; temp = "";

        for (var i = 0; i < input.length; i++) {
            var y = (parseInt(input[i]) + 3).toString(2);
            if (y.length == 1) {
                temp = "000" + y + "_   ";
                print += "\\[\\rightarrow \\space  " + input[i] + " \\space + \\space 3 \\space \\rightarrow " + (parseInt(input[i], 2) + 3) + " \\space becomes \\space " + temp + "\\space \\]";
                x = x + temp;
            }
            if (y.length == 2) {
                temp = "00" + y + "_   ";
                print += "\\[\\rightarrow \\space  " + input[i] + " \\space + \\space 3 \\space \\rightarrow " + (parseInt(input[i], 2) + 3) + " \\space becomes \\space " + temp + "\\space \\]";
                x = x + temp;
            }
            if (y.length == 3) {
                temp = "0" + y + "_   ";
                print += "\\[\\rightarrow \\space  " + input[i] + " \\space + \\space 3 \\space \\rightarrow " + (parseInt(input[i], 2) + 3) + " \\space becomes \\space " + temp + "\\space \\]";
                x = x + temp;
            }
            if (y.length == 4) {
                temp = y + "_   ";
                print += "\\[\\rightarrow \\space  " + input[i] + " \\space + \\space 3 \\space \\rightarrow " + (parseInt(input[i], 2) + 3) + " \\space becomes \\space " + temp + "\\space \\]";
                x = x + +temp;
            }
        }
        print += "\\[STEP \\space 3 \\space : \\space Combine \\space the \\space nibbles \\space to \\]"
        print += "\\[\\space get \\space your \\space result \\space in \\space Excess-3 \\space Code \\]";
        print += "\\[Result \\space in \\space Excess-3 \\space Code \\rightarrow \\space " + x.replace(/_/g, "") + " \\space \\]";
        result.innerHTML = "Answer -> " + x;
        work.innerHTML = print;
        renderMathInElement(work);
    } else if (fromBase === "Octal" && toBase === "Excess-3") {
        print += "\\[\\textbf{Converting \\space Octal \\space Code \\space to \\space Excess-3 \\space Code}\\]"
        print += "\\[STEP \\space 1 \\space : \\space Convert \\space input \\space from \\space octal \\space to \\space decimal \\]";
        print += "\\[" + input + " \\space \\rightarrow \\space " + parseInt(input, 8).toString() + "\\]";
        input = parseInt(input, 8).toString();
        print += "\\[STEP \\space 2 \\space : Add \\space 3 \\space to \\space each \\space digit \\space and \\space then \\]"
        print += "\\[\\space Convert \\space each \\space decimal \\space digits \\space into \\space nibbles \\]";
        var x = "_", y = ""; temp = "";

        for (var i = 0; i < input.length; i++) {
            var y = (parseInt(input[i]) + 3).toString(2);
            if (y.length == 1) {
                temp = "000" + y + "_   ";
                print += "\\[\\rightarrow \\space  " + input[i] + " \\space + \\space 3 \\space \\rightarrow " + (parseInt(input[i], 8) + 3) + " \\space becomes \\space " + temp + "\\space \\]";
                x = x + temp;
            }
            if (y.length == 2) {
                temp = "00" + y + "_   ";
                print += "\\[\\rightarrow \\space  " + input[i] + " \\space + \\space 3 \\space \\rightarrow " + (parseInt(input[i], 8) + 3) + " \\space becomes \\space " + temp + "\\space \\]";
                x = x + temp;
            }
            if (y.length == 3) {
                temp = "0" + y + "_   ";
                print += "\\[\\rightarrow \\space  " + input[i] + " \\space + \\space 3 \\space \\rightarrow " + (parseInt(input[i], 8) + 3) + " \\space becomes \\space " + temp + "\\space \\]";
                x = x + temp;
            }
            if (y.length == 4) {
                temp = y + "_   ";
                print += "\\[\\rightarrow \\space  " + input[i] + " \\space + \\space 3 \\space \\rightarrow " + (parseInt(input[i], 8) + 3) + " \\space becomes \\space " + temp + "\\space \\]";
                x = x + +temp;
            }
        }
        print += "\\[STEP \\space 3 \\space : \\space Combine \\space the \\space nibbles \\space to \\]"
        print += "\\[\\space get \\space your \\space result \\space in \\space Excess-3 \\space Code \\]";
        print += "\\[Result \\space in \\space Excess-3 \\space Code \\rightarrow \\space " + x.replace(/_/g, "") + " \\space \\]";
        result.innerHTML = "Answer -> " + x;
        work.innerHTML = print;
        renderMathInElement(work);
    } else if (fromBase === "Hexa decimal" && toBase === "Excess-3") {
        print += "\\[\\textbf{Converting \\space Hexa Decimal \\space Code \\space to \\space Excess-3 \\space Code}\\]"
        print += "\\[STEP \\space 1 \\space : \\space Convert \\space input \\space from \\space hexadecimal \\space to \\space decimal \\]";
        print += "\\[" + input + " \\space \\rightarrow \\space " + parseInt(input, 16).toString() + "\\]";
        input = parseInt(input, 16).toString();
        print += "\\[STEP \\space 2 \\space : Add \\space 3 \\space to \\space each \\space digit \\space and \\space then \\]"
        print += "\\[\\space Convert \\space each \\space decimal \\space digits \\space into \\space nibbles \\]";
        var x = "_", y = ""; temp = "";

        for (var i = 0; i < input.length; i++) {
            var y = (parseInt(input[i]) + 3).toString(2);
            if (y.length == 1) {
                temp = "000" + y + "_   ";
                print += "\\[\\rightarrow \\space  " + input[i] + " \\space + \\space 3 \\space \\rightarrow " + (parseInt(input[i], 16) + 3) + " \\space becomes \\space " + temp + "\\space \\]";
                x = x + temp;
            }
            if (y.length == 2) {
                temp = "00" + y + "_   ";
                print += "\\[\\rightarrow \\space  " + input[i] + " \\space + \\space 3 \\space \\rightarrow " + (parseInt(input[i], 16) + 3) + " \\space becomes \\space " + temp + "\\space \\]";
                x = x + temp;
            }
            if (y.length == 3) {
                temp = "0" + y + "_   ";
                print += "\\[\\rightarrow \\space  " + input[i] + " \\space + \\space 3 \\space \\rightarrow " + (parseInt(input[i], 16) + 3) + " \\space becomes \\space " + temp + "\\space \\]";
                x = x + temp;
            }
            if (y.length == 4) {
                temp = y + "_   ";
                print += "\\[\\rightarrow \\space  " + input[i] + " \\space + \\space 3 \\space \\rightarrow " + (parseInt(input[i], 16) + 3) + " \\space becomes \\space " + temp + "\\space \\]";
                x = x + +temp;
            }
        }
        print += "\\[STEP \\space 3 \\space : \\space Combine \\space the \\space nibbles \\space to \\]"
        print += "\\[\\space get \\space your \\space result \\space in \\space Excess-3 \\space Code \\]";
        print += "\\[Result \\space in \\space Excess-3 \\space Code \\rightarrow \\space " + x.replace(/_/g, "") + " \\space \\]";
        result.innerHTML = "Answer -> " + x;
        work.innerHTML = print;
        renderMathInElement(work);
    } else if (fromBase === "Excess-3" && toBase === "Decimal") {
        var x = "", y = "";
        var temp = "";
        if (input.length % 4 != 0) {
            result.innerHTML = "Error : Invalid  input (Excess-3 Code comes in sets of nibbles(4 bits)"
        } else {
            x = "";
            var t = input;
            var nib = "";
            print += "\\[STEP \\space 1 \\space : \\space Break \\space Excess-3 \\space CODE \\space into \\space nibbles \\]";
            print += "\\[";
            for (var j = 1; j <= t.length; j = j + 3) {
                nib = t.substring(j - 1, j + 3);
                if (nib.length == 4)
                    print += +nib + " \\space ";
                nib = "";
            }
            print += "\\]";
            print += "\\[STEP \\space 2 \\space : \\space Convert \\space each \\space nibble \\space into \\space decimal \\space digits \\]";
            print += "\\[then \\space subtract \\space 3 \\space from \\space each \\space decimal \\space digit \\]";
            for (var i = 0; i < input.length; i++) {
                if ((i + 1) % 4 == 0) {
                    temp = temp + input[i];
                    x = x + (parseInt(temp, 2) - 3).toString();
                    print += "\\[\\rightarrow \\space " + temp + " \\space becomes \\space " + parseInt(temp, 2).toString() + "\\]";
                    print += "\\[" + parseInt(temp, 2) + " \\space - \\space 3 \\space \\rightarrow \\space " + (parseInt(temp, 2) - 3).toString() + " \\]";
                    temp = "";
                } else {
                    temp = temp + input[i];
                }
            }
            print += "\\[STEP \\space 3 \\space : \\space Combine \\space the \\space decimal \\space digits \\space to \\]";
            print += "\\[\\space get \\space the \\space result \\space in \\space Decimal \\space \\]";
            print += "\\[\\rightarrow " + x + "\\]";
            if (input.length / 4 == x.length) {
                x = parseInt(x).toString();
            } else if (parseInt(x) < 0) {
                result.innerHTML = "Error : Invalid input (decimal value of each digit cant subceed 0)";
            } else {
                result.innerHTML = "Error : Invalid input (decimal value of each digit cant exceed 9)";
            }
            result.innerHTML = "Answer -> " + x;
            work.innerHTML = print;
            renderMathInElement(work);
        }
    } else if (fromBase === "Excess-3" && toBase === "Binary") {
        var x = "", y = "";
        var temp = "";
        if (input.length % 4 != 0) {
            result.innerHTML = "Error : Invalid  input (Excess-3 Code comes in sets of nibbles(4 bits)"
        } else {
            x = "";
            var t = input;
            var nib = "";
            print += "\\[STEP \\space 1 \\space : \\space Break \\space Excess-3 \\space CODE \\space into \\space nibbles \\]";
            print += "\\[";
            for (var j = 1; j <= t.length; j = j + 3) {
                nib = t.substring(j - 1, j + 3);
                if (nib.length == 4)
                    print += +nib + " \\space ";
                nib = "";
            }
            print += "\\]";
            print += "\\[STEP \\space 2 \\space : \\space Convert \\space each \\space nibble \\space into \\space decimal \\space digits \\]";
            print += "\\[then \\space subtract \\space 3 \\space from \\space each \\space decimal \\space digit \\]";
            for (var i = 0; i < input.length; i++) {
                if ((i + 1) % 4 == 0) {
                    temp = temp + input[i];
                    x = x + (parseInt(temp, 2) - 3).toString();
                    print += "\\[\\rightarrow \\space " + temp + " \\space becomes \\space " + parseInt(temp, 2).toString() + "\\]";
                    print += "\\[" + parseInt(temp, 2) + " \\space - \\space 3 \\space \\rightarrow \\space " + (parseInt(temp, 2) - 3).toString() + " \\]";
                    temp = "";
                } else {
                    temp = temp + input[i];
                }
            }
            print += "\\[STEP \\space 3 \\space : \\space Combine \\space the \\space decimal \\space values \\space obtained \\space \\]";
            print += "\\[\\rightarrow " + x + "\\]";
            print += "\\[STEP \\space 4 \\space : Convert \\space decimal \\space result \\space to \\space binary  \\]";
            print += "\\[" + x + " \\space becomes \\space " + parseInt(x).toString(2) + "\\]";
            if (input.length / 4 == x.length) {
                x = parseInt(x).toString(2);
            } else if (parseInt(x) < 0) {
                result.innerHTML = "Error : Invalid input (decimal value of each digit cant subceed 0)";
            } else {
                result.innerHTML = "Error : Invalid input (decimal value of each digit cant exceed 9)";
            }
            result.innerHTML = "Answer -> " + x;
            work.innerHTML = print;
            renderMathInElement(work);
        }
    } else if (fromBase === "Excess-3" && toBase === "Octal") {
        var x = "", y = "";
        var temp = "";
        if (input.length % 4 != 0) {
            result.innerHTML = "Error : Invalid  input (Excess-3 Code comes in sets of nibbles(4 bits)"
        } else {
            x = "";
            var t = input;
            var nib = "";
            print += "\\[STEP \\space 1 \\space : \\space Break \\space Excess-3 \\space CODE \\space into \\space nibbles \\]";
            print += "\\[";
            for (var j = 1; j <= t.length; j = j + 3) {
                nib = t.substring(j - 1, j + 3);
                if (nib.length == 4)
                    print += +nib + " \\space ";
                nib = "";
            }
            print += "\\]";
            print += "\\[STEP \\space 2 \\space : \\space Convert \\space each \\space nibble \\space into \\space decimal \\space digits \\]";
            print += "\\[then \\space subtract \\space 3 \\space from \\space each \\space decimal \\space digit \\]";
            for (var i = 0; i < input.length; i++) {
                if ((i + 1) % 4 == 0) {
                    temp = temp + input[i];
                    x = x + (parseInt(temp, 2) - 3).toString();
                    print += "\\[\\rightarrow \\space " + temp + " \\space becomes \\space " + parseInt(temp, 2).toString() + "\\]";
                    print += "\\[" + parseInt(temp, 2) + " \\space - \\space 3 \\space \\rightarrow \\space " + (parseInt(temp, 2) - 3).toString() + " \\]";
                    temp = "";
                } else {
                    temp = temp + input[i];
                }
            }
            print += "\\[STEP \\space 3 \\space : \\space Combine \\space the \\space decimal \\space values \\space obtained \\space \\]";
            print += "\\[\\rightarrow " + x + "\\]";
            print += "\\[STEP \\space 4 \\space : Convert \\space decimal \\space result \\space to \\space octal  \\]";
            print += "\\[" + x + " \\space becomes \\space " + parseInt(x).toString(8) + "\\]";
            if (input.length / 4 == x.length) {
                x = parseInt(x).toString(8);
            } else if (parseInt(x) < 0) {
                result.innerHTML = "Error : Invalid input (decimal value of each digit cant subceed 0)";
            } else {
                result.innerHTML = "Error : Invalid input (decimal value of each digit cant exceed 9)";
            }
            result.innerHTML = "Answer -> " + x;
            work.innerHTML = print;
            renderMathInElement(work);
        }
    } else if (fromBase === "Excess-3" && toBase === "Hexa decimal") {
        var x = "", y = "";
        var temp = "";
        if (input.length % 4 != 0) {
            result.innerHTML = "Error : Invalid  input (Excess-3 Code comes in sets of nibbles(4 bits)"
        } else {
            x = "";
            var t = input;
            var nib = "";
            print += "\\[STEP \\space 1 \\space : \\space Break \\space Excess-3 \\space CODE \\space into \\space nibbles \\]";
            print += "\\[";
            for (var j = 1; j <= t.length; j = j + 3) {
                nib = t.substring(j - 1, j + 3);
                if (nib.length == 4)
                    print += +nib + " \\space ";
                nib = "";
            }
            print += "\\]";
            print += "\\[STEP \\space 2 \\space : \\space Convert \\space each \\space nibble \\space into \\space decimal \\space digits \\]";
            print += "\\[then \\space subtract \\space 3 \\space from \\space each \\space decimal \\space digit \\]";
            for (var i = 0; i < input.length; i++) {
                if ((i + 1) % 4 == 0) {
                    temp = temp + input[i];
                    x = x + (parseInt(temp, 2) - 3).toString();
                    print += "\\[\\rightarrow \\space " + temp + " \\space becomes \\space " + parseInt(temp, 2).toString() + "\\]";
                    print += "\\[" + parseInt(temp, 2) + " \\space - \\space 3 \\space \\rightarrow \\space " + (parseInt(temp, 2) - 3).toString() + " \\]";
                    temp = "";
                } else {
                    temp = temp + input[i];
                }
            }
            print += "\\[STEP \\space 3 \\space : \\space Combine \\space the \\space decimal \\space values \\space obtained \\space \\]";
            print += "\\[\\rightarrow " + x + "\\]";
            print += "\\[STEP \\space 4 \\space : Convert \\space decimal \\space result \\space to \\space hexadecimal  \\]";
            print += "\\[" + x + " \\space becomes \\space " + parseInt(x).toString(16) + "\\]";
            if (input.length / 4 == x.length) {
                x = parseInt(x).toString(16);
            } else if (parseInt(x) < 0) {
                result.innerHTML = "Error : Invalid input (decimal value of each digit cant subceed 0)";
            } else {
                result.innerHTML = "Error : Invalid input (decimal value of each digit cant exceed 9)";
            }
            result.innerHTML = "Answer -> " + x;
            work.innerHTML = print;
            renderMathInElement(work);
        }
    }


    if (input == "") {
        x = "";
    } else if (fromBase === "Binary" && input.search(/^[10]+$/) == -1) {
        x = "Binary code can only have 0's and 1's";
    }
}

function convertgreymisc() {
    const toBase = document.getElementById("grey-misc-1").value;
    var input = document.getElementById("greymisc-input").value;
    let result2 = document.getElementById("ggreymisc-result");
    let work = document.getElementById("grey-misc-working");

    if (toBase === "BCD Code") {
        var result1 = input;
        var a = result1[0];
        for (var i = 1; i < result1.length; i++) {
            var n = parseInt(a[i - 1] ^ result1[i]).toString();
            a += n;
        }
        var temp = a;
        input = parseInt(a, 2).toString();//dec value of input

        for (var i = 0; i < input.length; i++) {
            y = parseInt(input[i]).toString(2);
            if (y.length == 1) {
                temp = "000" + y + "_   ";
                x = x + temp;
            }
            if (y.length == 2) {
                temp = "00" + y + "_   ";
                x = x + temp;
            }
            if (y.length == 3) {
                temp = "0" + y + "_   ";
                x = x + temp;
            }
            if (y.length == 4) {
                temp = y + "_   ";
                x = x + +temp;
            }
        }
        result2.innerHTML = "Answer -> " + x;

    }
    else if (toBase === "Excess-3 Code") {
        var result1 = input;
        var a = result1[0];
        for (var i = 1; i < result1.length; i++) {
            var n = parseInt(a[i - 1] ^ result1[i]).toString();
            a += n;
        }
        var temp = a;
        input = parseInt(a, 2).toString();//dec value of input
        var x = "_", y = ""; temp = "";
        var print = "";
        for (var i = 0; i < input.length; i++) {
            var y = (parseInt(input[i]) + 3).toString(2);
            if (y.length == 1) {
                temp = "000" + y + "_   ";
                print += "\\[\\rightarrow \\space  " + input[i] + " \\space + \\space 3 \\space \\rightarrow " + (parseInt(input[i]) + 3) + " \\space becomes \\space " + temp + "\\space \\]";
                x = x + temp;
            }
            if (y.length == 2) {
                temp = "00" + y + "_   ";
                print += "\\[\\rightarrow \\space  " + input[i] + " \\space + \\space 3 \\space \\rightarrow " + (parseInt(input[i]) + 3) + " \\space becomes \\space " + temp + "\\space \\]";
                x = x + temp;
            }
            if (y.length == 3) {
                temp = "0" + y + "_   ";
                print += "\\[\\rightarrow \\space  " + input[i] + " \\space + \\space 3 \\space \\rightarrow " + (parseInt(input[i]) + 3) + " \\space becomes \\space " + temp + "\\space \\]";
                x = x + temp;
            }
            if (y.length == 4) {
                temp = y + "_   ";
                print += "\\[\\rightarrow \\space  " + input[i] + " \\space + \\space 3 \\space \\rightarrow " + (parseInt(input[i]) + 3) + " \\space becomes \\space " + temp + "\\space \\]";
                x = x + +temp;
            }
        }
        result2.innerHTML = "Answer -> " + x;

    }
    else if (toBase === "2421 Code") {
        var result1 = input;
        var a = result1[0];
        for (var i = 1; i < result1.length; i++) {
            var n = parseInt(a[i - 1] ^ result1[i]).toString();
            a += n;
        }
        var temp = a;
        input = parseInt(a, 2).toString();//dec value of input
        var x = "";
        for (var i = 0; i < input.length; i++) {
            if (parseInt(input[i]) < 5) {
                y = (parseInt(input[i]) + 0).toString(2);
            } else if (parseInt(input[i]) > 4) {
                y = (parseInt(input[i]) + 6).toString(2);
            }

            if (y.length == 1) {
                temp = "000" + y + "_   ";
                x = x + temp;
            }
            if (y.length == 2) {
                temp = "00" + y + "_   ";
                x = x + temp;
            }
            if (y.length == 3) {
                temp = "0" + y + "_   ";
                x = x + temp;
            }
            if (y.length == 4) {
                temp = y + "_   ";
                x = x + temp;
            }
        }

        result2.innerHTML = "Answer -> " + x;
    }
}

function convertgreydec() {
    const fromBase = document.getElementById("grey-select2").value;
    var input = document.getElementById("greydec-input").value;
    let result2 = document.getElementById("greydec2-result");
    let work = document.getElementById("grey-dec-working");
    let print = "<h2 style='margin-top: 50px;'>Working Steps </h2> &emsp;";
    result2.innerHTML = "";
    let from = 2;
    let to = 2;

    if (fromBase === "Decimal") {
        from = 10;
        to = 2;
        result1 = parseInt(input, from).toString(to);
    }
    else {
        result1 = input;
    }



    var x = result1[0];

    if (fromBase === "Grey Code") {
        print += "<h4> Converting Grey Code to Decimal </h4> &emsp;";
        print += "<br><h5>STEP 1 : Take the first bit of the gray code input and write it to the output. Output -> " + x + "</h5>";
        print += "<br><h5>STEP 2 : Repeat the steps below until you reach the end of the input </h5>";
        for (var i = 1; i < result1.length; i++) {
            var n = parseInt(x[i - 1] ^ result1[i]).toString();
            print += "Take the " + (i + 1) + "'th bit of the input and XOR it to the previous bit of the Output " + "i.e," + result1[i] + "⊕" + x.charAt(x.length - 1) + "=" + n + "<br>";
            print += "Write the result to the output. Outputh ->" + x + "<span style='text-decoration: underline;'>" + n + "</span><br><br>";
            x += n;
        }
        print += "<br><h5>STEP 3 : So, our binary result is:" + x + " </h5>";
        print += "<br><h5>Step 4 : Convert the binary output to decimal</h5>";
        var temp = x;
        x = parseInt(x, 2).toString();
        print += temp + "->" + x;
    }

    else {
        print += "<h4> Converting Decimal to Grey Code </h4> &emsp;";
        print += "<br><h5>STEP 1 : Convert the input from decimal to binary.</h5>";
        print += input + "->" + result1;
        print += "<br><h5>STEP 2 : Take the first bit of the binary input and write it to the output.</h5>";
        print += "Output ->" + x;
        print += "<br><h5>STEP 3 : Repeat the steps below until you reach the end of the input </h5>";
        for (var i = 1; i < result1.length; i++) {
            var m = parseInt(result1[i - 1] ^ result1[i]).toString();
            print += "Take the " + (i + 1) + "'th bit of the input and XOR it to the previous bit of the input " + "i.e," + result1[i] + "⊕" + result1[i - 1] + "=" + m + "<br>";
            print += "Write the result to the output. Outputh ->" + x + "<span style='text-decoration: underline;'>" + m + "</span><br><br>";
            x += m;
        }
        print += "<br><h5>STEP 4 : So, our final gray code result is" + x + "</h5>";
    }
    if (input == "") {
        x = "";
    }
    result2.innerHTML = "Answer -> " + x;
    work.innerHTML = print;
}

function convertgrey() {
    const fromBase = document.getElementById("grey-select1").value;
    var input = document.getElementById("grey-input").value;
    let result = document.getElementById("grey-result");
    let work = document.getElementById("grey-working");
    let print = "<h2 style='margin-top: 50px;'>Working Steps </h2> &emsp;";
    var x = input[0];

    if (fromBase == "Binary") {
        print += "<h4> Converting Binary to Grey Code </h4> &emsp;";
        print += "<br><h5>STEP 1 : Take the first bit of the input and write it to the output.</h5>";
        print += "Output ->" + x;
        print += "<br><h5>STEP 2 : Repeat the steps below until you reach the end of the input </h5>";
        for (var i = 1; i < input.length; i++) {
            var m = parseInt(input[i - 1] ^ input[i]).toString();
            print += "Take the " + (i + 1) + "'th bit of the input and XOR it to the previous bit of the input " + "i.e," + input[i] + "⊕" + input[i - 1] + "=" + m + "<br>";
            print += "Write the result to the output. Outputh ->" + x + "<span style='text-decoration: underline;'>" + m + "</span><br><br>";
            x += m;
        }
        print += "<br><h5>STEP 3 : So, our final gray code result is" + x + "</h5>";
    }

    else {
        print += "<h4> Converting Grey Code to Binary </h4> &emsp;";
        print += "<br><h5>STEP 1 : Take the first bit of the gray code input and write it to the output. Output -> " + x + "</h5>";
        print += "<br><h5>STEP 2 : Repeat the steps below until you reach the end of the input </h5>";
        for (var i = 1; i < input.length; i++) {
            var n = parseInt(x[i - 1] ^ input[i]).toString();
            print += "Take the " + (i + 1) + "'th bit of the input and XOR it to the previous bit of the Output " + "i.e," + input[i] + "⊕" + x.charAt(x.length - 1) + "=" + n + "<br>";
            print += "Write the result to the output. Outputh ->" + x + "<span style='text-decoration: underline;'>" + n + "</span><br><br>";
            x += n;
        }
        print += "<br><h5>Step 3 : So, our binary result is:" + x + " </h5>";
    }

    if (input == "") {
        x = "";
    } else if (input.search(/^[10]+$/) == -1)
        x = "Binary and grey code can only have 0's and 1's";
    result.innerHTML = "Answer ->" + x;
    work.innerHTML = print;
}

function convertBinhex() {
    const fromBase = document.getElementById("binary-hexadecimal-select1").value;
    const toBase = document.getElementById("binary-hexadecimal-select2").value;
    const input = document.getElementById("binary-hexadecimal-input").value;
    let result = document.getElementById("binary-hexadecimal-result");
    let from = 2;
    let to = 2;

    if (fromBase === "Binary") from = 2;
    else if (fromBase === "Decimal") from = 10;
    else if (fromBase === "Octal") from = 8;
    else from = 16;

    if (toBase === "Binary") to = 2;
    else if (toBase === "Decimal") to = 10;
    else if (toBase === "Octal") to = 8;
    else to = 16;

    result.innerHTML = fracDectoBinHexOct(calculatefrac(input, from), to);
    if (input == "") {
        result.innerHTML = "";
    } else if (from == 2) {
        if (input.search(/^[-.10]+$/) == -1)
            result.innerHTML = "Binary sistem sayılar yalnızca 0 ve 1 lerden oluşur";

    } else if (from == 8) {
        if (input.search(/^[-.01234567]+$/) == -1)
            result.innerHTML = "Octal saılarda 8 ve 9 rakamları bulunamaz";

    }
}

function fac(num) {
    if (num == 0)
        return 1;
    let fact = 1;
    for (let i = 1; i <= num; i++)
        fact = fact * i;
    return fact;
}


function onetwoCalc() {
    const input = document.getElementById("onetwonumber").value;
    let result = document.getElementById("onetworesult");
    let work = document.getElementById("onetwoworking");
    var print = "<h5 style='margin-top: 50px;'>Working of the 1's Complement -</h5> &emsp;"
    var ar = input.split("");
    var one = new Array(ar.length);
    var two = new Array(ar.length);
    for (var i = 0; i < ar.length; i++) {
        print += "1";
        if (ar[i] == 0) {
            one[i] = 1;

        } else {
            one[i] = 0;
        }
    }
    var onec = one.join('');
    result.innerHTML = "One's complement of " + input + " is " + onec + "<br>";

    for (var i = ar.length - 1; i >= 0; i--) {
        two[i] = ar[i];
        if (ar[i] == 1)
            break;

    }
    if (i == -1) {
        var twoc = '1' + two.join('');
    } else {
        for (var k = i - 1; k >= 0; k--) {
            if (ar[k] == 0) {
                two[k] = 1;

            } else {
                two[k] = 0;
            }
        }
        var twoc = two.join('');
    }
    result.innerHTML += "Two's complement of " + input + " is " + twoc + "<br>";

    print += " - " + input + "</span> = <span style='text-decoration: underline;'>" + onec + "</span><br>";

    print += "<br><h5 style='margin-top: 5px;'>Working of the 2's Complement -</h5> &emsp; 1's Complement + 1 = 2's Complement <br>&emsp; "
    print += onec + " + 1</span> = <span style='text-decoration: underline;'>" + twoc + "</span>";
    work.innerHTML = print;

    if (input == "") {
        result.innerHTML = "";
        work.innerHTML = "";
    } else if (input.search(/^[10]+$/) == -1) {
        result.innerHTML = "Binary numbers can only have 0's and 1's";
        work.innerHTML = "";
    }


}

function seveneightCalc() {
    const input = document.getElementById("seveneightnumber").value;
    let result = document.getElementById("seveneightresult");
    let work = document.getElementById("seveneightworking");
    var print = "<h5 style='margin-top: 50px;'>Working of the 7's Complement -</h5> &emsp;"
    var seven = "";
    var eight = "";

    for (var i = 0; i < input.length; i++) {
        print += "7";
        seven += '7' - input[i];
    }
    result.innerHTML = "Seven's complement of " + input + " is " + seven + "<br>";
    eight = (parseInt(seven, 8) + 1).toString(8);
    result.innerHTML = "Seven's complement of " + input + " is " + parseInt(seven) + "<br>";
    result.innerHTML += "Eight's complement of " + input + " is " + eight + "<br>";

    print += " - " + input + "</span> = <span style='text-decoration: underline;'>" + seven + "</span><br>";
    print += "<br><h5 style='margin-top: 5px;'>Working of the 8's Complement -</h5> &emsp; 7's Complement + 1 = 8's Complement <br>&emsp; "
    print += seven + " + 1</span> = <span style='text-decoration: underline;'>" + eight + "</span>";
    work.innerHTML = print;

    if (input == "") {
        result.innerHTML = "";
        work.innerHTML = "";
    } else if (input.search(/^[0-7]+$/) == -1) {
        result.innerHTML = "Octal Numbers can only have digits between 0 to 7 and - sign not allowed";
        work.innerHTML = "";
    }
}


function ninetenCalc() {
    const input = document.getElementById("ninetennumber").value;
    let result = document.getElementById("ninetenresult");
    let work = document.getElementById("ninetenworking");
    var print = "<h5 style='margin-top: 50px;'>Working of the 9's Complement -</h5> &emsp;"
    var nine = "";
    var ten = "";
    for (var i = 0; i < input.length; i++) {
        print += "9";
        nine += '9' - input[i];

    }
    ten = parseInt(nine) + 1;
    result.innerHTML = "Nine's complement of " + input + " is " + parseInt(nine) + "<br>";
    result.innerHTML += "Ten's complement of " + input + " is " + ten + "<br>";

    print += " - " + input + "</span> = <span style='text-decoration: underline;'>" + nine + "</span><br>";
    print += "<br><h5 style='margin-top: 5px;'>Working of the 10's Complement -</h5> &emsp; 9's Complement + 1 = 10's Complement <br>&emsp; "
    print += nine + " + 1</span> = <span style='text-decoration: underline;'>" + ten + "</span>";
    work.innerHTML = print;

    if (input == "") {
        result.innerHTML = "";
    } else if (input.search(/^[0-9]+$/) == -1)
        result.innerHTML = "Decimal Numbers can only have digits between 0 to 9 and '-' sign not allowed";
}

function datecal() {
    var c = new Date(Date.parse(document.getElementById("datef").value));
    var d = new Date(Date.parse(document.getElementById("datet").value));
    var x = new Date(d.getFullYear(), d.getMonth(), 0).getDate();

    if (c != "Invalid Date" && d != "Invalid Date") {
        if (d.getTime() > c.getTime()) {
            var y = d.getFullYear() - c.getFullYear();
            var m = d.getMonth() - c.getMonth();
            var da = d.getDate() - c.getDate();
            if (da < 0) {
                m--;
                da = x + da;
            }
            if (m < 0) {
                y--;
                m = 12 + m;
            }

            var dd = (d.getTime() - c.getTime()) / (1000 * 3600 * 24);
            if (y >= 0) {
                document.getElementById("date-1").innerHTML = `${y} Years ${m} Month ${da} Days`;
                document.getElementById("date-2").innerHTML = `${dd}`;
            } else {

                document.getElementById("date-1").innerHTML = `${-y} Years ${m} Month ${da} Days`;
                document.getElementById("date-2").innerHTML = `${-dd}`;

            }
        } else {
            var y = c.getFullYear() - d.getFullYear();
            var m = c.getMonth() - d.getMonth();
            var da = c.getDate() - d.getDate();
            if (da < 0) {
                m--;
                da = x + da;
            }
            if (m < 0) {
                y--;
                m = 12 + m;
            }

            var dd = (c.getTime() - d.getTime()) / (1000 * 3600 * 24);
            if (y >= 0) {
                document.getElementById("date-1").innerHTML = `${y} Years ${m} Month ${da} Days`;
                document.getElementById("date-2").innerHTML = `${dd}`;
            } else {

                document.getElementById("date-1").innerHTML = `${-y} Years ${m} Month ${da} Days`;
                document.getElementById("date-2").innerHTML = `${-dd}`;

            }
        }
    } else {
        document.getElementById("date-1").innerHTML = "Error : Invalid Date";
        document.getElementById("date-2").innerHTML = "Error : Invalid Date";
    }
}


function computeprobability() {

    var favour = parseInt(document.getElementById('favourable').value);


    var nettotal = parseInt(document.getElementById('total').value);
    let result = document.getElementById('probability-result');
    let temp = "";
    if ((isNaN(favour)) || (isNaN(nettotal))) {
        result.innerHTML = "\\[Please \\space enter \\space valid \\space input \\]";
    }
    else {
        if (favour < 0 || nettotal < 0) {
            temp += "\\[Outcomes \\space can't \\space be \\space negative. \\space Enter \\space positive \\space values \\space only \\]";
            result.innerHTML = temp;

        } else if (favour > nettotal) {
            temp += "\\[Number \\space of \\space favourable \\space outcomes \\space can't \\space exceeds \\space number \\space of \\space possible \\space outcomes \\]";
            result.innerHTML = temp;
        } else {
            temp += "\\[Empirical \\space Probability \\space = \\space \\frac{Number \\space of \\space favourable \\space outcomes}{Total \\space Number \\space of \\space possible \\space outcomes} \\]";
            temp += "\\[P(E) \\space = \\space \\frac{n(E)}{n(S)} \\space = \\space \\frac{ " + favour + "}{" + nettotal + "} \\]"
            temp += "\\[The \\space probability \\space of \\space the \\space event \\space is \\space : \\space " + (favour / nettotal).toFixed(3) + " \\]";
            result.innerHTML = temp;
        }
    }
    renderMathInElement(result);
}
function geoprobability(op) {
    let x = document.getElementById('failure').value;
    let p = document.getElementById('success').value;

    var output = document.getElementById("geoprobAns");

    if ((isNaN(x)) || (isNaN(p)) || x === "" || p === "") {
        document.getElementById("geoprobAns").innerHTML = "\\[Please \\space enter \\space valid \\space input\\]";
        renderMathInElement(document.getElementById("geoprobAns"));
    } else {
        if (p > 1) {
            document.getElementById("geoprobAns").innerHTML = "\\[Probability \\space of \\space success \\space cannot \\space exceed \\space 1 \\]";
            renderMathInElement(document.getElementById("geoprobAns"));
        } else if (p < 0) {
            document.getElementById("geoprobAns").innerHTML = "\\[Probability \\space of \\space success \\space cannot \\space be \\space negative \\]";
            renderMathInElement(document.getElementById("geoprobAns"));
        } else {
            if (op === 1) {
                var probtemp = "";
                probtemp += "\\[Geometric \\space Probability \\space will \\space be \\]";
                probtemp += "\\[\\space = \\space (1 - (Probability \\space of \\space Success))^{(Number \\space of \\space failures)} \\times (Probability \\space of \\space Success) \\]";
                probtemp += "\\[\\space = \\space (1 - " + p + ")^{" + x + "} \\times " + p + "\\]";
                probtemp += "\\[\\space = \\space " + ((1 - p) ** x).toFixed(2) + " \\times " + p + "\\]";
                probtemp += "\\[\\space = \\space " + ((1 - p) ** x * p).toFixed(3) + "\\]";
                output.innerHTML = probtemp;
            } else if (op == 2) {
                var meantemp = "";
                meantemp += "\\[Mean \\space of \\space Geometric \\space Probability \\space will \\space be \\]";
                meantemp += "\\[\\space = \\space \\frac{(1 - (Probability \\space of \\space Success))}{(Probability \\space of \\space Success)} \\]";
                meantemp += "\\[\\space = \\space \\frac{(1 - " + p + ")}{" + p + "}\\]";
                meantemp += "\\[\\space = \\space \\frac{" + (1 - p).toFixed(2) + "}{ " + p + "}\\]";
                meantemp += "\\[\\space = \\space " + ((1 - p) / p).toFixed(3) + "\\]";
                output.innerHTML = meantemp;
            } else {
                var vartemp = "";
                vartemp += "\\[Variance \\space of \\space Geometric \\space Probability \\space will \\space be \\]";
                vartemp += "\\[\\space = \\space \\frac{(1 - (Probability \\space of \\space Success))}{(Probability \\space of \\space Success)^{2}} \\]";
                vartemp += "\\[\\space = \\space \\frac{(1 - " + p + ")}{" + p + "^2}\\]";
                vartemp += "\\[\\space = \\space \\frac{" + (1 - p).toFixed(2) + "}{ " + p ** 2 + "}\\]";
                vartemp += "\\[\\space = \\space " + ((1 - p) / (p * p)).toFixed(3) + "\\]";
                output.innerHTML = vartemp;
            }
        }
        renderMathInElement(output);
    }
}




function computejointprobability() {

    var favourable1 = parseInt(document.getElementById("favourable1").value)
    var favourable2 = parseInt(document.getElementById("favourable2").value)
    var total1 = parseInt(document.getElementById("total1").value)
    var total2 = parseInt(document.getElementById("total2").value)

    let ans = "";
    var probability1 = favourable1 / total1;
    var probability2 = favourable2 / total2;

    var probability3 = (probability1 * probability2);

    ans += "\\[Joint\\space Probability\\space =\\space\\frac{favourable\\space outcome\\space in\\space Event 1}{possible\\space outcome\\space in\\space Event1}\\times\\frac{favourable\\space outcome\\space in\\space\\ Event2}{possible\\space outcome\\space in\\space\\ Event2}\\]"
    ans += "\\[=\\space\\frac{" + favourable1 + "}{" + total1 + "}\\times\\frac{" + favourable2 + "}{" + total2 + "}\\]";
    ans += "\\[=\\space " + favourable1 + "/" + total1 + "\\times " + favourable2 + "/" + total2 + "\\]";
    ans += "\\[=\\space" + probability3 + "\\]";

    let result1 = document.getElementById("probability-result1");
    let result2 = document.getElementById("probability-result2");
    let result3 = document.getElementById("probability-result3");
    var check = true;

    if ((isNaN(favourable1)) || (isNaN(favourable2)) || (isNaN(total1)) || (isNaN(total2))) {
        result1.innerHTML = "Please enter valid input";
        result2.innerHTML = "";
        result3.innerHTML = "";
    }
    else {
        if (favourable1 >= 0 && total1 > 0 && favourable2 >= 0 && total2 > 0) {
            if (favourable1 > total1) {
                result1.innerHTML = "Number of favourable outcomes can't exceeds number of possible outcomes in first event";
                check = false;
            } else {
                result1.innerHTML = "The probability of first event is : " + (probability1).toFixed(3);
            }

            if (favourable2 > total2) {
                result2.innerHTML = "Number of favourable outcomes can't exceeds number of possible outcomes in second event";
                check = false;
            } else {
                result2.innerHTML = "The probability of second event is : " + (probability2).toFixed(3);
            }

            if (check == true) {

                result3.innerHTML = ans;
                renderMathInElement(result3);

            }
        } else {
            result1.innerHTML = "Outcomes can't be negative. Enter positive values only";
            result2.innerHTML = "";
            result3.innerHTML = "";
        }
    }
}

function angleplot() {


    var canvas = document.getElementById('plotangleres');
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);


    var input = document.getElementById("inputangle").value;
    var c = document.getElementById("plotangleres");
    var ctx = c.getContext("2d");
    ctx.lineWidth = 3;


    var c0tx = c.getContext("2d");
    c0tx.font = "15px Arial";
    c0tx.fillText("0° ", 630, 250);


    var c90tx = c.getContext("2d");
    c90tx.font = "15px Arial";
    c90tx.fillText("90° ", 510, 125);


    var c180tx = c.getContext("2d");
    c180tx.font = "15px Arial";
    c180tx.fillText("180° ", 335, 250);


    var c270tx = c.getContext("2d");
    c270tx.font = "15px Arial";
    c270tx.fillText("270° ", 510, 400);

    var ytx = c.getContext("2d");
    var xtx = c.getContext("2d");
    ytx.moveTo(500, 0);
    ytx.lineTo(500, 1000);
    ytx.stroke();
    xtx.moveTo(0, 250);
    xtx.lineTo(1000, 250);
    xtx.stroke();
    ctx.beginPath();
    input = input % 360;
    if (input < 0) {
        ctx.arc(500, 250, 125, -2 * Math.PI - ((input / 180) * Math.PI), 0, true);
    } else {
        ctx.arc(500, 250, 125, 0, 2 * Math.PI - ((input / 180) * Math.PI), true);
    }
    ctx.stroke();

}
function fa(x) {
    if (x == 1)
        return 1;
    return x * fa(x - 1);
}
function posse() {
    var a = parseInt(document.getElementById("anglecalc").value)
    if (!isNaN(a)) {
        var n = 360 / (180 - a);
        if (n === parseInt(n)) {
            document.getElementById("posseans").innerHTML = "\\[Here \\space the \\space value \\space of \\space n \\space = \\space \\frac{369}{180-" + a + "} \\space = \\space " + n.toFixed(2) + " \\newline since, \\space the \\space value \\space of \\space n \\space is \\space an \\space integer, \\newline It \\space is \\space possible \\space to \\space create \\space a \\space polygon \\space with \\space a \\space given \\space angle \\space (" + a + ")\\]";
        } else {
            document.getElementById("posseans").innerHTML = "\\[Here \\space the \\space value \\space of \\space n \\space = \\space \\frac{369}{180-" + a + "} \\space = \\space " + n.toFixed(2) + " \\newline since, \\space the \\space value \\space of \\space n \\space is \\space NOT \\space an \\space integer, \\newline It \\space is \\space NOT \\space possible \\space to \\space create \\space a \\space polygon \\space with \\space a \\space given \\space angle \\space (" + a + ")\\]";
        }
    } else {
        document.getElementById("posseans").innerHTML = "\\[Please \\space enter \\space valid \\space input\\]";
    }
    renderMathInElement(document.getElementById("posseans"));
}


function ran(x, y, z) {
    var c = 0;
    for (var j = y + 1; j <= z; ++j) {
        if (x[j] <= x[y]) {
            c++;
        }
    }
    return c;
}
function radians_to_degrees(radians) {
    var pi = Math.PI;
    return radians * (180 / pi);
}

function ssscal() {
    var a = document.getElementById("sd1").value;
    var b = document.getElementById("sd2").value;
    var c = document.getElementById("sd3").value;
    var ans = "";
    if (a == "" || b == "" || c == "") {
        ans = "Error: All three sides are required to find all the angles";
    }
    else {
        let steps = "";
        var cosa = (b * b + c * c - a * a) / (2 * b * c);
        var cosb = (a * a + c * c - b * b) / (2 * c * a);
        var cosc = (b * b + a * a - c * c) / (2 * b * a);
        var anga = Math.acos(cosa);
        var angb = Math.acos(cosb);
        var angc = Math.acos(cosc);
        var ab, bc, ca;

        steps += "\\[Let\\space X= \\frac{" + b + " ^ 2 + " + c + " ^ 2 - " + a + " ^ 2}{2\\times " + b + " \\times " + c + "}\\]";
        steps += "\\[Let\\space Y= \\frac{" + a + " ^ 2 + " + c + " ^ 2 - " + b + " ^ 2}{2\\times " + c + " \\times " + a + "}\\]";
        steps += "\\[Let\\space Z= \\frac{" + b + " ^ 2 + " + a + " ^ 2 - " + c + " ^ 2}{2\\times " + b + " \\times " + a + "}\\]";
        steps += "\\[Convert\\space X,Y\\space and Z to degrees\\]";
        ab = radians_to_degrees(anga);
        bc = radians_to_degrees(angb);
        ca = radians_to_degrees(angc);

        ab = ab.toPrecision(4);
        bc = bc.toPrecision(4);
        ca = ca.toPrecision(4);
        steps += "\\[The\\space required\\space angles \\space oppsite\\space to\\space first\\space side\\space is:\\space " + X + " second\\space side\\space is\\space " + Y + " third\\space side\\space is\\space " + Z + " \\]";
    }
    document.getElementById("sstans").innerHTML = steps;
    renderMathInElements(document.getElementById("sstans"));
}

function __gcd(a, b) {
    return b == 0 ? a : __gcd(b, a % b);
}

function power(a, n) {
    if (n == 0)
        return 1;

    var p = power(a, parseInt(n / 2));
    p = p * p;

    if (n % 2 == 1)
        p = p * a;

    return p;
}
function clockcal() {
    var a = parseFloat(document.getElementById("hclock").value);
    var b = parseFloat(document.getElementById("mclock").value);
    var output = document.getElementById("clockans");
    var ans = "";
    if (isNaN(a) || isNaN(b)) {
        ans = "\\[Please \\space enter \\space valid \\space input\\]"

        output.innerHTML = ans;
    }
    else {
        var angmin = b * 6;
        var anghour = 30 * a + 0.5 * b
        ans += "\\[The \\space clock \\space angle \\space calculator \\space calculates, \\]"
        ans += "\\[\\space (Angle \\space from \\space minute \\space to \\space hour \\space hands) \\space and \\space (Angle \\space from \\space hour \\space to \\space minute \\space hands)\\]"
        ans += "\\[First, \\space we \\space calculate \\space (Minute \\space angle) \\space and \\space (Hour \\space angle)\\]"
        ans += "\\[(Minute \\space angle) \\space = \\space " + b + " \\times 6\\]"
        ans += "\\[\\space = \\space " + angmin.toFixed(2) + "\\]"
        ans += "\\[(Hour \\space angle) \\space = \\space 30 \\times " + a + " + \\frac{1}{2} \\times " + b + "\\]"
        ans += "\\[\\space = \\space 30 \\times " + a + " + 0.5 \\times " + b + "\\]"
        ans += "\\[\\space = \\space " + (30 * a) + " + " + (0.5 * b) + "\\]"
        ans += "\\[\\space = \\space " + anghour.toFixed(2) + "\\]"
        ans += "\\[Finally, \\space (Angle \\space from \\space minute \\space to \\space hour \\space hands) \\space will \\space be,\\]"
        ans += "\\[\\space = \\space | " + anghour + " - " + angmin + " |\\]"
        ans += "\\[\\space = \\space | " + (anghour - angmin).toFixed(2) + " |\\]"
        ans += "\\[\\space = \\space " + (Math.abs(anghour - angmin)).toFixed(2) + "\\]"
        ans += "\\[And, \\space (Angle \\space from \\space hour \\space to \\space minute \\space hands) \\space will \\space be,\\]"
        ans += "\\[\\space = \\space |360 - |" + anghour + " - " + angmin + " ||\\]"
        ans += "\\[\\space = \\space |360 - |" + (anghour - angmin).toFixed(2) + " ||\\]"
        ans += "\\[\\space = \\space |360 - " + (Math.abs(anghour - angmin)).toFixed(2) + "|\\]"
        ans += "\\[\\space = \\space " + Math.abs(360 - Math.abs(anghour - angmin)).toFixed(2) + "\\]"

        output.innerHTML = ans;
    }
    renderMathInElement(output);
}
function calcexslvcal() {
    a = document.getElementById("solvex");
    b = document.getElementById("solvey");
    c = document.getElementById("solvez");
    a.value = 3;
    b.value = 5;
    c.value = 14;
    slvcal();
}
function slvcal() {
    a = parseFloat(document.getElementById("solvex").value);
    b = parseFloat(document.getElementById("solvey").value);
    c = parseFloat(document.getElementById("solvez").value);
    var output = document.getElementById("slvans");
    var ans = "";
    if (isNaN(a) || isNaN(b) || isNaN(c)) {
        ans += "\\[Lütfen \\space tüm \\space alanları \\space doldurun\\]";
        output.innerHTML = ans;
        renderMathInElement(output);
    }
    else if (b < 0) {

        ans += "\\[" + a + "\\space X \\space " + b + "\\space = \\space " + c + " \\]";
        ans += "\\[" + a + "\\space X \\space = \\space " + (c - b) + "\\]";
        ans += "\\[\\space X \\space = \\space " + (c - b) / a + "\\]";
        output.innerHTML = ans;
        renderMathInElement(output);
    }
    else {

        ans += "\\[" + a + "\\space X \\space + \\space " + b + "\\space = \\space " + c + " \\]";
        ans += "\\[" + a + "\\space X \\space = \\space " + (c - b) + "\\]";
        ans += "\\[\\space X \\space = \\space " + (c - b) / a + "\\]";
        output.innerHTML = ans;
        renderMathInElement(output);
    }
}

function tvalue_mean(arr) {
    let sum = 0;
    for (var i = 0; i < arr.length; i++) {
        sum += arr[i];
    }

    return sum / arr.length;
}

function tvalue_dec(arr, mean) {
    let diff = 0
    for (var i = 0; i < arr.length; i++) {
        var temp = 0
        temp = arr[i] - mean
        temp = Math.pow(temp, 2)
        diff += temp;
    }

    return diff
}

function tvalue_SD(diff, length) {
    var val = diff / (length - 1)
    return Math.sqrt(val);
}

function regressionvalue() {
    let list1 = document.getElementById("valuex").value;
    let list2 = document.getElementById("valuey").value;


    if (list1 == "" || list2 == "") {
        document.getElementById('regressionans').innerHTML = "Please input all the numbers to find answer";
    }
    else {
        list1 = list1.split(" ");
        list2 = list2.split(" ");
        let n1 = list1.length;
        let n2 = list2.length;
        if (list1.length != list2.length) {
            document.getElementById('regressionans').innerHTML = "Number of inputs in both dataset should be same";
        }
        else {
            let sumx = 0;
            let sumy = 0;
            let sumxy = 0;
            let sumx2 = 0;
            let sumy2 = 0;
            for (var i = 0; i < n1; i++) {
                list1[i] = parseFloat(list1[i]);
                list2[i] = parseFloat(list2[i]);
                sumx = sumx + list1[i];
                sumy = sumy + list2[i];
                sumxy = sumxy + (list1[i] * list2[i]);
                sumx2 = sumx2 + Math.pow(list1[i], 2);
                sumy2 = sumy2 + Math.pow(list2[i], 2);
            }//for
            var num = (n1 * sumxy) - (sumx * sumy);
            var denox = (n1 * sumx2) - (Math.pow(sumx, 2));
            var denoy = (n1 * sumy2) - (Math.pow(sumy, 2));
            var bxy = num / denoy;
            var byx = num / denox;
            var ans = "";
            ans += "\\[The \\space regression \\space coefficient \\space of \\space y \\space on \\space x \\space (b_{yx}): \\]"
            ans += "\\[b_{yx} =\\frac{n \\sum xy -\\sum x \\sum y}{n \\sum x^{2} -(\\sum x)^{2}}\\]"
            ans += "\\[\\frac{(" + n1 + " \\times " + sumxy + ") - (" + sumx + " \\times " + sumy + ")}{(" + n1 + " \\times " + sumx2 + ") -(" + sumx + ")^{2}}\\]"
            ans += "\\[\\frac{" + num.toFixed(4) + "}{" + denox.toFixed(4) + "}\\]"
            ans += "\\[b_{yx}=" + byx.toFixed(4) + "\\]"
            ans += "\\[The \\space regression \\space coefficient \\space of \\space x \\space on \\space y \\space (b_{xy}): \\]"
            ans += "\\[b_{xy} =\\frac{n \\sum xy -\\sum x \\sum y}{n \\sum y^{2} -(\\sum y)^{2}}\\]"
            ans += "\\[ \\frac{(" + n1 + " \\times " + sumxy + ") - (" + sumx + " \\times " + sumy + ")}{(" + n1 + " \\times " + sumy2 + ") -(" + sumy + ")^{2}}\\]"
            ans += "\\[\\frac{" + num.toFixed(4) + "}{" + denoy.toFixed(4) + "}\\]"
            ans += "\\[b_{xy}=" + bxy.toFixed(4) + "\\]"

            document.getElementById('regressionans').innerHTML = ans;
            renderMathInElement(document.getElementById('regressionans'));
        }//else
    }//else

}//function

function tvalue() {
    let list1 = document.getElementById("list1").value;
    let list2 = document.getElementById("list2").value;


    if (list1 == "" || list2 == "") {
        document.getElementById('stepsbox').style.display = "none";
        document.getElementById('testans').innerHTML = "Please input all the numbers to find answer";
    }
    else {
        list1 = list1.split(" ");
        list2 = list2.split(" ");
        let n1 = list1.length
        let n2 = list2.length

        if (list1.length != list2.length) {
            document.getElementById('stepsbox').style.display = "none";
            document.getElementById('testans').innerHTML = "Number of inputs in both dataset should be same";
        }

        else {
            if (n1 <= 30 && n2 <= 30) {
                for (var i = 0; i < n1; i++) {
                    list1[i] = parseInt(list1[i]);
                }
                for (var i = 0; i < n2; i++) {
                    list2[i] = parseInt(list2[i]);
                }

                document.getElementById('steps').innerHTML = "Values calculated while the test:"
                let mean1 = tvalue_mean(list1)
                document.getElementById('mean1').innerHTML = "Mean of first set of numbers = " + mean1;

                let mean2 = tvalue_mean(list2)
                document.getElementById('mean2').innerHTML = "Mean of second set of numbers = " + mean2;


                let diff1 = tvalue_dec(list1, mean1)
                let diff2 = tvalue_dec(list2, mean2)

                let SD1 = tvalue_SD(diff1, n1)
                document.getElementById('SD1').innerHTML = "Standard Deviation of first set of numbers = " + Number.parseFloat(SD1).toPrecision(4);
                let SD2 = tvalue_SD(diff2, n2)
                document.getElementById('SD2').innerHTML = "Standard Deviation of second set of numbers = " + Number.parseFloat(SD2).toPrecision(4);

                let delta_sd = Math.sqrt((Math.pow(SD1, 2) / n1) + (Math.pow(SD2, 2) / n2))
                let ttest_value = (mean1 - mean2) / delta_sd

                document.getElementById('testans').innerHTML = "The value for the T-test is " + ttest_value + " = <strong>" + Number.parseFloat(ttest_value).toPrecision(4) + "</strong>(approx)."
                document.getElementById('stepsbox').style.display = "block"
            } else {
                document.getElementById('stepsbox').style.display = "none"
                document.getElementById('testans').innerHTML = "T-test is not applicable for set of numbers more than 30"
            }
        }
    }
}

function cchart_sum(arr) {
    let sum = 0;
    for (var i = 0; i < arr.length; i++) {
        sum += arr[i];
    }

    return sum;
}


function cvalue() {
    let list1 = document.getElementById("cdefective").value;
    list1 = list1.split(" ");
    var n1 = 0;
    n1 = parseInt(list1.length);

    for (var i = 0; i < n1; i++) {
        list1[i] = parseInt(list1[i]);
    }

    var ans = "";
    var ucl = "";
    let sum = cchart_sum(list1);
    var cbar = (sum / n1).toFixed(4);
    var ucl2 = (3 * Math.sqrt(sum / n1).toFixed(4)).toFixed(4);

    document.getElementById('cpans').innerHTML = "The control limits are:";
    ans += "\\[\\space \\bar{C} \\space = \\frac{ Number \\space of \\space defects \\space in \\space all \\space samples}{Total \\space no \\space of \\space samples}\\]"
    ans += "\\[ \\space  \\frac{" + sum + "}{" + n1 + "}\\]";
    ans += "\\[ \\space  " + (sum / n1).toFixed(4) + "\\]";
    var controlLimit = document.getElementById('ccl')
    controlLimit.innerHTML = ans;
    renderMathInElement(controlLimit);

    ucl += "\\[Upper \\space Control \\space Limit \\space (UCL) \\space =\\space \\bar{C} +\\space 3 \\sqrt{ \\bar{C}} \\]"
    ucl += "\\[\\space " + (sum / n1).toFixed(4) + " +\\space 3 \\sqrt{" + cbar + "} \\]"
    ucl += "\\[\\space " + (sum / n1).toFixed(4) + " +\\space 3 \\times " + Math.sqrt(cbar).toFixed(4) + " \\]"
    ucl += "\\[\\space " + (sum / n1).toFixed(4) + " +\\space " + ucl2 + " \\]"
    ucl += "\\[\\space " + (Number(cbar) + Number(ucl2)).toFixed(4) + " \\]"
    ucl += "\\[UCL \\space =\\space " + (Number(cbar) + Number(ucl2)).toFixed(4) + " \\]"

    var upperControlLimit = document.getElementById('cuppercontrol');
    upperControlLimit.innerHTML = ucl;
    renderMathInElement(upperControlLimit);



    var lcl = "";
    lcl += "\\[Lower \\space Control \\space Limit \\space (LCL) \\space =\\space \\bar{C} - \\space 3 \\sqrt{ \\bar{C}}\\]"
    lcl += "\\[\\space " + cbar + " -\\space 3  \\sqrt{" + cbar + "} \\]"
    lcl += "\\[\\space " + cbar + " -\\space 3 \\times " + Math.sqrt(cbar).toFixed(4) + " \\]"
    lcl += "\\[\\space " + cbar + " - \\space " + ucl2 + " \\]"
    lcl += "\\[\\space " + (cbar - ucl2).toFixed(4) + " \\]"
    lcl += "\\[LCL \\space =\\space " + (Number(cbar) - Number(ucl2)).toFixed(4) + " \\]"

    if (Number.parseFloat((cbar - ucl2).toPrecision(4)) < 0)
        lcl += "\\[Since \\space the \\space fraction \\space defective \\space cannot \\space be \\space - ve \\space \\therefore \\space LCL \\space = 0 \\]"
    var lowerControlLimit = document.getElementById('clowercontrol');
    lowerControlLimit.innerHTML = lcl;
    renderMathInElement(lowerControlLimit);



}


function pchart_sum(arr) {
    let sum = 0;
    for (var i = 0; i < arr.length; i++) {
        sum += arr[i];
    }

    return sum;
}


function pvalue() {
    let list1 = document.getElementById("defectives").value;
    let n = document.getElementById("samples").value;
    n = parseInt(n);
    console.log(list1 + " " + n);
    list1 = list1.split(" ");
    var n1 = 0;
    n1 = parseInt(list1.length);

    for (var i = 0; i < n1; i++) {
        list1[i] = parseInt(list1[i]);
    }

    var ans = "";
    var ucl = "";
    let sum = pchart_sum(list1);
    var pbar = Number.parseFloat(Number.parseFloat((sum) / (n * n1)).toPrecision(4));
    var ucl1 = Number.parseFloat(3 * Math.sqrt((pbar * (1 - pbar)) / n).toPrecision(4));

    document.getElementById('npans').innerHTML = "The control limits are:";
    ans += "\\[\\space \\bar{p} \\space = \\frac{Total \\space No \\space of \\space defectives}{Total \\space no \\space of \\space items \\space inspected}\\]"
    ans += "\\[ \\space  \\frac{" + sum + "}{" + n + " \\times " + n1 + "}\\]";
    ans += "\\[ \\space  \\frac{" + sum + "}{" + n * n1 + "}\\]";
    ans += "\\[ \\space  " + pbar + "\\]";
    var controlLimit = document.getElementById('pbar')
    controlLimit.innerHTML = ans;
    renderMathInElement(controlLimit);
    var main = Number.parseFloat(3 * Math.sqrt((pbar * (1 - pbar)) / n)).toPrecision(4);

    ucl += "\\[Upper \\space Control \\space Limit \\space (UCL) \\space =\\space \\bar{p} +\\space 3 \\sqrt{\\frac{ \\bar{p} (1- \\bar{p})}{n}} \\]"
    ucl += "\\[\\space " + pbar + " +\\space 3 \\sqrt{\\frac{ " + pbar + " \\space X " + (1 - pbar) + "}{" + n + "}} \\]"
    ucl += "\\[\\space " + pbar + " +\\space 3 \\sqrt{\\frac{ " + (pbar * (1 - pbar)) + "}{" + n + "}} \\]"
    ucl += "\\[\\space " + pbar + " +\\space 3 \\sqrt{" + (pbar * (1 - pbar)) / n + "} \\]"
    ucl += "\\[\\space " + pbar + " +\\space " + Number.parseFloat(3 * Math.sqrt((pbar * (1 - pbar)) / n).toPrecision(4)) + " \\]"
    ucl += "\\[UCL \\space =\\space " + Number.parseFloat((pbar + ucl1).toPrecision(4)) + " \\]"

    var upperControlLimit = document.getElementById('ucl');
    upperControlLimit.innerHTML = ucl;
    renderMathInElement(upperControlLimit);



    var lcl = "";
    lcl += "\\[Lower \\space Control \\space Limit \\space (LCL) \\space =\\space \\bar{p} -\\space 3 \\sqrt{\\frac{ \\bar{p} (1- \\bar{p})}{n}} \\]"
    lcl += "\\[\\space " + pbar + " -\\space 3 \\sqrt{\\frac{ " + pbar + " \\space X " + (1 - pbar) + "}{" + n + "}} \\]"
    lcl += "\\[\\space " + pbar + " -\\space 3 \\sqrt{\\frac{ " + (pbar * (1 - pbar)) + "}{" + n + "}} \\]"
    lcl += "\\[\\space " + pbar + " - \\space 3 \\sqrt{" + (pbar * (1 - pbar)) / n + "} \\]"
    lcl += "\\[\\space " + pbar + " -\\space " + Number.parseFloat(3 * Math.sqrt((pbar * (1 - pbar)) / n).toPrecision(4)) + " \\]"
    lcl += "\\[LCL \\space =\\space " + Number.parseFloat((pbar - ucl1).toPrecision(4)) + " \\]"

    if (Number.parseFloat((pbar - ucl1).toPrecision(4)) < 0)
        lcl += "\\[Since \\space the \\space fraction \\space defective \\space cannot \\space be \\space - ve \\space \\therefore \\space LCL \\space = 0 \\]"
    var lowerControlLimit = document.getElementById('lcl');
    lowerControlLimit.innerHTML = lcl;
    renderMathInElement(lowerControlLimit);



}


function rchart_sum(arr) {
    let sum = 0;
    for (var i = 0; i < arr.length; i++) {
        sum += arr[i];
    }

    return sum;
}


function rvalue() {
    let list1 = document.getElementById("range").value;
    let n = document.getElementById("D4").value;
    let num = document.getElementById("D3").value;
    if (list1 == "" || n == "" || num == "") {
        document.getElementById('rans').innerHTML = "Please fill all the fields.";
        document.getElementById('rbar').innerHTML = "";
        document.getElementById('rucl').innerHTML = "";
        document.getElementById('rlcl').innerHTML = "";
    }
    else {
        n = parseFloat(n);
        num = parseFloat(num);
        list1 = list1.split(" ");
        var n1 = 0;
        n1 = parseInt(list1.length);

        for (var i = 0; i < n1; i++) {
            list1[i] = parseFloat(list1[i]);
        }

        var ans = "";
        var ucl = "";
        let sum = rchart_sum(list1);
        var rbar = sum / n1;
        var ucl1 = Number.parseFloat(3 * Math.sqrt((pbar * (1 - pbar)) / n).toPrecision(4));

        document.getElementById('rans').innerHTML = "The control limits are:";
        ans += "\\[\\space \\bar{R} \\space = \\frac{\\sum{R}}{Total \\space No \\space of \\space samples}\\]"
        ans += "\\[ \\space  \\frac{" + sum + "}{" + n1 + "}\\]";
        ans += "\\[ \\space  " + rbar.toFixed(4) + " \\]";

        var controlLimit = document.getElementById('rbar')
        controlLimit.innerHTML = ans;
        renderMathInElement(controlLimit);

        ucl += "\\[Upper \\space Control \\space Limit \\space (UCL) \\space =\\space D_4 \\bar{R} \\]"
        ucl += "\\[\\space " + n + " \\times " + rbar.toFixed(4) + "\\]"
        ucl += "\\[\\space " + (n * rbar.toFixed(4)).toFixed(4) + "\\]"
        ucl += "\\[UCL \\space =\\space " + (n * rbar.toFixed(4)).toFixed(4) + " \\]"
        var upperControlLimit = document.getElementById('rucl');
        upperControlLimit.innerHTML = ucl;
        renderMathInElement(upperControlLimit);



        var lcl = "";
        lcl += "\\[Lower \\space Control \\space Limit \\space (UCL) \\space =\\space D_3 \\bar{R}\\]"
        lcl += "\\[\\space " + num + " \\times " + rbar.toFixed(4) + " \\]"
        lcl += "\\[\\space " + (num * rbar.toFixed(4)).toFixed(4) + "\\]"
        lcl += "\\[LCL \\space =\\space " + (num * rbar.toFixed(4)).toFixed(4) + " \\]"

        if ((num * rbar.toFixed(4)).toFixed(4) < 0)
            lcl += "\\[Since \\space the \\space fraction \\space defective \\space cannot \\space be \\space - ve \\space \\therefore \\space LCL \\space = 0 \\]"
        var lowerControlLimit = document.getElementById('rlcl');
        lowerControlLimit.innerHTML = lcl;
        renderMathInElement(lowerControlLimit);

    }

}

function moment_1(arr, mean) {
    let temp = 0;
    let sum = 0;
    for (var i = 0; i < arr.length; i++) {
        sum = arr[i] - mean;
        temp = temp + sum;
    }

    return temp;
}
function moment_2(arr, mean) {
    let temp = 0;
    let sum = 0;
    for (var i = 0; i < arr.length; i++) {
        sum = arr[i] - mean;
        temp = temp + Math.pow(sum, 2);
    }

    return temp;
}
function moment_3(arr, mean) {
    let temp = 0;
    let sum = 0;
    for (var i = 0; i < arr.length; i++) {
        sum = arr[i] - mean;
        temp = temp + Math.pow(sum, 3);
    }

    return temp;
}
function moment_4(arr, mean) {
    let temp = 0;
    let sum = 0;
    for (var i = 0; i < arr.length; i++) {
        sum = arr[i] - mean;
        temp = temp + Math.pow(sum, 4);
    }

    return temp;
}
function momentvalue() {
    let list1 = document.getElementById("valueofx").value;
    let sum = 0;

    list1 = list1.split(" ");
    let n1 = list1.length;
    for (var i = 0; i < n1; i++) {
        list1[i] = parseInt(list1[i]);
        sum = sum + list1[i];
    }
    sum = sum / n1;
    var mu1 = moment_1(list1, sum)
    var mu2 = moment_2(list1, sum)
    var mu3 = moment_3(list1, sum)
    var mu4 = moment_4(list1, sum)
    var ans = ""
    ans += "\\[\\mu_1 =\\frac{\\sum(x- \\bar{x})}{n}\\]"
    ans += "\\[\\frac{" + mu1 + "}{" + n1 + "} \\]"
    ans += "\\[\\mu_1 =" + parseFloat(parseFloat(mu1) / parseFloat(n1)).toFixed(4) + " \\]"

    ans += "\\[\\mu_2 =\\frac{\\sum(x- \\bar{x})^{2}}{n}\\]"
    ans += "\\[\\frac{" + mu2 + "}{" + n1 + "} \\]"
    ans += "\\[\\mu_2 =" + parseFloat(parseFloat(mu2) / parseFloat(n1)).toFixed(4) + " \\]"

    ans += "\\[\\mu_3 =\\frac{\\sum(x- \\bar{x})^{3}}{n}\\]"
    ans += "\\[\\frac{" + mu3 + "}{" + n1 + "} \\]"
    ans += "\\[\\mu_3 = " + parseFloat(parseFloat(mu3) / parseFloat(n1)).toFixed(4) + " \\]"

    ans += "\\[\\mu_4 =\\frac{\\sum(x- \\bar{x})^{4}}{n}\\]"
    ans += "\\[\\frac{" + mu4 + "}{" + n1 + "} \\]"
    ans += "\\[\\mu_4 =" + parseFloat(parseFloat(mu4) / parseFloat(n1)).toFixed(4) + " \\]"
    document.getElementById("momentans").innerHTML = ans;

    renderMathInElement(document.getElementById("momentans"))

}


function xchart_sum(arr) {
    let sum = 0;
    for (var i = 0; i < arr.length; i++) {
        sum += arr[i];
    }

    return sum;
}


function xvalue() {
    let list1 = document.getElementById("average").value;
    let list2 = document.getElementById("ranges").value;
    let n = document.getElementById("A2").value;
    if (list1 == "" || n == "" || list2 == "") {
        document.getElementById('xans').innerHTML = "Please fill all the fields.";
        document.getElementById('xbar').innerHTML = "";
        document.getElementById('xucl').innerHTML = "";
        document.getElementById('xlcl').innerHTML = "";
    }
    else {
        n = parseFloat(n);
        list1 = list1.split(" ");
        list2 = list2.split(" ");
        var n1 = 0;
        n1 = parseInt(list1.length);
        var n2 = parseInt(list2.length);
        for (var i = 0; i < n1; i++) {
            list1[i] = parseFloat(list1[i]);
        }
        for (var i = 0; i < n2; i++) {
            list2[i] = parseFloat(list2[i]);
        }

        var ans = "";
        var ucl = "";
        let sum = xchart_sum(list1);
        let sum1 = xchart_sum(list2);
        var xbar = (sum / n1).toFixed(4);
        var rbar = (sum1 / n2).toFixed(4);


        document.getElementById('xans').innerHTML = "The control limits are:";
        ans += "\\[\\space \\bar{X̄} \\space = \\frac{\\sum{\\bar{X}}}{Total \\space No \\space of \\space samples}\\]"
        ans += "\\[ \\space  \\frac{" + sum + "}{" + n1 + "}\\]";
        ans += "\\[ \\space  " + xbar + " \\]";

        var controlLimit = document.getElementById('xbar')
        controlLimit.innerHTML = ans;
        renderMathInElement(controlLimit);

        ucl += "\\[Upper \\space Control \\space Limit \\space (UCL) \\space =\\space \\bar{\\bar{X}} + A_2 \\bar{R} \\]"
        ucl += "\\[\\space " + xbar + " + " + n + " \\times " + rbar + "\\]"
        ucl += "\\[\\space " + xbar + "+ " + (n * rbar).toFixed(4) + "\\]"
        ucl += "\\[UCL \\space =\\space " + (parseFloat(xbar) + parseFloat(n * rbar)).toFixed(4) + " \\]"
        var upperControlLimit = document.getElementById('xucl');
        upperControlLimit.innerHTML = ucl;
        renderMathInElement(upperControlLimit);



        var lcl = "";
        lcl += "\\[Lower \\space Control \\space Limit \\space (LCL) \\space =\\space \\bar{\\bar{X}} - A_2 \\bar{R} \\]"
        lcl += "\\[\\space " + xbar + " - " + n + " \\times " + rbar + " \\]"
        lcl += "\\[\\space " + xbar + "- " + (n * rbar).toFixed(4) + " \\]"
        lcl += "\\[LCL \\space =\\space " + ((parseFloat(xbar) - parseFloat(n * rbar))).toFixed(4) + " \\]"

        if ((parseFloat(xbar) - parseFloat(n * rbar)) < 0)
            lcl += "\\[Since \\space the \\space fraction \\space defective \\space cannot \\space be \\space - ve \\space \\therefore \\space LCL \\space = 0 \\]"
        var lowerControlLimit = document.getElementById('xlcl');
        lowerControlLimit.innerHTML = lcl;
        renderMathInElement(lowerControlLimit);
    }
}

function oddsCalc() {
    var p = parseFloat(document.getElementById('forsuccess').value);
    var q = parseFloat(document.getElementById('agsuccess').value);
    var output = document.getElementById("oddsAns");
    var temp = "";
    if (p == "" || q == "" || isNaN(p) || isNaN(q)) {
        document.getElementById("oddsAns").innerHTML = "\\[Please \\space enter \\space valid \\space input\\]";
    }
    else {
        var win = p / (p + q);
        var fail = q / (p + q);

        temp += "\\[Odds \\space calculator \\space calculates \\space Probability \\space of \\space winning \\space and \\space Losing\\]"
        temp += "\\[First, \\space we \\space calculate \\space Probability \\space of \\space winning,\\]"
        temp += "\\[\\space = \\space \\frac{p}{(p+q)}\\]"
        temp += "\\[\\space = \\space \\frac{" + p + "}{(" + p + "+ " + q + ")}\\]"
        temp += "\\[\\space = \\space \\frac{" + p + "}{(" + (p + q) + ")}\\]"
        temp += "\\[\\space = \\space " + win.toFixed(3) + "\\]"
        temp += "\\[Hence,\\space Probability \\space of \\space winning \\space = \\space" + win.toFixed(3) + "\\space \\%  \\]"

        temp += "\\[Now, \\space we \\space calculate \\space Probability \\space of \\space losing,\\]"
        temp += "\\[\\space = \\space \\frac{q}{(p+q)}\\]"
        temp += "\\[\\space = \\space \\frac{" + q + "}{(" + p + "+ " + q + ")}\\]"
        temp += "\\[\\space = \\space \\frac{" + q + "}{(" + (p + q) + ")}\\]"
        temp += "\\[\\space = \\space " + fail.toFixed(3) + "\\]"
        temp += "\\[Hence,\\space Probability \\space of \\space losing \\space = \\space" + fail.toFixed(3) + "\\space \\%  \\]"

        output.innerHTML = temp;
    }
    renderMathInElement(output);
}

function ratpercal() {
    var num1 = document.getElementById("ratperx").value;
    var num2 = document.getElementById("ratpery").value;
    ans = "";
    if (num1 == "" || num2 == "") {
        document.getElementById("ratperans").innerHTML = "\\[Please \\space enter \\space complete \\space ratio\\]";
        renderMathInElement(document.getElementById("ratperans"));
    } else {
        var z = parseFloat(num1) / parseFloat(num2);
        z = z * 100;
        document.getElementById("ratperans").innerHTML = "\\[\\frac{" + parseFloat(num1) + "}{" + parseFloat(num2) + "} \\times 100 \\newline Hence, \\space the \\space calculated \\space percentage \\space is: \\space" + z.toFixed(3) + " \\% \\]";
        renderMathInElement(document.getElementById("ratperans"));
    }
}

function ininpolyfind() {
    var n = parseInt(document.getElementById("ininpolyn").value);
    var a = parseInt(document.getElementById("ininpolyr").value);
    var inrad = a / (2 * math.tan(math.pi / n));
    var incirarea = math.pi * r * r;
    var circlearea = 0.5 * n * a * a;
    document.getElementById("ininpolynans1").innerHTML = "Inradius: " + inrad.toFixed(2)
    document.getElementById("ininpolynans1").innerHTML = "Incircle area: " + incirarea.toFixed(2)
    document.getElementById("ininpolynans1").innerHTML = "Circle area: " + circlearea.toFixed(2)
}

function hypertrigno() {
    var i = (document.getElementById("hypertrignoin").value);
    var hyperout = document.getElementById("hyperresult");
    var sinhout = document.getElementById("hypersinh");
    var coshout = document.getElementById("hypercosh");
    var tanhout = document.getElementById("hypertanh");
    var sinhtemp = "";
    var coshtemp = "";
    var tanhtemp = "";
    var hypertemp = "";
    var a = Math.sinh(parseInt(i));
    var b = Math.cosh(parseInt(i));
    var c = Math.tanh(parseInt(i));
    if (!isNaN(i) && i != "") {
        hypertemp = "\\[Hiperbolik \\space Trigonometri \\space Oranları: \\]";
        sinhtemp += "\\[sinh( " + i + ") \\space değeri,\\]"
        sinhtemp += "\\[\\space = \\space \\frac{e^{" + i + "} - e^{(-" + i + ")}}{2}\\]"
        sinhtemp += "\\[\\space = \\space \\frac{" + ((math.e ** (i) - math.e ** (-i))).toFixed(2) + "}{2}\\]"
        sinhtemp += "\\[\\space = \\space " + a.toFixed(3) + "\\]"

        hyperout.innerHTML = hypertemp;
        sinhout.innerHTML = sinhtemp;

        coshtemp += "\\[cosh( " + i + ") \\space değeri,\\]"
        coshtemp += "\\[\\space = \\space \\frac{e^{" + i + "} + e^{(-" + i + ")}}{2}\\]"
        coshtemp += "\\[\\space = \\space \\frac{" + ((math.e ** (i) + math.e ** (-i))).toFixed(2) + "}{2}\\]"
        coshtemp += "\\[\\space = \\space " + b.toFixed(3) + "\\]"

        coshout.innerHTML = coshtemp;

        tanhtemp += "\\[tanh( " + i + ") \\space değeri,\\]"
        tanhtemp += "\\[\\space = \\space \\frac{sinh(" + i + ")}{cosh(" + i + ")}\\]"
        tanhtemp += "\\[\\space = \\space \\frac{" + ((math.e ** (i) - math.e ** (-i))).toFixed(2) + "}{" + ((math.e ** (i) + math.e ** (-i))).toFixed(2) + "}\\]"
        tanhtemp += "\\[\\space = \\space " + c.toFixed(3) + "\\]"

        tanhout.innerHTML = tanhtemp;
    }
    else {
        hypertemp = "\\[Lütfen \\space tüm \\space alanları \\space doldurun\\]"
        sinhtemp = "";
        coshtemp = "";
        tanhtemp = "";

        hyperout.innerHTML = hypertemp;
        sinhout.innerHTML = sinhtemp;
        coshout.innerHTML = coshtemp;
        tanhout.innerHTML = tanhtemp;
    }
    renderMathInElement(hyperout)
    renderMathInElement(sinhout)
    renderMathInElement(coshout)
    renderMathInElement(tanhout)
}
function perratcal() {
    var num1 = document.getElementById("peratx").value;
    var ans = "", f = 100;
    if (num1 == "") {
        document.getElementById("perratans").innerHTML = "\\[Please \\space enter \\space percentage\\]";
        document.getElementById("perratans1").innerHTML = "";
        document.getElementById("perratans2").innerHTML = "";
        renderMathInElement(document.getElementById("perratans"));
    } else {
        document.getElementById("perratans1").innerHTML = "\\[Here \\space we \\space check \\space the \\space numbers \\space from \\space 2 \\space to \\space " + num1 + " \\space that \\space are \\space both \\space divisible \\space by \\space" + f + " \\space  and \\space " + num1 + "\\]";
        document.getElementById("perratans2").innerHTML = "\\[Then \\space divide \\space those \\space with \\space both \\space " + num1 + " \\space and \\space " + f + " \\newline initially, Percentage = " + num1 + " \\newline f = " + f + "\\space \\]";
        renderMathInElement(document.getElementById("perratans1"));
        renderMathInElement(document.getElementById("perratans2"));
        for (var i = 2; i < num1; i++) {
            if ((num1 % i == 0) && (f % i == 0)) {
                num1 = num1 / i;
                f = f / i;
                i--;
            }
        }
        document.getElementById("perratans").innerHTML = "\\[Finally \\space after \\space dividing \\space we \\space get \\space the \\space value \\space of \\newline Percentage = " + num1 + " \\newline f = " + f + " \\newline Hence, \\space the \\space calculated \\space ratio \\space is: \\space " + num1 + " : " + f + "\\]";
        renderMathInElement(document.getElementById("perratans"));
    }
}
function embedfind() {
    let n = parseInt(document.getElementById("embedin").value)
    let output = document.getElementById("embedans")
    let ans1 = "";
    let pi = Math.acos(-1.0);
    let proAngleVar;
    if (!isNaN(n)) {



        if (n % 4 == 0) {
            proAngleVar = pi * (180.0 / n) / 180;
        } else {
            proAngleVar = pi * (180.0 / (2 * n)) / 180;
        }


        let negX = 1.0e+99, posX = -1.0e+99, negY = 1.0e+99, posY = -1.0e+99;

        for (let j = 0; j < n; ++j) {



            let px = Math.cos(2 * pi * j / n + proAngleVar);



            let py = Math.sin(2 * pi * j / n + proAngleVar);

            negX = Math.min(negX, px);
            posX = Math.max(posX, px);
            negY = Math.min(negY, py);
            posY = Math.max(posY, py);
        }


        let opt2 = Math.max(posX - negX, posY - negY);



        let ans = opt2 / Math.sin(pi / n) / 2;
        ans1 += "\\[N \\space represents \\space the \\space number \\space of \\space sides \\space of \\space a \\space regular \\space polygon \\space with \\space n \\space vertices \\]"
        ans1 += "\\[A \\space Polygon \\space is \\space a  \\space convex \\space figure \\space and \\space has \\space equal \\space sides \\space and \\space equal \\space angles \\]"
        ans1 += "\\[When \\space Number \\space of \\space sides \\space is \\space multiple \\space of \\space 4 \\]"
        ans1 += "\\[Projection Angle \\space = \\space π \\times \\frac{180}{N} \\times \\frac{1}{180} \\space = \\space π  \\times \\frac{180}{" + n + "} \\times \\frac{1}{180}  \\]"
        ans1 += "\\[When \\space Number \\space of \\space sides \\space is \\space not \\space multiple \\space of \\space 4 \\]"
        ans1 += "\\[Projection Angle \\space = \\space π \\times \\frac{180}{2 \\times N} \\times \\frac{1}{180} \\space = \\space π  \\times \\frac{180}{2 \\times" + n + "} \\times \\frac{1}{180} \\]"
        ans1 += "\\[Regular \\space Polygon \\space with \\space " + n + "sides \\space can \\space easily \\space embed \\space with \\space side \\space " + ans + " \\]"
        output.innerHTML = ans1;
    }
    else {
        ans1 += "\\[Please \\space enter \\space valid \\space input \\]"
        output.innerHTML = ans1;
    }
    renderMathInElement(output);
}

function mecal() {
    var num1 = document.getElementById("conf").value;
    var num2 = document.getElementById("samsize").value;
    var num3 = document.getElementById("proper").value;
    var num4 = document.getElementById("popsize").value;
    var output = document.getElementById("mecans");
    var ans = "";
    if (num1 == "" || num2 == "" || num3 == "") {
        ans += "\\[Please \\space fill \\space all \\space the \\space field \\]";
        output.innerHTML = ans;
        renderMathInElement(output);
    }
    else {
        num1 = parseFloat(num1);
        num2 = parseFloat(num2);
        num3 = parseFloat(num3);
        num3 = num3 / 100;
        if (num4 == "") {
            var j = (num1 * (Math.sqrt(num3 * (1 - num3)))) / Math.sqrt(num2);
            j = j * 100;
            ans += "\\[Margin \\space Of \\space Error \\space = \\space z \\space \\times \\frac{\\sqrt{p \\times (1-p)}}{\\sqrt{n}} \\times 100 \\]";
            ans += "\\[" + num1 + "\\times \\frac{\\sqrt{" + num3 + "\\times (1 \\space - ( " + num3 + " ))}}{ \\sqrt{" + num2 + "}} \\times 100 \\]";
            ans += "\\[" + num1 + "\\times \\frac{\\sqrt{" + num3 + "\\times   " + (1 - num3) + " }}{ \\sqrt{" + num2 + "}} \\times 100 \\]";
            ans += "\\[" + num1 + "\\times \\frac{\\sqrt{" + (num3 * (1 - num3)) + " }}{ \\sqrt{" + num2 + "}} \\times 100 \\]";
            ans += "\\[" + num1 + "\\times" + (Math.sqrt(num3 * (1 - num3))) / Math.sqrt(num2) + " \\times 100 \\]";
            ans += "\\[" + (num1 * (Math.sqrt(num3 * (1 - num3))) / Math.sqrt(num2)) + "\\times 100 \\]";
            ans += "\\[ The \\space margin \\space of \\space error \\space is \\space : \\space " + j + " \\]";
            output.innerHTML = ans;
            renderMathInElement(output);
        }
        else {
            num4 = parseFloat(num4);
            if (num4 <= num2) {
                ans += "\\[Population \\space size \\space must \\space be \\space greater \\space than \\space sample \\space size \\]";
                output.innerHTML = ans;
                renderMathInElement(output);
            }
            else {
                var j = (num1 * (Math.sqrt(num3 * (1 - num3)))) / Math.sqrt((num2 * (num4 - 1)) / (num4 - num2));
                j = j * 100;
                ans += "\\[Margin \\space Of \\space Error \\space ( \\space with \\space finite \\space population \\space correction \\space ) \\space = \\space z \\space \\times \\frac{\\sqrt{p \\times (1-p)}}{\\sqrt{(N-1)*n/(N-n)}} \\times 100 \\]";
                ans += "\\[" + num1 + "\\times \\frac{\\sqrt{" + num3 + "\\times (1 \\space - ( " + num3 + " ))}}{ \\sqrt{" + num2 + "\\times (" + num4 + " - \\space 1 ) / (" + num4 + "- (" + num2 + " )}} \\times 100 \\]";
                ans += "\\[" + num1 + "\\times \\frac{\\sqrt{" + num3 + "\\times  " + (1 - num3) + " }}{ \\sqrt{" + num2 + "\\times (" + (num4 - 1) + " ) / (" + (num4 - num2) + " )}} \\times 100 \\]";
                ans += "\\[" + num1 + "\\times \\frac{\\sqrt{" + (num3 * (1 - num3)) + " }}{ \\sqrt{" + ((num2) * ((num4 - 1) / (num4 - num2))) + " }} \\times 100 \\]";
                ans += "\\[" + num1 + "\\times" + ((Math.sqrt(((num3) * (1 - num3)))) / (Math.sqrt((num2) * ((num4 - 1) / (num4 - num2))))) + " \\times 100 \\]";
                ans += "\\[" + (num1 * (Math.sqrt(num3 * (1 - num3)))) / Math.sqrt((num2 * (num4 - 1)) / (num4 - num2)) + "\\times 100 \\]";
                ans += "\\[ The \\space margin \\space of \\space error \\space is \\space : \\space " + j + " \\]";
                output.innerHTML = ans;
                renderMathInElement(output);
            }

        }
    }
}

function gridfind() {
    var n = parseInt(document.getElementById("gridn").value)
    var m = parseInt(document.getElementById("gridm").value)
    if (n < 0 || m < 0)
        document.getElementById("gridans").innerHTML = "\\[Dimension \\space cannot \\space be \\space negative\\]";
    else if (!isNaN(n) && !isNaN(m)) {
        var ans = parseInt((m * n * (n + 1) * (m + 1)) / 4);
        document.getElementById("gridans").innerHTML = "\\[Count \\space of \\space integral \\space coordinate \\space that \\space lie \\space inside \\space square=" + ans + "\\]";
    } else {
        document.getElementById("gridans").innerHTML = "\\[Please \\space enter \\space valid \\space input\\]";
    }
    renderMathInElement(document.getElementById("gridans"));
}

function chivalue() {
    let list = document.getElementById('obsList').value
    let sign = document.getElementById('sigValue').value
    if (list == "" || sign == "") {
        document.getElementById('chians').innerHTML = "Lütfen Boş Alan Bırakmayınız";
        document.getElementById('chitestans').innerHTML = "";
        document.getElementById('concluChi').innerHTML = "";
    }
    else {
        let obsList = list.split(' ');
        let sum = 0;
        let n = obsList.length
        for (var i = 0; i < n; i++) {
            obsList[i] = parseInt(obsList[i])
            sum += obsList[i]
        }
        let expMean = sum / obsList.length
        let obsSubExpMean = []
        let obsSubExpMeanSqr = []
        let chiValue = []
        let ans = 0
        for (var i = 0; i < n; i++) {
            obsSubExpMean[i] = obsList[i] - expMean
            obsSubExpMeanSqr[i] = Math.pow(obsSubExpMean[i], 2)
            chiValue[i] = obsSubExpMeanSqr[i] / expMean
            ans += chiValue[i]
        }
        var w = "";
        ans = Number.parseFloat(ans).toPrecision(5)
        let sigValue = parseFloat(document.getElementById('sigValue').value)
        var answer = "Aşağıdaki formülde : "
        answer += "\\[E_i \\space =>Beklenen \\space değer  \\]"
        answer += "\\[O_i \\space =>Gözlemlenen \\space değer  \\]"
        answer += "\\[\\chi^{2}_{cal} = \\space \\sum{\\frac{(O_i - E_i)^{2}}{E_i}}\\]";
        for (var i = 0; i < n; i++) {
            if (i != (n - 1))
                w = w + chiValue[i].toFixed(4) + " + ";
            else
                w = w + chiValue[i].toFixed(4);

        }
        answer += "\\[\\chi^{2}_{cal} = \\space\\ " + w + " = " + ans + " \\]"
        document.getElementById('chians').innerHTML = answer;
        renderMathInElement(document.getElementById('chians'));
        if (ans < sigValue) {
            document.getElementById('chitestans').innerHTML = "As &nbsp; χ<sup>2</sup><sub>cal</sub> < χ<sup>2</sup><sub>giv</sub> &nbsp; i.e &nbsp;  <strong>" + ans + "</strong>  < <strong>" + sigValue + "</strong>"
            document.getElementById('concluChi').innerHTML = "Hipotez Kabul Edilmiştir. Yani veri dağılımı her yerde tekdüzedir."
        } else if (ans > sigValue) {
            document.getElementById('chitestans').innerHTML = "As &nbsp; χ<sup>2</sup><sub>cal</sub> > χ<sup>2</sup><sub>giv</sub> &nbsp; i.e &nbsp;  <strong>" + ans + "</strong> > <strong>" + sigValue + "</strong>"
            document.getElementById('concluChi').innerHTML = "Hipotez Kabul Edilmez. Yani veri dağılımı boyunca tek tip değil."
        } else {
            document.getElementById('chitestans').innerHTML = "As &nbsp; χ<sup>2</sup><sub>cal</sub> = χ<sup>2</sup><sub>giv</sub> &nbsp; i.e  &nbsp; <strong>" + ans + "</strong>  = <strong>" + sigValue + "</strong>"
            document.getElementById('concluChi').innerHTML = "Hipotez Kabul Edilmiştir. Yani veri dağılımı her yerde tekdüzedir."
        }
    }
}

function getLead() {
    selectElement =
        document.querySelector('#lead');
    output = selectElement.value;
    var arr = ["manufacture", "project"];
    for (var i = 0; i < arr.length; i++) {
        var lead = 'lead' + arr[i];
        document.getElementById(lead).style.display = "none";
    }

    if (output == "manufacture") {
        document.getElementById('leadmanufacture').style.display = "block";
    } else if (output == "project") {
        document.getElementById('leadproject').style.display = "block";
    }
}




function leadvalue() {
    var num1 = document.getElementById("pre").value;
    var num2 = document.getElementById("pro").value;
    var num3 = document.getElementById("post").value;
    if (num1 == "" || num2 == "" || num3 == "") {
        document.getElementById("leadans").innerHTML = "Please fill all the fields";
    }
    else {
        num1 = parseFloat(num1);
        num2 = parseFloat(num2);
        num3 = parseFloat(num3);
        var lead = num1 + num2 + num3;
        console.log(num1 + " " + num2 + " " + num3);
        var ans = "\\[Lead \\space Time \\space (manufacturing)= \\space  Pre-processing + Processing + Post-processing \\space  time \\]"
        ans += "\\[" + num1 + "+" + num3 + "+" + num2 + " \\]"
        ans += "\\[ Lead \\space Time \\space (manufacturing) =" + lead.toFixed(4) + " \\space minutes \\]"
        ans += "\\[= " + (lead * 60).toFixed(4) + " \\space seconds\\]"
        document.getElementById("leadans").innerHTML = ans;
        renderMathInElement(document.getElementById("leadans"));

    }
}
function leadmangement() {
    var num1 = document.getElementById("task1").value;
    var num2 = document.getElementById("task2").value;
    if (num1 == "" || num2 == "") {
        document.getElementById("leadpro").innerHTML = "Please fill all the fields";
    }
    else {
        num1 = parseFloat(num1);
        num2 = parseFloat(num2);
        var lead = num1 - num2;
        var ans = "\\[Lead \\space Time \\space (project \\space management)= Time \\space for \\space Task 1 – Time \\space for \\space Task 2  \\]"
        ans += "\\[" + num1 + "-" + num2 + " \\]"
        ans += "\\[ Lead \\space Time \\space (project \\space management) =" + lead.toFixed(4) + " \\space days \\]"
        ans += "\\[= " + (lead * 24).toFixed(4) + " \\space hours\\]"
        document.getElementById("leadpro").innerHTML = ans;
        renderMathInElement(document.getElementById("leadpro"));

    }
}

function throughputvalue() {
    var num1 = document.getElementById("process").value;
    var num2 = document.getElementById("inspection").value;
    var num3 = document.getElementById("move").value;
    var num4 = document.getElementById("queue").value;
    if (num1 == "" || num2 == "" || num3 == "" || num4 == "") {
        document.getElementById("throughputans").innerHTML = "Please fill all the fields";
    }
    else {
        num1 = parseFloat(num1);
        num2 = parseFloat(num2);
        num3 = parseFloat(num3);
        num4 = parseFloat(num4);
        var through = (num1 + num2 + num3 + num4);
        console.log(num1 + " " + num2 + " " + num3);
        var ans = "\\[Throughput \\space time \\space = \\space Process \\space time \\space + Inspection \\space time + Move \\space time + Queue \\space time \\]"
        ans += "\\[" + num1 + "+" + num2 + " +" + num3 + "+" + num4 + " \\]"
        ans += "\\[" + (num1 + num2 + num3 + num4).toFixed(4) + " \\]"
        ans += "\\[ Throughput \\space Time =" + through.toFixed(4) + " \\space minutes \\]"
        ans += "\\[ =" + (through * 60).toFixed(4) + " \\space seconds \\]"
        document.getElementById("throughputans").innerHTML = ans;
        renderMathInElement(document.getElementById("throughputans"));

    }
}

function cyclevalue() {
    var num1 = document.getElementById("produce").value;
    var num2 = document.getElementById("units").value;
    if (num1 == "" || num2 == "") {
        document.getElementById("cycleans").innerHTML = "Please fill all the fields";
    }
    else {
        num1 = parseInt(num1);
        num2 = parseInt(num2);
        var cycle = (num1) / num2;
        var ans = "\\[Cycle \\space Time = \\frac{Net \\space Production \\space Time}{Number \\space of \\space Units \\space Produced} \\]"
        ans += "\\[\\frac{" + num1 + "}{" + num2 + "} \\]"
        ans += "\\[ " + cycle.toFixed(4) + " \\]"
        ans += "\\[Cycle \\space Time =" + cycle.toFixed(4) + " \\space minutes \\space per \\space unit =" + (cycle * 60).toFixed(4) + " \\space seconds \\space per \\space unit \\]"
        document.getElementById("cycleans").innerHTML = ans;
        renderMathInElement(document.getElementById("cycleans"));

    }

}


function manhatcal() {
    var num1 = parseFloat(document.getElementById("mdx1").value);
    var num2 = parseFloat(document.getElementById("mdx2").value);
    var num3 = parseFloat(document.getElementById("mdx3").value);
    var num4 = parseFloat(document.getElementById("mdx4").value);
    var output = document.getElementById("manhatans");
    var ans = "";
    var x = (Math.abs(num1 - num3)) + (Math.abs(num2 - num4));
    if (isNaN(num1) || isNaN(num2) || isNaN(num3) || isNaN(num4)) {
        ans += "Lütfen boş alan bırtkmayın";
        output.innerHTML = ans;
    }
    else if (num3 < 0 && num4 > 0) {
        ans += "\\[Mdist \\space = \\space | X1 \\space - \\space X2 | \\space + \\space | Y1 \\space - \\space Y2 | \\]";
        ans += "\\[ | " + num1 + " - ( " + (num3) + " ) | + | " + num2 + " - " + num4 + " | \\]"
        ans += "\\[ | " + num1 + " + " + (-num3) + " | + | " + num2 + " - " + num4 + " | \\]"
        ans += "\\[ | " + (num1 - num3) + " | + | " + (num2 - num4) + " | \\]"
        ans += "\\[Hesaplanan Manhattan Uzaklık Değeri \\space " + x + " \\]"
        output.innerHTML = ans;
        renderMathInElement(output);

    }
    else if (num4 < 0 && num3 > 0) {
        ans += "\\[Mdist \\space = \\space | X1 \\space - \\space X2 | \\space + \\space | Y1 \\space - \\space Y2 | \\]";
        ans += "\\[ | " + num1 + " - " + num3 + " | + | " + num2 + " - ( " + (num4) + " ) | \\]"
        ans += "\\[ | " + num1 + " - " + num3 + " | + | " + num2 + " + " + (-num4) + " | \\]"
        ans += "\\[ | " + (num1 - num3) + " | + | " + (num2 - num4) + " | \\]"
        ans += "\\[Hesaplanan Manhattan Uzaklık Değeri \\space " + x + " \\]"
        output.innerHTML = ans;
        renderMathInElement(output);
    }
    else if (num3 < 0 && num4 < 0) {
        ans += "\\[Mdist \\space = \\space | X1 \\space - \\space X2 | \\space + \\space | Y1 \\space - \\space Y2 | \\]";
        ans += "\\[ | " + num1 + " - ( " + (num3) + " ) | + | " + num2 + " - ( " + (num4) + " ) | \\]"
        ans += "\\[ | " + num1 + " + " + (-num3) + " | + | " + num2 + " + " + (-num4) + " | \\]"
        ans += "\\[ | " + (num1 - num3) + " | + | " + (num2 - num4) + " | \\]"
        ans += "\\[Hesaplanan Manhattan Uzaklık Değeri \\space " + x + " \\]"
        output.innerHTML = ans;
        renderMathInElement(output);
    } else {
        ans += "\\[Mdist \\space = \\space | X1 \\space - \\space X2 | \\space + \\space | Y1 \\space - \\space Y2 | \\]";
        ans += "\\[ | " + num1 + " - " + num3 + " | + | " + num2 + " - " + num4 + " | \\]"
        ans += "\\[ | " + (num1 - num3) + " | + | " + (num2 - num4) + " | \\]"
        ans += "\\[Hesaplanan Manhattan Uzaklık Değeri \\space " + x + " \\]"
        output.innerHTML = ans;
        renderMathInElement(output);
    }
}

function polarcartcal() {
    var r = parseFloat(document.getElementById("polarcartr").value);
    var o = parseFloat(document.getElementById("polarcarto").value);

    var outputx = document.getElementById("polarcartxans");
    var outputy = document.getElementById("polarcartyans");
    var ans = "";

    var x = r * Math.cos(o).toFixed(2);
    var y = r * Math.sin(o).toFixed(2);
    var cs = Math.cos(o).toFixed(2);
    var sn = Math.sin(o).toFixed(2);

    var ansx = "";
    var ansy = "";
    ansx += "\\[x\\space coordinate:\\space r \\times cos(θ) \\]";
    ansx += "\\[x\\space coordinate:\\space " + r + " \\times " + cs + "\\]"
    ansx += "\\[x\\space coordinate:\\space " + x + "\\]"

    ansy += "\\[y\\space coordinate:\\space r \\times sin(θ) \\]";
    ansy += "\\[y\\space coordinate:\\space " + r + " \\times " + sn + "\\]"
    ansy += "\\[y\\space coordinate:\\space " + y + "\\]"

    if (isNaN(r) || isNaN(o)) {
        ans += "Please fill all the field";
        outputx.innerHTML = ans;
        outputy.innerHTML = "";
    }
    else {
        outputx.innerHTML = ansx;
        outputy.innerHTML = ansy;
    }
    renderMathInElement(outputx);
    renderMathInElement(outputy);
}

function cartpolarcal() {
    var x = parseFloat(document.getElementById("cartpolarx").value);
    var y = parseFloat(document.getElementById("cartpolary").value);
    var outputr = document.getElementById("cartpolarans1");
    var outputo = document.getElementById("cartpolarans2");
    var r = Math.sqrt(x * x + y * y).toFixed(2);
    var o = Math.atan(y / x).toFixed(2);
    var ans = "";
    var temp1 = (x * x + y * y).toFixed(2);
    var temp2 = (y / x).toFixed(2);
    var ansr = "\\[r:\\space \\sqrt{x^2 + y^2}\\]";
    ansr += "\\[=\\space \\sqrt{" + x + "^2 + " + y + "^2}\\]";
    ansr += "\\[=\\space \\sqrt{" + temp1 + "} \\]";
    ansr += "\\[=\\space " + r + " \\]";

    var anso = "\\[θ:\\space \\tan(\\frac{y}{x} )\\]";
    anso = "\\[θ:\\space \\tan(\\frac{" + y + "}{" + x + "} )\\]";
    anso += "\\[=\\space \\tan(" + temp2 + ")\\]"
    anso += "\\[=\\space " + o + "\\]"

    if (isNaN(x) || isNaN(y)) {
        ans += "Please fill all the field";
        outputr.innerHTML = ans;
        outputo.innerHTML = "";
    }
    else {
        outputr.innerHTML = ansr;
        outputo.innerHTML = anso;
    }
    renderMathInElement(outputr);
    renderMathInElement(outputo);
}

function bilinearcal() {
    var bx1 = parseInt(document.getElementById("bicx1").value);
    var bx2 = parseInt(document.getElementById("bicx2").value);
    var by1 = parseInt(document.getElementById("bicy1").value);
    var by2 = parseInt(document.getElementById("bicy2").value);
    var bq11 = parseInt(document.getElementById("bicq11").value);
    var bq12 = parseInt(document.getElementById("bicq12").value);
    var bq21 = parseInt(document.getElementById("bicq21").value);
    var bq22 = parseInt(document.getElementById("bicq22").value);
    var bx = parseInt(document.getElementById("bicx").value);
    var by = parseInt(document.getElementById("bicy").value);
    var ans = "";

    if (isNaN(bx1) || isNaN(bx2) || isNaN(by1) || isNaN(by2) || isNaN(bq11) || isNaN(bq12) || isNaN(bq21) || isNaN(bq22) || isNaN(bx) || isNaN(by)) {
        ans += "Please fill all the field";
        document.getElementById("bilinearans").innerHTML = ans;
    }
    else {
        var r1 = (bx2 - bx) / (bx2 - bx1) * bq11 + (bx - bx1) / (bx2 - bx1) * bq21;
        var r2 = (bx2 - bx) / (bx2 - bx1) * bq12 + (bx - bx1) / (bx2 - bx1) * bq22;
        var p = (by2 - by) / (by2 - by1) * r1 + (by - by1) / (by2 - by1) * r2;
        ans += "\\[Interpolated \\space point \\space P \\space :=" + p + "\\]";
        document.getElementById("bilinearans").innerHTML = ans;
        renderMathInElement(document.getElementById("bilinearans"));
    }
}

function Square(n, i, j) {
    var mid = ((i + j) / 2);
    var mul = mid * mid;
    if ((mul == n) || (Math.abs(mul - n) < 0.0001))
        return mid;
    else if (mul < n)
        return Square(n, mid, j);
    else
        return Square(n, i, mid);
}
function findSqrt() {
    var i = 1;
    const n = parseInt(document.getElementById("squarerootin").value);
    var result = document.getElementById("squarerootresult");
    var found = false;
    let steps = "";
    steps += "\\[\\sqrt{n}\\space\\] kedisiyle çarpıldığında n değerini veren sayıdır <br>";
    steps += "Tam kare olmayan sayıların kareköklerini bulma: <br>";
    steps += "1. Tahmin - ilk önce, sayınızın arasında olduğu iki tam karekök bularak mümkün olduğunca elde edin. <br>";
    steps += "2. Böl - sayınızı bu kareköklerden birine bölün. <br>";
    steps += "3. Ortalama - 2. adımın sonucunun ve kökün ortalamasını alın. <br>";
    steps += "4. Sizin için yeterince doğru bir sayı elde edene kadar 2. ve 3. adımları tekrarlamak için 3. adımın sonucunu kullanın. <br>";
    while (!found) {
        if (i * i == n) {
            steps += "\\[\\sqrt{" + n + "}\\space =\\space " + i + "\\]";
            found = true;
        } else if (i * i > n) {
            var res = Square(n, i - 1, i);
            steps += "\\[\\sqrt{" + n + "}\\space =\\space " + res.toFixed(4) + "\\]";
            found = true;
        }
        i++;
    }
    result.innerHTML = steps;
    renderMathInElement(result);

}

function product_Range(a, b) {
    var prd = a, i = a;

    while (i++ < b) {
        prd *= i;
    }
    return prd;
}
function comb(n, r) {
    if (n == r) {
        return 1;
    }
    else {
        r = (r < n - r) ? n - r : r;
        return product_Range(r + 1, n) / product_Range(1, n - r);
    }
}


function exprobability(op) {
    var num1 = parseFloat(document.getElementById("inrate").value);
    var num2 = parseFloat(document.getElementById("inran").value);

    var output = document.getElementById("exprobAns");
    var exptemp = "";
    var vartemp = "";
    var meantemp = "";

    if (isNaN(num1) || isNaN(num2)) {
        output.innerHTML = "\\[Please \\space enter \\space valid \\space input\\]";
    } else {
        if (op === 1) {
            var dist = (num1 * 2.71828) ** (-num1 * num2);
            exptemp += "\\[Exponential \\space Probability \\space will \\space be \\]";
            exptemp += "\\[\\space = \\space ((Rate \\space parameter) \\times 2.71828)^{-(Rate \\space parameter) \\times (Random \\space variable)}\\]";
            exptemp += "\\[\\space = \\space (" + num1 + " \\times 2.71828)^{(-" + num1 + " \\times " + num2 + ")}\\]";
            exptemp += "\\[\\space = \\space " + dist.toFixed(3) + "\\]";

            output.innerHTML = exptemp;
        } else if (op === 2) {
            meantemp += "\\[Mean \\space will \\space be \\]";
            meantemp += "\\[\\space = \\space \\frac{1}{(Rate \\space parameter)}\\]";
            meantemp += "\\[\\space = \\space \\frac{1}{" + num1 + "}\\]";
            meantemp += "\\[\\space = \\space " + (1 / num1).toFixed(3) + "\\]";

            output.innerHTML = meantemp;
        } else {
            vartemp += "\\[Variance \\space will \\space be \\]";
            vartemp += "\\[\\space = \\space \\frac{1}{(Rate \\space parameter) \\times (Random \\space variable) }\\]";
            vartemp += "\\[\\space = \\space \\frac{1}{" + num1 + " \\times " + num2 + "}\\]";
            vartemp += "\\[\\space = \\space " + (1 / num1 * num2).toFixed(3) + "\\]";

            output.innerHTML = vartemp;
        }
    }
    renderMathInElement(output);
}
function gammaprobability(op) {
    let num1 = document.getElementById("inputx").value;
    let num2 = document.getElementById("inputa").value;
    let num3 = document.getElementById("inputb").value;
    if (num1 == "" || num2 == "" || num3 == "") {
        document.getElementById("gammaprobAns").innerHTML = "Please fill all the field";
    }
    else {
        num1 = parseFloat(num1);
        num2 = parseFloat(num2);
        num3 = parseFloat(num3);
        let steps = "";
        if (op == 1) {
            let g = (math.gamma(num2)) ** (-1);
            let b = num3 ** (-num2);
            let e = 2.71828 ** (-num1 / num3)
            let x = num1 ** (num2 - 1);
            let dist = g * b * e * x;

            steps += "\\[\\gamma (" + num2 + ") ^{-1} \\times " + num3 + " ^ {-" + num2 + "} \\times {2.71828} ^ {frac{-" + num1 + "}{" + num3 + "}} \\times " + num1 + " ^{(" + num2 + "-1)} \\]";
            steps += "\\[" + g + " \\times " + b + " \\times " + e + " \\times " + x + "\\]";
            steps += "\\[Gamma\\space Probability: " + dist + " \\]";
            document.getElementById("gammaprobAns").innerHTML = steps;
        }
        else if (op == 2)
            document.getElementById("gammaprobAns").innerHTML = "Mean: " + num2 / num3;
        else
            document.getElementById("gammaprobAns").innerHTML = "Variance: " + num2 / (num3 * num3);
    }
    renderMathInElement(document.getElementById("gammaprobAns"))
}


function idevent() {
    let term = document.getElementById('eventProb').value
    console.log(term);
    if (term === 'independent') {
        document.getElementById('deShow').style.display = 'none'
        document.getElementById('indShow').style.display = 'block'
        document.getElementById('indBtn').addEventListener('click', () => {
            let pA = parseFloat(document.getElementById('aProb').value)
            let pB = parseFloat(document.getElementById('bProb').value)
            let pAB = pA * pB
            document.getElementById('indAns').innerHTML = `P(A and B) = P(A)*P(B) = ${pA}*${pB} = ${Number.parseFloat((pAB)).toPrecision(3)}`
        })
    } else {
        document.getElementById('indShow').style.display = 'none'
        document.getElementById('deShow').style.display = 'block'
        document.getElementById('deBtn').addEventListener('click', () => {
            let pA = parseFloat(document.getElementById('aprob').value)
            let pB = parseFloat(document.getElementById('bprobA').value)
            let pAB = pA * pB
            document.getElementById('deAns').innerHTML = `P(A and B) = P(A)*P(B|A) = ${pA}*${pB} = ${Number.parseFloat((pAB)).toPrecision(3)}`
        })
    }
}


function decl() {
    let list = document.getElementById('decllist').value
    list = list.split(' ')
    let newList = list.map((item) => {
        return parseInt(item)
    })
    newList = newList.sort(function (a, b) {
        return a - b;
    })
    console.log(newList);
    let listLen
    if (newList.length % 2 == 0) {
        listLen = newList.length
    } else {
        listLen = newList.length + 1
    }
    let dp = parseInt(document.getElementById('decldp').value)
    let declans = document.getElementById('declans')
    let resultArr = [0]
    for (var i = 1; i <= dp; i++) {
        resultArr[i] = (listLen * i) / 10
        let value = "D" + i + " = " + newList[resultArr[i] - 1]
        let para = document.createElement("p")
        let node = document.createTextNode(value)
        para.appendChild(node)
        declans.appendChild(para)
    }
}


function sumAndDiffTri() {
    let list = document.getElementById('triList').value
    list = list.split(' ')
    let fn = list[0]
    let x = parseInt(list[1])
    let op = list[2]
    let y = parseInt(list[3])
    let sin = Math.sin
    let cos = Math.cos
    let tan = Math.tan
    let formula, value, ansValue
    let ans = document.getElementById("sumAndDiffTrians")
    let para1 = document.createElement("p")
    let para2 = document.createElement('p')
    let para3 = document.createElement('p')

    if (op === '+') {
        if (fn === 'sin') {
            formula = "sin(x + y) = sin x cos y + cos x sin y"
            value = `sin(${x} + ${y}) = sin ${x} cos ${y} + cos ${x} sin ${y}`
            ansValue = `sin(${x} + ${y}) = (${Number.parseFloat(sin(x)).toPrecision(3)}) * (${Number.parseFloat(cos(y)).toPrecision(3)}) + (${Number.parseFloat(cos(x)).toPrecision(3)}) * (${Number.parseFloat(sin(y)).toPrecision(3)}) = ${Number.parseFloat(sin(x + y)).toPrecision(3)}`
        } else if (fn === 'cos') {
            formula = "cos(x + y) = cos x cos y – sin x sin y"
            value = `cos(${x} + ${y}) = cos ${x} cos ${y} - sin ${x} sin ${y}`
            ansValue = `cos(${x} + ${y}) = (${Number.parseFloat(cos(x)).toPrecision(3)}) * (${Number.parseFloat(cos(y)).toPrecision(3)}) - (${Number.parseFloat(sin(x)).toPrecision(3)}) * (${Number.parseFloat(sin(y)).toPrecision(3)}) = ${Number.parseFloat(cos(x + y)).toPrecision(3)}`
        } else if (fn === 'tan') {
            formula = "tan (x + y) = (tan x + tan y)/ (1-tan x tan y)"
            value = `tan (${x} + ${y}) = (tan ${x} + tan ${y})/ (1-tan ${x} tan ${y})`
            ansValue = `tan (${x} + ${y}) = (${Number.parseFloat(tan(x)).toPrecision(3)} + ${Number.parseFloat(tan(y)).toPrecision(3)}) / (1 - (${Number.parseFloat(tan(x)).toPrecision(3)})(${Number.parseFloat(tan(y)).toPrecision(3)})) = ${Number.parseFloat(tan(x + y)).toPrecision(3)}`
        }
    } else if (op === '-') {
        if (fn === 'sin') {
            formula = "sin (x – y) = sin x cos y – cos x sin y "
            value = `sin(${x} - ${y}) = sin ${x} cos ${y} - cos ${x} sin ${y}`
            ansValue = `sin(${x} - ${y}) = (${Number.parseFloat(sin(x)).toPrecision(3)}) * (${Number.parseFloat(cos(y)).toPrecision(3)}) - (${Number.parseFloat(cos(x)).toPrecision(3)}) * (${Number.parseFloat(sin(y)).toPrecision(3)}) = ${Number.parseFloat(sin(x - y)).toPrecision(3)}`
        } else if (fn === 'cos') {
            formula = "cos(x – y) = cos x cos y + sin x sin y "
            value = `cos(${x} - ${y}) = cos ${x} cos ${y} + sin ${x} sin ${y}`
            ansValue = `cos(${x} - ${y}) = (${Number.parseFloat(cos(x)).toPrecision(3)}) * (${Number.parseFloat(cos(y)).toPrecision(3)}) + (${Number.parseFloat(sin(x)).toPrecision(3)}) * (${Number.parseFloat(sin(y)).toPrecision(3)}) = ${Number.parseFloat(cos(x - y)).toPrecision(3)}`
        } else if (fn === 'tan') {
            formula = "tan (x – y) = (tan x – tan y)/ (1+tan x tan y)"
            value = `tan (${x} - ${y}) = (tan ${x} - tan ${y})/ (1 + tan ${x} tan ${y})`
            ansValue = `tan (${x} - ${y}) = (${Number.parseFloat(tan(x)).toPrecision(3)} - ${Number.parseFloat(tan(y)).toPrecision(3)}) / (1 + (${Number.parseFloat(tan(x)).toPrecision(3)})(${Number.parseFloat(tan(y)).toPrecision(3)})) = ${Number.parseFloat(tan(x - y)).toPrecision(3)}`
        }
    }


    let node1 = document.createTextNode(formula)
    para1.appendChild(node1)
    ans.appendChild(para1)

    let node2 = document.createTextNode(value)
    para2.appendChild(node2)
    ans.appendChild(para2)

    let node3 = document.createTextNode(ansValue)
    para3.appendChild(node3)
    ans.appendChild(para3)
}

function clearSumAndDiff() {
    document.getElementById('triList').value = ''
    const myNode = document.getElementById('sumAndDiffTrians')
    while (myNode.lastElementChild) {
        myNode.removeChild(myNode.lastElementChild);
    }


}
function reverseDigits(num) {
    let rev = 0;
    while (num > 0) {
        rev = rev * 10 + num % 10;
        num = parseInt(num / 10, 10);
    }
    return rev;
}


function square(num) {
    return (num * num);
}


const ackermann = (m, n) => {
    if (m === 0) {
        return n + 1
    }
    if (n === 0) {
        return ackermann((m - 1), 1);
    }
    if (m !== 0 && n !== 0) {
        return ackermann((m - 1), ackermann(m, (n - 1)))
    }
}


function antilogCal() {
    let val = document.getElementById("logvalue").value;
    let base = document.getElementById("logbase5").value;
    let output = document.getElementById("antilogans");

    if (val == "" || base == "") {
        output.innerHTML = "Boş alan bırakmayın";
    }
    else {
        let ans = Math.pow(base, val);
        let steps = "";
        steps += "\\[ y\\space =\\space log_b(x) \\]";
        steps += "\\[x\\space =\\space log_b^{-1}(y)\\space =\\space b ^ y\\]";
        steps += "\\[=\\space " + ans + "\\]";

        output.innerHTML = steps;
    }
    renderMathInElement(output);
}
function logbaseCal() {
    let a = document.getElementById("logbasea").value;
    let b = document.getElementById("logbaseb").value;
    let x = document.getElementById("logbasex").value;

    let output = document.getElementById("logbaseans");
    if (a == "" || b == "" || x == "") {
        output.innerHTML = "Tüm değerleri doldurun";
    }
    else {
        let steps = "";
        let ans = (Math.log(x) / Math.log(b)) / (Math.log(a) / Math.log(b));
        let temp1 = Math.log(x) / Math.log(b);
        let temp2 = Math.log(a) / Math.log(b);
        steps += "\\[log_a(x)\\space = \\frac{log_b(x)}{log_b(a)}\\]";
        steps += "\\[log_a(x)\\space = \\frac{" + temp1 + "}{" + temp2 + "}\\]";
        steps += "\\[log_a(x)\\space = " + ans + "\\]";
        output.innerHTML = steps;
    }
    renderMathInElement(output);
}

function vectsfind() {
    let n = document.getElementById("vects1").value;
    let num = document.getElementById("vects2").value;

    if (n == "" || isNaN(n) || num == "") {
        document.getElementById("vectans1").innerHTML = "Enter proper inputs";
    }
    else {
        n = parseInt(n);
        num = num.trim();
        num = num.split(" ");
        var len = parseInt(num.length);
        if (len != n) {
            document.getElementById("vectans1").innerHTML = "Number of coordinates and vector space are not matching";
        }
        else {
            var number = []
            var sq = 0;
            for (i = 0; i < len; i++) {
                number[i] = parseInt(num[i].trim());
                sq += number[i] * number[i];
            }
            document.getElementById("vectans1").innerHTML = "The calculated magnitude of vector is: " + Math.sqrt(sq);
        }
    }
}

function divisorSum(N, K) {
    let sum = 0;
    for (let i = 2;
        i <= Math.ceil(Math.sqrt(N));
        i++)
        if (N % i == 0)
            sum += (i + parseInt(N / i, 10));

    return sum;
}
function isPrime(n) {
    if (n == 1 || n == 0)
        return false;

    if (n <= 3)
        return true;
    if (n % 2 == 0 || n % 3 == 0)
        return false;
    for (let i = 5; i * i <= n; i = i + 6)
        if (n % i == 0 || n % (i + 2) == 0)
            return false;

    return true;
}
function isHyperPerfect(N, K) {
    let sum = divisorSum(N, K);
    if ((1 + K * (sum)) == N)
        return true;
    else
        return false;
}
function hyperfind(num1,num2){

    var ans = "";
    if (num1 == "" || num2 == "") {
        ans = "Please enter the number";
    }
    else {
        num1 = parseInt(num1);
        num2 = parseInt(num2);
        if (isHyperPerfect(num1, num2) == true) {
            ans = num1 + " is " + num2 + "-Hyperperfect number";
        }
        else {
            ans = num1 + " is not " + num2 + "-Hyperperfect number";
        }
    }
    return {'steps' : ans }
}
function specialvalue(num) {

        var re = 0;
        num = parseInt(num);
        number = num;
        var sum = 0;
        while (number > 0) {
            var digit = parseInt(number % 10);
            var fact = 1;
            re = (re * 10) + digit;
            for (var i = 1; i <= digit; i++) {
                fact = fact * i;
            }
            sum = parseInt(sum + fact);
            number = parseInt(number / 10);
        }
        var facto = 1;
        var ans = "\\[";
        var ans2 = "\\[";
        while (re > 0) {
            let d = parseInt(re % 10);
            re = parseInt(re / 10);
            for (var i = 1; i <= d; i++) {
                facto = facto * i;
            }
            if (re > 0) {
                ans += " " + d + "! +  ";
                ans2 += " " + facto + " + ";
            }
            else {
                ans += " " + d + "!  ";
                ans2 += " " + facto + " ";

            }

        }

        ans += "\\]";
        ans2 += "\\]";
        ans2 += "\\[" + sum + "\\]"

        if (num == sum) {
            ans2 += "\\[Since \\space the \\space result \\space i.e \\space " + sum + " \\space is \\space equal \\space to \\space the \\space inputted \\space number \\space i.e \\space " + num + " \\]";
            ans2 += "\\[\\therefore \\space " + num + " \\space  is \\space a \\space special \\space number\\]"

        }
        else {
            ans2 += "\\[Since \\space the \\space result \\space i.e \\space " + sum + " \\space is \\space not \\space equal \\space to \\space the \\space inputted \\space number \\space i.e \\space " + num + "\\]";
            ans2 += "\\[\\therefore \\space " + num + " \\space is \\space not \\space a \\space special\\space number\\]"

        }
        return {'steps' : ans + ans2 }

}


function armstrongvalue(num) {

        var digitss = Math.floor(Math.log10(num) + 1);


        num = parseInt(num);
        var temp = num;
        var r = 0;
        var sum = 0;
        while (temp > 0) {
            let d = temp % 10;
            sum = sum + parseInt(Math.pow(d, digits));
            temp = parseInt(temp / 10);
            r = (r * 10) + d;

        }

        while (r > 0) {
            let d = r % 10;
            r = parseInt(r / 10);
            if (r > 0) {
                ans += " " + d + "^{" + digits + "} +  ";
                ans2 += " " + parseInt(Math.pow(d, digits)) + " + ";
            }
            else {
                ans += " " + d + "^{" + digits + "}  ";
                ans2 += " " + parseInt(Math.pow(d, digits)) + " ";

            }
        }

        ans += "\\]";
        ans2 += "\\]";
        ans2 += "\\[" + sum + "\\]"


        if (sum == num) {
            ans2 += "\\[Since \\space the \\space sum \\space i.e \\space " + sum + " \\space is \\space equal \\space to \\space the \\space inputted \\space number \\space i.e \\space " + num + " \\]";
            ans2 += "\\[\\therefore \\space " + num + " \\space  is \\space a \\space armstrong \\space number\\]"

        }
        else {
            ans2 += "\\[Since \\space the \\space sum \\space i.e \\space " + sum + " \\space is \\space not \\space equal \\space to \\space the \\space inputted \\space number \\space i.e \\space " + num + "\\]";
            ans2 += "\\[\\therefore \\space " + num + " \\space is \\space not \\space a \\space armstrong \\space number\\]"

        }
        return {'steps ' : ans + ans2 }
}
function checkPalindrome(num) {

        var ans = "";
        let final = 0;
        let re = 0;
        num = parseInt(num);
        number = num;
        while (number > 0) {
            re = number % 10;
            number = parseInt(number / 10);
            final = (final * 10) + re;
        }
        ans += "\\[The \\space reverse \\space of \\space " + num + " \\space is\\]"
        ans += "\\[" + final + "\\]"
        if (final == num) {
            ans += "\\[Since \\space the \\space reverse \\space number \\space is \\space equal \\space to \\space the \\space original \\space number\\]"
            ans += "\\[\\therefore \\space " + num + " \\space is \\space a \\space palindrome \\space number\\]"

        }
        else {
            ans += "\\[Since \\space the \\space reverse \\space number \\space is \\space not \\space equal \\space to \\space the \\space original \\space number\\]"
            ans += "\\[\\therefore \\space " + num + " \\space is \\space not \\space a \\space palindrome \\space number\\]"

        }
       return {'steps': ans }

}
function perfectvalue(num) {

        var digits = Math.floor(Math.log10(num) + 1);

        var v = "";
        var ans = "";
        var w = "";
        num = parseInt(num);
        var temp = 0;
        ans = "\\[The \\space positive \\space diviors \\space of \\space the \\space number \\space excluding \\space itself \\space are:\\]"
        for (var i = 1; i <= num / 2; i++) {
            if (num % i === 0) {
                temp += i;
                w = w + i + ",";
                v = v + i + "+"
            }
        }
        w = w.slice(0, -1);
        v = v.slice(0, -1)
        ans += "\\[" + w + "\\]"
        ans += "\\[Taking \\space the \\space sum \\space of \\space the \\space divisors \\]"
        ans += "\\[" + v + "\\]"
        ans += "\\[" + temp + "\\]"
        if (temp === num && temp !== 0) {
            ans += "\\[Since \\space the \\space sum \\space i.e \\space " + temp + " \\space is \\space equal \\space to \\space the \\space inputted \\space number \\space i.e \\space " + num + " \\]";
            ans += "\\[\\therefore \\space " + num + " \\space  is \\space a \\space perfect \\space number\\]"

        }
        else {
            ans += "\\[Since \\space the \\space sum \\space i.e \\space " + temp + " \\space is \\space not \\space equal \\space to \\space the \\space inputted \\space number \\space i.e \\space " + num + " \\]";
            ans += "\\[\\therefore \\space " + num + " \\space  is \\space not \\space a \\space perfect \\space number\\]"

        }
       return {'steps' : ans }

}
function isPrime(n) {

    if (n <= 1)
        return false;
    for (i = 2; i < n; i++)
        if (n % i == 0)
            return false;

    return true;
}

function isNeonNum(num) {
    let sq = num * num, ans = "", s = "";
    let sum_digits = 0;
    ans += "Step 1: Number => " + num;
    ans += `<br> Step 2: Square of the number => ${num}*${num} = ${sq}`;
    while (sq != 0) {
        s += `${sq % 10}+`;
        sum_digits = sum_digits + sq % 10;
        sq = Math.floor(sq / 10);
    }
    s = s.substring(0, s.length - 1);
    const rs = s => [...s].reverse().join('');
    ans += `<br> Step 3: Sum of digits of square of the number => ${rs(s)} = ${sum_digits}`;
    if (sum_digits == num) {
        ans += `<br> Step 4: Clearly the sum of digits of square of the number is equal to the number.`;
        ans += `<br> Step 5: Hence ${num} is a Neon number`;
    }
    else {
        ans += `<br> Step 4: Clearly the sum of digits of square of the number is not equal to the number.`;
        ans += `<br> Step 5: Hence ${num} is not a Neon number`;
    }
    document.getElementById('neonans').innerHTML = ans;
}
function isDisNum(num) {
    let ans = "", s = "", temp = num, ctr = 0;
    const res = String(num)
        .split("")
        .reduce((acc, val, ind) => {
            acc += math.pow(+val, ind + 1);
            return acc;
        }, 0);
    while (temp != 0) {
        s += `${temp % 10}^${ctr + 1} +`;
        temp = parseInt(temp / 10);
        ctr++;
    }
    s = s.substring(0, s.length - 1);
    ans += "Step 1: Number => " + num;
    ans += `<br> Step 2: Sum of digits powered with their respective positions => ${s} = ${res}`;
    if (res == num) {
        ans += `<br> Step 3: Clearly the sum of its digits powered with their respective positions is equal to the number itself.`;
        ans += `<br> Step 4: Hence ${num} is a Disarium number`;
    }
    else {
        ans += `<br> Step 3: Clearly the sum of its digits powered with their respective positions is not equal to the number itself.`;
        ans += `<br> Step 4: Hence ${num} is not a Disarium number`;
    }
    document.getElementById('disans').innerHTML = ans;
}

function isAutoNum(num) {
    let sq = num * num;
    let ans = "";
    ans += "Step 1: Number => " + num;
    ans += `<br> Step 2: Square the number => ${num}*${num} = ${num * num}`;
    if (num % 10 != sq % 10) {
        ans += `<br> Step 3: Clearly the square of the number doesn't ends in the same digits as the number itself.`;
        ans += `<br> Step 4: Hence ${num} is not an atomorphic number`;
        num = num / 10;
        sq = sq / 10;
    }
    else {
        ans += `<br> Step 3: Clearly the square of the number ends in the same digits as the number itself.`;
        ans += `<br> Step 4: Hence ${num} is an atomorphic number`;
    }
    document.getElementById('autoans').innerHTML = ans;

}

function isProNum(num) {
    let flag = 0, i;
    for (i = 0; i <= parseInt(Math.sqrt(num)); i++)
        if (num == i * (i + 1)) {
            flag = 1;
            break;
        }
    let ans = "";
    ans += "Step 1: Number => " + num;
    if (isPrime(num)) {
        ans += `<br> Step 2: ${num} = 1*${num}`;
        ans += `<br> Step 3: Clearly the number is not a product
        of two consecutive integers`;
        ans += `<br> Step 4: Hence ${num} is not a Pronic number`;
    }
    else {
        if (flag) {
            ans += `<br> Step 2: ${num} = ${i}*${i + 1}`;
            ans += `<br> Step 3: Clearly the number is a product
            of two consecutive integers`;
            ans += `<br> Step 4: Hence ${num} is a Pronic number`;
        }
        else {
            let j;
            for (j = 2; j <= parseInt(Math.sqrt(num)); j++)
                if (num % j == 0)
                    break;
            ans += `<br> Step 2: ${num} = ${j}*${num / j}`;
            ans += `<br> Step 3: Clearly the number is not a product
            of two consecutive integers`;
            ans += `<br> Step 4: Hence ${num} is not a Pronic number`;
        }
    }
    document.getElementById('proans').innerHTML = ans;
}
function isHarNum(num) {
    let sum = 0;
    for (let temp = num; temp > 0; temp = parseInt(temp / 10, 10))
        sum += temp % 10;
    let ans = "";
    ans += "Step 1: Number => " + num;
    ans += `<br> Step 2: Sum of the digits of the number => ${sum}`;
    if (num % sum == 0) {
        ans += `<br> Step 3: Clearly the number is divisible by the sum of digits => ${num}%${sum}=0`;
        ans += `<br> Step 4: Hence ${num} is a Harshad Number`;
    }
    else {
        ans += `<br> Step 3: Clearly the number is not divisible by the sum of digits => ${num}%${sum}=${num % sum}`;
        ans += `<br> Step 4: Hence ${num} is not a Harshad Number`;
    }
    document.getElementById('harans').innerHTML = ans;
}

function isEurNum(n, m) {
    let x, x_length = n + 1
        , y, y_length = m + 1
        , dp = [];

    for (x = 0; x < x_length; x++) {
        dp[x] = []
        for (y = 0; y < y_length; y++) {
            dp[x][y] = 0;
        }
    }

    for (let i = 1; i <= n; i++) {
        for (let j = 0; j <= m; j++) {
            if (i > j) {
                if (j == 0)
                    dp[i][j] = 1;
                else
                    dp[i][j] = ((i - j) *
                        dp[i - 1][j - 1]) +
                        ((j + 1) * dp[i - 1][j]);
            }
        }
    }
    document.getElementById('eurans').innerHTML = "The result is: " + dp[n][m];
}

function carpower(x, y, mod) {
    if (y == 0)
        return 1;
    let temp = carpower(x, parseInt(y / 2, 10), mod) % mod;
    temp = (temp * temp) % mod;
    if (y % 2 == 1)
        temp = (temp * x) % mod;
    return temp;
}

function PellNum(num) {
    let flag = 0;
    if (num <= 2)
        flag = 1;
    let a = 1;
    let b = 2;
    let c;
    for (let i = 3; i <= num; i++) {
        c = 2 * b + a;
        a = b;
        b = c;
    }
    if (!flag)
        document.getElementById('pellans').innerHTML = "The result is: " + num;
    else
        document.getElementById('pellans').innerHTML = "The result is: " + b;
}

function solveFraction(num1, num2) {
    num1 = parseInt(num1);
    num2 = parseInt(num2);
    var tempnum1 = num1;
    var tempnum2 = num2;
    var result = '';
    var temp = '';
    if (num1 % num2 == 0) {
        temp += `pay ve payda şununla sadeleştirildi ${num2}`;
        temp += `\\[\\frac{\\cancel{${num1}}}{\\cancel{${num2}}}=`;
        num1 /= num2;
        num2 = 1;
        temp += `\\frac{${num1}}{${num2}}\\]`;
        sol = `\\frac{${num1}}{${num2}}`;
    } else {
        var flag = 0;
        var sol = '';
        var max = 0;
        if (num1 > num2) {
            max = num1;
        } else {
            max = num2;
        }
        temp += `\\[\\frac{${num1}}{${num2}}\\]`;
        for (i = 2; i <= max; i++) {
            if (num1 % i == 0 && num2 % i == 0) {
                flag = 1;
                temp += `pay ve payda şununla sadeleştirildi ${i}`;
                temp += `\\[\\frac{\\cancel{${num1}}}{\\cancel{${num2}}} = `;
                num1 /= i;
                num2 /= i;
                sol = `\\frac{${num1}}{${num2}}`;
                temp += `\\frac{${num1}}{${num2}}\\]`;
            }
        }
    }

    if (flag == 0) {
        temp = '';
        temp += `Kesir en sade halinde`;
        sol = `\\frac{${num1}}{${num2}}`;
        result += `\\[\\frac{${tempnum1}}{${tempnum2}} = ${sol}\\]`
    } else {
        result += `\\[\\frac{${tempnum1}}{${tempnum2}} = ${sol}\\]`;
    }
    return { 'result': result, 'steps': temp };
}

function outlier(num,q1,q3)
{
    var ans="";
    var inter=q3-q1;
    var re="";
    num=parseFloat(num);
    ans+="Step 1: Input the number for which the set of outlier is calculated =>"+num;
    q1=parseFloat(q1);
    q3=parseFloat(q3);
    ans+="Step 2:Take bothe quartile ranges,i.e,upper and lower quartile";
    ans+="Step 3:Calculate the outlier";
    if(num<(q1-(1.5*inter)))
    {
        re=(q1-(1.5*inter));
        ans+="The outlier is"+re;
    }
    else(num>(q3+(1.5*inter)))
    {
        re=(q3+(1.5*inter));
        ans+="The outlier is"+re;
    }
    return{'result':re,'steps':ans};
}
function proportion(num1,num2,num3)
{
    var ans="";
    var num4="";
    num1=parseInt(num1);
    ans+="Step1 :Input the first value"+num1;
    num2=parseInt(num2);
    ans+="Step2 :Input the second value"+num2;
    num3=parseInt(num3);
    ans+="Step3: Input the third value"+num3;
    ans+="Step4 :Calculation of the missing value";
    num4=(num1*num3)/num2;
    ans+="The number for the proportion is "+num4;
    return {'result':num4,'steps':ans};
}

function threestar(a,b)
{
    var ans="";
    var res="";
    a=parseFloat(a);
    ans+="Step1: Input the alpha angle"+a;
    b=parseFloat(b);
    ans+="Step2:Input the beta angle"+b;
    ans+="Step3:Checking for the condition of three star.If true then result is 1 else 0";
    if(a<60 && b==120+a)
    {
        res=1;
        ans+="It is formed by three isosceles triangles";
    }
    else
    {
        res=0;
        ans+="It is not formed by three isosceles triangle";
    }
    return {'result':res,'steps':ans};
}




function calculateSpeed(distance,time) {
    let speed= document.getElementById("speed");
    let temp;
    let calculatedSpeedDisplay = document.getElementById("calculatedSpeedDisplay");
        temp = Number(distance.value) / Number(time.value);
        speed.value=temp;
    calculatedSpeedDisplay.innerText = `The calculated speed is ${temp} m/s.`;
    }

    function calculateTime(distance,speed){
    let time = document.getElementById("time");
    let temp;
    let calculatedSpeedDisplay = document.getElementById("calculatedSpeedDisplay");
       temp = Number(distance.value) /Number(speed.value);
        time.value=temp;
    calculatedSpeedDisplay.innerText = `The calculated time is ${temp} s.`;
    }

    function calculateDistance(speed,time){
        let distance = document.getElementById("distance");
    let temp;
    let calculatedSpeedDisplay = document.getElementById("calculatedSpeedDisplay");
         temp = Number(speed.value) * Number(time.value);
        distance.value=temp;
    calculatedSpeedDisplay.innerText = `The calculated distance is ${temp} m.`;
    }


function probability(favourable,out)
{
    var ans="";
    var sol="";
    favourable=parseInt(favourable);
    ans+="Step1: Input the total number of favourable outcomes"+favourable;
    out=parseInt(out);
    ans+="Step2:Input the total number of possible outcomes"+out;
    ans+="Step3:Calculating the probability";
    sol = `\\frac{${favourable}}{${out}}`;
    ans+="The result is"+sol;
    return {'result':res,'steps':ans};
}

function convolution(n,x,h)
{
    var ans="";
    var y="";
    ans+="Step1:Input the total number of steps"
    n=parseInt(n);
    x=parseFloat(x);
    ans+="Step2:The first function is "+x;
    h=parseFloat(h);
    ans+="Step3:The second function is "+h;
    ans+="Step4:Run a loop till n and calculate the value of convoulution";
    for (let index = 0; index < n; index++) {
        y=y+(x*h);
    }
    return {'result':y,'steps':ans};
}


function circularsector(r,theta)
{
    var ans="";
    var res="";
    r=parseFloat(r);
    ans+="Step1: Input the radius of the circle="+r;
    theta=parseFloat(theta);
    ans+="Step2:Input the angle subtended at the center of the circle in radian="+theta;
    if(theta<360)
    {
        res=0.5*(r*r*theta);
        ans+="The area of the circular sector is="+res;
    }
    else
    {
        res=0;
        ans+="The area of sector is not possible";
    }
    return {'result':res,'steps':ans};
}

function amicable(num1,num2)
{
    var ans="";
    var res="";
    num1=parseInt(num1);
    ans+="Step1:Input the first number="+num1;
    num2=parseInt(num2);
    ans+="Step2:Input the second number="+num2;
    let div1=0,div2=0;
    ans+="Step3: Calculate the sum of divisors of 1st number";
    for (let index = 1; index < num1; index++){
        if(num1 % index==0)
        div1=div1+index;
    }
    ans+="Step4:The sum of divisors of 1st number is="+div1;
    ans+="Step5: Calculate the sum of divisors of 2nd number";
    for (let index1 = 1; index1 < num2; index1++) {
        if(num2 % index1 ==0)
        div2=div2+index1;
    }
    ans+="Step6:The sum of divisors of 2nd number is="+div2;
    if(div1==num2 && div2==num1)
    {
        res=" They are amicable numbers";
    }
    
    else
    res="They are not amicable numbers";
    return {'result':res,'steps':ans};
}

function luminosity(A,T)
{
    var ans="";
    var res="";
    A=parseFloat(A);
    ans+="Step1:Input the area of cross section="+A;
    T=parseFloat(T);
    ans+="Step2:Input the temperature="+T;
    let P=0.0;
    ans+="Step3: Calculate the luminosity power";
    P= A*T*5.670367*Math.pow(10,-8);
    res=P;
    ans+="Step4:The luminosity is equal to:"+res;
    return {'result':res,'steps':ans};
}


