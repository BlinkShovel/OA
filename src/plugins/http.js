import axios from 'axios'

const MyHttpServer = {}

MyHttpServer.install = (Vue) => {

  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1'

  axios.interceptors.request.use((config)=>{
  	// console.log('触发了请求的拦截器')
  	if (config.url !== '/login') {
		const AUTH_TOKEN = sessionStorage.getItem('token')
		config.headers.common['Authorization'] = AUTH_TOKEN
  	}

  	return config
  })

  //  添加实例方法
  Vue.prototype.$http = axios
}

export default MyHttpServer
