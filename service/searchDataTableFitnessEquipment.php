<?php
require ("config.php");
$response = "";
     $i = 0;
     $data = json_decode($_GET["data"], false);
     $start = $data->start;
     $end = $data->end;
     $type = $data->type;
     $code_fitness = $data->code_fitness;
     $sql = "SELECT @rownum := @rownum+1 as row,T.name,E.amount,E.id"
            ." FROM type_equipment T,equipment E,(SELECT @rownum := 0) as r  "
            ." WHERE T.id = E.type_equipment AND E.code_fitness = ".$code_fitness;
            if($type > 0){
                $sql .= " AND E.type_equipment = ".$type;
            }     
     $sql .= " ORDER BY E.id ASC "
            ." limit ".$start.",".$end;
     $result = mysqli_query($conn,"set NAMES utf8");
     $result = mysqli_query($conn,$sql);
     $outp = array();
     $outp = $result->fetch_all(MYSQLI_ASSOC);
     echo json_encode($outp);
     $conn->close();

?>