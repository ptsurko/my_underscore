
var objectProto = Object.prototype,
    arrayProto = Array.prototype,
    funcProto = Function.prototype;

var nativeBind = Function.prototype.bind;

var busyUnderscore = this._;

this._ = function (object) {
	if (_.isArray(object)) {
		return null;
	}
	return object;
};