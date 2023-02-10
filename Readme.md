## Como criar um servidor Node.js de forma rápida e prática?.

### Olá, 

Espero que este artigo te encontre bem, e que seja de ajuda em seu processo de formação.

A intensão deste artigo é te ensinar como criar de forma rápida e prática um servidor em Node.Js. 

É necessário que tenha instalado em sua máquina o gerenciador de pacotes `NPM`. Caso não, visite o [website](https://www.npmjs.com/). 

E necessário que tenha instalado o `Node` em sua máquina. Caso não tenha, visite o [website](https://nodejs.org/en/).


### Preparando o servidor

Com o `Node` e o `NPM` instalados em sua máquina, crie uma pasta onde ficará os arquivos do nosso servidor. No meu caso chamarei esta pasta de `servidor` e em seguida abra o seu editor de texto favorito. No meu caso utilizarei o [`VsCode`](https://code.visualstudio.com/). 

Abra o terminal do seu editor, e rode o comando: 
```bash
npm init
```
Em seu terminal aparecerá uma série de perguntas durante o processo de instalação. Por agora, não se preocupe, apenas aperte `enter`. 
Por fim você terá uma mensagem similar a esta:

```bash
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help init` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (servertest) tutorial
version: (1.0.0) 
description: 
entry point: (index.js) 
test command: 
git repository: 
keywords: 
author: 
license: (ISC) 
{
  "name":"",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}


Is this OK? (yes) 

```
Com o processo finalizado, um arquivo `package.json` terá sido gerado dentro da pasta raiz. 
```
server
     |- package.json
```

Em resumo, o `package.json` é uma parte vital de nossa aplicação. É nele que ficará nossa configuração básica e a instalação de nossas dependências. 

```json
package.json
{
  "name": "tutorial",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

Agora, para facilitar o nosso processo, iremos fazer uma modificação no *package.json* 

Primeiro note a chave: 

```json
package.json
{
    ...
    "main":"index.js"
}
```
A chave `main` indica o arquivo raíz de nossa aplicação, aquele que será lido quando rodarmos o comando `node`.

Para iniciarmos o servidor, poderiamos utilizar o comando no terminal
```
node index.js
```
Uma vez que o arquivo `index.js` exista dentro de nossa aplicação, ele será lido pelo `node`.

Mas, para uma melhor prática, iremos adicionar a *key* `"scripts":{}` ao `package.json`. E dentro dela, adicione a *key* `"start"`, com o comando `node index.js`

```json
package.json
{
    ...
    "scripts":{
        "start": "node index.js"
    }
}
```

Agora no terminal, em sua pasta raíz, ao escrever 
```bash
npm start
```
O arquivo `index.js` será lido automaticamente.
**Para isso crie o arquivo index.js dentro de sua pasta raíz.* 

### Instalando Dependências.
Ainda em nosso terminal vamos instalar a dependência `express`. 

No terminal, escreva: 
```bash
npm instal express
```

`Express` é uma biblioteca de servidor popular para Node.js. Ele fornece uma forma simples e direta de criar aplicações web e APIs usando Node.js. Para saber mais acesse [`NPM Express`](https://www.npmjs.com/package/express).

Agora com nosso `package.json` modificado e nossa dependência instalada, podemos passar para a criação do servidor. 

### Criando o Servidor

Caso ainda não tenha feito, crie agora o seu arquivo `index.js`, dentro de sua pasta raíz. Este arquivo será o nosso servidor e portador de nossas rotas.
```file
server
    |- index.js
    |- package.json
```

Agora iremos importar dentro dele o módulo `HTTP`.
Em Node.js, o módulo `http` é usado para criar servidores web que podem aceitar solicitações `http` e retornar respostas. Você pode saber mais sobre ele e outros módulo nativos do nodeJs, [aqui](https://nodejs.org/api/).

Para importar qualquer módulo, utilize sempre a função `require()`, nativa do node.js

```javascript
index.js
const http = require('http');
```
agora vamos criar o nosso server. Primeiro utilize o método [`createServer()`](https://nodejs.org/api/http.html#httpcreateserveroptions-requestlistener), nativo do módulo `http`. 

```javascript
index.js
const http = require('http');
const server = http.createServer();
```
em seguida utilizando a class `list()`, para declarar uma `port` onde se dará a comunicação do nosso servidor. Você pode escolher o número que quiser para a sua *port*, no meu caso será `8000`. 

```javascript
index.js
const http = require('http');
const server = http.createServer();
server.listen(8000);
```

Pronto. O servidor está criado, porém não estamos passando nada para ele. Se rodar o comando `npm start` nada irá acontecer. 

O que nos falta é criar uma rota para o nosso servidor.

De volta ao *index.js* importe o módulo `express`. 

```javascript
index.js
const http = require('http');
const express = require('express');
...
server.listen(8000);
```

Em seguida iremos utilizar o método  `GET` para criarmos uma rota em nosso servidor. Para saber mais sobre métodos de rotagem, acesse [ROTAS EXPRESS](http://expressjs.com/en/guide/routing.html).

O método de rotagem necessita de um endereço de rota, no nosso caso será `"/"`. E retorna uma `callbackFunction` com dois parâmetros, `req` e `res`.

* `req`: refere-se a requisições feita ao servidor por um usuário externo. 
* `res`: refere-se à resposta dada à requisição feita ao servidor.

**ps: Rotas cujo endereço são `"/"` serão tomadas como rotas `default` de sua aplicação.*

```javascript
index.js
...
const router = express();
router.get("/", (req, res)=>{

})
...
server.listen(8000);
```
Enviaremos por nossa rota um texto como teste, utilizando o parâmetro `res`:


```javascript
index.js
...
const router = express();
router.get("/", (req, res)=>{
    return res.send("It's Alive!")
});
...
server.listen(8000);
```
Por fim, passe a sua const `router` para o servidor. 


```javascript
index.js
...
const router = express();
router.get("/", (req, res)=>{
    return res.send("It's Alive!")
});
const server = http.createServer(router);
server.listen(8000);
```
Pronto. Seu servidor está criado. Para testa-lo, primeiro vá ao terminal e rode o comando:

```bash
npm start
```
Depois visite o endereço http://localhost:8000/ em seu navegador de escolha. 

Se tudo estiver correto você verá a mensagem `It's Alive!` na tela do seu navegador. 

---

Espero que este artigo tenha te ajudado. Saiba que isso é apenas o começo. Você pode criar muitas coisas com este servidor, até mesmo transforma-lo em uma grande API. 

Mas por onde começar? Bom. Que tal aprender como conectar o seu servidor a um banco de dados Mysql? Ou mesmo, como gravar,modificar, ler e remover informações de um banco de dados? 

Para isso, leia nossos  artigos e não se esqueça de seguir a minha página e o meu twitter.

Até mais e bom código! 

