'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _flow_interfaces = require('../flow_interfaces');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(_ref) {
    var setup = _ref.setup;
    var db = _ref.db;

    _classCallCheck(this, _class);

    this._db = db;

    this.instanceId = _uuid2.default.v4();
    this.authKey = setup.authKey || '';
    this.secretKey = setup.secretKey || '';
    this.subscribeKey = setup.subscribeKey;
    this.publishKey = setup.publishKey;
    this.cipherKey = setup.cipherKey;
    this.baseParams = setup.params || {};

    this.origin = setup.origin || 'pubsub.pubnub.com';
    this.secure = setup.ssl || false;

    if (typeof location !== 'undefined' && location.protocol === 'https:') {
      this.secure = true;
    }

    this.logVerbosity = setup.logVerbosity || false;
    this.suppressLeaveEvents = setup.suppressLeaveEvents || false;

    this.useInstanceId = setup.useInstanceId || false;
    this.useRequestId = setup.useRequestId || false;

    this.setTransactionTimeout(setup.transactionalRequestTimeout || 15 * 1000);

    this.setSubscribeTimeout(setup.subscribeRequestTimeout || 310 * 1000);

    this.setSendBeaconConfig(setup.useSendBeacon || true);

    this.setPresenceTimeout(setup.presenceTimeout || 300);

    if (setup.presenceAnnounceInterval) {
      this.setPresenceAnnounceInterval(setup.presenceAnnounceInterval);
    }

    this.setUUID(this._decideUUID(setup.uuid));
  }

  _createClass(_class, [{
    key: 'setCipherKey',
    value: function setCipherKey(val) {
      this.cipherKey = val;return this;
    }
  }, {
    key: 'getUUID',
    value: function getUUID() {
      return this.UUID;
    }
  }, {
    key: 'setUUID',
    value: function setUUID(val) {
      if (this._db && this._db.set) this._db.set(this.subscribeKey + 'uuid', val);
      this.UUID = val;
      return this;
    }
  }, {
    key: 'getPresenceTimeout',
    value: function getPresenceTimeout() {
      return this._presenceTimeout;
    }
  }, {
    key: 'setPresenceTimeout',
    value: function setPresenceTimeout(val) {
      this._presenceTimeout = val;
      this._presenceAnnounceInterval = this._presenceTimeout / 2 - 1;
      return this;
    }
  }, {
    key: 'getPresenceAnnounceInterval',
    value: function getPresenceAnnounceInterval() {
      return this._presenceAnnounceInterval;
    }
  }, {
    key: 'setPresenceAnnounceInterval',
    value: function setPresenceAnnounceInterval(val) {
      this._presenceAnnounceInterval = val;return this;
    }
  }, {
    key: 'getSubscribeTimeout',
    value: function getSubscribeTimeout() {
      return this._subscribeRequestTimeout;
    }
  }, {
    key: 'setSubscribeTimeout',
    value: function setSubscribeTimeout(val) {
      this._subscribeRequestTimeout = val;return this;
    }
  }, {
    key: 'getTransactionTimeout',
    value: function getTransactionTimeout() {
      return this._transactionalRequestTimeout;
    }
  }, {
    key: 'setTransactionTimeout',
    value: function setTransactionTimeout(val) {
      this._transactionalRequestTimeout = val;return this;
    }
  }, {
    key: 'isSendBeaconEnabled',
    value: function isSendBeaconEnabled() {
      return this._useSendBeacon;
    }
  }, {
    key: 'setSendBeaconConfig',
    value: function setSendBeaconConfig(val) {
      this._useSendBeacon = val;return this;
    }
  }, {
    key: '_decideUUID',
    value: function _decideUUID(providedUUID) {
      if (providedUUID) {
        return providedUUID;
      }

      if (this._db && this._db.get && this._db.get(this.subscribeKey + 'uuid')) {
        return this._db.get(this.subscribeKey + 'uuid');
      }

      return _uuid2.default.v4();
    }
  }]);

  return _class;
}();

exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=config.js.map