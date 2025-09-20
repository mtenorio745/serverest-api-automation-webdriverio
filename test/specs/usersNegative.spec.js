const { expect } = require('chai');
const usersAPI = require('./users.api.js');

describe('Cenários de Falha da API de Usuários', () => {
    let invalidUserPayload;
    const adminUser = {
        email: 'admin@serverest.com',
        password: 'teste'
    };
    let newUserPayload;
    let newUserId;

    before(async () => {
        // Fluxo de pre-requisito: criar um novo usuário e fazer login
        // para testar cenários que exigem token.
        newUserPayload = usersAPI.generateUserPayload();
        await usersAPI.registerUser(newUserPayload);
        await usersAPI.login(newUserPayload.email, newUserPayload.password);
    });

    it('deve falhar ao fazer login com e-mail e/ou senha inválidos', async () => {
        const invalidLogin = { email: 'invalido@email.com', password: 'senha' };
        const response = await usersAPI.login(invalidLogin.email, invalidLogin.password);

        expect(response.status).to.equal(401);
        expect(response.data.message).to.equal('Email e/ou senha inválidos');
    });

    it('deve falhar ao cadastrar um usuário sem campos obrigatórios', async () => {
        const payloadMissingFields = {
            nome: 'Teste',
            email: 'email@teste.com'
        };
        const response = await usersAPI.registerUser(payloadMissingFields);

        expect(response.status).to.equal(400);
        expect(response.data.password).to.equal('password é obrigatório');
    });

    it('deve falhar ao atualizar um usuário com e-mail já existente', async () => {
        // Cria um segundo usuário para ter um email existente
        const secondUser = usersAPI.generateUserPayload();
        const secondUserResponse = await usersAPI.registerUser(secondUser);
        const secondUserId = secondUserResponse.data._id;
        
        const updatedPayload = { ...newUserPayload, email: secondUser.email };
        const response = await usersAPI.updateUser(newUserId, updatedPayload);

        expect(response.status).to.equal(400);
        expect(response.data.message).to.equal('Este email já está sendo usado');

        // Limpa o segundo usuário para garantir testes limpos no futuro
        await usersAPI.deleteUser(secondUserId);
    });

    it('deve criar um novo usuário se o ID do PUT não for encontrado', async () => {
        const nonExistentId = '99999999999999999999';
        const updatedPayload = { ...usersAPI.generateUserPayload(), nome: 'Novo Usuario Criado' };
        const response = await usersAPI.updateUser(nonExistentId, updatedPayload);

        expect(response.status).to.equal(201);
        expect(response.data.message).to.equal('Cadastro realizado com sucesso');
    });

    it('deve falhar ao tentar buscar um usuário com ID que não existe', async () => {
        // ID com formato válido, mas que não existe no banco de dados
        const nonExistentId = 'xyz123abc456def7'; 
        const response = await usersAPI.getUserById(nonExistentId);

        expect(response.status).to.equal(400);
        expect(response.data.message).to.equal('Usuário não encontrado');
    });

    it('deve falhar ao tentar excluir um usuário que não existe', async () => {
        const nonExistentId = '99999999999999999999';
        const response = await usersAPI.deleteUser(nonExistentId);
        
        expect(response.status).to.equal(200); // A API retorna 200, mas a mensagem é de falha
        expect(response.data.message).to.equal('Nenhum registro excluído');
    });

});
