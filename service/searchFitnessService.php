<?php
require ("config.php");
     $response = "";
     $i = 0;
     $key = $_GET['keyword'];
     $start = intval($_GET['start']);
     $end = intval($_GET['count']);
     $sql = "SELECT @rownum := @rownum+1 as row, F.id,F.code_fitness,F.name_fitness,F.address_fitness,F.open_fitness,F.booking_system,U.name,U.lastname "
            ." FROM fitness F,user U ,(SELECT @rownum := 0) as r "
            ." WHERE U.code = F.admin_fitness "
            ." AND F.name_fitness LIKE ".$key
            ." ORDER BY F.id ASC "
            ." limit ".$start.",".$end;
     $result = mysqli_query($conn,"set NAMES utf8");
     $result = mysqli_query($conn,$sql);
     $outp = array();
	 $outp = $result->fetch_all(MYSQLI_ASSOC);
	 echo json_encode($outp);   
	 $conn->close();
?>


