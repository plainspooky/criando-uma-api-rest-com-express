Criando uma API REST com Express
---

Este é um projeto bem simples de implementação de uma API REST
utilizando [Node.js](https://nodejs.org/en/) e o _framework_ [Express](https://expressjs.com/).

Consulte o [post original](https://giovannireisnunes.wordpress.com/2021/09/10/criando-uma-api-rest-com-express---parte-1) do meu blog para maiores informações.

# Instalação

Clone este repositório e dentro dele digite:

``` shell
npm install
```
Para instalar as dependências do projeto.

# Execução

Para executar a aplicação, faça:

``` shell
npm start
```

Implementa os métodos DELETE, GET, POST e PUT dentro da `/students`:

``` 
curl localhost:3000/students/1
{"id":1,"name":"Agatha da Costa","address":"Via Cauã Rezende","neighbour":"Paraíso","city":"da Mata","state":"São Paulo","postal_code":"29093-532"
```

A saída será algo como:

```
> criando-uma-api-rest-com-express@1.0.0 start
> make start
...
nodemon src/app.js
[nodemon] 2.0.13
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node src/app.js`
```


# Testes

Para executar a rotina de testes, use:

``` shell
npm test
```

E o resultado deverá ser algo como:

```
> criando-uma-api-rest-com-express@1.0.0 test
> make test
...
jest src/ --verbose --detectOpenHandles
 PASS  src/routes/students.test.js
  Rotas de 'students'
    Método GET
      ✓ Deve retornar uma lista com todos os estudantes (130 ms)
      ✓ Deve retornar um único estudante (22 ms)
      ✓ Deve retornar 404 para estudantes inexistentes (16 ms)
    Método POST
      ✓ Deve inserir um estudante a partir dos campos informados (23 ms)
    Método PUT
      ✓ Deve atualizar estudante e retornar o novo registto (33 ms)
      ✓ Deve retornar não encontrado ao tentar atualizar estudante inexistente (14 ms)
    Método DELETE
      ✓ Deve apagar um usuário existente (20 ms)
      ✓ Deve retornar 404 para um usuário inexistente (15 ms)

 PASS  src/models/students.test.js
  Modelo de dados de estudantes
    ✓ Deve criar um novo estudante (1 ms)
    ✓ Deve retornar todos os estudantes cadastrados (1 ms)
    ✓ Deve retornar o registro do estudante existente (2 ms)
    ✓ Deve retornar vazio para para estudante inexistente (2 ms)
    ✓ Deve atualizar o registro de um estudante existente (1 ms)
    ✓ Deve retornar vazio ao se tentar atualizar um estudante não existente (1 ms)
    ✓ Deve retornar verdadeiro quando remover um estudante (2 ms)
    ✓ Deve retornar falso ao tentar apagar um estudante que não existente (1 ms)

Test Suites: 2 passed, 2 total
Tests:       16 passed, 16 total
Snapshots:   0 total
Time:        1.545 s
Ran all test suites matching /src\//i.
```

Também é possível visualizar a cobertura dos testes, com:

``` shell
make coverage
```

Que resultará em algo como:

```
...
jest src/ --coverage
 PASS  src/routes/students.test.js
 PASS  src/models/students.test.js
-------------------|---------|----------|---------|---------|-------------------
File               | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-------------------|---------|----------|---------|---------|-------------------
All files          |   98.55 |    88.88 |     100 |   98.48 |                   
 ...st-com-express |     100 |      100 |     100 |     100 |                   
  students.js      |     100 |      100 |     100 |     100 |                   
 ...ss/src/helpers |     100 |      100 |     100 |     100 |                   
  ...st_helpers.js |     100 |      100 |     100 |     100 |                   
 ...ess/src/models |     100 |      100 |     100 |     100 |                   
  students.js      |     100 |      100 |     100 |     100 |                   
 ...ess/src/routes |   97.22 |       80 |     100 |   97.22 |                   
  students.js      |   97.22 |       80 |     100 |   97.22 | 60                
-------------------|---------|----------|---------|---------|-------------------

Test Suites: 2 passed, 2 total
Tests:       16 passed, 16 total
Snapshots:   0 total
Time:        1.324 s
Ran all test suites matching /src\//i.
```