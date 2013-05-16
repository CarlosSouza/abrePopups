abrePopups
==========

Pequeno script jQuery para lightbox, com opção para abrir vídeos Youtube

INSTRUÇÕES:
  
    Caso utilize a popup Youtube (links com rel="appendix"), estas variaveis devem ser declaradas, fora do $(document).ready()
    
    var configuraPopups = {
      cabecalhoVideo: '<h3>teste</h3>', // codigo a ser inserido ANTES do iframe do Youtube
      rodapeVideo: '<p>teste</p>', // codigo a ser inserido DEPOIS do iframe do Youtube
      larguraVideo: 510, // medida sem px
      alturaVideo: 360 // medida sem px
    }
  
  OBSERVAÇÕES:
    
    Como o script usa a tag <aside> para as popups, é NECESSARIO usar o script innershiv.js para que funcione no IE <= 9
    Links que irao abrir popups tem o atributo rel="subsection"
    Links que abrirao videos do Youtube tem o atributo rel="appendix"
    O botao criado para fechar a janela tem class="fechar"
    A layer criada para sobrepor a pagina tem class="pelicula"
    A popup criada para o video tem o id="ver_video", assim voce pode estiliza-la da maneira que desejar