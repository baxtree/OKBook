<?php
    function doPing($title, $URI){
		$title = $_GET['title'];
		$URI = urldecode($_GET['url']);
		$client = new xmlrpc_client(" http://sindice.com/xmlrpc/api");
		$payload = new xmlrpcmsg("weblogUpdates.ping");
	   
		$payload->addParam(new xmlrpcval($title));
		$payload->addParam(new xmlrpcval($URI));
	   
		$client->setDebug(2);
	   
		$response = $client->send($payload);
		$xmlresponsestr = $response->serialize();
	   
		$xml = simplexml_load_string($xmlresponsestr);
		$result = $xml->xpath("//value/boolean/text()");
		 if($result) {
			if($result[0] == "0"){
				echo "<p>Submitting $URI to $servicetitle succeeded.</p>";
				return;
			}
		}
		else {
			$err = "Error Code: " 
			.$response->faultCode() 
			."<br /> Error Message: " 
			.$response->faultString();
			echo "<p>Failed to submit $URI to $servicetitle.</p>";
		}
	}
	$sql = 'SELECT im_id FROM im_subscription';
    $res = db_query($sql);
    while($object = db_fetch_object($res)){
        $node = node_load($object->im_id);
        $title = $node->title;
        $url = 'http://localhost:10081/drupal/' . drupal_get_path_alias('node/' . $node->nid);
        doPing($title, $url);
    }
	echo 'Ping finished.';
?>