<?php
require ("config.php");
     $response = "";
  
     $sql = "SELECT count(id) as count FROM type_equipment";   
         
     $result = mysqli_query($conn,"set NAMES utf8");
     $result = mysqli_query($conn,$sql);
	 while($row = mysqli_fetch_array($result)) {
        $response = $row['count'];
     }
     echo "".$response;
	 $conn->close();
?>