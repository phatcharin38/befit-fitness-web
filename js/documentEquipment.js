$( document ).ready(function() {
    setMenu();  
    setDocumentFitness();   
    viewAddressFitness(sessionStorage.getItem("codeFitness"));
    $('#codeFitnessAddEquipment').text(sessionStorage.getItem("codeFitness"));
});

function setDocumentFitness(){ 
    $.ajax({
        type: "POST",
        url: "../service/selectDocumentFitness.php?id=" + sessionStorage.getItem("codeFitness"),
        success: function (result) {
            console.log(result);
            $('#txtNameFitness').text(result[0].name_fitness);
        }
    });
}

function viewAddressFitness(id) {
    setTypeEquipment();
    setTypeEquipmentSearch(id)
}

function clearAddMyalAddEquiment() {
    $('#addEuipmentFitness').modal('hide');
}

function setTypeEquipment() {
    var html = "";
    $.ajax({
        type: "POST",
        url: "../service/setTypeFitness.php",
        data: '',
        success: function (result) {
            $.each(result, function (i, item) {
                html = html + "<option value='" + item.id + "'>" + item.name + "</value>"
                // console.log(item.name);
            }); // loop

            //$('#typeEquipmentFitnessSelectSearch').html(html);
            $('#typeEquipmentFitnessSelect').html(html);

        }
    });

}

function setDataTableFitnessEquipment(start, codeFitness) {
    var type = $('#typeEquipmentSearch').val();
    sessionStorage.setItem("codeFitness", codeFitness);
console.log("llllllllllll : " + type);
    var end = 6;

    if (start != 1) {
        start = (((start - 1) * 6) + 1) - 1;
    } else {
        start = start - 1;
    }
    console.log(start + " : " + end);
    getDataTableFitnessEquipment(start, end, type, codeFitness);
    //setTypeEquipmentSearch(codeFitness)
    setCountPaggingEquipment(type,codeFitness);
}

function getDataTableFitnessEquipment(start, end, type, code) {
    $('#dataTablesFitnessEquipmentBody').empty();
    var html = "";
    var data = JSON.stringify({ start: start, end: end, type: parseInt(type), code_fitness: "'" + code + "'" });
    console.log(data);
    $.ajax({
        type: "POST",
        url: "../service/searchDataTableFitnessEquipment.php?data=" + data,
        success: function (result) {
            console.log(result);
            $.each(result, function (i, item) {
                html = html + "<tr><td class='text-center'>" + (i + 1) + "</td><td>" + item.name + "</td>" +
                    "<td class='text-center'>" + item.amount + "</td><td class='text-center'>" +
                    "<button type='button' class='btn btn-warning' onclick='viewQrCode("+ item.id +",1);clearModualQrcode();'>QR Code</button>&nbsp;" +
                    "<button type='button' class='btn btn-danger' onclick='deleteEquipmentFitnessModual("+ item.id +");'>ลบ</button></td></tr>"
                $('#dataTablesFitnessEquipmentBody').html(html);
            }); // loop
        }
    });
}

function setTypeEquipmentSearch(codeFitness) {

    var html = "<select class='form-control' onchange='setDataTableFitnessEquipment(1,\"" + codeFitness + "\")' id ='typeEquipmentSearch'><option value = '0'>ทั้งหมด</option>";
    $.ajax({
        type: "POST",
        url: "../service/setTypeEquipmentSearch.php?codeFitness='" + codeFitness + "'",
        data: '',
        success: function (result) {
            console.log(result);
            $.each(result, function (i, item) {
                html = html + "<option value='" + item.id + "'>" + item.name + "</value>"
                // console.log(item.name);
            }); // loop
            html = html + "</select>";
            $('#typeEquipmentFitnessSelectSearch').html(html);
            setDataTableFitnessEquipment(1, codeFitness)
        }
    });
}

