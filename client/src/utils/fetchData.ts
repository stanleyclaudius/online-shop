import axios from 'axios'

export const getDataAPI = async (url: string, token?: string) => {
  const res = await axios.get(`/api/v1/${url}`, {
    headers: { Authorization: `${token}` }
  })

  return res
}

export const postDataAPI = async(url: string, data: object, token?: string) => {
  const res = await axios.post(`/api/v1/${url}`, data, {
    headers: { Authorization: `${token}` }
  })

  return res
}