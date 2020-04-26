import INetwork from "./core/INetwork";
import Network from "./core/Network";
import {AOP,get,del,post,put,controller,successNotice} from './core/Decorator';
import {getIn} from "./core/const";

export {
    INetwork,
    Network,
    getIn,
    AOP,
    get,
    del,
    put,
    post,
    controller,
    successNotice
}