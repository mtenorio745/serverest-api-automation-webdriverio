# 🔗 Automação de Testes de API - ServeRest

---

## 📄 Sobre o Projeto

Este projeto automatiza a suíte de testes da API **ServeRest**, focando nos endpoints de gerenciamento de usuários. A automação foi desenvolvida com o framework **WebdriverIO** e segue o padrão **Page Object** para organizar as requisições, tornando os testes mais escaláveis e fáceis de manter.

Integrado a uma pipeline de CI/CD com **GitHub Actions**, o projeto garante a execução contínua e a verificação da API.

**Acesse o [relatório de testes completo](https://mtenorio745.github.io/serverest-api-automation-webdriverio/) para ver os resultados detalhados.**

---

## 🛠️ Tecnologias Utilizadas

* **JavaScript**: Linguagem de programação.
* **WebdriverIO**: Framework de automação de testes.
* **Mocha**: Gerenciador de testes.
* **Chai**: Biblioteca de asserções.
* **@faker-js/faker**: Gerador de dados de teste.
* **Docker**: Para rodar a API localmente.
* **GitHub Actions**: Pipeline de CI/CD.
* **Allure Report**: Para gerar relatórios detalhados.

---

## ⚙️ Como Executar os Testes

### Pré-requisitos

* Docker (instalado e em execução).
* Node.js (versão 18+).

### Instalação

1.  Clone o repositório:
    `git clone https://github.com/mtenorio745/serverest-api-automation-webdriverio.git`
    `cd serverest-api-automation-webdriverio`
2.  Instale as dependências:
    `npm install`

### Execução Local

1.  Inicie a API com Docker:
    `docker run -p 3000:3000 paulogoncalvesbh/serverest:latest`
2.  Execute a suíte de testes:
    `npx wdio run ./wdio.conf.js`

---

## 📈 Cenários de Teste

A automação cobre 100% dos fluxos funcionais para os endpoints de usuário, incluindo "caminho feliz" e cenários de falha.

* **Fluxo de Sucesso (`usersApi.spec.js`)**: Testes para registro, login, busca, atualização e exclusão de usuários.
* **Cenários de Falha (`usersNegative.spec.js`)**: Testes para validar falhas, como e-mail duplicado ou credenciais inválidas.
* **Teste de Limitação de Taxa (`rateLimit.spec.js`)**: Valida o comportamento da API sob alta carga, observando que o limite de taxa não é aplicado por padrão.

---

## 📊 Relatório Allure

O relatório de testes é gerado em cada execução e pode ser visualizado online ou localmente.

**Acesse o [relatório mais recente aqui](https://mtenorio745.github.io/serverest-api-automation-webdriverio/).**

### Visualização Local

1.  Instale a ferramenta Allure globalmente:
    `npm install -g allure-commandline`
2.  Gere e abra o relatório:
    `npx allure serve allure-results`

---

## 🧑‍💻 Autor

**Mateus Tenório** - [mtenorio745](https://github.com/mtenorio745)