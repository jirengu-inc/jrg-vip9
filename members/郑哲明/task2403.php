<?php
$arr = array('hunger'=>'jirengu123');
foreach($arr as $x=>$x_value) {
    if ($x === $_GET['username']) {
        $json['status'] = 0;//0即用户名不可用
        break;
    } else {
        $json['status'] = 1; //1即用户名可用
    }
}
echo json_encode($json);
