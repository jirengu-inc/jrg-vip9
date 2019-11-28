
<?php
	header('content-type:text/json;charset="utf-8"');

 	error_reporting(0);
	$nowNum = $_GET['start'];
	$liContent = array();
	for ($i=0; $i < 20; $i++) { 
		array_push($liContent, "内容".($nowNum + $i + 1));
	}

	$arr = array('data'=>$liContent);
	$json = json_encode($arr);
	echo $json;
	
?>