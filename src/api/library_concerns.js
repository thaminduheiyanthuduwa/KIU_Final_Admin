import { api } from '@/store/api'

export default {
  getData: async function (page = 1, per_page = 20) {
    return await api.get(`/concern/get-all-info?limit=${per_page}&page=${page}&sort=tt`)
  },

  getFile: async function (data) {
    return await api.get(`/concern/downloadFile`,{ params: { data } })
  },

  updateStatus: async function (data, status, updated_user,type) {
    return await api.put(`/concern/update-status`, null, {
      params: {
        data,
        status,
        updated_user,
        type
      }
    })
  },

  // create: async function (payload) {
  //   return await api.post(`/concern/save-eresource`, payload)
  // },

  fileUpload: async function (payload, id) {
    return await api.post(`/concern/uploadMultipleFiles`, payload, { params: { id } },
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
  },

  update: async function (payload, new_id,type,resource,user) {
    return await api.post(`/concern/update-eresource`, payload, { params: { new_id,type,resource,user } })
  },

  getResourceData: async function (id) {
    return await api.get(`/concern/get-all-info-by-id?id=${id}`)
  },
}
