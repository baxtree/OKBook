<?php
	$uid = $_GET['uid'];
	$nid = $_GET['nid'];
	$role_uri = urldecode($_GET['role_uri']);
	$host = 'localhost';
	$user = 'root';
	$psw = '68737937'; //people can hack this pass word. how to prevent this hacking?
	$dbname = 'drupaldata';
	mysql_connect($host, $user, $psw) or die('can not connect to the mysql server.');
	$db = mysql_select_db($dbname) or die('can not connect to the database.');
	//$res = mysql_query('SELECT * FROM node');
	//while($obj = mysql_fetch_object($res)){
	//	echo "$obj->nid<br/>";
	//}
	$check_subscription = 'SELECT im_id FROM im_subscription WHERE peer_id = "' . $uid . '" AND role_uri = "' . $role_uri . '"';
	$res = mysql_query($check_subscription);
	$subscribed = false;
	while($obj = mysql_fetch_object($res)){
		if($obj->im_id == $nid){
			$subscribed = true;
			break;
		}
	}
	if($subscribed){
		$sql = 'DELETE FROM im_subscription WHERE peer_id = "' . $uid . '" AND im_id = "' . $nid . '" AND role_uri = "' . $role_uri . '"';
		mysql_query($sql);
		//echo 'You successfully unsubscribed to this IM.';
		echo 'deleted';
	}
	else{
		//echo 'You cannot unsubscribe to this IM.';
		echo 'not_deleted';
	}
?>