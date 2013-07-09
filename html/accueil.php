<div class="barreNavig"></div>
<div class="desktop">
    <table class="grille">
        <?php
        //var_dump($listeElements);
        for ($i=0; $i < 5; $i++) { 
            echo '<tr class="rowDesktop">';
            for ($j=0; $j < 10; $j++) { 
                echo '<td id="'.$i.'_'.$j.'" class="cellDesktop">';
                if(isset($listeElements[$i.'_'.$j])){
                    echo '<div class="elementDesktop '.$listeElements[$i.'_'.$j]['type'].'" data-id="'.$listeElements[$i.'_'.$j]['id'].'"><span><p>'.$listeElements[$i.'_'.$j]['name'].'<p></span></div>';
                }
                echo '</td>';
            }
            echo '</tr>';
        }?>
    </table>
</div>


<div id="contentFolder" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h4><b>Dossier >></b> <span class="labelFolder"></span></h4>
    </div>
    <div class="modal-body">
        <div class="menu">
            <div class="content-menu">aze</div>
        </div>
        <div class="content">
            <div class="row-fluid" style="height:10%;">
                <span class="btn btn-success fileinput-button">
                    <i class="icon-plus icon-white"></i>
                    <span>Select files...</span>
                    <input id="fileupload" type="file" name="files[]" multiple>
                </span>
            </div>
            <div class="row-fluid" style="overflow-y: auto;height:90%;">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th class="span1">#</th>
                            <th class="span10">Nom</th>
                            <th class="span1">Extenssion</th>
                        </tr>
                    </thead>
                    <tbody id="files">
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <button class="btn" data-dismiss="modal" aria-hidden="true">Fermer</button>
        <!--<button class="btn btn-primary">Enregistrer</button>-->
    </div>
</div>

<div id="progressUpload" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h4>Progression du téléchargement</h4>
    </div>
    <div class="modal-body">
        <div id="progress" class="progress progress-striped active">
            <div class="bar"></div>
        </div>
    </div>
    <div class="modal-footer">
        <button class="btn" data-dismiss="modal" aria-hidden="true">Fermer</button>
        <!--<button class="btn btn-primary">Enregistrer</button>-->
    </div>
</div>