
var breaker = {};

//15.4.4.18   Array.prototype.forEach ( callbackfn [ , thisArg ] )
_.each = _.forEach = function(list, iterator, context) {
    if (!_.isObject(list) || !_.isFunction(iterator)) {
        throw new TypeError();
    }

    if (_.isFunction(nativeForEach) && list.forEach === nativeForEach) {
        nativeForEach.call(list, iterator, context);
    } else if (_.isArray(list)) {
        for (var i = 0; i < list.length; i++) {
            iterator.call(context, list[i], i, list);
        }
    } else {
        for (var key in list) {
            if (_.has(list, key)) {
                if (iterator(list[key], key, list) === breaker) break;
            }
        }
    }
};


//15.4.4.19   Array.prototype.map ( callbackfn [ , thisArg ] )
_.map = _.collect = function (list, iterator, context) {
    if (!_.isObject(list) || !_.isFunction(iterator)) {
        throw new TypeError();
    }
    if (_.isFunction(nativeMap) && list.map === nativeMap) {
        return nativeMap.call(list, iterator, context);
    } else {
        var result = [];
        _.each(list, function() {
            result.push(iterator.apply(context, arguments));
        }, context);
        return result;
    }
};

//15.4.4.21   Array.prototype.reduce ( callbackfn [ , initialValue ] )
_.reduce = _.foldl = _.inject = function(list, iterator, memo, context) {
    if (!_.isObject(list) || !_.isFunction(iterator)) {
        throw new TypeError();
    }

    var hasInitialValue = arguments.length > 2;
    if (_.isFunction(nativeReduce) && list.reduce === nativeReduce) {
        if (context) iterator = _.bind(iterator, context);
        return hasInitialValue ? nativeReduce.call(list, iterator, memo) : nativeReduce.call(list, iterator);
    }

    var result = memo, hasValues = false;
    _.each(list, function (value, key) {
        if (hasInitialValue) {
            result = iterator.call(context, result, value, key, list);
        } else {
            result = value;
            hasInitialValue = true;
        }
        hasValues = true;
    });
    if (!hasValues) throw new TypeError('Reduce function cannot be called on empty array.');
    return result;
};

//15.4.4.22   Array.prototype.reduceRight ( callbackfn [ , initialValue ] )
_.reduceRight = _.foldr = function(list, iterator, memo, context) {
    if (!_.isObject(list) || !_.isFunction(iterator)) {
        throw new TypeError();
    }

    var hasInitialValue = arguments.length > 2;

    if (_.isFunction(nativeReduceRight) && list.reduceRight === nativeReduceRight) {
        if (context) iterator = _.bind(iterator, context);
        return hasInitialValue ? nativeReduceRight.call(list, iterator, memo) : nativeReduceRight.call(list, iterator);
    }
    var result = memo, hasValues = false;
    if (_.isArray(list)) {
        for (var i = list.length - 1; i >= 0; i--) {
            if (hasInitialValue) {
                result = iterator.call(context, result, list[i], i, list);
            } else {
                result = list[i];
                hasInitialValue = true;
            }
            hasValues = true;
        }
    }
    if (!hasValues) throw new TypeError('ReduceRight function cannot be called on empty array.');
    return _.reduce(list, iterator, memo, context);
};

_.find = _.detect = function(list, iterator, context) {
    if (!_.isObject(list) || !_.isFunction(iterator)) {
        throw new TypeError();
    }

    var result;
    _.some(list, function(value, key) {
        if (iterator.call(context, value, key, list)) {
            result = value;
            return true;
        }
        return false;
    });
    return result;
};

//15.4.4.17   Array.prototype.some ( callbackfn [ , thisArg ] )
_.some = _.any = function(list, iterator, context) {
    if (!_.isObject(list)) {
        throw new TypeError();
    }
    
    if (nativeSome && list.some === nativeSome) {
        return list.some(iterator, context);
    }

    if (!_.isFunction(iterator)) iterator = _.identity;
    
    if (_.isArray(list)) {
        for (var i = 0; i < list.length; i++) {
            if (iterator.call(context, list[i], i, list))
                return true;
        }
    } else {
        for (var key in list) {
            if (_.has(list, key)) {
                if (iterator(list[key], key, list))
                    return true;
            }
        }
    }
    return false;
};

//15.4.4.20   Array.prototype.filter ( callbackfn [ , thisArg ] )
_.filter = _.select = function(list, iterator, context) {
    if (!_.isObject(list) || !_.isFunction(iterator)) {
        throw new TypeError();
    }
    
    if (nativeFilter && list.filter === nativeFilter) {
        return list.filter(iterator, context);
    }

    var result = [];
    _.each(list, function(value) {
        if (iterator.apply(context, arguments)) {
            result.push(value);
        }
    }, context);
    return result;
};

_.reject = function (list, iterator, context) {
    return _.filter(list, function() {
        return !iterator.apply(context, arguments);
    }, context);
};

_.every = _.all = function(list, iterator, context) {
    if (!_.isObject(list) || !_.isFunction(iterator)) {
        throw new TypeError();
    }

    if (nativeEvery && list.every === nativeEvery) {
        return list.every(iterator, context);
    }

    return !_.some(list, iterator, context);
};

_.contains = _.include = function(list, value) {
    if (!_.isObject(list)) {
        throw new TypeError();
    }
    
    if (_.isArray(list)) {
        return list.indexOf(value) >= 0;
    }
    return _.any(list, function(val) { return val === value; });
};

_.invoke = function(list, func) {

};

_.pluck = function() {

};

_.max = function() {

};

_.min = function() {

};

