import { api } from '@/store/api'

export default {
  getData: async function (page = 1, per_page = 20) {
    return await api.get(`/document/get-all-info?limit=${per_page}&page=${page}&sort=tt`)
  },

  delete: async function (data, updated_user) {
    return await api.delete(`/document/delete-eresource`, {
      params: {
        data,
        updated_user
      }
    })
  },
  updateStatus: async function (data, status, updated_user) {
    return await api.put(`/document/update-eresource-status`, null, {
      params: {
        data,
        status,
        updated_user
      }
    })
  },
  create: async function (payload) {
    return await api.post(`/document/save-eresource`, payload)
  },
  fileUpload: async function (payload, id) {
    return await api.post(`/document/uploadMultipleFiles`, payload, { params: { id } },
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
  },
  update: async function (payload, new_id) {
    return await api.post(`/document/update-eresource`, payload, { params: { new_id } })
  },

  getResourceData: async function (id) {
    return await api.get(`/document/get-by-id?id=${id}`)
  },
}
