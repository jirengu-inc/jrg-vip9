<?php
$idx = $_GET['index'];
for ($i=0 ; $i<$_GET['len'] ; $i++) {
    $arr[] = '内容'.$idx;
    $idx++;
}
echo json_encode($arr);