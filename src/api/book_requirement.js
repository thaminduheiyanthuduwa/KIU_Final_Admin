import { api } from '@/store/api'

export default {
  getData: async function (page = 1, per_page = 20) {
    return await api.get(`/book/get-all-info?limit=${per_page}&page=${page}&sort=tt`)
  },
  delete: async function (data, updated_user) {
    return await api.delete(`/book/delete-eresource`, {
      params: {
        data,
        updated_user
      }
    })
  },
  updateStatus: async function (data, status, updated_user,type) {
    return await api.put(`/book/update-eresource-status`, null, {
      params: {
        data,
        status,
        updated_user,
        type
      }
    })
  },
  create: async function (payload) {
    return await api.post(`/book/save-eresource`, payload)
  },
  fileUpload: async function (payload, id,type) {
    return await api.post(`/book/uploadMultipleFiles`, payload, { params: { id,type } },
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
  },
  update: async function (payload, new_id,type,resource,user) {
    return await api.post(`/book/update-eresource`, payload, { params: { new_id,type,resource,user } })
  },

  getResourceData: async function (id) {
    return await api.get(`/book/get-by-id?id=${id}`)
  },
}
