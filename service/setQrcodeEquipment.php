<?php
require ("config.php");
    $response = 0;
    $id = $_GET['id'];

    $sql = "SELECT equipment.*,type_equipment.* FROM equipment,type_equipment WHERE equipment.id = ".$id." AND type_equipment.id = equipment.type_equipment";
    $result = mysqli_query($conn,"set NAMES utf8");
    $result = mysqli_query($conn,$sql);
   
    $outp = array();
    $outp = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($outp);
    $conn->close();
?>