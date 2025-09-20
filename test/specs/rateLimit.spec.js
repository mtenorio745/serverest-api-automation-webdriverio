const { expect } = require('chai');
const usersAPI = require('./users.api.js');

describe('Teste de Limitação de Taxa da API', () => {
  it('deve confirmar que o limite de taxa não é aplicado no ambiente local', async () => {
    // Envia 101 requisições para o endpoint de usuários
    const requestCount = 101;
    const response = await usersAPI.sendManyRequests('usuarios', requestCount, 0);

    // Validação: A API não retorna um erro 429
    expect(response.status).to.equal(200);

    // Mensagem para evidenciar no log
    console.log('\n--- Resultado do Teste ---');
    console.log('API SEM limite de taxa (rate limiting) ativo no ambiente local.');
    console.log('------------------------\n');
  });
});
