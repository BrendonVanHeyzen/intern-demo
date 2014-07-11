var Evented = require('./Evented');

var hub = new Evented();

function subscribe(topic, listener) {
    return hub.on.apply(hub, arguments);
}
exports.subscribe = subscribe;

function publish(topic) {
    var args = [];
    for (var _i = 0; _i < (arguments.length - 1); _i++) {
        args[_i] = arguments[_i + 1];
    }
    hub.emit.apply(hub, arguments);
}
exports.publish = publish;
