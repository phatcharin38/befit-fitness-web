<?php
require ("config.php");
if($_SERVER['REQUEST_METHOD'] == "POST"){
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $response = 0;
    $name = $request->name;
    $des = $request->des;
    $image = $request->image;
    
    // $sql = "INSERT INTO type_equipment(name,description,image)VALUES('".$name."','".$des."')";
    $sql = "INSERT INTO type_equipment(name,description,image)VALUES('".$name."','".$des."','".$image."')";

    $result = mysqli_query($conn,"set NAMES utf8");
    $result = mysqli_query($conn,$sql);

	if($result){
        $response =  1;
    }else{
        $response = 2;
    }
    echo "".$response;
    $conn->close();
}
?>