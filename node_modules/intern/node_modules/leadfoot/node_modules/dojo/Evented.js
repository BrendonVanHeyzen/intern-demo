var on = require('./on');
var aspect = require('./aspect');

var Evented = (function () {
    function Evented() {
    }
    Evented.prototype.on = function (type, listener) {
        var _this = this;
        return on.parse(this, type, listener, this, function (target, type) {
            var name = '__on' + type;
            if (!_this[name]) {
                Object.defineProperty(_this, name, {
                    configurable: true,
                    value: undefined,
                    writable: true
                });
            }
            return aspect.on(_this, '__on' + type, listener);
        });
    };

    Evented.prototype.emit = function (type) {
        var args = [];
        for (var _i = 0; _i < (arguments.length - 1); _i++) {
            args[_i] = arguments[_i + 1];
        }
        type = '__on' + type;
        if (this[type]) {
            return this[type].apply(this, args);
        }
    };
    return Evented;
})();

module.exports = Evented;
