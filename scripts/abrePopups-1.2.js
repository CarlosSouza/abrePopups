/*
  ----
    abrePopups v1.2
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
    
    
*/

function fechaPopup() {

  $('.popup a.fechar, .pelicula').remove();
  
  // se o video estiver aberto, remove sua popup; caso contrario esconde as popups genericas
  if($('aside#ver_video').get(0)){
    $('aside#ver_video').remove();
  } else {
    $('.popup').hide();
  }
  
}

var popup;
var alturaJanela;
var alturaBody;
var alturaPopup;
var larguraPopup;

function abrePopups(url, tipo) {

  fechaPopup();
  
  switch(tipo) {
    // caso seja video, a popup se identifica pelo id "ver_popup"
    case 'appendix':
      // RegEx por Gustavo Krause
      var urlVideo = url;
      var er = /v=([^&]+)/gi;
      urlVideo = er.exec(urlVideo);
      // Innershiv para IEs
      if($.browser.msie && $.browser.version < 9){
        $('body').prepend(innerShiv('<aside id="ver_video" class="popup"><iframe class="youtube-player" type="text/html" width="'+ configuraPopups.larguraVideo + '" height="'+ configuraPopups.alturaVideo + '" src="http://www.youtube.com/embed/" frameborder="0"></iframe></aside>'));
      } else {
        $('body').prepend('<aside id="ver_video" class="popup"><iframe class="youtube-player" type="text/html" width="'+ configuraPopups.larguraVideo + '" height="'+ configuraPopups.alturaVideo + '" src="http://www.youtube.com/embed/" frameborder="0"></iframe></aside>');    
      }
      popup = $('#ver_video.popup');
      $('iframe.youtube-player', popup).attr('src', 'http://www.youtube.com/embed/'+urlVideo[1]+'?rel=0');
      break;
    // caso seja convencional, a popup se identifica pela URL passada no link
    default:
      popup = $(url + '.popup');
  }
    
  // definindo as medidas
  alturaJanela = $(window).height();
  alturaBody = $('body').outerHeight();
  alturaPopup = popup.outerHeight();
  larguraPopup = popup.outerWidth();
  
  // exibindo a popup e centralizando na tela
  popup
  .prepend('<a class="fechar" href="#fechar" title="Fechar esta janela">Fechar</a>')
  .css('top', (alturaJanela - alturaPopup) / 2 + $(window).scrollTop() + "px")
  .css('left', '50%')
  .css('margin-left', '-' + larguraPopup/2 + 'px');
  
  switch(tipo) {
    // caso seja video, insere o cabecalho e rodape do video, se definidos nas configuracoes
    case 'appendix':
      if (typeof configuraPopups.cabecalhoVideo != "undefined"){
        $('iframe.youtube-player', popup).before(configuraPopups.cabecalhoVideo);
      }
      if (typeof configuraPopups.rodapeVideo != "undefined"){
        $('iframe.youtube-player', popup).after(configuraPopups.rodapeVideo);
      }
      popup.show();
      break;
    // caso seja convencional, apenas exibe a popup e cria o link fechar
    default:
      popup.show();
  }
  
  // criando a pelicula
  if (alturaBody > alturaJanela){
    alturaPelicula = alturaBody; 
  } else {
    alturaPelicula = alturaJanela;
  }
  $('body').prepend('<div class="pelicula"></div>');
  
  pelicula = $('.pelicula');
  
  pelicula.css({ width : '100%', height : alturaPelicula, background: '#000', opacity : '.5' });
  if(alturaJanela < alturaPopup){
    diferenca = alturaPopup - alturaJanela;
    popup.css('margin-top', diferenca / 2);
    pelicula.css('padding-top', diferenca);
  }

}

// definindo as medidas da janela
$(window).resize(function() {
  
  // se a pelicula existir, a janela redimensionada modifica suas medidas
  if($('.pelicula').get(0)){
    alturaJanela = $(window).height();
    
    // verifica se a altura do body for maior que o tamanho da popup + seu posicionamento na tela
    if(alturaBody > (popup.outerHeight() + parseInt(popup.css('top')))){
      alturaConteudo = alturaBody;
    } else {
      alturaConteudo = popup.outerHeight() + parseInt(popup.css('top'));
    }
    
    // verifica se a altura da janela for maior que a variavel definida na condicao acima, redimensionando a pelicula
    if(alturaJanela > alturaConteudo){
      $('.pelicula').css({ height : alturaJanela + 'px' });
    } else {
      $('.pelicula').css({ height : alturaConteudo + 'px' });
    }
  }

});

// Abrindo a popup
$('a[rel="subsection"], a[rel="appendix"]').live('click', function(){ 
  abrePopups($(this).attr('href'), $(this).attr('rel'));
  return false;
});

// Fechando a popup

  // clicando no link 'fechar' ou na pelicula
  $('.popup a[href$=\'#fechar\'], .pelicula').live('click', function(){
    fechaPopup();
    return false;
  });
  
  // apertando ESC
  $(document).keyup(function(e) {
    if (e.keyCode == 27) { fechaPopup(); }
  });