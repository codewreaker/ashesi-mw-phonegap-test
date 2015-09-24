<?php

include_once("adb.php");

class reading extends adb{
    function add_reading($reading, $val){
        $str_query="insert into meter_readings set meter_name='$reading',
        meter_reading='$val'";
        return $this->query($str_query);
    }

    function fetch_readings(){
        $str_query="select * FROM meter_readings";
        return $this->query($str_query);
    }
}

$obj = new reading();
$opt = $_REQUEST['opt'];

if($opt==1){
    $a = $_REQUEST['meter'];
    $b = $_REQUEST['meterReading'];

    if(!$obj->add_reading($a,$b)){
    echo '{"result":0,"message":"Failed"}';
}else{
    echo '{"result":1,"message":"Success"}';
}
}else if($opt==2){
    $obj->fetch_readings();
    $row=$obj->fetch();
    echo '{"result":1,"data":[';	/*start of json object*/
    while($row){
    echo json_encode($row);/*convert the result array to json object*/
    $row=$obj->fetch();
    if($row){ echo ",";	/*if there are more rows, add comma*/
            }
	   }
    echo "]}";
}

?>
