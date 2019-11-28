<?php
	header("Content-type: text/json; charset=utf-8");//指定json格式
    	//header('content-type:text/html;charset="utf-8"');
	$pageStart=$_GET["pageStart"];
	$len=$_GET["len"];
	$newLis=array();
	for($i=0; $i<$len; $i++){
		array_push($newLis,"内容".($pageStart+$i+1));
	}
	echo json_encode($newLis);
 ?>