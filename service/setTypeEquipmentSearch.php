<?php
require ("config.php");
    $codeFitness = $_GET['codeFitness'];
    $sql = "SELECT T.id,T.name FROM type_equipment T,equipment E WHERE T.id = E.type_equipment AND E.code_fitness = ".$codeFitness;
    $result = mysqli_query($conn,"set NAMES utf8");
    $result = mysqli_query($conn,$sql);
    $outp = array();
    $outp = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($outp);
    $conn->close();
?>