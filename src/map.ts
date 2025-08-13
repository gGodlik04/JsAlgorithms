const mapOwn<T,K> = (array: T[], callback: (el: T, index: number, array: T[]) => K[], thisArg?: any) => {
    const result = []
    
    array.forEach((el, index) => {
        const callbackResult = thisArg ? callback.call(thisArg, el, index, array) : callback(el, index, array)
        
        result.push(callbackResult)
    })
    
    return result
}

Array.prototype.mapOwn = (callback, thisArg) => {
    const result = []
    
    this.forEach((el, index) => {
        const callbackResult = thisArg ? callback.call(thisArg, el, index, array) : callback(el, index, array)
        
        result.push(callbackResult)
    })
    
    return result
}