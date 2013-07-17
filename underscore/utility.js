_.noConflict = function () {
	var temp = _;
	window._ = busyUnderscore;
	return temp;
};