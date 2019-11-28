
<?php
$arr = array();
for ($i = $_GET['start'] ; $i < $_GET['len'] ; $i++) {
    array_push($arr, '内容'.$i);
}
// echo json_encode($arr);
$ret = array("status"=>1, "data"=>$arr);
echo json_encode($ret);
?>