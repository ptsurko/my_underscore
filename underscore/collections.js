
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

_.where = function(list, properties, first) {
    if (_.isEmpty(list)) { return first ? undefined : []; }

    var key, selector = function(value) {
        for(key in properties) {
            if(!_.isEqual(value[key], properties[key])) {
                return false;
            }
        }
        return true;
    };
    return first ? _.find(list, selector) : _.filter(list, selector);
};

_.findWhere = function(list, properties) {
    return _.where(list, properties, true);
}

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
    if (!_.isObject(list)) {
        throw new TypeError();
    }

    var isFunc;
    if(!(isFunc = _.isFunction(func)) && !_.isString(func)) {
        throw new TypeError();
    }

    var args = arrayProto.slice(arguments, 2);
    var result = [];
    _.each(list, function(value) {
        result.push(isFunc ? func.apply(value, args) : value[func].apply(value, args));
    });
    return result;
};

_.pluck = function(list, propertyName) {
    if (!_.isObject(list)) {
        throw new TypeError();
    }

    return _.map(list, function(value) {
        return value[propertyName];
    })
};

_.max = function(list, iterator, context) {
    if(_.isEmpty(list)) {
        return -Infinity; //why?
    }

    if(_.isArray(list) && arguments.length == 1 && list.length > 0 && list[0] === +list[0]) {
        return Math.max.apply(Math, list);
    }

    var max = -Infinity, iterator = iterator || _.identity;
    _.each(list, function(value) {
        if(iterator.call(context, value) > max) {
            max = value;
        }
    });
    return max;
};

_.min = function(list, iterator, context) {
    if(_.isEmpty(list)) {
        return Infinity; //why?
    }

    if(_.isArray(list) && arguments.length == 1 && list.length > 0 && list[0] === +list[0]) {
        return Math.min.apply(Math, list);
    }

    var min = Infinity, iterator = iterator || _.identity;
    _.each(list, function(value) {
        if(iterator.call(context, value) < min) {
            min = value;
        }
    });
    return min;
};

_.sortBy = function(list, iterator, context) {

};

_.groupBy = function (list, iterator, context) {
    iterator = arguments.length > 1 ? iterator : _.identity;
    var isFunc = _.isFunction(iterator);

    var result = {};
    _.each(list, function(value, key) {
        var res = isFunc ? iterator.call(context, value, key, list) : value[iterator];
        if (!_.has(result, res)) {
            result[res] = [];
        }
        result[res].push(value);
    });
    return result;
};

_.countBy = function(list, iterator, context) {

};

_.shuffle = function(list) {

};

_.toArray = function(list) {

};

_.size = function(list) {
    if (list == null) {
        return 0;
    } else if (list.length === +list.length) {
        return list.length;
    }

    var result = 0;
    _.each(list, function() {
        result++;
    });
    return result;
};