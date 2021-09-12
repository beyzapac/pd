function display_fractions(){
    document.getElementById('fractions').style.display = 'block';
 }

 function additon(){

     var n1 = parseInt(document.getElementById('one_add').value);
     var d1 = parseInt(document.getElementById('two_add').value);
     var n2 = parseInt(document.getElementById('three_add').value);
     var d2 = parseInt(document.getElementById('four_add').value);

     document.getElementById('addz').innerHTML = "";

     if ((document.getElementById('two_add').value) ==0 || (document.getElementById('four_add').value) == 0)
     {
         document.getElementById('addz').innerHTML = "Your fraction is undefined because it has zero denominator";
         return;
     }
      if(Number.isNaN(d1) || Number.isNaN(d2) || Number.isNaN(n1) || Number.isNaN(n2) )
      {
          window.alert("Enter an Integer")
          return;
      }

     document.getElementById('sum_a').innerHTML =n1;
     document.getElementById('sum_b').innerHTML = d1;

     document.getElementById('sum_c').innerHTML = n2;
     document.getElementById('sum_d').innerHTML = d2;

    document.getElementById('sum_a1').innerHTML = n1;
    document.getElementById('sum_b1').innerHTML = d1;
    document.getElementById('sum_c1').innerHTML = n2;
    document.getElementById('sum_d1').innerHTML = d2;
    document.getElementById('sum_b2').innerHTML = d1;
    document.getElementById('sum_d2').innerHTML = d2;
    document.getElementById('sum_e1').innerHTML = n1*d2;
    document.getElementById('sum_g').innerHTML = n2*d1;
    document.getElementById('sum_f').innerHTML = d1*d2;
    var top = (n1*d2) +(n2*d1);
    var bot = (d1*d2);
    document.getElementById('sum_t').innerHTML = top;
    document.getElementById('sum_q').innerHTML = bot
    var ans = top / bot;
    document.getElementById('sum_ans').innerHTML = ans;
    
}

function division(){

     var n1 = parseInt(document.getElementById('one_div').value);
     var d1 = parseInt(document.getElementById('two_div').value);
     var n2 = parseInt(document.getElementById('three_div').value);
     var d2 = parseInt(document.getElementById('four_div').value);
     document.getElementById('divaz').innerHTML = "";

    if ((document.getElementById('two_div').value) ==0 || (document.getElementById('four_div').value) == 0)
    {
        document.getElementById('divaz').innerHTML = "Your fraction is undefined because it has zero denominator";
        return;
    }

    if(Number.isNaN(d1) || Number.isNaN(d2) || Number.isNaN(n1) || Number.isNaN(n2) )
    {
        window.alert("Enter an Integer")
        return;
    }

     document.getElementById('diva').innerHTML = n1;
     document.getElementById('divb').innerHTML = d1;
     document.getElementById('divc').innerHTML = n2;
     document.getElementById('divd').innerHTML = d2;

     document.getElementById('diva1').innerHTML = n1;
     document.getElementById('divb1').innerHTML = d1;
     document.getElementById('divc1').innerHTML = d2;
     document.getElementById('divd1').innerHTML = n2;

     document.getElementById('diva2').innerHTML = n1;
     document.getElementById('divb2').innerHTML = d1;
     document.getElementById('divc2').innerHTML = n2;
     document.getElementById('divd2').innerHTML = d2;

     var top = n1 * d2;
     var bot = d1 * n2;

     document.getElementById('divt').innerHTML = top;
     document.getElementById('divq').innerHTML = bot

     var ans = top / bot;
     document.getElementById('divans').innerHTML = ans;

 }

