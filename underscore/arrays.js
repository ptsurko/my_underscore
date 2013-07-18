
_.first = function(array, n) {

},
_.initial = function(array, n) {
    if (!_.isArray(array)) {
        throw new TypeError();
    }

    return arrayProto.slice.call(array, 0, array.length - (n || 1));
};


_.toArray = function(array) {
	return arrayProto.slice.apply(array);
};