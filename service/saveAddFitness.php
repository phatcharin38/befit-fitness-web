<?php
require ("config.php");
    $response = 0;
    $code = "";
    $string = "";
    $name = $_GET['name'];
    $address = $_GET['address'];
    $open = $_GET['open'];
    $codeAdmin = $_GET['codeAdmin'];
    $option = $_GET['option'];
    $latitude = $_GET['latitude'];
    $longitude = $_GET['longitude'];

     $sql2 = "SELECT code_fitness FROM fitness ORDER BY id DESC LIMIT 1";
     $result2 = mysqli_query($conn,"set NAMES utf8");
     $result2 = mysqli_query($conn,$sql2);
     while($row2 = mysqli_fetch_array($result2)) {
        $string = $row2['code_fitness'];
     }
     $code = sprintf("'fitness%04d'",substr($string,7)+1);



     
     $sql = "INSERT INTO fitness(code_fitness,name_fitness,address_fitness,open_fitness,admin_fitness,booking_system,latitude,longitude)"
            ."VALUES(".$code.",".$name.",".$address.",".$open.",".$codeAdmin.",".$option.",".$latitude.",".$longitude.")";
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