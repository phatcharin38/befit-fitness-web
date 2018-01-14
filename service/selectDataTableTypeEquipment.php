<?php
require ("config.php");
    $response = 0;
    
    $start = intval($_GET['start']);
    $end = intval($_GET['end']);

    $sql = "SELECT * FROM type_equipment limit ".$start.",".$end;
    $result = mysqli_query($conn,"set NAMES utf8");
    $result = mysqli_query($conn,$sql);

    $outp = array();
    $outp = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($outp);
    $conn->close();
?>