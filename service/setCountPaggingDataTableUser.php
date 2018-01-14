<?php
require ("config.php");
     $response = "";
     $key = $_GET['keyword'];
     $type = $_GET['type'];
     if($type == "''"){
        $sql = "SELECT count(id) as count"
        ." FROM user"
        ." WHERE name LIKE ".$key
        ." AND lastname LIKE ".$key;
     }else{
        $sql = "SELECT count(g.id) as count FROM (SELECT *  FROM user WHERE type = ".$type.") as g"
        ." WHERE g.name LIKE ".$key
        ." AND g.lastname LIKE ".$key;
     }
     
     $result = mysqli_query($conn,"set NAMES utf8");
     $result = mysqli_query($conn,$sql);
	 while($row = mysqli_fetch_array($result)) {
        $response = $row['count'];
     }
     echo "".$response;
	 $conn->close();
?>