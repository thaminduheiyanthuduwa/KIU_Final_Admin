import { api } from '@/store/api'

export default {
  getData: async function (page = 1, per_page = 20) {
    return await api.get(`/physical/get-all-info?limit=${per_page}&page=${page}&sort=tt`)
  },

  delete: async function (data, updated_user) {
    return await api.delete(`/physical/delete-eresource`, {
      params: {
        data,
        updated_user
      }
    })
  },
  updateStatus: async function (data, status, updated_user) {
    return await api.put(`/physical/update-status?data=${data}&status=${status}&updated_user=${updated_user}`)
  },

  create: async function (payload) {
    return await api.post(`/physical/create-physical-book`, payload)
  },

  fileUpload: async function (payload, id) {
    return await api.post(`/physical/uploadMultipleFiles`, payload, { params: { id } },
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
  },

  update: async function (payload, new_id) {
    return await api.post(`/physical/update-eresource`, payload, { params: { new_id } })
  },

  getBooks: async function () {
    return await api.get(`/physical/get-all-book-info`)
  },
  getStudents: async function () {
    return await api.get(`/physical/get-all-student-info`)
  },
}
