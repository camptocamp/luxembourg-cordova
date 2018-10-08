// The stub is an adaptation of the Luxembourg iframe/cordova plugin.
// It is used to test the communication works from the iOS iframe to the cordova host.
// It was necessary since the luxembourg app did not work in minified mode and
// the debug mode was using newest browser features (ES6) not available in the webviews.
//
// Here we check 1GB can be stored on the device (Ipad iOS9, real device) and read back.

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var blabla = document.getElementById('blabla');
var CordovaAction;

/**
 * @param {*} array .
 * @return {Array<*>} array .
 */
function cloneArray(array, start) {
  return Array.prototype.slice.call(array, start || 0);
}

window.Stub =
/*#__PURE__*/
function () {
  'use strict';

  function exports() {
    _classCallCheck(this, exports);

    window.addEventListener('message', this.receiveMessage_.bind(this), false);
    this.waitingPromises_ = new window.Map();
  }

  _createClass(exports, [{
    key: 'setItem',
    value: function setItem() {
      return this.createAction_('setItem', cloneArray(arguments));
    }
  }, {
    key: 'getItem',
    value: function getItem() {
      return this.createAction_('getItem', cloneArray(arguments));
    }
  }, {
    key: 'clear',
    value: function clear() {
      return this.createAction_('clear');
    }
  }, {
    key: 'config',
    value: function config() {
      return this.createAction_('config', cloneArray(arguments));
    }
  }, {
    key: 'createAction_',
    value: function createAction_(command, args) {
      /**
       * @type {CordovaAction}
       */
      var action = {
        'plugin': 'localforage',
        'command': command,
        'args': args,
        'id': Math.random()
      };
      console.log('sending action', action.command, action.id);
      var waitingPromise = {};
      var promise = new Promise(function (resolve, reject) {
        waitingPromise['resolve'] = resolve;
        waitingPromise['reject'] = reject;
      });
      this.waitingPromises_.set(action.id, waitingPromise);
      this.postToCordova_(action);
      return promise;
    }
  }, {
    key: 'receiveMessage_',
    value: function receiveMessage_(event) {
      /**
       * @type {CordovaAction}
       */
      var action = event['data'];
      var id = action.id;
      console.log('received action', action.command, id);
      var waitingPromise = this.waitingPromises_.get(id);

      if (action.command === 'error') {
        console.error(action.args, action.context);

        if (waitingPromise) {
          waitingPromise.reject(cloneArray(action.args), action.context);
          this.waitingPromises_.delete(id);
        }
      } else if (action.command === 'response') {
        console.log('Received response message from cordova', action.context.command,  action.args);
        waitingPromise.resolve(cloneArray(action.args));
        this.waitingPromises_.delete(id);
      } else {
        console.error('Unhandled command', action);
      }
    }
  }, {
    key: 'postToCordova_',
    value: function postToCordova_(action) {
      window['parent'].postMessage(action, '*');
    }
  }]);

  return exports;
}();

var batchesToSend = 3000;
var requestsByBatch = 10;
var stringToStoreLength = 1000; // 32kB
var somethingCount = 0;
var startDate = new Date();

function createString() {
  var value = '';
  for (var v = 0; v < stringToStoreLength; ++v) {
    value += 'abc' + Math.random().toString(36); // 16 utf-16 characters
  }
  return value;
}


var stub = new window.Stub();

function setSomething(key) {
  var value = createString();
  somethingCount += value.length;
  return stub.setItem(key, value);
}

function createKey(position, i) {
  return '' + (100 * position + i);
}

function createBatch(position, onDone) {
  var now = new Date();
  var diff = (now - startDate) / 1000;
  var min = Math.floor(diff / 60);
  var seconds = Math.floor(diff - 60 * min);
  console.log('Creating batch', position);
  blabla.innerHTML = min + '.' + seconds + ': batch ' + position + ' / ' + batchesToSend + ' (' + Math.floor(somethingCount * 2 / 1000000) + ' MB)';
  for (var i = 0; i < requestsByBatch; ++i) {
    setSomething(createKey(position, i)).then(onDone, onDone);
  }
}

var promise = stub.config({
  'name': 'ngeoOfflineStorage',
  'version': 1.0,
  'storeName': 'offlineStorage'
}).then(function() {
  return stub.clear();
});
promise.then(function() {
  var position = -1;
  var remaining = 0;
  var intervalId = setInterval(function() {
    if (remaining !== 0) {
      return;
    }
    if (position > batchesToSend) {
      console.log('Finished');
      stub.getItem(createKey(batchesToSend, 3)).then(function(result) {
        console.log(result);
        blabla.innerHTML += '<br />result: ' + result;
      }, function() {
        blabla.innerHTML += '<br /> ERROR reading ' + batchesToSend + ' / 3';
      });
      clearInterval(intervalId);
      return;
    }
    remaining = requestsByBatch;
    createBatch(++position, function() {
      --remaining;
      console.log(remaining);
    });
  });
});
