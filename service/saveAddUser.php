<?php
require ("config.php");

    $response = 0;
    $code = "";
    $string = "";
    $type = $_GET['type'];
    $type2 = "";
    $gender = $_GET['gender'];
    $name = $_GET['name'];
    $lastname = $_GET['lastname'];
    $tel = $_GET['tel'];
    $username = $_GET['username'];
    $password = $_GET['password'];
    $username2 = ""; 

     $sql2 = "SELECT code FROM user ORDER BY id DESC LIMIT 1";
     $result2 = mysqli_query($conn,"set NAMES utf8");
     $result2 = mysqli_query($conn,$sql2);
     while($row2 = mysqli_fetch_array($result2)) {
        $string = $row2['code'];
     }

     if($type == "'user'"){
        $code = sprintf("u%04d",substr($string,2)+1);
     }else if($type == "'admin'"){
        $code = sprintf("a%04d",substr($string,2)+1);
     }else if($type == "'superadmin'"){
        $code = sprintf("s%04d",substr($string,2)+1);
     }

     $username2 = sprintf("'%s_%s'",$code,$username);
   
     $sql = "INSERT INTO user(code,gender,name,lastname,tel,username,password,type)"
            ."VALUES('".$code."',".$gender.",".$name.",".$lastname.",".$tel.",".$username2.",".$password.",".$type.")";
     $result = mysqli_query($conn,"set NAMES utf8");
     $result = mysqli_query($conn,$sql);

	 if($result){
        $response =  1;
     }else{
        $response = 2;
     }
     echo $sql;
	 $conn->close();
?>