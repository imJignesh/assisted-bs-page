<?php
// log all the requests POST Data in a log file
$logFile = dirname(__FILE__) . '/data.txt';
// $requestData = file_get_contents('php://input');
$requestData = file_get_contents('php://input');
//pretify json
$requestData = json_encode(json_decode($requestData), JSON_PRETTY_PRINT);
file_put_contents($logFile, $requestData);
// log all the requests GET Data in a log file
