$(document).ready(function () {
    setMenu();
    setDataTableUser(1);
});


function setDataTableUser(start) {
    var keyword = $('#keywordUser').val();
    var type = $('#typeUserSelect').val();
    // alert(type);
    var end = 7;
    if (keyword == undefined) {
        keyword = "";
    }
    if (type == undefined) {
        type = "";
    }
    if (start != 1) {
        start = (((start - 1) * 7) + 1) - 1;
    } else {
        start = start - 1;
    }
    console.log(start + " : " + end);
    getDataTableUser(start, end, keyword,type);
    setCountPaggingDataTableUser(keyword,type)
}


function setCountPaggingDataTableUser(keyword,type) {
    // alert(type);
    $.ajax({
        url: "../service/setCountPaggingDataTableUser.php?keyword='%" + keyword + "%'&type='"+type+"'",
        method: "GET",
        success: function (data) {
            // console.log(data);
            setPaggingDataTableUser(data);
            //  $('#result').html(data);
        }
    });

}

function setPaggingDataTableUser(count) {
    // alert(count);
    $('#paggingUser').empty();
    var total = Math.ceil(count / 7);
    var code = '<div class="col-lg-12">';
    for (i = 1; i <= total; i++) {
        code = code + '&nbsp;<button type="button" class="btn padding-btn" onclick="setDataTableUser(' + i + ');">' + i + '</button>';
    }
    code = code + "</div>"
    $('#paggingUser').html(code);
}

function getDataTableUser(start, count, keyword,type) {
  
    // alert(type);
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
            // alert(this.responseText);
            $('#dataTablesUserBody').html(this.responseText);
        }
    };
    url = "../service/searchUserService.php?keyword='%" + keyword + "%'&start=" + start + "&count=" + count + "&type='" + type + "'";

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function setSelectAdminUser() {
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

function addUser() {
    $('#saveAddUser').show();
    $('#addUser').modal('toggle');
    $('#addUserModalLabel').show();
    $('#typeUserAdd').attr("disabled", false);
}

function clearAddMyalUser() {
    $('#addUser').modal('hide');
    $('#saveAddUser').hide();
    $('#saveEditUser').hide();
    $('#rowCodeUser').hide();
    $('#codeUser').val("");
    $('#genderUserAdd').selectedIndex = "1";
    $('#nameUser').val("");
    $('#lastnameUser').val("");
    $('#telUser').val("");
    $('#username').val("");
    $('#password').val("");
    $('#typeUserAdd').selectedIndex = "1";
    $('#addUserModalLabel').hide();
    $('#editUserModalLabel').hide();

}



function saveAddUser() {
    var type = $('#typeUserAdd').val();
    var gender = $('#genderUserAdd').val();
    var name = $('#nameUser').val();
    var lastname = $('#lastnameUser').val();
    var tel = $('#telUser').val();
    var username = $('#username').val();
    var password = md5($('#password').val());
 
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            clearAddMyalUser();
            setDataTableUser(1);
        }
    };
    url = "../service/saveAddUser.php?type='" + type + "'&gender='" + gender + 
        "'&name='" + name + "'&lastname='" + lastname + "'&tel='" + tel + 
        "'&username=" + username + "&password='" + password + "'";
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

}

function deleteUser(id) {
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
                setDataTableUser(1);
            } else {
                swal('คำเตือน', this.responseText, 'warning');
            }
        }
    };

    url = "../service/deleteUser.php?id=" + id;
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function editUser(id) {
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
            $('#rowCodeUser').show();
            $('#saveEditUser').show();
            $('#editUserModalLabel').show();
            $('#addUser').modal('toggle');
            $('#codeUser').val(data[0].code);
            $('#genderUserAdd').val(data[0].gender);
            $('#nameUser').val(data[0].name);
            $('#lastnameUser').val(data[0].lastname);
            $('#telUser').val(data[0].tel);
            $('#username').val(data[0].username);
            $('#password').val(data[0].password);
            $('#typeUserAdd').val(data[0].type);
            $('#typeUserAdd').attr("disabled", true);
        }
    };
    url = "../service/selectEditUser.php?id=" + id;
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function saveEditUser() {
    // alert("T");
    var code = $('#codeUser').val();
    var gender = $('#genderUserAdd').val();
    var name = $('#nameUser').val();
    var lastname = $('#lastnameUser').val();
    var tel = $('#telUser').val();
    var username = $('#username').val();
    var password = md5($('#password').val());
    var type = $('#typeUserAdd').val();

    var data = {
        code: "" + code,
        gender: "" + gender,
        name: "" + name,
        lastname: "" + lastname,
        tel: "" + tel,
        username: "" + username,
        password: "" + password,
        type: "" + type
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
                clearAddMyalUser();
                setDataTableUser(1);
            } else {
                swal('คำเตือน', this.responseText, 'warning');
            }
        }
    };
    var json = JSON.stringify(data);
    url = "../service/saveEditUser.php?json=" + json;
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}