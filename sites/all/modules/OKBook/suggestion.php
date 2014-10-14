<?php
	$keywords = $_GET['key'];
	$host = 'localhost';
	$user = 'root';
	$pwd = '123456';
	$dbname = 'drupaldata';
	
	mysql_connect($host, $user, $pwd) or die ('cannot connect to my sql server');
	$db = mysql_select_db($dbname) or die ('cannot connect to database ' . $dbname);
	$sql = 'SELECT obj FROM disambiguates WHERE sub="' . $keywords . '"';
	$res = mysql_query($sql);
	$suggestions = '';
	while($object = mysql_fetch_object($res)){
		$suggestions .= $object->obj . ',';
	}
	echo $suggestions;
?>