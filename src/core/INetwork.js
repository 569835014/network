import Axios                            from 'axios'
import {initHeader,getTransformRequest} from "./helper";
import {NoticeType,loop,getIn}                     from "./const";

export default class INetwork {
    constructor() {
        this.init();
    }
    static handle = [];
    static instance;
    static use(){
        this.handle.forEach((fn)=>{
            if(typeof fn === "function") {
                fn.call(INetwork)
            }
        })
    }
    static create(config){
        if(!this.instance){
            getTransformRequest(config)
            this.instance = Axios.create(config);
            initHeader(this.instance);
        }
        return this.instance
    }

    init(){
        this.instance = INetwork.instance;
        if(this.instance){
            this.instance.interceptors.request.use(
                (config)=>{
                    const result = this.interceptorRequest(config);
                    return result ? result : config;
                },
                (error)=>{
                    return this.requestError(error)
                }
            )
            this.intance.interceptors.response.use(
                (response)=>{
                    return this.interceptorResponse(response)
                },
                (error)=>{
                    return this.responseError(error)
                }
            )
        }
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
                const typeFun =  getIn(target,[key],loop);
                return typeFun.call(this);
            }
        })
    }
    interceptorRequest(config){
        throw new Error('请实现该方法')
    }
    interceptorResponse(response){
        throw new Error('请实现该方法')
    }
    requestError(){
        throw new Error('请实现该方法')
    }
    responseError(){
        throw new Error('请实现该方法')
    }
    initNotice(){

        throw new Error('请实现该方法')
    }
    isSuccess(){
        throw new Error('请实现该方法')
    }
    transformRes(){
        throw new Error('请实现该方法')
    }
}
