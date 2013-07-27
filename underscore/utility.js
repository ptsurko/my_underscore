_.noConflict = function () {
	var temp = _;
	window._ = busyUnderscore;
	return temp;
};


_.mixin = function(object) {
    var keys = _.keys(object);
    if(keys.length) {
        var index = 0, key;
        while(index != keys.length) {
            key = keys[index++];
            if(_.isFunction(object[key])) {
                _[key] = object[key];
                _.prototype[key] = (function(key) {
                    return function() {
                        return object[key].apply(this, [this.wrappedObject].concat(Array.prototype.slice.call(arguments)));
                    }
                })(key)
            }
        }
    }
};

(function(exceptions) {
    var functions = _.keys(_);
    var index = 0, objectToMix = {};
    while(index != functions.length) {
        var key = functions[index++];
        if(exceptions.indexOf(key) == -1) {
            objectToMix[key] = _[key];
        }
    }
    _.mixin(_, objectToMix);

})(['mixin']);