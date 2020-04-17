import {isFunction} from "./const";

export const symbolPrefix = Symbol('prefix');

const handlerAOP = (aop,context,arg)=>{
}
// 环绕方法配置优先
export const AOP = function (aop) {
  return function (target, key, descriptor) {
    const { value } = descriptor;
    descriptor.value = async function (...arg) {
      // 装饰器的参数为
      if (isFunction(aop)) {
        aop.call(this, ...arg);
      } else if (aop && aop.before && typeof aop.before === 'function') {
        aop.before(this, ...arg);
      } else if (this.before) {
        await this.before(...arg);
      }
      let result = await value.call(this, ...arg);
      if (aop && aop.after && typeof aop.after === 'function') {
        result = (await aop.after.apply(this, [result, ...arg])) || result;
      } else {
        result = ((await this.after) && this.after(result, ...arg)) || result;
      }
      return result;
    };
  };
};

export function controller(path) {
  return target => {
    target.prototype[symbolPrefix] = path;
  };
}

function matching(arg) {
  let key;
  let value;
  try {
    key = arg.url.replace(/^.*\$\{([a-z]+)\}.*$/, '$1');
    if (key !== undefined && key !== null) {
      if (arg.rex) {
        value = arg.rex[key];
        arg.url = arg.url.replace(
          /^(.*)\$\{[a-z]+\}(.*)$/,
          `$1${value}$2`,
        );
      }
    }
  } catch (e) {
    console.info(e);
  }
}
function baseMethods(target, key, descriptor, name, path, successNotice) {
  const method = descriptor.value;
  descriptor.value = async function (arg = {}) {
    if (typeof path === 'string') {
      arg.url = path;
    } else {
      arg = Object.assign({}, arg, path);
    }
    arg.url = target[symbolPrefix] ? target[symbolPrefix] + arg.url : arg.url;
    arg.successNotice = successNotice;

    arg.method = name;
    matching(arg);
    return await method.call(this, arg);
  };
}
export function get(...arg) {
  return function (target, key, descriptor) {
    baseMethods(target, key, descriptor, 'get', ...arg);
  };
}

export function post(...arg) {
  return function (target, key, descriptor) {
    baseMethods(target, key, descriptor, 'post', ...arg);
  };
}
export function put(...arg) {
  return function (target, key, descriptor) {
    baseMethods(target, key, descriptor, 'put', ...arg);
  };
}
export function del(...arg) {
  return function (target, key, descriptor) {
    baseMethods(target, key, descriptor, 'delete', ...arg);
  };
}
export function successNotice (message) {
  return function (target,key,descriptor) {
    const method = descriptor.value;
    descriptor.value = async function (arg = {}) {
      arg.successNotice = true;
      if(message){
        arg.successMassage = message;
      }
      return await method.call(this, arg);
    };
  };
}
