<?php
require ("config.php");
    $response = 0;
    $id = $_GET['id'];

    $sql = "SELECT * FROM type_equipment WHERE id = ".$id;
    $result = mysqli_query($conn,"set NAMES utf8");
    $result = mysqli_query($conn,$sql);
   
    $outp = array();
    $outp = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($outp);
    $conn->close();
?>