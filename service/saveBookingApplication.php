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

    $data = json_decode($_GET["data"], false);
    $outp = array();
    $date = $data->date;
    $id = $data->id;
    $type = $data->type;
    $timeS = $data->timeS;
    $timeE = $data->timeE;
    $code = $data->code;
    $member = $data->member;
    $status = $data->status;

    
    $time1 = $timeS.":01";


    list($part3, $part4) = explode(':', $timeE);
    if(intval($part4) == 0){
        $time2 = sprintf("%02d:%02d:59",intval($part3)-1,59);
    }else{
        $time2 = sprintf("%02d:%02d:59",intval($part3),intval($part4)-1);
    }


    mysqli_query($conn,"set NAMES utf8");
    if($status == 'running'){
        $sql3 = "SELECT type_equipment.* from type_equipment WHERE type_equipment.name = '".$type."'";
        $result3 = mysqli_query($conn,$sql3);
        while($row3 = mysqli_fetch_array($result3)) {
            $type = $row3['id'];
        }
    }
    $sql2 = "SELECT count(*) AS count FROM ( ".
            " SELECT * ".
            "    FROM booking  ".
            "    WHERE '".$time1."' BETWEEN booking.time_start and booking.time_end  ".
            "    OR '".$time2."' BETWEEN booking.time_start and booking.time_end ".
            " ) AS g,type_equipment ".
            " WHERE type_equipment.id = g.type_equipment ".
            " AND g.booking_date = '".$date."'".
            " AND type_equipment.id = '".$type ."' ".
            " AND g.id_equipment = '".$id."' ".
            " AND g.code_fitness = '".$code."' AND g.status IN ('booking','running')";
    // echo $sql2;

    $result2 = mysqli_query($conn,$sql2);
    while($row2 = mysqli_fetch_array($result2)) {
        // echo $row2['count'];
        if($row2['count'] == 0){
            $sql = "INSERT INTO booking(id_equipment, type_equipment, booking_date, time_start, time_end, status, id_mem, code_fitness)VALUES('".$id."','".$type."','".$date."','".$timeS."','".$timeE."','".$status."','".$member."','".$code."')";

                $result = mysqli_query($conn,"set NAMES utf8");
                $result = mysqli_query($conn,$sql);
                
                if($result){
                    $last_id = mysqli_insert_id($conn);
                    array_push($outp,['result' =>  'SUCCESS','id' => $last_id]);
                }else{
                    array_push($outp,['result' =>  'ERROR']);
                }
                
            }else{
                array_push($outp,['result' =>  'TIME']);
            }
    }

    
    echo json_encode($outp);
    $conn->close();


?>