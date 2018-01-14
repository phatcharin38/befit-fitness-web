$( document ).ready(function() {
    setMenu();
    setDocumentFitness();       
});

function setDocumentFitness(){ 
    $.ajax({
        type: "POST",
        url: "../service/selectDocumentFitness.php?id=" + sessionStorage.getItem("codeFitness"),
        success: function (result) {
            console.log(result);
            JsBarcode("#barcodeFitness", result[0].code_fitness);
            $('#txtNameFitness').text(result[0].name_fitness);
            $('#txtAddressFitness').text(result[0].address_fitness);
            $('#txtOpenFitness').text(result[0].open_fitness);
            $('#txtBookingFitness').text(result[0].booking_system);
            $('#txtCodeUser').text(result[0].code);
            $('#txtAdminFitness').text(result[0].name + " " +result[0].lastname);
            $('#txtUsername').text(result[0].username);
            $('#txtPassword').text("**************");
        }
    });
} 