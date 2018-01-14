<?php
require ("config.php");

    // Allow from any origin
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }

    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

        exit(0);
    }


 $response = "";
 $member = "";
if (isset($_GET["data"])) {

    $data = json_decode($_GET["data"], false);

    // $id_member = "M0003";
    $idCard = $data->idCard;
    $gender = $data->gender;
    $firtname = $data->firtname; 
    $lastname = $data->lastname;
    $birthday = $data->birthday;
    $age = $data->age;
    $address = $data->address;
    $tel = $data->tel;
    $weight = $data->weight;
    $height = $data->height;
    $disease = $data->disease;
    $email = $data->email;
    $income = $data->income;
    $pincode = $data->pincode;

     mysqli_query($conn,"set NAMES utf8");
     $sql = "SELECT * FROM member ORDER BY id DESC LIMIT 1";
     $result = mysqli_query($conn,$sql);
     while($row = mysqli_fetch_array($result)) {
           $member  = $row['id_member']; 
     }
        
        $member = sprintf("M%04d",substr($member,1)+1);
     

     $sql2 = "INSERT INTO member(id_member,idCard,gender,firtname,lastname,birthday,age,address,tel,weight,height,disease,email,income,pincode)"
            ."VALUE('".$member."','".$idCard."','".$gender."','".$firtname."','".$lastname."','".$birthday."','".$age."','".$address."','".$tel."','".$weight."','".$height."','".$disease."','".$email."','".$income."','".$pincode."')";

     $result2 = mysqli_query($conn,$sql2);

	 if($result2){
        $response = "SUCCESS";
     }else{
        $response = "ERROR";
     }

}else{
     $response = "ERROR";
}
     echo json_encode(array("result" => "".$response,"member" => "".$member));
	 $conn->close();
?>