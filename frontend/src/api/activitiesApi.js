import axios from 'axios';

const base = axios.create({ baseURL: '/api/activities' });

export default {
  getAll: () => base.get(''),
  get: (id) => base.get(`/${id}`),
  create: (data) => base.post('', data),
  update: (id, data) => base.put(`/${id}`, data),
  remove: (id) => base.delete(`/${id}`)
};