
_.bind = function (func, object) {
    if (!_.isFunction(func)) {
        throw new TypeError();
    }
    //    if(nativeBind && func.bind === nativeBind) {
    //        return nativeBind.apply(func, arrayProto.slice.call(arguments, 1));
    //    }

    var args = arrayProto.slice.call(arguments, 2);
    return resultFunc = function () {
        if (!(this instanceof resultFunc)) {
            return func.apply(object, args.concat(arrayProto.slice.call(arguments)));
        }

        //        function tempFunc() { }
        //        tempFunc.prototype = func.prototype;
        //        return new tempFunc();
        //return func.apply({}, args.concat(arrayProto.slice.call(arguments)));
        return void 0;
    };
};

_.partial = function (func) {
    if (!_.isFunction(func)) {
        throw new TypeError();
    }

    var args = arrayProto.slice.call(arguments, 1);
    return function () {
        return func.apply(this, args.concat(arrayProto.slice.call(arguments)));
    };
};

// memorize?
//TODO: comlete with hash function
_.memoize = function (func, hashFunc) {
    if (!_.isFunction(func)) {
        throw new TypeError();
    }

    var mem = {}, keySelector = hashFunc || function (args) { return args; };
    return function () {
        var key = keySelector.apply(this, arguments);
        return _.has(mem, key) ? mem[key] : (mem[key] = func.apply(this, arguments));
    };
};

_.delay = function (func, wait) {
    window.setTimeout(_.partial(func, arrayProto.slice(arguments, 2)), wait || 0);
};

_.defer = function (func) {
    _.delay(func, 0, arrayProto.slice(arguments, 2));
};

_.once = function (func) {
    if (!_.isFunction(func)) {
        throw new TypeError();
    }

    var wasCalled = false, result;
    return function () {
        if (!wasCalled) {
            wasCalled = true;
            result = func.apply(this, arguments);
        }
        return result;
    };
};

_.after = function (count, func) {
    if (!_.isFunction(func)) {
        throw new TypeError();
    }

    return function () {
        if (count-- <= 1) {
            return func.apply(this, arguments);
        }
        return void 0;
    };
};