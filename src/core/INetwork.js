import {initHeader,getTransformRequest,axiosInterceptor} from "./axiosHelper";
import {NoticeType,loop,getIn}                     from "./const";
class INetwork {
    constructor() {
        this.init();
        this.initNotice()
    }
    static handle = [];
    static instance;
    static Notice = {};
    static use(){
        this.handle.forEach((fn)=>{
            if(typeof fn === "function") {
                fn.call(INetwork)
            }
        })
    }
    static create(){

    }
    static axiosCreate(config,Axios){
        const defaultConfig = {
            // 请求的接口，在请求的时候，如axios.get(url,config);这里的url会覆盖掉config中的url
            url: '',
            withCredentials: true,
            crossDomain: true,
            // 请求方法同上
            method: 'post', // default
            // 基础url前缀
            baseURL: '',
            transformRequest: [
            ],
            transformResponse: [
                function(data) {
                    // 这里提前处理返回的数据
                    try {
                        return JSON.parse(data)
                    } catch (e) {
                        return data
                    }
                }
            ],

            // 请求头信息
            headers: {},

            // parameter参数
            params: {},

            // post参数，使用axios.post(url,{},config);如果没有额外的也必须要用一个空对象，否则会报错
            data: {},
            // 设置超时时间
            timeout: 50000,
            // 返回数据类型
            responseType: 'json' // default
        }
        const params = Object.assign({},defaultConfig,config)
        INetwork.defaultConfig = params
        if(!INetwork.axiosInstance){
            getTransformRequest(params)
            INetwork.axiosInstance = Axios.create(params);
            initHeader(Axios);
            INetwork.instance = INetwork.axiosInstance
        }
        return INetwork.axiosInstance

    }
    init(){
        let axiosInstance;
        Object.defineProperty(this,'instance',{
            get(value) {
                if(value) return value
                return  INetwork.axiosInstance;
            },
            set(value) {
                if(this.instance !== value){
                    this.instance = value
                }
            }
        })
        Object.defineProperty(INetwork,'axiosInstance',{
            get() {
                return axiosInstance
            },
            set:(newValue)=>{
                if(newValue !== axiosInstance){
                    axiosInstance = newValue
                    axiosInterceptor(this)
                }
            }
        })
    }
    initNotice(){
        this.Notice = new Proxy(INetwork.Notice,{
            set (target, key, value, receiver) {
                if(!value) {
                    console.error('Notice:',`是具有${NoticeType.join('、')}函数的对象`)
                }
                const notice = Object.assign(value,{})
                const keys = Object.keys(value);
                NoticeType.forEach((key)=>{
                    if(!keys.includes(key)){
                        console.error('Notice:',`必须有${key}函数`);
                        notice[key] = loop;
                    }
                })
                return Reflect.set(target,notice,value,receiver);
            },
            get :(target, key, receiver)=>{
                const typeFun =  getIn(INetwork.Notice,[key],loop);
                return typeFun;
            }
        })
    }
    interceptorRequest(config){
        throw new Error('请实现前置拦截器')
    }
    interceptorResponse(response){
        throw new Error('请实现后置拦截器')
    }
    requestError(){
        throw new Error('请实现前置错误拦截器')
    }
    responseError(){
        throw new Error('请实现后置错误拦截器')
    }
    isSuccess(){
        throw new Error('请实现判断正常返回判断方法')
    }
    transformRes(){
        throw new Error('请实现返回数据转换方法')
    }
    handleNotice(){
        throw new Error('请实现通知栏触发函数')
    }
}
INetwork.create = new Proxy(INetwork.create,{
    set(target, p, value, receiver) {
        if(typeof value !=="function") {
            throw new Error('create是个方法')
        }
        const handle = function (...arg) {
            this.instance = value.call(INetwork,...arg);
        }.bind(INetwork)
        return Reflect.set(target,p,handle,receiver);
    },
    get(target, p, receiver) {
        return target[p]
    }
});
export default INetwork