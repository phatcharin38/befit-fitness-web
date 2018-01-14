$( document ).ready(function() {
    setMenu();  
    setDataTable(1);
    setTypeEquipment();
    setAllFitness();
         
});

function setDataTable(page){
    $('#nameTypeEquipment').val("");
    $('#desTypeEquipment').val("");
    $('#txtPanal').text("เพิ่มประเภทเครื่องออกกำลังกาย");
    $('#btnPanal').empty();
    html = '<button id="saveAddFitness" type="button" class="btn btn-success" onclick="saveAddTypeEquipment();">เพิ่ม</button>';
    $('#btnPanal').html(html);
    setDataTableTypeEquipment(page);
    setCountTypeEquipment();
}

function setDataTableTypeEquipment(start) {
    var html = "";

    var end = 7;

    if (start != 1) {
        start = (((start - 1) * 7) + 1) - 1;
    } else {
        start = start - 1;
    }

    $.ajax({
        type: "POST",
        url: "../service/selectDataTableTypeEquipment.php?start="+start+"&end="+end,
        data: '',
        success: function (result) {
            console.log(result);
            $.each(result, function (i, item) {
                html = html + "<tr><td class='text-center'>" + (i + 1) + "</td><td>" + item.name + "</td>" +
                                "<td class='text-left'>" + item.description + "</td><td class='text-center'>" +
                                "<button type='button' class='btn btn-warning' onclick='editTypeEquipment(" + item.id + ")'>แก้ไข</button>&nbsp;" +
                                "<button type='button' class='btn btn-danger' onclick='deleteTypeEquipment(" + item.id + ")'>ลบ</button></td></tr>"
            }); // loop
            $('#dataTablesFitnessEquipmentBody').html(html);
            
        }
    });

}

function setCountTypeEquipment() {
    $.ajax({
        type: "POST",
        url: "../service/setCountTypeEquipment.php",
        data: '',
        success: function (result) {
            console.log(result);
            setPaggingTypeEquipment(result);           
        }
    });
}

function setPaggingTypeEquipment(count) {
    $('#paggingEquipment').empty();

    var total = Math.ceil(count / 7);
    var code = '<div class="col-lg-12">';
    for (i = 1; i <= total; i++) {
        code = code + '&nbsp;<button type="button" class="btn padding-btn" onclick="setDataTable(' + i + ')">' + i + '</button>';
    }
    code = code + "</div>"
    $('#paggingEquipment').html(code);
}

function saveAddTypeEquipment() {
    var name = $('#nameTypeEquipment').val();
    var des = $('#desTypeEquipment').val();
    var data = JSON.stringify({name:name,des:des});

    $.ajax({
        type: "POST",
        url: "../service/saveAddTypeEquipment.php?data=" + data,
        data: '',
        success: function (result) {
            setDataTable(1);      
        }
    });
}

function deleteTypeEquipment(id) {
    $.ajax({
        type: "POST",
        url: "../service/deleteTypeEquipment.php?id=" + id,
        data: '',
        success: function (result) {
            setDataTable(1);      
        }
    });
}

function editTypeEquipment(id) {
    $.ajax({
        type: "POST",
        url: "../service/selectEditTypeEquipment.php?id=" + id,
        data: '',
        success: function (result) {
            $.each(result, function (i, item) {
                $('#nameTypeEquipment').val(item.name);
                $('#desTypeEquipment').val(item.description);    
                $('#txtPanal').text("แก้ไขประเภทเครื่องออกกำลังกาย");
                $('#btnPanal').empty();
                html = '<button id="saveAddFitness" type="button" class="btn btn-warning" onclick="saveEditTypeEquipment('+id+');">บันทึก</button>';
                $('#btnPanal').html(html);          
            }); // loop         
        }
    });
}

function saveEditTypeEquipment(id) {
    console.log(id);
    var name = $('#nameTypeEquipment').val();
    var des = $('#desTypeEquipment').val();
    var data = JSON.stringify({name:name,des:des,id:id});
    console.log(data);
    $.ajax({
        type: "POST",
        url: "../service/saveEditTypeEquipment.php?data=" + data,
        data: '',
        success: function (result) {
            setDataTable(1);      
        }
    });
}

function setDataEquipment() {  
    setTypeEquipment();
    setAllFitness();
    setDataTableAllEquipment(1);       
}

