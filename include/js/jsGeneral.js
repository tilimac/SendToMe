$(function(){
    
    'use strict';
    // Change this to the location of your server-side upload handler:
    $('#fileupload').fileupload({
        url: 'depot/files/index.php?folder=default',
        dataType: 'json',
        done: function (e, data) {
            $.each(data.result.files, function (index, file) {
                $('#files').append('<tr><td>...</td><td>'+file.name+'</td><td>.zip</td></tr>');
            });
        },
        progressall: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $('#progress .bar').css(
                'width',
                progress + '%'
            );
        },
        stop: function() {
            setTimeout(function() {
                $("#progressUpload").modal('hide');
            }, 1000);
        },
        start: function() {
            $("#progressUpload").modal('show');
            $('#progress .bar').css('width','0%');
        }
    }).prop('disabled', !$.support.fileInput)
        .parent().addClass($.support.fileInput ? undefined : 'disabled');
    
    
    
    
    function removeElemSeleted(){
        $.each($('.ui-selected'), function( key, value ) {
            $(value).parent().save({suppr:true});
        });
        $('.ui-selected').remove();
    }
    
    function openElemSeleted(){
        var elemSeleted = $('.ui-selected');
        if(elemSeleted.length==1)
            elemSeleted.openElem();
    }
    
    $.fn.openElem = function(){
        //vérifi si il ne s'agit pas de la validation de l'édition
        if($('span form',this).length==0){
            var label = $('span p',this).html();
            $('#contentFolder .labelFolder').html(label);
            $('#contentFolder').modal('show');
            this.cancelEditLabel();
            
            
            $("#fileupload").fileupload("option", "url", 'depot/files/index.php?folder='+$(this).data('id'));
        }
    }
    
    $.fn.renameElem = function() {
        var cellParent = $(this).parent();
        var label = $('span',this);
        var textlabel = $('span p',this);
        var name = textlabel.html();
        textlabel.hide();
        label.append('<form style="margin:0"><input type="text" style="width:120px;margin:0" value="'+name+'"/></form>');
        $('input',this).select();
        this.data('time',0);
        $('form',this).submit(function(){
            label.html('<p>'+$('input',this).val()+'</p>');
            cellParent.save({modif:['name']});
            return false;
        });
        
        return this;
    };
    
    $.fn.cancelEditLabel = function() {
        $('span p',this).show();
        $('form',this).remove();
        this.data('time',0);
        
        return this;
    };
    
    $.fn.instanceElementDesktop = function() {
        $(".elementDesktop", this).draggable({
            start: function(event, ui){
                ui.helper.css({cursor:'move'});
                ui.helper.cancelEditLabel();
            },
            stop: function(event, ui){
                ui.helper.css({cursor:'pointer'});
            },
            distance: 10
        });
        $(".elementDesktop", this).data('time',0);
        
        return this;
    };
    
    $.fn.save = function(params) {
        var current = $(this);
        var element = $(".elementDesktop",this);
        var id = element.data('id');
        
        var data, typeSave;
        
        if(typeof params.ajout !== 'undefined'){
            typeSave='ajout';
            data = {
                type:params.ajout,
                name:$('span p',element).html(),
                position:$(this).attr('id'),
                datemodif:$.now()
            };
        }
        
        if(typeof params.modif !== 'undefined'){
            typeSave='modif';
            
            $.each(params.modif, function(i, n){
                switch(n) {
                    case 'position':
                        data = $.extend({position: current.attr('id')}, data);
                    break;
                    case 'name':
                        data = $.extend({name: $('span p',element).html()}, data);
                    break;
                }
            });
        }
        if(typeof params.suppr !== 'undefined'){
            typeSave='suppr';
        }
        
        $.ajax({
            type: "POST",
            url: 'module/saveDesktop.php',
            data: {typeSave:typeSave,id:id,data:data}
        });
        
        return this;
    };
    
    /***** Dectecteur touche pressé *****/
    $(document).keydown(function(e) {
        if(e.keyCode == 46){ //touche SUPPR
            removeElemSeleted();
        }
        else if(e.keyCode == 13){ //touche ENTER
            openElemSeleted();
        }
    });
    
    
    
    
    
    /***** DEBUT SCRIPT *****/
    $(document).instanceElementDesktop();
    
    $.contextMenu({
        selector: '.cellDesktop', 
        callback: function(key, options) {
            switch(key) {
                case 'folder':
                    $(this).html('<div class="elementDesktop folder"><span><p>Nouveau dossier</p></span></div>');
                    $(this).instanceElementDesktop();
                    var element = $(".elementDesktop", this)
                    element.data('id',$.now());
                    element.renameElem();
                    $(".elementDesktop").removeClass('ui-selected');
                    element.addClass('ui-selected');
                    
                    $(this).save({ajout:'folder'});
                break;
                case 'delete':
                    removeElemSeleted();
                break;
                case 'rename':
                    var elem = $('.elementDesktop',this);
                    elem.renameElem();
                break;
            }
        },
        items: {
            add: {
                name: "Ajouter", 
                icon: "plus",
                items: {
                    folder: {name: "Dossier", icon: "folder-open"},
                    file: {name: "Fichier", icon: "file"}
                }
            },
            rename: {name: "Renommer", icon: "pencil"},
            delete: {name: "Supprimer", icon: "trash"}
            
            //sep1: "---------",
            //quit: {name: "Quitter", icon: "home"},
        }
    });
    
    $("table").selectable({
        filter: ".elementDesktop",
        unselected: function(event, ui) {
            $('.elementDesktop').cancelEditLabel();
        }
    });
    
    /***** Multi-select element *****/
    $("td").bind('mousedown', function(e){
        var element = $('.elementDesktop',this);
        var idElem = element.data('id');
        if(element.length==1){
            if(e.which==1) { //Click gauche
                var lastTime = element.data('time');
                element.data('time',$.now());
                var newTime = element.data('time');
                var dif = newTime-lastTime;
                
                //entre deux click (doubleClick ou deux simple), ouvre ou renomme
                if(dif<500){
                    element.openElem();
                }
                else if(lastTime!=0 && $('form',element).length==0 && $('.ui-selected').length==1)
                    element.renameElem();


                
            }
            if(!e.ctrlKey) { // Key CTRL no pressed
                $('.elementDesktop').removeClass('ui-selected'); //on désélectionne tout

                // Boucle sur tout les element sauf element actuel
                $(".elementDesktop").each(function(i, e) {
                    if(idElem!=$(e).data('id'))
                        $(e).data('time',0);
                });
            }
            // selectionne si deselectionné ou déselectionne si sélectionné
            if(element.hasClass('ui-selected')){
                element.removeClass('ui-selected');
                $('.elementDesktop').data('time',0);
            }
            else{
                element.addClass('ui-selected');
            }
        }
    });
        
    $("td").droppable({
        drop: function( event, ui ) {
            /***** Repositionnement au centre avec animation *****/
            var top = $(ui.draggable.context).offset().top-$(this).offset().top;
            var left = $(ui.draggable.context).offset().left-$(this).offset().left;
            
            $(ui.draggable.context).appendTo(this).css({top:top,left:left});
            $(ui.draggable.context).animate({top:"0",left:"0"}, "fast");
            
            $(this).save({modif:['position']});
        }
    });
});
    
