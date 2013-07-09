<?php
$file = '../depot/desktop.xml';


function ajouterElement($desktop,$data){    
    $element = $desktop->addChild('element');
    
    $element->addAttribute('id', $_POST['id']);
    $element->addChild('type',  $data['type']);
    $element->addChild('name',  $data['name']);
    $element->addChild('position',  $data['position']);
    $element->addChild('datemodif',  $data['datemodif']);
}

function modifierElement($desktop,$data){
    foreach ($desktop->element as $element) {
        if($element['id']==$_POST['id']){
            if(isset($data['name']))
                $element->name=$data['name'];
            if(isset($data['position']))
                $element->position=$data['position'];
            if(isset($data['datemodif']))
                $element->datemodif=$data['datemodif'];
            break;
        }
    }
}

function supprimerElement($desktop){
    foreach ($desktop->element as $element) {
        if($element['id']==$_POST['id']) {
            unset($element[0]);
            break;
        }
    }
}

if(file_exists($file)) {
    $desktop = simplexml_load_file($file);
    
    switch ($_POST['typeSave']) {
        case 'ajout':
            ajouterElement($desktop,$_POST['data']);
        break;
        case 'modif':
            modifierElement($desktop,$_POST['data']);
        break;
        case 'suppr':
            supprimerElement($desktop);
        break;
    }
    $desktop->saveXML($file);
}
else{
    exit('Echec lors de l\'ouverture du fichier.');
}
?>