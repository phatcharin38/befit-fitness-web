$(document).ready(function () {
    setMenu();
    setDataTableFitness(1);
});


function setDataTableFitness(start) {
    var keyword = $('#keyword').val();
    var end = 7;
    if (keyword == undefined) {
        keyword = "";
    }
    if (start != 1) {
        start = (((start - 1) * 7) + 1) - 1;
    } else {
        start = start - 1;
    }
    console.log(start + " : " + end);
    getDataTableFitness(start, end, keyword);
    setCountPaggingDataTableFitness(keyword)
}


function setCountPaggingDataTableFitness(keyword) {
    $.ajax({
        url: "../service/setCountPaggingDataTable.php?keyword='%" + keyword + "%'",
        method: "GET",
        success: function (data) {
            setPaggingDataTableFitness(data);
            //  $('#result').html(data);
        }
    });

}

function setPaggingDataTableFitness(count) {
    $('#pagging').empty();
    // console.log("count :" + count);
    var total = Math.ceil(count / 7);
    // console.log("page :" + total);
    var code = '<div class="col-lg-12">';
    for (i = 1; i <= total; i++) {
        code = code + '&nbsp;<button type="button" class="btn padding-btn" onclick="setDataTableFitness(' + i + ');">' + i + '</button>';
    }
    code = code + "</div>"
    $('#pagging').html(code);
}

function getDataTableFitness(start, count, keyword) {

    setSelectAdminFitness();

    // alert(keyword);
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        // console.log("gg");
        if (this.readyState == 4 && this.status == 200) {
            var jsonResponse = JSON.parse(this.responseText);
            console.log(jsonResponse);
            // console.log(this.responseText);
            var html = "";
            $.each(jsonResponse, function (i, data) {
                i = i + 1;
                if (i % 2 === 0) {
                    html = html + "<tr class='odd gradeX'><td>" + data.code_fitness + "</td>"
                        + "<td>" + data.name_fitness + "</td>"
                        + "<td class='text-center'><img src='../images/location.png' width='30px' height='40px' data-toggle='tooltip' data-placement='right' title='" + data.address_fitness + "' class='imgAddress'/>"
                        + "<td>" + data.open_fitness + "</td>"
                        + "<td class='text-center'>";
                    if (data.booking_system == 'YES') {
                        html += "<img src='../images/ture.png' width='20px' height='20px' />";
                    } else {
                        html += "<img src='../images/false.png' width='20px' height='20px' />";
                    }
                    html += "</td>"
                        + "<td class='text-center'>" + data.name + " " + data.lastname + "</td>"
                        + "<td class='text-center'><button type='button' class='btn btn-warning' onclick='editFitness(" + data.id + ")'>แก้ไข</button>"
                        + "&nbsp;<button type='button' class='btn btn-danger' onclick='deleteFitness(" + data.id + ")'>ลบ</button>"
                        + "&nbsp;<button type='button' class='btn btn-add' onclick='viewAddressFitness(\"" + data.code_fitness + "\")'><img src='../images/add.png' width='20px' height='20px'/></button></td></tr>";
                } else {
                    html = html + "<tr class='even gradeC'><td>" + data.code_fitness + "</td>"
                        + "<td>" + data.name_fitness + "</td>"
                        + "<td class='text-center'><img src='../images/location.png' width='30px' height='40px' data-toggle='tooltip' data-placement='right' title='" + data.address_fitness + "' class='imgAddress'/></td>"
                        + "<td>" + data.open_fitness + "</td>"
                        + "<td class='text-center'>";
                    if (data.booking_system == 'YES') {
                        html += "<img src='../images/ture.png' width='20px' height='20px' />";
                    } else {
                        html += "<img src='../images/false.png' width='20px' height='20px' />";
                    }
                    html += "</td>"
                        + "<td class='text-center'>" + data.name + " " + data.lastname + "</td>"
                        + "<td class='text-center'><button type='button' class='btn btn-warning' onclick='editFitness(" + data.id + ")'>แก้ไข</button>"
                        + "&nbsp;<button type='button' class='btn btn-danger' onclick='deleteFitness(" + data.id + ")'>ลบ</button>"
                        + "&nbsp;<button type='button' class='btn btn-add' onclick='viewAddressFitness(\"" + data.code_fitness + "\")'><img src='../images/add.png' width='20px' height='20px'/></button></td></tr>";
                }
            }); // loop

            $('#dataTablesFitnessBody').html(html);
            $('#test').html("<p class='tooltip-demo'><img src='../images/location.png' width='30px' height='40px' data-toggle='tooltip' data-placement='right' title='123456789' class='imgAddress'/></p>");
        }
    };
    url = "../service/searchFitnessService.php?keyword='%" + keyword + "%'&start=" + start + "&count=" + count;
    // alert(url);
    // console.log(url);
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function addFitness() {
    $('#saveAddFitness').show();
    $('#addFitness').modal('toggle');
    $('#addFitnessModalLabel').show();
}

