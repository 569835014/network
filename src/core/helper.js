import {POST_METHODS} from "./const";
import Qs from 'qs'
export function initHeader(instance) {
    if(instance && instance.defaults) {
        POST_METHODS.forEach((method)=>{
            instance.defaults[method]['Content-Type'] = 'application/json;charset=UTF-8'
            instance.defaults[method]['X-Requested-With'] = 'XMLHttpRequest'
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

export function handleLif(name,options,contenxt,...arg) {
    const handler  = contenxt[name];
    const haveBase = typeof handler === 'function';
    if(!options ) {
        if(haveBase) handler.apply(contenxt,[...arg]);
    }
    const optionHandler =  options[name];

    if(typeof optionHandler === "function"){
        optionHandler(...arg);
    } else {
        if(haveBase) handler.apply(contenxt,[...arg]);
    }
}