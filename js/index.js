$( document ).ready(function() {
    if(sessionStorage.getItem("code")){
        $('#getNameUser').text(sessionStorage.getItem("name") + " " + sessionStorage.getItem("lastname"));
        // setMenuLogin();
        if(sessionStorage.getItem("type") == 'admin'){
            setMenuLogin();
            $('#adminRegister').attr("style", "display:ture");
            $('#adminEuipment').attr("style", "display:ture");
            $('#userBooking').attr("style", "display:ture");
            $('#userUsage').attr("style", "display:ture");
            $('#adminService1').attr("style", "display:ture");
            $('#adminService2').attr("style", "display:ture");
            $('#adminReport1').attr("style", "display:ture");
            $('#adminReport2').attr("style", "display:ture");
            $('#adminReport3').attr("style", "display:ture");
            $('#adminReport4').attr("style", "display:ture");
        }else if(sessionStorage.getItem("type") == 'user'){
            setMenuLogin();
            $('#userProfile').attr("style", "display:ture");
            $('#userBooking').attr("style", "display:ture");
            $('#userUsage').attr("style", "display:ture");
            $('#adminService1').attr("style", "display:ture");
            $('#adminReport3').attr("style", "display:ture");
        }

    }else{
        sessionStorage.clear();
        window.location.href = "./login.html"
    }
});

function setMenuLogin(){
    $('#adminRegister').attr("style", "display:none");
    $('#userProfile').attr("style", "display:none");
    $('#adminEuipment').attr("style", "display:none");
    $('#userBooking').attr("style", "display:none");
    $('#userUsage').attr("style", "display:none");
    $('#adminService').attr("style", "display:none");
    $('#adminReport1').attr("style", "display:none");
    $('#adminReport2').attr("style", "display:none");
    $('#adminReport3').attr("style", "display:none");
    $('#adminReport4').attr("style", "display:none");
}

function getMenuLogin(){
    
}

function goToHome(){
    $('#wrapper').attr('w3-include-html','home.html'); 
    w3.includeHTML();
    
}

function goToHome(){
    $('#wrapper').attr('w3-include-html','home.html'); 
    w3.includeHTML();
    
}

function goToLogout(){
    sessionStorage.clear();
    window.location.href = "./login.html"
}

function goToRegisterFitness(){
    $('#wrapper').attr('w3-include-html','registerFitness.html');  
    w3.includeHTML();
    setDataTableFitness(1);
    
}

function goToRegisterUser(){
    $('#wrapper').attr('w3-include-html','registerUser.html');  
    w3.includeHTML();
    setDataTableUser(1);
}

function genBarCode(id,text){
    // alert(id);
    JsBarcode(id, text);
}




