export default function Observable(params) {
	this.listeners = [];

	// ensure THIS is the context
	this.execute = this.execute.bind(this);
}

Observable.prototype.subscribe = function (listener) {
	this.listeners.push(listener);
};

Observable.prototype.execute = function () {
	const callback = this.params?.callback || null;

	this.listeners.forEach((listener) => {
		if (callback) {
			this.callback.apply(null, [listener, ...arguments]);
		} else {
			listener.apply(null, arguments);
		}
	});
};
