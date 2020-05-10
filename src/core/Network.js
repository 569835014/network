import INetwork from "./INetwork";
import {handleLif} from "./helper";

export default class Network extends INetwork{
   /**
     *
     * @param options
     * @param url
     * @returns {*}
     */
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
        let response,isSuccess,res;
        try{
            response = await this.send(options,url);
            isSuccess = this.isSuccess(response)
            res = this.transformRes(response);
            if(isSuccess) {
                if(options.successNotice){
                    this.handleNotice(this.Notice.success,{response,options,isSuccess,res})

                }
                handleLif('success',options,this,res)
            } else {
                if(!options.closeNotice){
                    this.handleNotice(this.Notice.warning,{response,options,isSuccess,res})
                }
                handleLif('abnormal',options,this,res)
            }
        }catch (e) {
            console.error(e);
            if(!options.closeNotice){
                this.handleNotice(this.Notice.error,{response,options,isSuccess,res},e)
            }
            handleLif('error',options,this,e)
        }
        // 设置了返回数据的话 则返回 data数据
        if(options.boolean) return isSuccess;
        // 否则返回 boolean 适用于删除之类的操作
        return res
    }
    success(){}
    abnormal(){}
    error(){}
}
