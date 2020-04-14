
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