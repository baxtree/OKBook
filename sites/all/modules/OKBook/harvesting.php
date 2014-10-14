<?php

    /* ARC2 static class inclusion */ 
    include_once('arc/ARC2.php');

    /* configuration */ 
    $config = array(
      /* db */
      'db_host' => '127.0.0.1', /* optional, default is localhost */
      'db_name' => 'rdftriplestore',
      'db_user' => 'root',
      'db_pwd' => '68737937',

      /* store name (= table prefix) */
      'store_name' => 'triple_store',
    );
    $store = ARC2::getStore($config);
    if (!$store->isSetUp()) {
        $store->setUp();
    }

    /* instantiation */
    $store = ARC2::getStore($config); 
    
	$host = 'localhost';
	$user = 'root';
	$pwd = '68737937';
	$dbname = 'drupaldata';
	
	mysql_connect($host, $user, $pwd) or die ('cannot connect to my sql server');
	$db = mysql_select_db($dbname) or die ('cannot connect to database ' . $dbname);
	$sql = 'SELECT node.nid, node_revisions.body FROM node, node_revisions WHERE node.type="interaction_model" AND node.nid = node_revisions.nid';
	$res = mysql_query($sql);
	while($object = mysql_fetch_object($res)){
        $url = 'http://localhost:10081/drupal/?q=node/' . $object->nid;
        //$store->query('LOAD <' . $url . '>');
		$im_string = $object->body;
		//echo $im_string;
		$parser = ARC2::getRDFParser();
		$parser->parse($url, $im_string);
		$triples = $parser->getTriples();
		for ($i = 0, $i_max = count($triples); $i < $i_max; $i++) 
		{
			$triple = $triples[$i];
			echo $triple[p]; //error
			$store->query('INSERT INTO <' . $url . '> {' . '$triple[s] ' . '$triple[p] ' . '$triple[o]}');
		}
    }
    //echo 'harvesting finished';
?>