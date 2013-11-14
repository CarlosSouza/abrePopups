/*
  ----
    abrePopups v1.1
  ----
  
  
  AUTOR:
  
    Carlos Eduardo de Souza - http://www.webstandards.blog.br/
  
  INSTRUCOES:
  
    Caso utilize a popup Youtube (links com rel="appendix"), estas variaveis devem ser declaradas, fora do $(document).ready()
    
    var configuraPopups = {
      cabecalhoVideo: '<h3>teste</h3>', // codigo a ser inserido ANTES do iframe do Youtube
      rodapeVideo: '<p>teste</p>', // codigo a ser inserido DEPOIS do iframe do Youtube
      larguraVideo: 510, // medida sem px
      alturaVideo: 360 // medida sem px
    }
  
  OBSERVACOES:
    
    Como o script usa a tag <aside> para as popups, é NECESSARIO usar o script innershiv.js para que funcione no IE <= 9
    Links que irao abrir popups tem o atributo rel="subsection"
    Links que abrirao videos do Youtube tem o atributo rel="appendix"
    O botao criado para fechar a janela tem class="fechar"
    A layer criada para sobrepor a pagina tem class="pelicula"
    A popup criada para o video tem o id="ver_video", assim voce pode estiliza-la da maneira que desejar
    
    
*/function fechaPopup(){$(".popup a.fechar, .pelicula").remove();$("aside#ver_video").get(0)?$("aside#ver_video").remove():$(".popup").hide()}function abrePopups(e,t){fechaPopup();switch(t){case"appendix":var n=e,r=/v=([^&]+)/gi;n=r.exec(n);$.browser.msie&&$.browser.version<9?$("body").prepend(innerShiv('<aside id="ver_video" class="popup"><iframe class="youtube-player" type="text/html" width="'+configuraPopups.larguraVideo+'" height="'+configuraPopups.alturaVideo+'" src="http://www.youtube.com/embed/" frameborder="0"></iframe></aside>')):$("body").prepend('<aside id="ver_video" class="popup"><iframe class="youtube-player" type="text/html" width="'+configuraPopups.larguraVideo+'" height="'+configuraPopups.alturaVideo+'" src="http://www.youtube.com/embed/" frameborder="0"></iframe></aside>');popup=$("#ver_video.popup");$("iframe.youtube-player",popup).attr("src","http://www.youtube.com/embed/"+n[1]+"?rel=0");break;default:popup=$(e+".popup")}alturaJanela=$(window).height();alturaBody=$("body").outerHeight();alturaPopup=popup.outerHeight();larguraPopup=popup.outerWidth();popup.prepend('<a class="fechar" href="#fechar" title="Fechar esta janela">Fechar</a>').css("top",(alturaJanela-alturaPopup)/2+$(window).scrollTop()+"px").css("left","50%").css("margin-left","-"+larguraPopup/2+"px");switch(t){case"appendix":typeof configuraPopups.cabecalhoVideo!="undefined"&&$("iframe.youtube-player",popup).before(configuraPopups.cabecalhoVideo);typeof configuraPopups.rodapeVideo!="undefined"&&$("iframe.youtube-player",popup).after(configuraPopups.rodapeVideo);popup.show();break;default:popup.show()}alturaBody>alturaJanela?alturaPelicula=alturaBody:alturaPelicula=alturaJanela;$("body").prepend('<div class="pelicula"></div>');pelicula=$(".pelicula");pelicula.css({width:"100%",height:alturaPelicula,background:"#000",opacity:".5"});if(alturaJanela<alturaPopup){diferenca=alturaPopup-alturaJanela;popup.css("margin-top",diferenca/2);pelicula.css("padding-top",diferenca)}}var popup,alturaJanela,alturaBody,alturaPopup,larguraPopup;$(window).resize(function(){if($(".pelicula").get(0)){alturaJanela=$(window).height();alturaBody>popup.outerHeight()+parseInt(popup.css("top"))?alturaConteudo=alturaBody:alturaConteudo=popup.outerHeight()+parseInt(popup.css("top"));alturaJanela>alturaConteudo?$(".pelicula").css({height:alturaJanela+"px"}):$(".pelicula").css({height:alturaConteudo+"px"})}});$('a[rel="subsection"], a[rel="appendix"]').live("click",function(){abrePopups($(this).attr("href"),$(this).attr("rel"));return!1});$(".popup a[href$='#fechar'], .pelicula").live("click",function(){fechaPopup();return!1});$(document).keyup(function(e){e.keyCode==27&&fechaPopup()});