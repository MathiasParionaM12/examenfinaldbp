import axios from 'axios';

const api = axios.create({baseURL: 'https://mentoriautec-api.aaron-navarro.workers.dev/api'})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if([401,409].includes(error.response?.status) && !error.config.url.includes('/auth/')) 
            {
                localStorage.removeItem('token')
                window.location.href = '/login'
            }
        return Promise.reject(error)
    }
)
export function apiError(err: unknown) {
    if (axios.isAxiosError(err) && err.response) {
        const data = err.response.data
        return {
            code:data?.code??String(err.response.status),
            message:data?.message??data?.detail??'Error del servidor',
        }
    }
       return {code:'NETWORK',message:'No se pudo conectar al servidor'}
     }
    export default api