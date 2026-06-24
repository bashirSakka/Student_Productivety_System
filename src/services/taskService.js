import api from '../lib/api'

export const taskService = {
  getAll:  (userId)      => api.get(`/api/tasks?user_id=${userId}`),
  create:  (data)        => api.post('/api/task', data),
  update:  (id, data)    => api.patch(`/api/task/${id}`, data),
  remove:  (id)          => api.delete(`/api/task/${id}`)
}
