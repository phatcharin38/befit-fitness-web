<?php
require ("config.php");
     $response = "";
     $code = $_GET['codeFitness'];
     $type = $_GET['type'];
     if($type == 0){
        $sql = "SELECT count(id) as count"
        ." FROM equipment"
        ." WHERE code_fitness LIKE ".$code;
     }else{
        $sql = "SELECT count(id) as count"
        ." WHERE type_equipment LIKE ".$type
        ." AND code_fitness LIKE ".$code;
     }
     
     $result = mysqli_query($conn,"set NAMES utf8");
     $result = mysqli_query($conn,$sql);
	 while($row = mysqli_fetch_array($result)) {
        $response = $row['count'];
     }
     echo "".$response;
	 $conn->close();
?>