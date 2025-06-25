import Cookies from "js-cookie"

const AsyncDataTypes = {
    STRING : 1,
    NUMBER : 2,
    BOOLEAN: 3,
    OBJECT : 4,
    ARRAY : 5
}

export const asyncNames = {
    Settings : {
        User : { name : 'settings.user', type : AsyncDataTypes.OBJECT},
        // Lang : { name: 'settings.lang', type : AsyncDataTypes.STRING},
        // Currency: { name: 'settings.currency', type: AsyncDataTypes.STRING},
    },
}

export function defaultAsyncConfig(){
    if(!Object.keys(Cookies.get()).length){
        Cookies.set(asyncNames.Settings.User.name, 'null', {expires: 1})
    }
}

export function getAsyncItem(item){
    const data = Cookies.get(item.name)
    if (item.type == AsyncDataTypes.OBJECT || item.type == AsyncDataTypes.ARRAY) return JSON.parse(data)
    else if(item.type == AsyncDataTypes.NUMBER) return eval(data)
    else if(item.type == AsyncDataTypes.BOOLEAN) return eval(data) ? true : false
    else return data
}

export function setAsyncItem(item, value){
    const data = item.type == AsyncDataTypes.OBJECT || item.type == AsyncDataTypes.ARRAY ? JSON.stringify(value) : value.toString()
    Cookies.set(item.name, data, {expires: 1})
}

export function mergeAsyncItem(item, value){
    if(item.type == AsyncDataTypes.OBJECT) Cookies.set(item.name, JSON.stringify({ ...getAsyncItem(item), ...value}), {expires: 1})
    else if(item.type == AsyncDataTypes.ARRAY){
        const data = JSON.parse( Cookies.getItem(item.name) )
        Cookies.set(item.name, JSON.stringify( data.concat(value) ), {expires: 1})
    }
}

export function clearAsync(callBack) {
    const keys = Object.keys(Cookies.get())
    for(let key of keys) Cookies.remove(key)
    if(callBack) callBack()
}

export function resetAsync() { clearAsync(defaultAsyncConfig) }


export const KVUSR = {
    isUser: function() { return getAsyncItem(asyncNames.Settings.User) ? true : false },
    getUser : function() { return getAsyncItem(asyncNames.Settings.User) },
    setUser : function(user) { return setAsyncItem(asyncNames.Settings.User, user) },
}