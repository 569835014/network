import Qs from 'qs'
import {POST_METHODS} from "./const";
export function initHeader(Axios) {
    if(Axios && Axios.defaults && Axios.defaults.headers) {
        POST_METHODS.forEach((method)=>{
            Axios.defaults.headers[method]['Content-Type'] = 'application/json;charset=UTF-8'
            Axios.defaults.headers[method]['X-Requested-With'] = 'XMLHttpRequest'
        })
    }
}
export function getTransformRequest(options) {
    if(!options) return
    const { transformRequest } = options;
    if(Array.isArray(transformRequest)){
        transformRequest.push( (data, config) => {
            // 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，这里可以使用开头引入的Qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
            if (
                config['Content-Type'] &&
                config['Content-Type'].indexOf(
                    'application/x-www-form-urlencoded'
                ) > -1
            ) {
                data = Qs.stringify(data)
            } else {
                data = JSON.stringify(data)
            }

            return data
        })
    }

}

export const axiosInterceptor = (context)=>{
    context.instance.interceptors.request.use(
        (config)=>{
            const result = context.interceptorRequest(config);
            return result ? result : config;
        },
        (error)=>{
            return context.requestError(error)
        }
    )
    context.instance.interceptors.response.use(
        (response)=>{
            return context.interceptorResponse(response)
        },
        (error)=>{
            return context.responseError(error)
        }
    )
}
