function User(){
    var q1, q2, q3, q4, q5;
    q1 = document.getElementById("q1").value;
    q2 = parseInt(q1) * 0.12;
    q3 = parseInt(q2) + parseInt(q1);
    q4 = q3;
    q5 = parseInt(q4) - parseInt(q3);

    if(q1 >= 100 && q1 <= 10000){
        document.getElementById("q2").value = q2.toFixed(2);
        document.getElementById("q3").value = q3.toFixed(2);
        document.getElementById("q4").value = q4.toFixed(2);
        document.getElementById("q4").disabled = false;
        document.getElementById("q4").min = q3.toFixed(2);
        document.getElementById("q5").value = q5.toFixed(2);
        btn1.style.backgroundColor = "green";
        btn1.disabled = false;

    }else{
        document.getElementById("q2").value = "";
        document.getElementById("q3").value = "";
        document.getElementById("q4").value = "";
        document.getElementById("q4").disabled = true;
        document.getElementById("q4").min = "";
        document.getElementById("q5").value = "";
        btn1.style.backgroundColor = "marron";
        btn1.disabled = true;
    }
}
function pay(){
    var q3, q4, q5;
    q3 = document.getElementById("q3").value;
    q4 = document.getElementById("q4").value;
    q5 = parseInt(q4) - parseInt(q3);
    document.getElementById("q5").value = q5.toFixed(2);
    if(q5 >= 0){
        btn1.style.backgroundColor = "green";
        btn1.disabled = false;
    }else{
        btn1.style.backgroundColor = "maroon";
        btn1.disabled = true;
    }
}