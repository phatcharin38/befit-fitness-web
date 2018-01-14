<?php
require ("config.php");
    $data = json_decode($_GET["data"], false);
    $response = 0;
    $name = $data->name;
    $des = $data->des;
    $id = $data->id;
    
     
    $sql = "UPDATE type_equipment"
            ." SET name ='".$name."',"
            ." description = '".$des."' "
            ." WHERE id = ".$id;

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