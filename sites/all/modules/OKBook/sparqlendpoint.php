<?php
    include_once('arc/ARC2.php');
    /* ARC2 static class inclusion */ 
    //$rdf_api_path = drupal_get_path('module', 'rdf');
    //echo $rdf_api_path;
    //$arc_api_path = $rdf_api_path . '/vendor/arc/ARC2.php';
    //echo $arc_api_path;

    /* MySQL and endpoint configuration */ 
    $config = array(
        /* db */
        'db_host' => '127.0.0.1', /* optional, default is localhost */
        'db_name' => 'rdftriplestore',
        'db_user' => 'root',
        'db_pwd' => '68737937',

        /* store name */
        'store_name' => 'triple_store',

        /* endpoint */
        'endpoint_features' => array(
            'select', 'construct', 'ask', 'describe', 
            'load', 'insert', 'delete', 
            'dump' /* dump is a special command for streaming SPOG export */
        ),
        'endpoint_timeout' => 60, /* not implemented in ARC2 preview */
        'endpoint_read_key' => '', /* optional */
        'endpoint_write_key' => 'somekey', /* optional */
        'endpoint_max_limit' => 250, /* optional */
        );

    /* instantiation */
    $ep = ARC2::getStoreEndpoint($config);

    if (!$ep->isSetUp()) {
        $ep->setUp(); /* create MySQL tables */
    }

    /* request handling */
    $ep->go();

?>

