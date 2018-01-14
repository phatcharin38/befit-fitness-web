<?php
require ("config.php");
     
     $sql = "SELECT * FROM user WHERE type = 'user'";
     $result = mysqli_query($conn,"set NAMES utf8");
     $result = mysqli_query($conn,$sql);

	 while($row = mysqli_fetch_array($result)) {       
            $response = $response."<option value ='".$row['code']."'>".$row['name']." ".$row['lastname']."</option>";      
     } 
     echo "".$response;
	 $conn->close();
?>