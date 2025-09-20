# Automação de Testes de API - ServeRest

Este projeto contém um conjunto de testes automatizados para a API RESTful do ServeRest, cobrindo os principais endpoints de gerenciamento de usuários.

A automação foi desenvolvida com foco em boas práticas, como o padrão **Page Object** para organizar as requisições e validações, e está integrada a uma pipeline de CI/CD para execução automática.

### Tecnologias Utilizadas

  * **Linguagem:** JavaScript
  * **Framework de Automação:** WebdriverIO
  * **Gerenciador de Testes:** Mocha
  * **Biblioteca de Asserções:** Chai
  * **Gerador de Dados:** `@faker-js/faker`
  * **API Local:** Docker
  * **CI/CD:** GitHub Actions
  * **Relatórios:** Allure Report

-----

### Configuração e Execução do Ambiente

Para rodar os testes localmente, siga os passos abaixo.

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/mtenorio745/serverest-api-automation-webdriverio.git
    cd serve-rest-api-automation-webdriverio
    ```

2.  **Inicie a API no Docker:**

      * Certifique-se de que o Docker está instalado e em execução na sua máquina.
      * Rode o comando para iniciar a API na porta `3000`.

    <!-- end list -->

    ```bash
    docker run -p 3000:3000 paulogoncalvesbh/serverest:latest
    ```

3.  **Instale as dependências do projeto:**

    ```bash
    npm install
    ```

4.  **Execute os testes:**

      * Rode o comando para iniciar a suíte de testes.

    <!-- end list -->

    ```bash
    npx wdio run ./wdio.conf.js
    ```

-----

### Cenários de Teste Cobertos

A suíte de testes garante 100% da cobertura funcional para os endpoints de usuário, cobrindo o "caminho feliz" e cenários de falha.

  * **Fluxo de Sucesso (`usersApi.spec.js`)**

      * Registro de um novo usuário.
      * Login para obter o token JWT.
      * Listagem e busca de usuários por ID.
      * Atualização de informações do usuário.
      * Exclusão do usuário.

  * **Cenários de Falha (`usersNegative.spec.js`)**

      * Falha ao registrar um usuário com e-mail duplicado.
      * Falha ao fazer login com credenciais inválidas.
      * Falha ao tentar buscar um usuário com ID que não existe.
      * Falha ao tentar atualizar um usuário com um e-mail já em uso.
      * Comportamento de `PUT` que cria um novo usuário se o ID não existir.

  * **Teste de Limitação de Taxa (`rateLimit.spec.js`)**

      * O teste envia mais de 100 requisições para o endpoint `/usuarios` para verificar a limitação. **Conclusão:** O ambiente Docker da API ServeRest não aplica o limite de taxa por padrão, e o teste valida que um status code `200` é retornado mesmo sob alta carga.

-----

### Pipeline de CI/CD e Relatórios

A pipeline de CI/CD foi configurada para rodar automaticamente no GitHub Actions em cada `push` ou `pull request` para a branch `main`.

**Como ver o relatório Allure:**

1.  Acesse a aba **`Actions`** do repositório no GitHub.
2.  Clique na última execução da pipeline.
3.  Na seção de artefatos (**`Artifacts`**), baixe o arquivo **`allure-report`**.
4.  Descompacte o arquivo e abra o `index.html` para visualizar o relatório detalhado.