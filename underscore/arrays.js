
_.toArray = function(array) {
	return arrayProto.slice.apply(array);
};