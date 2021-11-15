function EventEmitter() {
  this.listeners = [];

  this.trigger = this.trigger.bind(this);
}

EventEmitter.prototype.trigger = function () {
  const args = arguments;
  this.listeners.forEach((listener) => listener.apply(null, args));
};

EventEmitter.prototype.on = function (listener) {
  this.listeners.push(listener);
};

const emitters = {};

export function createEmitter(key) {
  if (!isValidKey(key)) {
    throw `a key param is required`;
  }

  if (emitters[key]) {
    throw `emitter key ${key} has been used already`;
  }

  emitters[key] = new EventEmitter();
  return emitters[key];
}

export function useEmitter(key) {
  if (!isValidKey(key)) {
    throw `a key param is required`;
  }

  if (!emitters[key]) {
    throw `emitter key ${key} has not been created yet`;
  }

  return emitters[key];
}

export function getEmitters() {
  return emitters;
}

function isValidKey(key) {
  return typeof key === "string" && key.length > 0;
}
