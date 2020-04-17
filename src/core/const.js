
const METHODS = [  'get' , 'GET'
    , 'delete' , 'DELETE'
    , 'head' , 'HEAD'
    , 'options' , 'OPTIONS'
    , 'post' , 'POST'
    , 'put' , 'PUT'
    , 'patch' , 'PATCH'
    , 'link' , 'LINK'
    , 'unlink' , 'UNLINK'];
export const POST_METHODS = ['get','options','head']
export const GET_METHODS = ['post','put','delete','patch']
export const Low_Methods = [...new Set(METHODS.map((item)=>{
    return item.toLowerCase();
}))];

export const UP_Methods = [...new Set(METHODS.map((item)=>{
    return item.toUpperCase();
}))];

export const NoticeType = ['waring','success','error'];
export const loop = ()=>{}
export const getIn = (target,keys,defaultValue)=>{
    try {
        const res = keys.reduce((res,key)=>{
            res = target[key]
            return res;
        },undefined)
        if(res === undefined || res === null) return defaultValue;
        return res
    }catch ( e ) {
        return defaultValue
    }
}
export const isFunction = (fun)=>{
    return typeof fun ==='function'
}