function setTypeEquipment() {
    var html = "";
    var html2 = "";
    $.ajax({
        type: "POST",
        url: "../service/setTypeFitness.php",
        data: '',
        success: function (result) {
            html = html + "<option value='0'>ทั้งหมด</value>"
            $.each(result, function (i, item) {
                html = html + "<option value='" + item.id + "'>" + item.name + "</value>";
                html2 = html2 + "<option value='" + item.id + "'>" + item.name + "</value>";
            }); // loop
            $('#nameAllTypeEquipment').html(html);
            $('#txtAddEquipmentType').html(html2);
        }
    });
}

function setAllFitness() {
    var html = "";
    var html2 = "";
    $.ajax({
        type: "POST",
        url: "../service/setAllFitness.php",
        data: '',
        success: function (result) {
            html = html + "<option value='0'>ทั้งหมด</value>"
            $.each(result, function (i, item) {
                html = html + "<option value='" + item.code_fitness + "'>" + item.name_fitness + "</value>";
                html2 = html2 + "<option value='" + item.code_fitness + "'>" + item.name_fitness + "</value>"
            }); // loop
            $('#nameAllFitness').html(html);
            $('#txtAddEquipmentFitness').html(html2);
        }
    });

}

function setDataTableAllEquipment(start) {
    var codeFitness = $('#nameAllFitness').val();
    var typeEquipment = $('#nameAllTypeEquipment').val();
    var keyword = $('#txtKeyword').val();
    var html = "";
    var end = 7;
    if (start != 1) {
        start = (((start - 1) * 7) + 1) - 1;
    } else {
        start = start - 1;
    }
    console.log(codeFitness);
    var data = JSON.stringify({
          codeFitness:"" + codeFitness,
          typeEquipment:typeEquipment,
          keyword:"" + keyword,
          start:start,
          end:end
        });
    console.log(data);
    $.ajax({
        type: "POST",
        url: "../service/selectDataTableAllEquipment.php?data="+data,
        data: '',
        success: function (result) {
            console.log(result);
            $.each(result, function (i, item) {
                html = html + "<tr><td class='text-center'>" + (i + 1) + "</td><td>" + item.nameFitness + "</td>" +
                                "<td class='text-center'>" + item.nameType + "</td>"+
                                "<td class='text-center'>" + item.amount + "</td>"+
                                "<td class='text-center'>"+
                                "<button type='button' class='btn btn-warning' onclick='viewQrCode("+ item.id +",1);clearModualQrcode();'>QR Code</button>&nbsp;" +
                                "<button type='button' class='btn btn-danger' onclick='deleteEquipmentFitnessModual("+ item.id +");'>ลบ</button>"+
                                "</td></tr>";
            }); // loop
            $('#dataTablesAllFitnessEquipmentBody').html(html);
            setCountPaggingAllEquipment(); 
            
        }
    });

}

function setCountPaggingAllEquipment() {

    var codeFitness = $('#nameAllFitness').val();
    var typeEquipment = $('#nameAllTypeEquipment').val();
    var keyword = $('#txtKeyword').val();
    var html = "";
    var data = JSON.stringify({
          codeFitness:"" + codeFitness,
          typeEquipment:typeEquipment,
          keyword:"" + keyword,
    });
    $.ajax({
        url: "../service/setCountPaggingAllEquipment.php?data="+data,
        method: "GET",
        success: function (data) {
            console.log(data);
            $.each(data, function (i, item) {
                setPaggingAllEquipment(item.count);
            });           
            //  $('#result').html(data);
        }
    });

}

function setPaggingAllEquipment(count) {
    $('#paggingEquipment').empty();
    // console.log("count :" + count);
    var total = Math.ceil(count / 7);
    // console.log("page :" + total);
    var code = '<div class="col-lg-12">';
    for (i = 1; i <= total; i++) {
        code = code + '&nbsp;<button type="button" class="btn padding-btn" onclick="setDataTableAllEquipment(' + i + ')">' + i + '</button>';
    }
    code = code + "</div>"
    $('#paggingEquipmentAllFitness').html(code);
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
 
function deleteEquipmentFitnessModual(id) {
    console.log(id); 
    $.ajax({
        type: "POST",
        url: "../service/deleteAddEquipmentFitnessModual.php?id=" + id,
        success: function (result) {
            setDataTableAllEquipment(1);  
        }
    });
}

function addEquipmentFitness() {
    var type = $('#txtAddEquipmentType').val();
    var amount = $('#txtAddEquipmentAmount').val();
    var codeFitness = $('#txtAddEquipmentFitness').val();
    var data = JSON.stringify({type : type,amount :amount,code:codeFitness});
    console.log(data);
    $.ajax({
        type: "POST",
        url: "../service/saveAddEquipmentFitnessModual.php?data=" + data,
        success: function (result) {
            console.log(result);
            setDataTableAllEquipment(1);  
        }
    });
}