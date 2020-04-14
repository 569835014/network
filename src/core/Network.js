import INetwork from "./INetwork";
import {handleLif} from "./helper";

export default class Network extends INetwork{

    send(options,url){
        if(typeof options === 'string'){
            options = {
                method:'get',
                url:options
            }
        } else if(url) {
            options.url = url
        }
        return this.instance(options)
    }

    async common(options,url){
        try{
            const response = await this.send(options,url);
            const isSuccess = this.isSuccess(response)
            const res = this.transformRes(response);
            if(isSuccess) {
                if(options.successNotice){
                    handleLif('success',options,this,res)
                }
            } else {
                handleLif('abnormal',options,this,res)
            }
        }catch (e) {
            handleLif('error',options,this,e)
        }
        // 设置了返回数据的话 则返回 data数据
        if(options.haveData) return res;
        // 否则返回 boolean 适用于删除之类的操作
        return isSuccess
    }
    success(){}
    abnormal(){}
    error(){}
    before(){}
    after(){}
}