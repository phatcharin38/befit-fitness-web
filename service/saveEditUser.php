<?php
require ("config.php");
    $data = json_decode($_GET["json"], false);
    $response = 0;
    $code = $data->code;
    $gender = $data->gender;
    $name = $data->name;
    $lastname = $data->lastname;
    $tel = $data->tel;
    $username = $data->username;
    $password = $data->password;
    $type = $data->type;
     
     $sql = "UPDATE user "
            ."SET gender = '".$gender."' ,"
            ."name = '".$name."' ,"
            ."lastname = '".$lastname."' ,"
            ."tel = '".$tel."' ,"
            ."username = '".$username."' ,"
            ."password = '".$password."' ,"
            ."type = '".$type."' "
            ."WHERE code = '".$code."'";

     $result = mysqli_query($conn,"set NAMES utf8");
     $result = mysqli_query($conn,$sql);

	 if($result){
        $response =  1;
     }else{
        $response = 2;
     }
     echo "".$response;
	 $conn->close();
?>