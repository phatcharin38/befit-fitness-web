<?php
//server sut
$servername = "it2.sut.ac.th";
$username = "prj60_g43";
$password = "478274";
$dbname = "prj60_g43";

//server xampp
// $servername = "localhost";
// $username = "root";
// $password = "";
// $dbname = "phatcharin";

// Create connection
$conn = new mysqli($servername, $username, $password,$dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}else{
    //echo "Connected successfully";
} 
//echo "Connected successfully<br>";
header("Content-Type: application/json; charset=UTF-8");

?>