function addEquipmentFitnessModual() {
    var type = $('#typeEquipmentFitnessSelect').val();
    var amount = $('#amountEquipmentFitness').val();
    var codeFitness = sessionStorage.getItem("codeFitness");
    var data = JSON.stringify({type : type,amount :amount,code:codeFitness});
    console.log(data);
    $.ajax({
        type: "POST",
        url: "../service/saveAddEquipmentFitnessModual.php?data=" + data,
        success: function (result) {
            console.log(result);
            setTypeEquipmentSearch(codeFitness)
        }
    });
}

function deleteEquipmentFitnessModual(id) {
    var codeFitness = sessionStorage.getItem("codeFitness");  
    console.log(id); 
    $.ajax({
        type: "POST",
        url: "../service/deleteAddEquipmentFitnessModual.php?id=" + id,
        success: function (result) {
            setTypeEquipmentSearch(codeFitness)
        }
    });
}

function setCountPaggingEquipment(type,codeFitness) {
    console.log("hhh : " + type);
    $.ajax({
        url: "../service/setCountPaggingEquipment.php?type=" + type + "&codeFitness='%" + codeFitness + "%'",
        method: "GET",
        success: function (data) {
            console.log("hhh : " + data);
            setPaggingEquipment(data);
            //  $('#result').html(data);
        }
    });

}

function setPaggingEquipment(count) {
    $('#paggingEquipment').empty();
    // console.log("count :" + count);
    var total = Math.ceil(count / 6);
    // console.log("page :" + total);
    var code = '<div class="col-lg-12">';
    for (i = 1; i <= total; i++) {
        code = code + '&nbsp;<button type="button" class="btn padding-btn" onclick="setDataTableFitnessEquipment('+i+',\''+sessionStorage.getItem("codeFitness")+'\');">' + i + '</button>';
    }
    code = code + "</div>"
    $('#paggingEquipment').html(code);
}


function viewQrCode(id,page) {
    console.log(id);
    html = "";
    $.ajax({
        url: "../service/setQrcodeEquipment.php?id=" + id,
        method: "GET",
        success: function (data) {
            console.log(data);       
            $.each(data, function (i, item) {
                setPaggingQrcodeEquipment(item.amount,id)
                start = (((page * 5)/5) - 1) * 5;
                end = start + 5;
                console.log("p : " + start);
                for(j=start;j<end;j++){
                    if(j<item.amount){
                        html = html + "<tr><td class='text-center'>" + (j+1) + "</td><td class='text-center '>" +
                        "<button type='button' class='btn btn-success ' onclick='showQrCode(\""+item.name+"\",\""+item.code_fitness+"\","+(j+1)+");' title='" + item.name + " " +(j+1)+"'><div id='div2'>" + item.name + " " +(j+1)+"</div></button>&nbsp;</td></tr>"   ;                     
                    }                 
                }  
               
            }); // loop     

            $('#dataTablesQrcodeEquipmentBody').html(html);          
        }
    });
}

function clearModualQrcode() {
    $('#qrcodeShow').empty();
    $('#btnExportQrcode').empty(); 
    $('#txtQrcodeEquipmentName').text("");
    $('#euipmentQrcode').modal('toggle');
}


function clearQrcodeEquiment() {
    $('#euipmentQrcode').modal('hide');
}

function showQrCode(name,codeFitness,no){
    var data = JSON.stringify({codeFitness:codeFitness,name:name,no:no});
    console.log(data);  

    $('#txtQrcodeEquipmentName').text(name + " " +no);

    $('#qrcodeShow').empty();
    html = "<div id='qrcodeShow'></div>";
    $('#qrcode').html(html);  
    new QRCode(document.getElementById("qrcodeShow"), data);

    html = '<button type="button" class="btn btn-info" onclick="">Export QR Code</button>';
    $('#btnExportQrcode').html(html);  
}

function setPaggingQrcodeEquipment(count,id) {
    $('#paggingEquipment').empty();
    // console.log("count :" + count);
    var total = Math.ceil(count / 5);
    // console.log("page :" + total);
    var code = '<div class="col-lg-12">';
    for (i = 1; i <= total; i++) {
        code = code + '&nbsp;<button type="button" class="btn padding-btn" onclick="viewQrCode('+id+','+i+')">' + i + '</button>';
    }
    code = code + "</div>"
    $('#paggingQrcodeEquipment').html(code);
}