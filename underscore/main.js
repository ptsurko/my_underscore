
var objectProto = Object.prototype,
        arrayProto = Array.prototype;

var busyUnderscore = this._;

this._ = function (object) {
	if (_.isArray(object)) {
		return null;
	}
	return object;
};