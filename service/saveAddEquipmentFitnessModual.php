<?php
require ("config.php");
    $response = 0;
    $data = json_decode($_GET["data"], false);
    $code = $data->code;
    $type = $data->type;
    $amount = $data->amount;
    $count = 0;
    mysqli_query($conn,"set NAMES utf8");
    $sql = "";

    // $sql2 = "SELECT count(*) as count,equipment.*  FROM equipment WHERE code_fitness='".$code."' AND type_equipment=".$type;
    // $result = mysqli_query($conn,$sql2);
    
    // while($row = mysqli_fetch_array($result)) {
    //     $count = $row['count'];
    //     if($count == 1){
            $sql = "INSERT INTO equipment(code_fitness,amount,type_equipment)VALUES('".$code."',".$amount.",".$type.")";
    //     }else{
    //         $sql = "UPDATE equipment SET amount = ".$amount." WHERE code_fitness='".$code."' AND type_equipment=".$type;
    //     }
    // }
    
    $result2 = mysqli_query($conn,$sql);

	if($result2){
        $response =  1;
    }else{
        $response = 2;
    }
    echo  "".$response;
	$conn->close();
?>