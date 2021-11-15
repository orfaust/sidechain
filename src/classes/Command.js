export default function Command(params) {
	this.listeners = [];

	// ensure THIS is the context
	this.execute = this.execute.bind(this);
}

Command.prototype.subscribe = function (listener) {
	this.listeners.push(listener);
};

Command.prototype.subscribeAlone = function (listener) {
	this.listeners = [listener];
};

Command.prototype.execute = function () {
	const args = arguments;

	return this.listeners.map((listener) => {
		return listener.apply(null, args);
	});
};
