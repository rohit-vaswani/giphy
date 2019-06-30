
Function.prototype.debounce  = function(timeOut) {
    
    let timerId = undefined;
    let originalFunction = this;

    return function(...args){

        if (timerId) {
            clearTimeout(timerId);
            timerId = undefined;
        }
        timerId = setTimeout(() => originalFunction.apply(this, args), timeOut);
    }   
}