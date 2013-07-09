<?php


//$extensions_valides = array( 'jpg' , 'jpeg' , 'gif' , 'png' );
//1. strrchr renvoie l'extension avec le point (« . »).
//2. substr(chaine,1) ignore le premier caractère de chaine.
//3. strtolower met l'extension en minuscules.
$extension_upload = strtolower(  substr(  strrchr($_FILES['mon_fichier']['name'], '.')  ,1)  );
//if ( in_array($extension_upload,$extensions_valides) ) echo "Extension correcte";

/*$image_sizes = getimagesize($_FILES['icone']['tmp_name']);
if ($image_sizes[0] > $maxwidth OR $image_sizes[1] > $maxheight) $erreur = "Image trop grande";*/

//Créer un identifiant difficile à deviner
$id_membre = md5(uniqid(rand(), true));
  
$nom = "{$id_membre}.{$extension_upload}";
$resultat = move_uploaded_file($_FILES['mon_fichier']['tmp_name'],$nom);
if ($resultat) echo "Transfert réussi";
?>