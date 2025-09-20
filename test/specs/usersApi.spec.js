const { expect } = require('chai');
const usersAPI = require('./users.api.js');

describe('Fluxo Completo da API de Usuários', () => {
  let userPayload;
  let userId;

  it('deve registrar um novo usuário com sucesso', async () => {
    userPayload = usersAPI.generateUserPayload();
    const response = await usersAPI.registerUser(userPayload);

    expect(response.status).to.equal(201);
    expect(response.data.message).to.equal('Cadastro realizado com sucesso');
    userId = response.data._id;
  });

  it('deve falhar ao registrar um usuário com e-mail já existente', async () => {
    const response = await usersAPI.registerUser(userPayload);
    
    expect(response.status).to.equal(400);
    expect(response.data.message).to.equal('Este email já está sendo usado');
  });

  it('deve realizar login e obter um token de autenticação', async () => {
    const response = await usersAPI.login(userPayload.email, userPayload.password);
    
    expect(response.status).to.equal(200);
    expect(response.data.message).to.equal('Login realizado com sucesso');
    expect(response.data.authorization).to.exist;
  });

  it('deve listar todos os usuários e encontrar o recém-criado', async () => {
    const response = await usersAPI.getAllUsers();

    expect(response.status).to.equal(200);
    expect(response.data.usuarios).to.be.an('array');
    const newUserInList = response.data.usuarios.find(user => user.email === userPayload.email);
    expect(newUserInList).to.exist;
  });

  it('deve buscar o usuário por ID e validar os dados', async () => {
    const response = await usersAPI.getUserById(userId);

    expect(response.status).to.equal(200);
    expect(response.data.nome).to.equal(userPayload.nome);
    expect(response.data.email).to.equal(userPayload.email);
  });

  it('deve atualizar o nome e a senha do usuário com sucesso', async () => {
    const updatedPayload = { ...userPayload, nome: 'Usuário Atualizado', password: 'nova-senha' };
    const response = await usersAPI.updateUser(userId, updatedPayload);

    expect(response.status).to.equal(200);
    expect(response.data.message).to.equal('Registro alterado com sucesso');
  });

  it('deve excluir o usuário com sucesso', async () => {
    const response = await usersAPI.deleteUser(userId);

    expect(response.status).to.equal(200);
    expect(response.data.message).to.equal('Registro excluído com sucesso');
  });

  it('deve falhar ao buscar um usuário recém-excluído', async () => {
    const response = await usersAPI.getUserById(userId);

    expect(response.status).to.equal(400);
    expect(response.data.message).to.equal('Usuário não encontrado');
  });
});
