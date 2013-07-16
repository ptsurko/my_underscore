//     Underscore.js 1.5.1
//     http://underscorejs.org
//     (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function () {
	var objectProto = Object.prototype,
        arrayProto = Array.prototype;

	var busyUnderscore = this._;

	this._ = function (object) {
		if (_.isArray(object)) {
			return null;
		}
		return object;
	};


	//TODO: rewrite later with more convenient array helpers
	(function () {
		var types = ['Number', 'Array', 'Date', 'Boolean', 'RegExp', 'String'];
		for (var i = 0; i < types.length; i++) {
			_['is' + types[i]] = (function (typeName) {
				return function (object) {
					return objectProto.toString.call(object) == '[object ' + typeName + ']';
				}
			}(types[i]));
		}
	}());

	_.isObject = function (object) {
		return object === Object(object); //TODO:???
	};

	_.isFunction = function (object) {
		return typeof (object) == 'function';
	};

	_.isNull = function (object) {
		return object === null;
	};

	_.isUndefined = function (object) {
		return object === undefined;
	};

	_.isNaN = function (object) {
		return _.isNumber(object) && object !== +object;
	};

	_.isEmpty = function (object) {
		if (!object) return true;
		if (_.isArray(object) || _.isString(object))
			return object.length === 0;
		for (var prop in object) {
			if (_.has(object, prop)) {
				return false;
			}
		}
		return true;
	};

	_.isElement = function (object) {
		return !!(object.nodeName);
	}

	_.has = function (object, key) {
		return objectProto.hasOwnProperty.call(object, key);
	};

	_.clone = function (object) {
		if (!_.isObject(object)) {
			return object;
		}

		var result = {};
		for (var prop in object) {
			result[prop] = object[prop];
		}
		return result;
	};

	_.isArguments = function (object) {
		return !!(object && _.has(object, 'callee'));
	};

	_.isFinite = function (object) {
		return !_.isNaN(parseFloat(object)) && isFinite(object);
	};

	_.defaults = function (object) {
		if (_.isObject(object)) {
			var args = arrayProto.slice.call(arguments);
			args.unshift();
			for (var i = 0; i < args.length; i++) {
				if (_.isObject(args[i])) {
					for (var prop in args[i]) {
						if (object[prop] === undefined) {
							object[prop] = args[i][prop];
						}
					}
				}
			}
		}
	};

	_.functions = function (object) {
		if (_.isObject(object)) {
			var res = [];
			for (var prop in object) {
				if (_.isFunction(object.prop)) {
					res.push(prop);
				}
			}
			res.sort();
			return res;
		}
	};

	_.keys = function (object) {
		if (_.isObject(object)) {
			var res = [];
			for (var prop in object) {
				res.push(prop);
			}

			return res;
		}
		throw new TypeError();
	};

	_.values = function (object) {
		if (_.isObject(object)) {
			var res = [];
			for (var prop in object) {
				res.push(object[prop]);
			}

			return res;
		}
		throw new TypeError();
	};

	_.pairs = function (object) {
		if (_.isObject(object)) {
			var res = [];
			for (var prop in object) {
				res.push([prop, object[prop]]);
			}

			return res;
		}
		throw new TypeError();
	};

	_.invert = function (object) {

		if (_.isObject(object)) {
			var res = {};
			for (var prop in object) {
				res[object[prop]] = prop;
			}

			return res;
		}
		throw new TypeError();
	};

	_.pick = function (object) {
		if (_.isObject(object)) {
			var args = arrayProto.concat.apply([], arrayProto.slice.call(arguments, 1));
			var res = {};
			for (var prop in object) {
				if (args.indexOf(prop) >= 0) {
					res[prop] = object[prop];
				}
			}

			return res;
		}
		throw new TypeError();
	};

	_.omit = function (object) {
		if (_.isObject(object)) {
			var args = arrayProto.concat.apply([], arrayProto.slice.call(arguments, 1));
			var res = {};
			for (var prop in object) {
				if (!(args.indexOf(prop) >= 0)) {
					res[prop] = object[prop];
				}
			}

			return res;
		}
		throw new TypeError();
	};

	_.isEqual = function (object, other) {
		if (object === other) return object !== 0 || 1 / object == 1 / other; // -0 === 0 => (-0 and 0 => -Infinity and Infinity)
		var className = objectProto.toString.call(object).slice(8, -1);
		if (className !== objectProto.toString.call(other).slice(8, -1)) return false;
		switch (className) {
			case 'Number':
				if (isNaN(object) && isNaN(other)) return true;
				return  -object === 0 ? 1 / object == 1 / other : -object === -other;
			case 'Boolean':
			case 'Date':
				return +object === +other; //boolean -> int
			case 'String':
				return String(object) === String(other);
			case 'RegExp':
				return  object.source == other.source &&
						object.global == other.global &&
						object.multiline == other.multiline &&
						object.ignoreCase == other.ignoreCase;
			case 'Array':
				if (object.length !== other.length) return false;
				for (var i = 0; i < object.length; i++) { //Why do they ignore array properties?
					if (!_.isEqual(object[i], other[i])) {
						return false;
					}
				}
				return true;
			case 'Object':
				if (object.constructor != other.constructor) return false;
				var objectKeys = _.keys(object);
				var otherKeys = _.keys(other);
				if (objectKeys.length !== otherKeys.length) {
					return false;
				}

				for (var i = 0; i < objectKeys.length; i++) {
					var key = objectKeys[i];
					if (otherKeys.indexOf(key) == -1 || !_.isEqual(object[key], other[key]))
						return false;
				}

				return true;
			
		}
		return false;
	};

	_.tap = function (object, intercepter) {

	};

	_.extend = function () {

	}




	_.noConflict = function () {
		var und = _;
		window._ = busyUnderscore;
		return _;
	}

}).call(this);
