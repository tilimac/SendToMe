<?php
$file = 'depot/desktop.xml';
if(file_exists($file)) {
    $xml = simplexml_load_file($file);
    
    $listeElements = array();
    foreach ($xml->element as $element) {
        $listeElements["$element->position"] = array(
            "id" => $element['id'],
            "type" => $element->type,
            "name" => $element->name,
            "datemodif" => $element->datemodif);
    }
}
else{
    exit('Echec lors de l\'ouverture du fichier.');
}
?>
