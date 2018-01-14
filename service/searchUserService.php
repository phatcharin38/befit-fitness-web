<?php
require ("config.php");
     $response = "";
     $i = 0;
     $key = $_GET['keyword'];
     $type = $_GET['type'];
     $start = intval($_GET['start']);
     $end = intval($_GET['count']);
     $gender = "";
     if($type == "''"){
        $sql = "SELECT @rownum := @rownum+1 as row,id,gender,name,lastname,tel,username,password,type,code "
        ." FROM user,(SELECT @rownum := 0) as r "
        ." WHERE name LIKE ".$key
        ." OR lastname LIKE ".$key
        ." ORDER BY id ASC "
        ." limit ".$start.",".$end;
     }else{
        $sql = "SELECT * FROM (SELECT @rownum := @rownum+1 as row,id,gender,name,lastname,tel,username,password,type,code "
        ." FROM user,(SELECT @rownum := 0) as r "
        ." WHERE type = ".$type
        ." ORDER BY id ASC ) as g "
        ." WHERE g.name LIKE ".$key
        ." OR g.lastname LIKE ".$key
        ." limit ".$start.",".$end;
     }
     
     $result = mysqli_query($conn,"set NAMES utf8");
     $result = mysqli_query($conn,$sql);
    //  $response = "<tbody>";
    if($result){
        while($row = mysqli_fetch_array($result)) {
            $i = $i + 1;
            
            if($i % 2 === 0){
                //$response = $response."<tr class='odd gradeX'><td><svg id='".$row['code']."' onload = 'genBarCode(this,\"".$row['code']."\")'></svg></td>"
                $response = $response."<tr class='odd gradeX'><td class='text-center'>".$row['code']."</td>"
                ."<td>".$row['name']." ".$row['lastname']."</td>"
                ."<td class='text-center'>".$row['tel']."</td>"
                ."<td class='text-center'>".$row['username']."</td>"
                ."<td class='text-center'><a  data-toggle='tooltip' data-placement='right' title='".$row['password']."'><img src='../images/password.png' width='40px' height='40px' /></a></td>"
                ."<td class='text-center'>".$row['type']."</td>"
                ."<td class='text-center'><button type='button' class='btn btn-warning' onclick='editUser(".$row['id'].")'>แก้ไข</button>"
                ."&nbsp;<button type='button' class='btn btn-danger' onclick='deleteUser(".$row['id'].")'>ลบ</button></td>"
                ."</tr>";
            }else{
                //$response = $response."<tr class='even gradeC'><td><svg id='".$row['code']."' onload = 'genBarCode(this,\"".$row['code']."\")'></svg></td>"
                $response = $response."<tr class='even gradeC'><td class='text-center'>".$row['code']."</td>"
                ."<td>".$row['name']." ".$row['lastname']."</td>"
                ."<td class='text-center'>".$row['tel']."</td>"
                ."<td class='text-center'>".$row['username']."</td>"
                ."<td class='text-center'><a  data-toggle='tooltip' data-placement='right' title='".$row['password']."'><img src='../images/password.png' width='40px' height='40px' /></a></td>"
                ."<td class='text-center'>".$row['type']."</td>"
                ."<td class='text-center'><button type='button' class='btn btn-warning' onclick='editUser(".$row['id'].")'>แก้ไข</button>"
                ."&nbsp;<button type='button' class='btn btn-danger' onclick='deleteUser(".$row['id'].")'>ลบ</button></td>"
                ."</tr>";
            }
        }
        
     }
    //  $response =  $response."</tbody>";
     echo "".$response;
	 $conn->close();
?>
