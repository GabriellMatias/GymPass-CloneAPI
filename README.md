<h1 align="center"> 
  <img src="https://github.com/GabriellMatias/API-SOLID-NodeJS/assets/80908772/9da2ea8f-a3ac-45b8-8bf3-a391e640d58c"/>
</h1>


# App
## Gympass style app.

## RFs (Requisitos funcionais)
-> [Tudo o que o usuario pode fazer na aplicacao]
  - [x] Deve ser possível se cadastrar;
  - [x] Deve ser possível se autenticar;
  - [x] Deve ser possível obter o perfil de um usuário logado;
  - [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
  - [x] Deve ser possível obter seu histórico de check-ins;
  - [] Deve ser possível o usuário buscar academias próximas;
  - [x] Deve ser possível o usuário buscar academias pelo nome;
  - [x] Deve ser possível realizar check-in em uma academia;
  - [] Deve ser possível validar o check-in de um usuário;
  - [x] Deve ser possível cadastrar uma academia;
## RNs (Regras de negócio)
 -> [Quando ele pode ter esse requisito funcional ou nao]
  - [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
  - [] O usuário não pode fazer 2 check-ins no mesmo dia;
  - [] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
  - [] O check-in só pode ser validada até 20 minutos após ser criado;
  - [] O check-in só pode ser validado por administradores;
  - [] A academia só pode ser cadastrada por administradores;
## RNFs (Requisitos não-funcionais)
-> [Requisitos tecnicos que nos programadores determinamos]
  - [x] A senha do usuário precisa estar criptografada;
  - [] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
  - [] Todas listas de dados precisam estar paginadas com 20 itens por página;
  - [] O usuário deve ser identificado por um JWT (JSON Web Token);


  # Notes
    -> .npmrc -> salvar as dependencias com a versao exata

# SOLID PRINCIPES
  -> 
  ->
  ->
  ->
  -> Dependecy invertion
