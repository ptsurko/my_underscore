
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

function _(object) {
    if (object instanceof _) {
        return object;
    } else if(this.constructor === _) {
        this.wrappedObject = object;
    } else {
        return new _(object);
    }
};

_.identity = function(object) {
    return object;
};