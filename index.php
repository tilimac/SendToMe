<?php
$pagesValide = array("accueil");
$page=$_GET['page'];
if(in_array($page, $pagesValide)){
    require_once('php/'.$page.'.php');
    require_once('include/debut.php');
    require_once('html/'.$page.'.php');
    require_once('include/fin.php');
}


?>