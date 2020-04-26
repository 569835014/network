
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