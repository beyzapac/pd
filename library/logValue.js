
 function display_log(){
     document.getElementById('log_values').style.display = 'block';
 }


 function cal_log(){

     var number1 = document.getElementById('x-number').value;
     var base =document.getElementById('log-base').value;
     var work = document.getElementById('work');
     var result = document.getElementById('result');
     var print = "<h2 style='margin-top: 50px;'>Working Steps </h2> &emsp;";

     if(number1==""||base==""||isNaN(number1)||isNaN(base))
     {
      result.innerHTML = "Lütfen geçerli değerler girin";
     }
     else{
        number1=parseFloat(number1);
        base=parseFloat(base);
     if(base==1)
     {
        result.innerHTML = "\\[log_" + base + " " + number1 + " \\space = \\space Infinity \\]";
     }
     else if (base==0){
        result.innerHTML = "\\[log_" + base + " " + number1 + " \\space = \\space " + 0 + " \\]";
     }
	 else if(base<0 || number1<0)
	 {
		 result.innerHTML = "Lütfen pozitif değerler girin";
	 }
     else {
        var ans =  Math.log(number1)/Math.log(base);
        
     result.innerHTML = "\\[Sonuç \\space  -> \\space \\log_" + base + " " + number1 + " \\space  = \\space " + ans + "\\]";

     }
   }
   renderMathInElement(result);
 } 
 function lnfind() {
    var num=document.getElementById("ln1").value;
    if(num==""||isNaN(num)){
      document.getElementById("lnans1").innerHTML= "";
      document.getElementById("lnans").innerHTML ="\\[Please \\space enter \\space valid \\space number\\]";
      renderMathInElement(document.getElementById("lnans"));
    } else {
       var e=2.718281828459045;
       document.getElementById("lnans1").innerHTML= "\\[The \\space value \\space of \\space e \\space = \\space 2.7183 \\newline \\frac{log(n)}{log(e)} \\space = \\space \\frac{"+num+"}{log("+e.toFixed(3)+")}\\]";
       document.getElementById("lnans").innerHTML ="\\[The \\space calculated \\space value \\space is: \\space "+ (Math.log(num)/Math.log(e)).toFixed(3)+"\\]";
    }
    renderMathInElement(document.getElementById("lnans1"));
    renderMathInElement(document.getElementById("lnans"));
 }