function clearAddMyal() {
    $('#addFitness').modal('hide');
    $('#saveAddFitness').hide();
    $('#saveEditFitness').hide();
    $('#rowCodeFitness').hide();
    $('#codeFitness').val("");
    $('#nameFitness').val("");
    $('#addressFitness').val("");
    $('#openFitness').val("");
    $('#selectAdminFitness').selectedIndex = "1";
    $('#addFitnessModalLabel').hide();
    $('#editFitnessModalLabel').hide();
    $('#latitude').val("");
    $('#longitude').val("");

}


function setSelectAdminFitness() {
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            $('#selectAdminFitness').html(this.responseText);
        }
    };
    url = "../service/selectAdminFitness.php";
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function saveAddFitness() {
    var name = $('#nameFitness').val();
    var address = $('#addressFitness').val();
    var open = $('#openFitness').val();
    var codeAdmin = $('#selectAdminFitness').val();
    var optionsBooking = "";
    var latitude = $('#latitude').val();
    var longitude = $('#longitude').val();
    
    $('input[name="optionsBooking"]').each(function() {
        if(this.checked == true){
            optionsBooking = this.value;
        }
    });

    $.ajax({
        url: "../service/saveAddFitness.php?name='" + name + "'&address='" + address + "'&open='" + open + "'&codeAdmin='" + codeAdmin + "'&option='" + optionsBooking + "'&latitude='" + latitude + "'&longitude='" + longitude + "'",
        method: "GET",
        success: function (data) {
            clearAddMyal();
            setDataTableFitness(1);
        }
    });
}

function deleteFitness(id) {
    // alert(id);
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText == 1) {
                // swal('สำเร็จ',this.responseText,'success');            
                setDataTableFitness(1);
            } else {
                swal('คำเตือน', this.responseText, 'warning');
            }
        }
    };

    url = "../service/deleteFitness.php?id=" + id;
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function editFitness(id) {
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            data = JSON.parse(this.responseText);
            console.log(data);
            $('#rowCodeFitness').show();
            $('#saveEditFitness').show();
            $('#editFitnessModalLabel').show();
            $('#addFitness').modal('toggle');
            $('#codeFitness').val(data[0].code_fitness);
            $('#nameFitness').val(data[0].name_fitness);
            $('#addressFitness').val(data[0].address_fitness);
            $('#latitude').val(data[0].latitude);
            $('#longitude').val(data[0].longitude);
            $('#openFitness').val(data[0].open_fitness);
            $('#selectAdminFitness').val(data[0].admin_fitness);
            $('input[name="optionsBooking"]').each(function() {
                if(data[0].booking_system == this.value){
                    $('input[name="optionsBooking"]').filter('[value="'+data[0].booking_system+'"]').prop('checked', true);
                }
            });

        }
    };
    url = "../service/selectEditFitness.php?id=" + id;
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function saveEditFitness() {
    // alert("T");
    var code = $('#codeFitness').val();
    var name = $('#nameFitness').val();
    var address = $('#addressFitness').val();
    var latitude = $('#latitude').val();
    var longitude = $('#longitude').val();
    var open = $('#openFitness').val();
    var codeAdmin = $('#selectAdminFitness').val();
    var option = "";
    $('input[name="optionsBooking"]').each(function() {
        if(this.checked == true){
            option = this.value;
        }
    });
    var data = {
        code: "" + code,
        name: "" + name,
        address: "" + address,
        open: "" + open,
        codeAdmin: "" + codeAdmin,
        option:"" + option,
        latitude:"" + latitude,
        longitude:"" + longitude
    };

    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText == 1) {
                // swal('สำเร็จ',this.responseText,'success');            
                clearAddMyal();
                setDataTableFitness(1);
            } else {
                swal('คำเตือน', this.responseText, 'warning');
            }
        }
    };
    var json = JSON.stringify(data);
    url = "../service/saveEditFitness.php?json=" + json;
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function viewAddressFitness(id) {
    setTypeEquipment();
    setTypeEquipmentSearch(id)

    $('#codeFitnessAddEquipment').text(id);
    $('#addEuipmentFitness').modal('toggle');
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
