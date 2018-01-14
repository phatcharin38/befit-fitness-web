<?php
require ("config.php");
     $response = "";
     $key = $_GET['keyword'];
     $sql = "SELECT count(F.id) as count"
     ." FROM fitness F"
     ." WHERE F.name_fitness LIKE ".$key;
     $result = mysqli_query($conn,"set NAMES utf8");
     $result = mysqli_query($conn,$sql);
	 while($row = mysqli_fetch_array($result)) {
        $response = $row['count'];
     }
     echo "".$response;
	 $conn->close();
?>
