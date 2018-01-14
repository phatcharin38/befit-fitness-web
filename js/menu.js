function setMenu() {
    if (sessionStorage.getItem("code")) {        
        if (sessionStorage.getItem("type") == 'admin') {
            $('#tab-menu').attr('w3-include-html', 'navAdmin.html');
            w3.includeHTML();
            $('#getNameUser').text(sessionStorage.getItem("name") + " " + sessionStorage.getItem("lastname"));
        } else if (sessionStorage.getItem("type") == 'user') {
            if (sessionStorage.getItem("booking") == 'NO') {
                $('#tab-menu').attr('w3-include-html', 'navUser.html');
            }else if (sessionStorage.getItem("booking") == 'YES'){
                $('#tab-menu').attr('w3-include-html', 'navUserBooking.html');
            }      
            w3.includeHTML();
            $('#getNameUser').text(sessionStorage.getItem("name") + " " + sessionStorage.getItem("lastname"));
            // setMenuBooking();
        }
   
    } else { 
        sessionStorage.clear();
        window.location.href = "./login.html"
    }
}

function goToHome() {
    window.location.href = "./home.html"
}

function goToRegisterFitness() {
    window.location.href = "./registerFitness.html"
    setDataTableFitness(1);

}

function goToRegisterUser() {
    window.location.href = "./registerUser.html"
    setDataTableUser(1);
}

function goToEquipment() {
    window.location.href = "./equipment.html"
    setDataTableUser(1);
}

function goToBooking() {
    window.location.href = "./booking.html"
    setDataTableUser(1);
}

function goToService() {
    window.location.href = "./service.html"
    setDataTableUser(1);
}

function goToReport() {
    window.location.href = "./report.html"
    setDataTableUser(1);
}


function goToLogout() {
    sessionStorage.clear();
    window.location.href = "./login.html"
}

function goToDocumentFitness() {
    window.location.href = "./documentFitness.html"
}

function goToDocumentEquipment() {
    window.location.href = "./documentEquipment.html"
}
