$(document).ready(function () {
    // JsBarcode("#barcode", "Hi world!");
});

function runScript(e) {
    if (e.keyCode == 13) {
        goToLogin();
        return false;
    }
}

function goToLogin() {
    var user = $('#username').val();
    var pass = $('#password').val();
    var url = "";

    if (user == "" || pass == "") {
        requireUsernamePassword();
    } else {
        var passMd5 = md5(pass);
        var data = JSON.stringify({ username: "'" + user + "'", password: "'" + passMd5 + "'" });
        console.log(data);
        $.ajax({
            type: "GET",
            url: "../service/loginService.php?data=" + data,
            success: function (result) {
                // alert(result);
                if (result.length > 0) {
                    console.log(result);
                    sessionStorage.setItem("code", result[0].code);
                    sessionStorage.setItem("name", result[0].name);
                    sessionStorage.setItem("lastname", result[0].lastname);
                    sessionStorage.setItem("type", result[0].type); 
                    if(result[0].type == 'user') {
                        sessionStorage.setItem("codeFitness", result[0].code_fitness);
                        sessionStorage.setItem("booking", result[0].booking_system);
                    }                    
                    window.location.href = "home.html";
                } else {
                    swal("แจ้งเตือน", "ชื่อบัญชีผู้ใช้หรือรหัสผ่านไม่ถูกต้อง", "warning")
                }
            }
        });
    }
}


function requireUsernamePassword() {
    var user = $('#username').val();
    var pass = $('#password').val();

    if (user == "") {
        $('#usernameRequire').show()
        $('#usernamePass').hide()
    } else {
        $('#usernameRequire').hide()
        $('#usernamePass').show()
    }

    if (pass == "") {
        $('#passwordRequire').show()
        $('#passwordPass').hide()
    } else {
        $('#passwordRequire').hide()
        $('#passwordPass').show()
    }
}
