//     Underscore.js 1.5.1
//     http://underscorejs.org
//     (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {
    var objectProto = Object.prototype;

    this._ = {};


    //TODO: rewrite later with more convenient array helpers
    (function() {
        var types = ['Number', 'Array', 'Date', 'Function', 'Boolean', 'RegExp', 'String', 'Object'];
        for(var i = 0; i < types.length; i++) {
            _['is' + types[i]] = (function(typeName) {
                    return function(object) {
                        return objectProto.toString.call(object) == '[object ' + typeName +']';
                    }
                }(types[i]));
        }
    }());

    _.isNull = function(object) {
        return object === null;
    }

    _.isUndefined = function(object) {
        return object === undefined;
    }

    _.isNaN = function(object) {
        return !!(_.isNumber(object) && object != +object);
    }

    _.isEmpty = function(object) {
        if(object) {
            for(var prop in object) {
                if(object.hasOwnProperty(prop)) {
                    return false;
                }
            }
        }
        return true;
    }

    _.has = function(object, key) {
        return objectProto.hasOwnProperty.call(object, key);
    }

    _.clone = function(object) {
        if(!_.isObject(object)) {
            return object;
        }

        var result = {};
        for(var prop in object) {
            result[prop] = object[prop];
        }
        return result;
    }

    _.isArguments = function(object) {
        return !!(object && _.has(object, 'callee'));
    }

    _.isFinite = function(object) {
        return !_.isNaN(parseFloat(object)) && isFinite(object);
    }

    _.defaults = function(object) {
        if(_.isObject(object)) {
            var args = Array.prototype.slice.call(arguments);
            args.unshift();
            for(var i = 0; i < args.length; i++) {
                if(_.isObject(args[i])) {
                    for(var prop in args[i]) {
                        if(object[prop] === undefined) {
                            object[prop] = args[i][prop];
                        }
                    }
                }
            }
        }
    }

    _.functions = function(object) {
        if(_.isObject(object)) {
            var res = [];
            for(var prop in object) {
                if(_.isFunction(object[prop])) {
                    res.push(prop);
                }
            }
            res.sort();
            return res;
        }
    }

}).call(this);
