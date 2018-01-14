<?php
require ("config.php");
    $response = 0;
    $id = $_GET['id'];

    $sql = "DELETE FROM equipment WHERE id = ".$id;
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