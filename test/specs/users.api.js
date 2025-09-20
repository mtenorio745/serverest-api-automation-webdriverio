const axios = require('axios');
const { faker } = require('@faker-js/faker');

class UsersAPI {
  constructor() {
    this.baseUrl = process.env.API_URL || 'http://localhost:3000';
    this.token = '';
  }

  generateUserPayload() {
    return {
      nome: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      password: faker.internet.password(),
      administrador: 'true',
    };
  }

  async registerUser(payload) {
    return axios.post(`${this.baseUrl}/usuarios`, payload, { validateStatus: false });
  }

  async login(email, password) {
    const payload = { email, password };
    const response = await axios.post(`${this.baseUrl}/login`, payload, { validateStatus: false });
    this.token = response.data.authorization;
    return response;
  }

  async getAllUsers() {
    return axios.get(`${this.baseUrl}/usuarios`, { validateStatus: false });
  }

  async getUserById(id) {
    return axios.get(`${this.baseUrl}/usuarios/${id}`, { validateStatus: false });
  }

  async updateUser(id, updatedPayload) {
    const headers = { Authorization: this.token };
    return axios.put(`${this.baseUrl}/usuarios/${id}`, updatedPayload, { headers, validateStatus: false });
  }

  async deleteUser(id) {
    const headers = { Authorization: this.token };
    return axios.delete(`${this.baseUrl}/usuarios/${id}`, { headers, validateStatus: false });
  }

  async sendManyRequests(endpoint, count, delay) {
    let response;
    for (let i = 0; i < count; i++) {
        response = await axios.get(`${this.baseUrl}/${endpoint}`, { validateStatus: false });
        if (response.status === 429) {
            return response;
        }
        await new Promise(resolve => setTimeout(resolve, delay));
    }
    return response;
  }
}

module.exports = new UsersAPI();