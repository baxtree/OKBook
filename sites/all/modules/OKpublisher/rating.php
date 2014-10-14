<?php
	$alias = $_GET['alias'];
	$host = 'localhost';
	$user = 'root';
	$pwd = '68737937';
	$dbname = 'drupaldata';
	
    mysql_connect($host, $user, $pwd) or die ('can not connect to the mysql server.');
	$db = mysql_select_db($dbname) or die('can not connect to the database.');
	$sql = 'SELECT src FROM url_alias WHERE dst="' . $alias . '"';
    $res = mysql_query($sql);
	$object = mysql_fetch_object($res);
	$temp = split('/', $object->src);
	$node_id = $temp[1];
	
	$sql2 = 'SELECT value FROM votingapi_vote WHERE content_id="' . $node_id . '"';
	$res2 = mysql_query($sql2);
	$object2 = mysql_fetch_object($res2);
	$value = $object2->value;
	
	$json = '{"nodeid":"' . $node_id . '", "rating":"' . $value .'"}';
	echo $json;
?>