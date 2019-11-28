<?php
	$user=$_GET["username"];
	if($user=='sfyr111'){
		$status=1;
	}else{
		$status=0;
	}
	echo json_encode($status);
?>