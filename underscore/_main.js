
var objectProto = Object.prototype,
    arrayProto = Array.prototype,
    funcProto = Function.prototype;

var nativeBind = Function.prototype.bind,
    nativeForEach = Array.prototype.forEach,
    nativeMap = Array.prototype.map,
    nativeReduce = Array.prototype.reduce,
    nativeReduceRight = Array.prototype.reduceRight,
    nativeSome = Array.prototype.some,
    nativeFilter = Array.prototype.filter,
    nativeEvery = Array.prototype.every;


var busyUnderscore = this._;

this._ = function (object) {
    if (_.isArray(object)) {
        return null;
    }
    return object;
};

_.identity = function(object) {
    return object;
};