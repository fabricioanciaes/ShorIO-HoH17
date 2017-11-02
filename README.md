# ShorIO-HoH17
ShorIO para o Heaven or Hell, já de antemão peço perdão pelo spaghetti code.

## Instalação:

Primeiro instale o [nodejs](https://nodejs.org/dist/v6.11.5/node-v6.11.5-x64.msi)

Vá até o diretório do projeto e rode `npm install` para instalar as dependências

Por fim, pra rodar a dashboard, rode `node index.js` e entre com o navegador em [http://localhost:4000](http://localhost:4000)

Para facilitar a vida eu criei um .bat pra rodar o servidor, bastar rodar o `startserver.bat`

## Incluindo no stream:

Basta adicionar as páginas como browsersource no OBS/Xsplit

A lista de páginas é:

- [http://localhost:4000/idle](http://localhost:4000/idle)
    - Tela de espera com o logo do heaven or hell
- [http://localhost:4000/scoreboard](http://localhost:4000/scoreboard)
    - Placar, inclua por cima do vídeo do jogo
- [http://localhost:4000/casters](http://localhost:4000/casters])
    - Comentaristas, bote por cima da webcam em tela cheia.

> Lembre-se, todas as views são 1280x720 o tamanho do canvas.
