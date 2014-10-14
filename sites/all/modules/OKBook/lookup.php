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
	
	$sql1 = 'SELECT body FROM node_revisions WHERE nid="' . $node_id . '"';
	$res1 = mysql_query($sql1);
	$object1 = mysql_fetch_object($res1);
	$body = $object1->body;
	
	$json = '{"nodeid":"' . $node_id . '", "body":"' . urlencode($body) .'"}';
	echo $json;
?>