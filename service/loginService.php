<?php
require ("config.php");
	$data = json_decode($_GET["data"], false);
	$username = $data->username;
	$password = $data->password;

	$sql = "SELECT user.* FROM user WHERE username = ".$username." AND password = ".$password;

	$result = mysqli_query($conn,"set NAMES utf8");
	$result = mysqli_query($conn,$sql);

	 while($row = mysqli_fetch_array($result)) {
        if($row['type'] == 'user'){
			$sql2 = "SELECT user.*,fitness.* FROM user ,fitness WHERE user.username = ".$username." AND user.password = ".$password." AND fitness.admin_fitness = user.code";
		}else{
			$sql2 = "SELECT user.* FROM user WHERE username = ".$username." AND password = ".$password;
		}
     }

	 $result2 = mysqli_query($conn,$sql2);
	
	$outp = array();
	$outp = $result2->fetch_all(MYSQLI_ASSOC);
	echo json_encode($outp);
	$conn->close(); 
?>