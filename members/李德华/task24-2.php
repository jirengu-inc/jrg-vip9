<?php
  header('content-type: ');
  $page = $_GET["pageNo"];
  // $result = array();
  $result = array('1' => 'lidehua', '2' => 'li');
  // for ($i= 0; $i < 6; $i++) {
  //   $string = '内容'.strval(($page - 2) * 6 + 3 + $i);
  //   $result[] = $string;
  // }
  echo json_encode($result);
?>
