<?php
require ("config.php");
    $data = json_decode($_GET["json"], false);
    $response = 0;
    $code = $data->code;
    $name = $data->name;
    $address = $data->address; 
    $open = $data->open;
    $codeAdmin = $data->codeAdmin;
    $option = $data->option;
    $latitude = $data->latitude;
    $longitude = $data->longitude;
     
     $sql = "UPDATE fitness "
            ."SET name_fitness = '".$name."' ,"
            ."address_fitness = '".$address."' ,"
            ."latitude = '".$latitude."' ,"
            ."longitude = '".$longitude."' ,"
            ."open_fitness = '".$open."' ,"
            ."admin_fitness = '".$codeAdmin."', "
            ."booking_system = '".$option."' "
            ."WHERE code_fitness = '".$code."'";

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