<?php
require ("config.php");
$response = "";
     $i = 0;
     $data = json_decode($_GET["data"], false);
     $start = $data->start;
     $end = $data->end;
     $type = $data->typeEquipment;
     $code = $data->codeFitness;
     $key = $data->keyword;

     $sql = " SELECT *"
           ." FROM ("
           ."    SELECT equipment.id as id,fitness.name_fitness as nameFitness,type_equipment.name as nameType,equipment.amount as amount"
           ."    FROM equipment,type_equipment,fitness"
           ."    WHERE type_equipment.id = equipment.type_equipment "
           ."    AND equipment.code_fitness = fitness.code_fitness";
    if($code != '0'){
      $sql .=" AND fitness.code_fitness = '".$code."'";
    }
    if($type != '0'){
      $sql .= " AND type_equipment.id = '".$type."'";
    }
      $sql .=" ) AS g"
           ." WHERE nameFitness LIKE '%".$key."%'"
           ." OR nameType LIKE '%".$key."%'"
           ." ORDER BY nameFitness ASC,nameType ASC"
           ." limit ".$start.",".$end.";";


     $result = mysqli_query($conn,"set NAMES utf8");
     $result = mysqli_query($conn,$sql);
     $outp = array();
     $outp = $result->fetch_all(MYSQLI_ASSOC);
     echo json_encode($outp);
     $conn->close();

?>