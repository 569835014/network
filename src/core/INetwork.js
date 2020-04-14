import Axios from 'axios'
import {initHeader,getTransformRequest} from "./helper";

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
    static Notice
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