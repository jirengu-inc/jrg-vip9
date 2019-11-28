<?php
$jungle =1;
$index = $_GET["userName"];
if($index =='hunger'){
	$jungle = 0;
}
$test = array('exist'=>$jungle);
echo json_encode($test);
?>